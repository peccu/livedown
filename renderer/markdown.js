const wrap = require('./wrap')
var markdownIt = require('markdown-it')
var markdownItTaskCheckbox = require('markdown-it-task-checkbox')
var markdownItEmoji = require('markdown-it-emoji')
var markdownItGitHubHeadings = require('markdown-it-github-headings')

var md = markdownIt({
  html: true,
  linkify: true
})
md.use(markdownItTaskCheckbox)
md.use(markdownItEmoji)
md.use(markdownItGitHubHeadings, {
  prefix: ''
})

module.exports = {
    render: wrap(src => md.render(src)),
    script: [
      '/vendor/highlight.min.js',
      '/renderer/markdown.js'
    ],
    style: [
      '/vendor/github-markdown.css',
      '/vendor/github.css'
    ]
  }
