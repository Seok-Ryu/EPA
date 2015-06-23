({
    appDir: 'dist',
    baseUrl: './js',
    dir: 'release',
    modules: [
        {
            name: 'EPABase'
        }
    ],
    fileExclusionRegExp: /^(r|build)\.js$/,
    optimizeCss: 'standard',
    removeCombined: true,
    findNestedDependencies: true,
    paths: {
        'resources/strings/ko': '../resources/strings/ko'
    }
})
//node r.js -o build.js