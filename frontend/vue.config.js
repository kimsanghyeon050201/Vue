const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

// module.exports = {
//   devServer : {
//     proxy : {
//       '/api' : {
//         tartget : 'http://localhost:3000/api',
//         changeOrigin : true,
//         pathRewrite : {
//           '^/api' : ''
//         }
//       }
//     }
//   },
//   outputDir : '../backend/public'
// }