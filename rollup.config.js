import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'

export default {
  input: './src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'see'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
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
      port: 6565,
      //set headers
      headers: {
        'Access-Control-Allow-Origin': '*',
        foo: 'bar'
      }
    })
  ]
}
