/*
 * grunt-i18n-linter
 * https://github.com/tictrac/grunt-i18n-linter
 *
 * Copyright (c) 2015 Tictrac
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    grunt.registerMultiTask('i18n_linter', 'Grunt plugin to loop through templates to validate the use of translations', function() {
        var linter = require('./lib/i18n_linter')(grunt),
            options = this.options({
                translations: [],
                missingTranslationRegex: null,
                missingSuccessMessage: 'Well done, no missing translations',
                missingErrorMessage: 'There are missing translations',
                unusedSuccessMessage: 'Well done, no unused translations',
                unusedErrorMessage: 'There are unused translations'
            });

        linter.run(this.filesSrc, options);
    });
};
