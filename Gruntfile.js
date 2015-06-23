module.exports = function (grunt) {

    var appInfoPath = 'dist/appInfo.json';

    function getAppInfo() {
        return grunt.file.readJSON(appInfoPath);
    }

    grunt.initConfig({
        folder_list: {
            options: {
                folder: false
            },
            files: {
                src: ['app/resources/images/**'],
                dest: 'app/resources/imageList.json'
            }
        },
        clean: {
            dist: {
                src: 'dist'
            },
            release: {
                src: 'release'
            }
        },
        copy: {
            upload: {
                expand: true,
                cwd: 'app',
                src: ['**/*.*'],
                dest: 'dist/',
                filter: 'isFile'
            }
        },
        uglify: {
            framework: {
                expand: true,
                cwd: 'dist',
                src: ['js/framework/**/*.js'],
                dest: 'dist/'
            },
            all: {
                expand: true,
                cwd: 'dist',
                src: ['**/*.js','!js/service/Communicator.js'],
                dest: 'dist/'
            }
        },
        modify_json: {
            "options": {
                add: true,
                fields: {
                    DevelopmentMode: "off"
                }
            }, your_target: {
                // Target-specific file lists and/or options go here.
                "files": [{
                    "src": "dist/appInfo.json"
                }]
            }
        },
        concat_css: {
            all: {
                src: ["dist/resources/css/*.css"],
                dest: "dist/resources/css/style.css"
            }

        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/resources/css/style.min.css': ['dist/resources/css/style.css']
                }
            }
        },
        compress: {
            release: {
                options: {
                    archive: function () {
                        var appInfo = getAppInfo();
                        return 'CJHV_CLOUD_EPA_' + appInfo.Version + appInfo.QRVersion + '.min.zip';
                    }
                },
                expand: true,
                cwd: 'release/',
                src: ['**/*'],
                dest: ''
            },
            normal: {
                options: {

                    archive: function () {
                        var ccaInfo = getAppInfo();
                        return 'CJHV_CLOUD_EPA_' + ccaInfo.Version + ccaInfo.QRVersion + '.zip';
                    }
                },
                expand: true,
                cwd: 'dist/',
                src: ['**/*'],
                dest: ''
            }
        }
    });

    //require('load-grunt-tasks')(grunt);

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-modify-json');
    grunt.loadNpmTasks('grunt-folder-list');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // 아무일도 하지 않는 기본 테스크
    grunt.registerTask('build', ['clean', 'folder_list', 'copy', 'uglify:framework', 'concat_css', 'cssmin', 'modify_json']);
    grunt.registerTask('build_min', ['clean', 'folder_list', 'copy', 'uglify:all', 'concat_css', 'cssmin', 'modify_json']);
};