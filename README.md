
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

* fix "You wins"
* new game #2 after game #1
* review CSS
    - center main boxes for New Game / Deal 
* handle end-of-game: update config-slice
* consider status bar in a ui-slice, like section 19 
* remote strategy
    - this implies using thunks like section 19 
* store config in firebase
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

