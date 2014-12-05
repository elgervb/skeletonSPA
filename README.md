skeletonSPA
===========

Skeleton for a Single Page Application using Angular &amp; Gulp


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
