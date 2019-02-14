const markdown = require('./markdown')
const plantuml = require('./plantuml')

const wrap = (render) => {
  return (src, cb) => cb(null, render(src))
}

const id = src => src
const pre = src => `<pre>${src}</pre>`

const renderer = {
  md: {
    render: wrap(markdown),
    script: [
      '/vendor/highlight.min.js',
      '/renderer/markdown.js'
    ],
    style: [
      '/vendor/github-markdown.css',
      '/vendor/github.css'
    ]
  },
  plantuml: {
    render: wrap(plantuml),
    script: [],
    style: []
  },
  puml: {
    render: wrap(plantuml),
    script: [],
    style: []
  },
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
