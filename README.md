
WarO React
=========

This is a React example for War-O as a code exercise.

* details:
    - Javascript, not TypeScript
    - functional components (not classes)

Rules:
---------

Game rules are [here](Rules.md).

Todo:
---------

* card buttons vs UI buttons
* media query
* publish to web in gh-pages
    - not as easy as i thought
    - see blog post about `npm install gh-pages` ???
* review CSS
* store config in firebase

* X: end of game status bar isn't right 
* X: max card is hardcoded in remote 
* X: remote strategy
* X use async in getStrategies()
* X: new game #2 after game #1
* X: fix "You wins"
* X: handle end-of-game: update config-slice
* X: consider status bar in a ui-slice, like section 19 
* X: render hands/kitty with CSS flexbox 
* X: play one round
* X: set transparency in config 
* X: copy button colours from https://codetojoy.github.io/bids_ng1/
* X: use buttons
* X: new game: deal cards to players
* X: new player
* X: config: num cards with validation
* X: do not edit user config
* X: validate player config
* X: scaffold routes
* X: basic redux
* X: canary test

Notes:
---------

* to setup: `./install.sh`
* to run: `./run.sh`
* to test: `./test.sh`

### project creation

* versions:
```
$ node --version
v16.13.2
$ npm --version
8.1.2
$ npx --version
8.1.2
```

* commands:
```
npx create-react-app . 
npm install redux
npm install react-redux
npm install react-router-dom@5
npm install "@reduxjs/toolkit"
```

### useful references

* [1] - https://css-tricks.com/snippets/css/a-guide-to-flexbox/

### workflows

* OCT 2022
* misc text here for a test commit
* I had to create a new personal access token on Github which has the scope for workflows.
* I had to set a new remote url with this:

```
git remote set-url origin https://codetojoy:ACCESS_TOKEN@github.com/codetojoy/waro-react.git
```

* see [here](https://stackoverflow.com/a/49007415/12704)


