const path = require('path');

module.exports = {
    root: [path.resolve('/')],
    alias: {
        Users: './src/users',
        Places: './src/places',
        Pages: './src/pages',
        Components: './src/components'
    }
};
