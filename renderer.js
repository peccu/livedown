const markdown = require('./renderer/markdown')
const plantuml = require('./renderer/plantuml')

const renderer = {
  md: markdown,
  plantuml: plantuml,
  puml: plantuml,
  _: src => `<pre>${src}</pre>`
}

module.exports = renderer
