skeletonSPA
===========

Skeleton for a Single Page Application using Angular &amp; Gulp

This project supplies a basic setup for working with Gulp (http://gulpjs.com/) and AngularJS (https://angularjs.org/)


### installation ###

install node (http://nodejs.org/) <br/>
clone this repository
  
Open a console at the project root and install all node-modules :

```ShellSession
	npm install
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


### Gulp ###

The `gulpfile.js` contains several targets to make development easier.

Target       | Description
-------------|--------------------
styles       | Compile Sass into Css and minify it. Minified and non-minified versions are copied to the dist folder. This will also auto prefix vendor specific rules.
scripts      | Minifies all javascript found in the `src/js/**` folder. All files will be concatenated into `app.js`.  Minified and non-minified versions are copied to the dist folder. This will also generete sourcemaps for the minified version.
images       | Task to optimize and deploy all images found in folder `src/img/**`. Result is copied to `dist/assets/img`
clean        | Cleans the `dist` folder
default      | Build and copy all styles, scripts, images and fonts. Depends on: clean
build        | Default task. Depends on: build
copy-fonts   | Copies all fonts found in folder `src/fonts/**` to target folder `dist/assets/fonts`
watch        | 
live-reload  | 
browser-sync | 
express      | 
express-lr   | 


