skeletonSPA
===========

Skeleton for a Single Page Application using Angular &amp; Gulp

This project supplies a basic setup for working with Gulp (http://gulpjs.com/) and AngularJS (https://angularjs.org/)


### installation ###

install node (http://nodejs.org/) <br/>
clone or download this repository
  
Open a console at the project root and install all node-modules :

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

* run in Express (http://expressjs.com/). 
```ShellSession
	gulp express
```
  optionally with Live-Reload (http://livereload.com/) 
 ```ShellSession
	gulp express-lr
```
Point your browser to [http://localhost:4000](http://localhost:4000)


### Workflow ###

A basic workflow would be

 ```ShellSession
  // build all sources, creating the dist directory
  gulp build

  // launch a server against the dist folder and watch for changes in source file
  gulp browser-sync
```

### Gulp Tasks ###

The `gulpfile.js` contains several targets to make development easier.

Target         | Description
---------------|--------------------
browser-sync   | browser-sync task for starting a server. This will open a browser for you. Point multiple browsers / devices to the same url and watch the magic happen.Depends on: watch
build          | Build and copy all styles, scripts, images and fonts. Depends on: clean
clean          | Cleans the `dist` folder and other generated files
copy           | Copies all to dist/
default        | Default task. Depends on: build
docs           | Generate docs from all application javascript
express        | Task to start a Express server on port 4000
express-lr     | Task to start a Express server on port 4000 and used the live reload functionality. Depends on: express, live-reload
images         | Task to optimize and deploy all images found in folder `src/img/**`. Result is copied to `dist/assets/img`
live-reload    | Start the live reload server. Live reload will be triggered when a file in the `dist` folder or the index.html changes. This will add a live-reload script to the page, which makes it all happen. Depends on: watch
scripts        | Task to handle and deploy all javascript, application & vendor. Depends on: scripts-app, scripts-vendor
scripts-app    | Minifies all javascript found in the `src/js/**` folder. All files will be concatenated into `app.js`.  Minified and non-minified versions are copied to the dist folder. This will also generete sourcemaps for the minified version. Depends on: docs
scripts-vendor | Task to handle all vendor specific javasript. All vendor javascript will be copied to the dist directory. Also a concatinated version will be made, available in \dist\assets\js\vendor\vendor.js
styles         | Compile Sass into Css and minify it. Minified and non-minified versions are copied to the dist folder. This will also auto prefix vendor specific rules.
todo           | Output TODO's & FIXME's in markdown and json file as well
watch          | Watches changes to Sass, javascript and images. On change this will run the appropriate task, either: styles, scripts or images. 
