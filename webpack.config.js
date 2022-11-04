const path = require('path'),
    UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'),

    config = {
        mode: 'development',
        entry: {
            front: './assets/js/front.js',
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname + '/public', 'build'),
        },
        optimization: {
            minimizer: [
                new UglifyJSPlugin({
                    sourceMap: true,
                }),
                new OptimizeCSSAssetsPlugin({}),
            ],
        },
        plugins: [
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    map: {
                        inline: false,
                        annotation: true,
                    },
                },
            }),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: '[name].css',
                chunkFilename: '[id].css',
            }),
            // new BrowserSyncPlugin({
            //   // The BrowserSync hostname
            //   host: 'localhost',
            //   // The port to run BrowserSync's server on
            //   port: 3333,
            //   proxy: 'test.local/',
            //   files: ['**/back_django/**/*', '**/back_django/*'],
            //   open: false,
            // }),
        ],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                // presets: ["env"],
                            },
                        },
                    ],
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                sassOptions: {
                                    outputStyle: 'compressed',
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|svg|jpe?g|gif|webp)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                        },
                    ],
                },
                {
                test: /\.html$/,
                use: [
                    {
                        loader: 'simple-nunjucks-loader',
                        options: {}
                    }
                ]
            }
            ],
        },
        watch: true,
    };

module.exports = config;