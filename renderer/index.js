const wrap = require('./wrap')
const markdown = require('./markdown')
const plantuml = require('./plantuml')

const id = src => src
const pre = src => `<pre>${src}</pre>`

const renderer = {
  md: markdown,
  markdown: markdown,
  plantuml: plantuml,
  puml: plantuml,
  svg: {
    render: wrap(id),
    script: [],
    style: []
  },
  _: {
    render: wrap(pre),
    script: [],
    style: []
  }
}

module.exports = renderer
