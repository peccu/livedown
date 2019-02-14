const markdown = require('./markdown')
const plantuml = require('./plantuml')

const wrap = (render) => {
  return (src, cb) => cb(null, render(src))
}

const id = src => src
const pre = src => `<pre>${src}</pre>`

const renderer = {
  md: wrap(markdown),
  plantuml: wrap(plantuml),
  puml: wrap(plantuml),
  svg: wrap(id),
  _: wrap(pre)
}

module.exports = renderer
