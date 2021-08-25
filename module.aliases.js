const path = require('path');

module.exports = {
    root: [path.resolve('/')],
    alias: {
        Users: './src/users',
        Places: './src/places',
        Components: './src/components',
        Context: './src/context',
        Pages: './src/pages',
        Utils: './src/utils',
        Hooks: './src/hooks'
    }
};
