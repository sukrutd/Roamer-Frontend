const moduleAliases = require('./module.aliases');

module.exports = {
    presets: [
        ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3.9 }],
        ['@babel/preset-react', { runtime: 'automatic' }]
    ],
    plugins: [
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-transform-runtime',
        ['module-resolver', moduleAliases]
    ]
};
