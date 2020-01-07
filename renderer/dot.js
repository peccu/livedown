const Viz = require('viz.js')
const { Module, render } = require('viz.js/full.render.js')

let viz = new Viz({ Module, render });

module.exports = {
  render: (src, cb) => viz.renderString(src)
    .then(result => cb(null, result))
    .catch(error => cb(error, null))
}
