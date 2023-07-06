const path = require('path');

module.exports = {
    entry: './src/index.ts',
    devtool: 'source-map',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'req4d.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'dist',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        globalObject: 'typeof self !== \'undefined\' ? self : this',
    },
};
