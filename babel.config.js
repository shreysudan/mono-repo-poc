function isWebpack(caller) {
    return Boolean(caller && caller.name === 'babel-loader');
}
function isWebTarget(caller) {
    return Boolean(caller && caller.target === 'web');
}

module.exports = api => {
    // api.cache(false);
    const web = api.caller(isWebTarget);
    // const webpack = api.caller(isWebpack);
    return {
        presets: [
            [
                '@babel/preset-env',
                {
                    modules: false,
                }
            ],
            '@babel/preset-react',
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-syntax-dynamic-import',
            'css-modules-transform',
        ],
    };
};
