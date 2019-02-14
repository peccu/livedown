hljs.configure({languages: []})

onContentHook.push(data => {
  $('code').each(function (_, block) {
    $(this).parent().addClass($(this).attr('class'))
  })
  $('pre').each(function (_, block) {
    hljs.highlightBlock(block)
  })
})
