// production mode
import config from './rollup.config'
import { uglify } from 'rollup-plugin-uglify'

config.output.sourcemap = true
config.plugins = [
  ...config.plugins,
  ...[
    uglify()
  ]
]

module.exports = config
