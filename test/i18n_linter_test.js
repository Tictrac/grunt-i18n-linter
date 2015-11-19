'use strict';

var grunt = require('grunt'),
    linter;

exports.i18n_linter = {
    setUp: function(done) {
        linter = require('../tasks/lib/i18n_linter.js')(grunt);
        done();
    },
    testCombined: function(test) {
        test.expect(2);

        linter.run(grunt.file.expand('test/fixtures/templates/*'), {
            translations: ['test/fixtures/translations/*.json'],
            missingTranslationRegex: /__[A-Z0-9_]*__/g
        });

        test.equal(linter.linter.getUnusedTranslations().length, 2, 'there should be 2 unused translations');
        test.equal(linter.linter.getMissingTranslations().length, 0, 'there should be no missing translations');

        test.done();
    },
    testAll: function(test) {
        test.expect(2);

        linter.run(grunt.file.expand('test/fixtures/templates/*'), {
            translations: ['test/fixtures/translations/all.json'],
            missingTranslationRegex: /__[A-Z0-9_]*__/g
        });

        test.equal(linter.linter.getUnusedTranslations().length, 0, 'there should be no unused translations');
        test.equal(linter.linter.getMissingTranslations().length, 0, 'there should be no missing translations');

        test.done();
    },
    testMissing: function(test) {
        test.expect(2);

        linter.run(grunt.file.expand('test/fixtures/templates/*'), {
            translations: ['test/fixtures/translations/missing.json'],
            missingTranslationRegex: /__[A-Z0-9_]*__/g
        });

        test.equal(linter.linter.getUnusedTranslations().length, 0, 'there should be no unused translations');
        test.equal(linter.linter.getMissingTranslations().length, 2, 'there should be 2 missing translations');

        test.done();
    },
    testMissingNoMissing: function(test) {
        test.expect(2);

        linter.run(grunt.file.expand('test/fixtures/templates/*'), {
            translations: ['test/fixtures/translations/missing.json']
        });

        test.equal(linter.linter.getUnusedTranslations().length, 0, 'there should be no unused translations');
        test.equal(linter.linter.getMissingTranslations().length, 0, 'there should be no missing translations');

        test.done();
    },
    testUnused: function(test) {
        test.expect(2);

        linter.run(grunt.file.expand('test/fixtures/templates/*'), {
            translations: ['test/fixtures/translations/unused.json'],
            missingTranslationRegex: /__[A-Z0-9_]*__/g
        });

        test.equal(linter.linter.getUnusedTranslations().length, 2, 'there should be 2 unused translations');
        test.equal(linter.linter.getMissingTranslations().length, 0, 'there should be no missing translations');

        test.done();
    },
    testMissingAndUnused: function(test) {
        test.expect(2);

        linter.run(grunt.file.expand('test/fixtures/templates/*'), {
            translations: ['test/fixtures/translations/missing-unused.json'],
            missingTranslationRegex: /__[A-Z0-9_]*__/g
        });

        test.equal(linter.linter.getUnusedTranslations().length, 2, 'there should be 2 unused translations');
        test.equal(linter.linter.getMissingTranslations().length, 2, 'there should be 2 missing translations');

        test.done();
    }
};
