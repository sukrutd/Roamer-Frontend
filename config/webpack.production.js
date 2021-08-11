const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const cssLoaders = [
    MiniCssExtractPlugin.loader,
    { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
    { loader: 'postcss-loader', options: { sourceMap: true } },
    { loader: 'resolve-url-loader', options: { sourceMap: true } }
];

const scssLoaders = cssLoaders.concat([{ loader: 'sass-loader', options: { sourceMap: true } }]);

module.exports = {
    target: 'browserslist',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders
            },
            {
                test: /\.s(a|c)ss$/,
                use: scssLoaders
            }
        ]
    },
    optimization: {
        runtimeChunk: false,
        splitChunks: {
            chunks: 'all',
            automaticNameDelimiter: '.',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'node-vendors'
                }
            }
        },
        minimizer: [
            (compiler) => {
                new TerserPlugin({
                    parallel: true,
                    extractComments: false,
                    terserOptions: {
                        compress: {},
                        keep_fnames: true,
                        keep_classnames: true,
                        format: {
                            comments: false,
                            beautify: false
                        }
                    }
                }).apply(compiler);
            },
            new CssMinimizerPlugin()
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:8].css',
            chunkFilename: '[id].[contenthash:8].css'
        })
    ]
};
