const markdown = require('./markdown')
const plantuml = require('./plantuml')

const renderer = {
  md: markdown,
  plantuml: plantuml,
  puml: plantuml,
  _: src => `<pre>${src}</pre>`
}

module.exports = renderer
