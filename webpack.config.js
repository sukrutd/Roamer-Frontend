const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge: webpackMerge } = require('webpack-merge');

const modeConfig = (mode) => require(`./config/webpack.${mode}`);

const applyPresets = (presetArguments) => {
    const presets = Array.isArray(presetArguments) ? presetArguments : [presetArguments];

    const mergedConfig = presets.map((name) => require(`./config/presets/webpack.${name}.js`));

    return webpackMerge({}, ...mergedConfig);
};

const getEnvironmentVariables = (buildEnvironment) => {
    const dotEnvironmentFolder = path.join(__dirname, 'src', 'settings');

    return {
        path: path.resolve(dotEnvironmentFolder, `${buildEnvironment}.env`),
        defaults: path.resolve(dotEnvironmentFolder, 'defaults.env')
    };
};

module.exports = ({ mode = 'production', buildEnvironment = 'prod', presets = [] }) => {
    return webpackMerge(
        {
            mode,
            entry: {
                main: path.resolve(__dirname, 'src', 'index.js')
            },
            output: {
                path: path.resolve(__dirname, 'dist'),
                filename: '[name].[contenthash:8].js',
                chunkFilename: '[id].[contenthash:8].js',
                assetModuleFilename: 'images/[contenthash:8][ext][query]',
                publicPath: '/',
                clean: true
            },
            module: {
                rules: [
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        use: 'babel-loader'
                    },
                    {
                        test: /\.(png|jpg|jpeg|gif)$/i,
                        type: 'asset/resource'
                    },
                    {
                        test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
                        type: 'asset/inline'
                    }
                ]
            },
            resolve: {
                extensions: ['.js', '.jsx']
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: path.resolve(__dirname, 'src', 'index.html'),
                    filename: 'index.html'
                }),
                new webpack.ProgressPlugin(),
                new Dotenv(getEnvironmentVariables(buildEnvironment))
            ]
        },
        modeConfig(mode),
        applyPresets(presets)
    );
};
