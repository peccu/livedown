// var plantuml = require('node-plantuml');
// plantuml.useNailgun();

const { spawnSync } = require('child_process');

const render = function (src) {
  // var decode = plantuml.decode(src);
  // var gen = plantuml.generate({format: 'svg'});
  // decode.out.pipe(gen.in);
  // gen.out.pipe(res);

  const plantuml = spawnSync(
    'java',
    ['-jar', '/Users/peccu/Downloads/plantuml.jar', '-tsvg', '-pipe'],
    {
      input: src
    })
  console.log('finished')
  // console.log(plantuml.stdout.toString())
  // console.log(plantuml.stderr.toString())
  return plantuml.stdout.toString()
}

module.exports = src => render(src)
