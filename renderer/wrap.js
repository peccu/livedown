module.exports = (render) => {
  return (src, cb) => cb(null, render(src))
}
