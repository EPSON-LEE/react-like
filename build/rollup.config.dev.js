// development mode
import config from './rollup.config'
import serve from 'rollup-plugin-serve'
import notify from 'rollup-plugin-notify'

const PORT = 6565

config.output.sourcemap = true
config.plugins = [
  ...config.plugins,
  ...[
    notify(),
    serve({
      // Launch in browser (default: false)
      open: true,
      // Show server address in console (default: true)
      verbose: true,
      // Folder to serve files from
      contentBase: 'dist',
      // Set to true to allow cors request
      allowCrossOrigin: true,
      // Set to true to return index.html instead of 404
      historyApiFallback: false,
      // Options used in setting up server
      host: 'localhost',
      port: PORT,
      //set headers
      headers: {
        'Access-Control-Allow-Origin': '*',
        foo: 'bar'
      }
    })
  ]
]

module.exports = config
