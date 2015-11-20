# grunt-i18n-linter

> Grunt plugin to highlight unused or missing translations

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-i18n-linter --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-i18n-linter');
```

## The "i18n_linter" task

### Overview
In your project's Gruntfile, add a section named `i18n_linter` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  i18n_linter: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.translations
Type: `Array`
Default value: `[]`

An array of paths to your JSON translation files. Paths do support Grunt filename expansion.

#### options.missingTranslationRegex
Type: `RegExp`
Default value: `null`

A regex pattern for finding missing translations in given files.

### Usage Examples

#### Unused translations
The linter will report all translations that are defined in the ```options.translations``` files that can not be found in the ```src``` files.

```js
grunt.initConfig({
  i18n_linter: {
    options: {
        translations: ['src/translations/*.json']
    },
    src: ['src/templates/*.html', 'src/tamplates/*.js']
  },
});
```

#### Missing translations
If the linter is aware of how the translations are defined then it can then report on all translations found in the ```src``` that are not defined in the ```options.translations```.

```js
grunt.initConfig({
  i18n_linter: {
    options: {
        translations: ['src/translations/*.json'],
        missingTranslationRegex: /__[A-Z0-9_]*__/g
    },
    src: ['src/templates/*.html', 'src/tamplates/*.js']
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
See [https://github.com/Tictrac/grunt-i18n-linter/releases](https://github.com/Tictrac/grunt-i18n-linter/releases).
