/*
 * grunt-i18n-linter
 * https://github.com/tictrac/grunt-i18n-linter
 *
 * Copyright (c) 2015 Tictrac
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        i18n_linter: {
            test_combined: {
                options: {
                    translations: ['test/fixtures/translations/*.json'],
                    missingTranslationRegex: /__[A-Z0-9_]*__/g
                },
                src: ['test/fixtures/templates/*']
            },
            test_all: {
                options: {
                    translations: ['test/fixtures/translations/all.json'],
                    missingTranslationRegex: /__[A-Z0-9_]*__/g
                },
                src: ['test/fixtures/templates/*']
            },
            test_missing: {
                options: {
                    translations: ['test/fixtures/translations/missing.json'],
                    missingTranslationRegex: /__[A-Z0-9_]*__/g
                },
                src: ['test/fixtures/templates/*']
            },
            test_missingNoMissing: {
                options: {
                    translations: ['test/fixtures/translations/missing.json']
                },
                src: ['test/fixtures/templates/*']
            },
            test_unused: {
                options: {
                    translations: ['test/fixtures/translations/unused.json'],
                    missingTranslationRegex: /__[A-Z0-9_]*__/g
                },
                src: ['test/fixtures/templates/*']
            },
            test_missingAndUnused: {
                options: {
                    translations: ['test/fixtures/translations/missing-unused.json'],
                    missingTranslationRegex: /__[A-Z0-9_]*__/g
                },
                src: ['test/fixtures/templates/*']
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'i18n_linter', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
