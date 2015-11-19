/*
 * grunt-i18n-linter
 * https://github.com/tictrac/grunt-i18n-linter
 *
 * Copyright (c) 2015 Tictrac
 * Licensed under the MIT license.
 */

'use strict';

// Export as a module
module.exports = function(grunt) {
    var linter = new TranslationLinter();

    return {
        run: run,
        linter: linter
    };

    /**
     * Run the linter against the given files and options
     * @param {Array} files List of files to check
     * @param {Object} options List of options
     */
    function run(files, options) {
        // If translations or templates are not supplied then error
        if (options.translations.length === 0) {
            grunt.fail.fatal('Please supply translations');
        }

        // If a missing translation regex has been supplied report the missing count
        if (options.missingTranslationRegex !== null) {
            linter.setMissingTranslationRegex(options.missingTranslationRegex);
        }

        // Add the translation keys to the linter
        options.translations.forEach(function(file) {
            var files = grunt.file.expand(file);

            files.forEach(function(file) {
                if (!grunt.file.exists(file)) {
                    grunt.fail.fatal('File ' + file + ' does not exist');
                }
                linter.addKeys(grunt.file.readJSON(file));
            });
        });

        // Iterate through files and run them through the linter
        files.forEach(function(file) {
            if (!grunt.file.exists(file)) {
                grunt.fail.fatal('File ' + file + ' does not exist');
            }
            linter.check(grunt.file.read(file));
        });

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
    }
};

/**
 * TranslationLinter
 * @constructor
 */
var TranslationLinter = function() {
    this.keys = [];
    this.used = {};
    this.missing = [];
    this.missingTranslationRegex = null;
};

/**
 * Set the missing traslation search regex
 * @param  {RegExp} regex Regular expression to search files for missing translations
 */
TranslationLinter.prototype.setMissingTranslationRegex = function(regex) {
    this.missingTranslationRegex = regex;
    return this.missingTranslationRegex;
}

/**
 * Get the internal keys array
 * @return {Array}
 */
TranslationLinter.prototype.getKeys = function() {
    return this.keys;
}

/**
 * Add translation keys to the linter
 * @param {Object|Array} keys Can be an object of keys or an array
 * @return {Array} Array of all keys
 */
TranslationLinter.prototype.addKeys = function(keys) {
    var key;

    if (keys.constructor === Array) {
        for (key = 0; key < keys.length; key++) {
            this.addKey(keys[key]);
        }
    } else if (typeof keys === 'object') {
        for (key in keys) {
            if (keys.hasOwnProperty(key)) {
                this.addKey(key);
            }
        }
    }

    return this.keys;
};

/**
 * Add a key to the linter keys array
 * @param  {String} key
 * @return {Boolean} True if key was added, False if key already added
 */
TranslationLinter.prototype.addKey = function(key) {
    if (this.keys.indexOf(key) === -1) {
        this.keys.push(key);
        return true;
    }
    return false;
};

/**
 * Check usage of translations in string, will build usage report
 * If translation regex is set usage report will contain missing translations
 * @param  {String} string Any string of HTML, JS etc.
 * @return {Boolean} If any translations were used in string
 */
TranslationLinter.prototype.check = function(string) {
    if (this.missingTranslationRegex !== null) {
        this.findMissingTranslations(string);
    }
    return this.findUsedTranslations(string) > 0;
};

/**
 * Find if the translation key is used in the string
 * @param  {String} string Any string that uses transaltions
 * @return {Number} How many used translations found
 */
TranslationLinter.prototype.findUsedTranslations = function(string) {
    var length = this.keys.length,
        count = 0,
        i,
        key,
        matches;

    for (i = 0; i < length; i++) {
        key = this.keys[i];
        matches = string.match(new RegExp(key, 'g'));

        if (!this.used.hasOwnProperty(key)) {
            this.used[key] = 0;
        }

        if (matches && matches.length > 0) {
            this.used[key] = this.used[key] + matches.length;
            count = count + 1;
        }
    }

    return count;
};

/**
 * Return an object containing translation keys and how many times they are used
 * @return {Object}
 */
TranslationLinter.prototype.getUsedTranslations = function() {
    return this.used;
};

/**
 * Return an array of unused translations
 * @return {Array}
 */
TranslationLinter.prototype.getUnusedTranslations = function() {
    var unused = [],
        key;

    for (key in this.used) {
        if (this.used.hasOwnProperty(key)) {
            if (this.used[key] === 0) {
                unused.push(key);
            }
        }
    }

    return unused;
};

/**
 * Find translations that may be missing from the files
 * @param  {String} string Any string that uses transaltions
 * @return {Number} How many missing translations found
 */
TranslationLinter.prototype.findMissingTranslations = function(string) {
    var matches = string.match(this.missingTranslationRegex),
        count = 0,
        match;

    if (matches && matches.length > 0) {
        while ((match = matches.pop()) !== undefined) {

            // If the translation exists continue
            if (!match || this.keys.indexOf(match) !== -1) {
                continue;
            }

            if (this.missing.indexOf(match) === -1) {
                this.missing.push(match);
                count = count + 1;
            }
        }
    }

    return count;
}

/**
 * Return an object containing all missing translations found
 * @return {Array}
 */
TranslationLinter.prototype.getMissingTranslations = function() {
    return this.missing;
};
