/* global io, hljs, $ */

var socket = io.connect(window.location.origin)

let onContentHook = []

socket.on('content', function (data) {
  $('.markdown-body').html(data)
  onContentHook.map(e => e(data))
})

socket.on('title', function (data) {
  $('title').html(data)
})

socket.on('script', function (path) {
  document.body.appendChild($('<script>').attr('src', path)[0]);
})

socket.on('style', function (path) {
  document.head.appendChild($('<link rel="stylesheet">').attr('href', path)[0]);
})

socket.on('kill', function () {
  window.open('', '_self', '')
  window.close()
})
