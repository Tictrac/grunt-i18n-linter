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

        // Run
        linter.run(this.filesSrc, options);

        // Report
        report(linter.getUnusedTranslations(), 'Unused');
        if (options.missingTranslationRegex !== null) {
            report(linter.getMissingTranslations(), 'Missing');
        }

        /**
         * Report the status of items
         * @param {Array} items If empty its successful
         * @param {String} success Success message
         * @param {String} error Error message
         */
        function report(items, heading) {
            grunt.log.subhead(heading);
            if (items.length > 0) {
                grunt.log.error(grunt.log.wordlist(items, {separator: '\n'}));
            } else {
                grunt.log.ok();
            }
        }
    });
};
