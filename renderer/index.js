const wrap = require('./wrap')
const markdown = require('./markdown')
const plantuml = require('./plantuml')
const dot = require('./dot')

const id = src => src
const pre = src => `<pre>${src}</pre>`

const renderer = {
  md: markdown,
  markdown: markdown,
  plantuml: plantuml,
  puml: plantuml,
  dot: dot,
  svg: {
    render: wrap(id)
  },
  _: {
    render: wrap(pre)
  }
}

module.exports = renderer
