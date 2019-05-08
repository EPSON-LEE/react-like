// base rollup config

import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import path from 'path'

const resolveFile = function(filePath) {
  return path.join(__dirname, '..', filePath)
}

export default {
  input: resolveFile('src/index.js'),
  output: {
    file: resolveFile('dist/index.js'),
    format: 'umd',
    name: 'see'
    // // 开启sourcemap
    // sourcemap: true
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}
