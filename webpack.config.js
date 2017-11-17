module.exports = {

   context : __dirname,

    entry : {
        app : [ 
            "babel-polyfill",
            "babel-regenerator-runtime",
            "./src/index.js"
          ]
      },

    output : {
        path: __dirname + "/build",
        filename : "game.js"
      },

    module : {
      loaders : [
        {
          test    : /\.js$/,
          loader  : 'babel-loader',
          exclude : /(node_modules)/,
          include : __dirname 
        }
      ]
    }
}