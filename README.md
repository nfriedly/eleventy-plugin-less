eleventy-plugin-less
====================

Plugin for [Eleventy (11ty)](https://www.11ty.dev) to compile [Less stylesheets](https://lesscss.org) to [CSS](https://developer.mozilla.org/en-US/docs/Glossary/CSS).

Currently compiles *every* .less file in your project into a distinct output .ccs file. You can use [eleventy ignores](https://www.11ty.dev/docs/ignores/) to disable compilation of library, utility, etc. files.

Automatically appends inline sourcemaps to the end of files.

Todo:
* Tests
* Add a way to specify entrypoint files and ignore all others
* Add a way to control sourcemaps
* Allow options to be passed directly to less