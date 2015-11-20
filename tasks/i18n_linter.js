/*
 * grunt-i18n-linter
 * https://github.com/tictrac/grunt-i18n-linter
 *
 * Copyright (c) 2015 Tictrac
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    grunt.registerMultiTask('i18n_linter', 'Grunt plugin to highlight unused or missing translations', function() {
        var linter = require('./lib/i18n_linter')(grunt),
            options = this.options({
                translations: [],
                missingTranslationRegex: null
            });

        linter.run(this.filesSrc, options);
    });
};
