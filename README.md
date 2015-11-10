skeletonSPA
===========

[![Join the chat at https://gitter.im/elgervb/skeletonSPA](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/elgervb/skeletonSPA?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/elgervb/skeletonSPA.svg?branch=master)](https://travis-ci.org/elgervb/skeletonSPA)
[![Dependency Status](https://david-dm.org/elgervb/skeletonSPA.svg)](https://david-dm.org/elgervb/skeletonSPA)
[![devDependency Status](https://david-dm.org/elgervb/skeletonSPA/dev-status.svg)](https://david-dm.org/elgervb/skeletonSPA#info=devDependencies)
[![codecov.io](http://codecov.io/github/elgervb/skeletonSPA/coverage.svg?branch=master)](http://codecov.io/github/elgervb/skeletonSPA?branch=master)


Skeleton for a Single Page Application using Angular &amp; Gulp
Exapmple is located here: http://elgervanboxtel.nl/labs/skeletonSPA

This project supplies a basic setup for building single page applications with Gulp (http://gulpjs.com/), using AngularJS (https://angularjs.org/).

BTW: if you plan on working with another library then AngularJS, just replace it with your own ;-) The fulpfile.js will need some small changes.


### installation ###

* install node (http://nodejs.org/) <br/>
* clone or download this repository
  
Open a console at the project root and install all node-modules by executing following commands: 

```ShellSession
	npm install
```
Install gulp globally
```ShellSession
	npm install -g gulp
```

Install bower globally
```ShellSession
  npm install -g bower
```

Install third party dependencies with bower
```ShellSession
	bower install
```

Do a initial build
```ShellSession
	gulp build
```

This will do minification on all images, compile Sass, minify javascript and create sourcemaps and copy all (including fonts) to the dist directory

### Run ###
There are actually 2 ways to run the skeleton

* copy it in a existing webserver
* run with browser-sync (http://www.browsersync.io/)
```ShellSession
	gulp start
```
Open a browser at the location where the browser-sync server has been started. Point multiple browsers / devices to the same url and watch the magic happen.


### Workflow ###

A basic workflow would be

 ```ShellSession
  // build all sources, creating the dist directory
  gulp

  // launch a server against the dist folder and watch for changes in source file
  gulp start
```

In a separate command window, watch all unit test:

```ShellSession
    gulp test:watch
```

In another separate command window, run all end to end tests:

```ShellSession
    gulp test:e2e
```

### Gulp Tasks ###

The `gulpfile.js` contains several targets to make development easier.

Target              | Description
--------------------|--------------------
browser-sync        | browser-sync task for starting a server. This will open a browser for you. Point multiple browsers / devices to the same url and watch the magic happen.Depends on: watch
build               | Build and copy all styles, scripts, images and fonts. Depends on: info, clean
clean               | Cleans the `dist` folder and other generated files. Depends on: clear-cache
clear-cache         | Clears the cache used by gulp-cache
copy                | Copies all to dist/. Depends on: copy-fonts, copy-template, copy-index
copy-fonts          | Task for copying fonts only
copy-template       | Task for copying templates. This will lint the HTML and remove comments
copy-index          | Task for copying index page only. Optionally add live reload script to it
default             | Default task. Depends on: build
docs-js             | Create Javascript documentation in the settings.reports directory
images              | Task to optimize and deploy all images found in folder `src/img/**`. Result is copied to `dist/img`
info                | log some info about this app
lint-js             | Lint all application javascript
package             | Packaging all compiled resources. Due to the async nature of other tasks, this task cannot depend on build... do a build first and then package it.
scripts             | Task to handle and deploy all javascript, application & vendor. Depends on: scripts-app, scripts-vendor
scripts-app         | Minifies all javascript found in the `src/js/**` folder. All files will be concatenated into `app.js`.  Minified and non-minified versions are copied to the dist folder. This will also generete sourcemaps for the minified version. Depends on: docs-js, lint-js
scripts-vendor      | Task to handle all vendor specific javasript. All vendor javascript will be copied to the dist directory. Also a concatinated version will be made, available in \dist\js\vendor\vendor.js. Depends on: scripts-vendor-maps
scripts-vendor-maps | Copy all vendor .js.map files to the vendor location
start               | Task to start a server and used the live reload functionality. Depends on: server
styles              | Compile Sass into Css and minify it. Minified and non-minified versions are copied to the dist folder. This will also auto prefix vendor specific rules.
test                | run all tests using Karma
test:e2e            | Run End to End (e2e) tests with Protractor
test:watch          | watch file changes and run tests 
todo                | Output TODO's & FIXME's in markdown and json file as well
watch               | Watches changes to Sass, javascript and images. On change this will run the appropriate task, either: styles, templates, scripts or images.


### Arguments ###

Optionally run gulp with the following arguments

Name                | Description
--------------------|--------------------
--dev               | start the app in dev-mode. This way console logging will not be stripped and javascripts will not be minified to make debugging easier
--port={{int}}      | start the server on port {{port}}


### Settings ###

The *package.json* file contains an object *settings* in which you can specify basic settings for the gulpfile.

Setting             | Description
--------------------|-------------------
src                 | The directory where all sources are located. Defaults to ./src/
dist                | The directory where all gulp results are written to. Defaults to ./dist/
serverport          | The port number to start the server on. Defaults to 4000


# Testing

Skeleton SPA comes with testing capabilities.

## Unit tests

To run all unit test, simply run:

    gulp test

To watch file changes and run tests accordingly:

    gulp test:watch

## End to end tests (E2E)

Run the following command to run the end to end tests:

    gulp test:e2e
  
(Server must be started in a separate command window, with `gulp start`)
  
The default behaviour can be modified in the `protractor.config.js`. For example, you can change the browser in which tests are being ran.

# Project structure

The following project structure is required:

```ShellSession
 - src
   - fonts
   - img
   - js
     - app
     - vendor
   - styles
 - tests
   - e2e
   - units
```

## Generated structure
```ShellSession
 - dist
   - css
   - fonts
   - img
   - js
     - app
     - vendor
 - reports
```
