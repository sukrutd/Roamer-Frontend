const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            analyzerHost: '0.0.0.0',
            analyzerPort: '4000'
        })
    ]
};
