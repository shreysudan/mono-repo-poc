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
                    targets: !web ? { node: 'current' } : undefined,
                },
            ],
            '@babel/preset-react',
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-syntax-dynamic-import',
            '@loadable/babel-plugin',
            'css-modules-transform',
        ],
    };
};
