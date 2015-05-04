skeletonSPA
===========

Skeleton for a Single Page Application using Angular &amp; Gulp

This project supplies a basic setup for working with Gulp (http://gulpjs.com/) and AngularJS (https://angularjs.org/).

BTW: if you plan on working with another library then AngularJS, just replace it with your own ;-)


### installation ###

install node (http://nodejs.org/) <br/>
clone or download this repository
  
Open a console at the project root and install all node-modules (Note that on windows it could be that you are required to do this in administrator mode): 

```ShellSession
	npm install
```
Install Gulp globally
```ShellSession
	npm install -g gulp
```

Do a initial build

```ShellSession
	gulp build
```

This will do minification on all images, compile Sass, minify javascript and create sourcemaps and copy all (including fonts) to the dist directory

### Run ###
There are actually 3 ways to run the skeleton

* copy it to a existing webserver
* run with browser-sync (http://www.browsersync.io/)
```ShellSession
	gulp browser-sync
```
This will open a browser for you. Point multiple browsers / devices to the same url and watch the magic happen.

* run it against a webserver provided by this project with live reload functionality.  
```ShellSession
	gulp start
```

The webserver I use here is Express (http://expressjs.com), more documentation on live reload can be found on: http://livereload.com/

Point your browser to [http://localhost:4000](http://localhost:4000), and tadah!


### Workflow ###

A basic workflow would be

 ```ShellSession
  // build all sources, creating the dist directory
  gulp

  // launch a server against the dist folder and watch for changes in source file
  gulp start
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
live-reload         | Start the live reload server. Live reload will be triggered when a file in the `dist` folder or the index.html changes. This will add a live-reload script to the page, which makes it all happen. Depends on: watch
scripts             | Task to handle and deploy all javascript, application & vendor. Depends on: scripts-app, scripts-vendor
scripts-app         | Minifies all javascript found in the `src/js/**` folder. All files will be concatenated into `app.js`.  Minified and non-minified versions are copied to the dist folder. This will also generete sourcemaps for the minified version. Depends on: docs-js
scripts-vendor      | Task to handle all vendor specific javasript. All vendor javascript will be copied to the dist directory. Also a concatinated version will be made, available in \dist\js\vendor\vendor.js. Depends on: scripts-vendor-maps
scripts-vendor-maps | Copy all vendor .js.map files to the vendor location
server              | Task to start a server, use --port={{port}} to set the port, otherwist the port from the settings will be used
start               | Task to start a server and used the live reload functionality. Depends on: live-reload, server
styles              | Compile Sass into Css and minify it. Minified and non-minified versions are copied to the dist folder. This will also auto prefix vendor specific rules.
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
scr                 | The directory where all sources are located. Defaults to ./src/
dist                | The directory where all gulp results are written to. Defaults to ./dist/
serverport          | The port number to start the server on. Defaults to 4000