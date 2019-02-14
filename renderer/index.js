const markdown = require('./markdown')
const plantuml = require('./plantuml')

const renderer = {
  md: markdown,
  plantuml: plantuml,
  puml: plantuml,
  svg: src => src,
  _: src => `<pre>${src}</pre>`
}

module.exports = renderer
