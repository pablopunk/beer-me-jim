const { spawnSync } = require('child_process')
const pkg = require('../package.json')

const commadsToExecute = {
  init: ['yarn', ['init', '-y']],
  react: ['yarn', ['add', 'next', 'react', 'react-dom']],
  typescript: [
    'yarn',
    ['add', '--dev', 'typescript', '@types/node', '@types/react'],
  ],
}

function getCommandsToExecute(args) {
  const { init, react, typescript } = commadsToExecute
  const cmds = [init, react]

  if (args.t || args.typescript) {
    cmds.push(typescript)
  }

  return cmds
}

module.exports = (args) => {
  if (args.h || args.help) {
    console.log(`
    $ ${pkg.name} next [ -h || --help || -t || --typescript ]

    Starts a yarn project and adds all dependencies to create
    aNextJS website with typescript support (if typescript option is passed):

    ${Object.values(commadsToExecute)
      .map((c) => `${c[0]} ${c[1].join(' ')}`)
      .join('\n    ')}
    `)

    return
  }

  for (const command of getCommandsToExecute(args)) {
    spawnSync(command[0], command[1], { stdio: 'inherit' })
  }
}