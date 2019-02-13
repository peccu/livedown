const markdown = require('./renderer/markdown')

const renderer = {
  md: markdown,
  _: src => `<pre>${src}</pre>`
}

module.exports = renderer
