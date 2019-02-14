var path = require('path')
var fs = require('fs')
const { promisify } = require('util')

var express = require('express')
var http = require('http')
var socket = require('socket.io')
var chokidar = require('chokidar')
var parser = require('body-parser')
var request = require('request')

var renderer = require('./renderer')

var app = express()
var server = http.Server(app)
var io = socket(server)

var utils = require('./utils')

module.exports = function (opts) {
  return new Server(opts)
}

function Server (opts) {
  opts = opts || {}

  var self = this

  this.port = opts.port || 1337
  this.URI = 'http://localhost:' + this.port
  this.sock = {emit: function () {}}

  this.listen = function (next) {
    server.listen(self.port, next)
  }

  this.emitContent = async function (filePath) {
    var self = this
    const ext = path.extname(filePath).replace(/^./, '')
    renderer[ext] && renderer[ext].style && renderer[ext].style.map(path => self.sock.emit('style', path))
    renderer[ext] && renderer[ext].script && renderer[ext].script.map(path => self.sock.emit('script', path))
    const render = renderer[ext].render || renderer._.render
    let data = await promisify(fs.readFile)(filePath, 'utf8')
    data = data || ''
    self.sock.emit('content', await promisify(render)(data))
  }

  this.watch = function (_path) {
    var self = this
    chokidar.watch(_path).on('change', function (_path, stats) {
      self.emitContent(_path)
    })
  }
}

Server.prototype.stop = function (next) {
  request.del(this.URI, {
    headers: {
      'Content-Type': 'application/json'
    }
  }, next)
}

Server.prototype.start = function (filePath, next) {
  var self = this
  var sendFileOpts = {}

  if (utils.isPathRelative(filePath)) {
    sendFileOpts.root = path.resolve(__dirname)
  }

  this.stop(function () {
    self.watch(filePath)
    self.listen(next)
  })

  io.on('connection', function (sock) {
    self.sock = sock
    self.sock.emit('title', path.basename(filePath))
    self.emitContent(filePath)
  })

  app.use(parser.json())
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'))
  })
  app.use(express.static(path.join(__dirname, 'public')))
  app.use(express.static(path.dirname(filePath)))

  app.delete('/', function (req, res) {
    io.emit('kill')
    res.end()
    process.exit()
  })
}
