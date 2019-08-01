var config = {
    entry: {
        app: __dirname +'\\src\\entry.js'
    },
    output: {
        path: __dirname + '\\www\\dist',
        filename: 'main.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader'
                }]
            },
            {
                test:/\.(s*)css$/,
                use:['style-loader','css-loader', 'sass-loader']
             },
            {
                test: /\.(woff(2)?|ttf|eot|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './fonts/'
                        //no limit since this is a mobile app 
                        //load all resources in 1 bundle
                        //if web app, give some limit so bundle file is not too big
                    }
                }]
            },
            {
                test: /\.(jpg|png)$/,
                use: {
                    loader: "url-loader",
                    options:{
                        name: '[name].[ext]',
                        outputPath: './images/'
                    }
                }
            }
    ],
    },
    mode: 'production',
    performance: {
      hints: false
    },
    watchOptions: {
        aggregateTimeout:  2000
    }
};
module.exports = config;