# Pocket Platformer - integration mod

Pocket Platformer is a a tool for creating platformer games.
Its original codebase can be found in the following repo:

https://the-l0bster.itch.io/pocket-platformer

---

This repository is a modification aiming to make integrating Pocket Platformer and other webpages a little easier.
Added features:
- "Restart Game" option removed from pause menu - this was moving the player to lvl 1.
- events emitted from the game
  - on level finished
  - on player death
- selecting start level:
  - append `#number` at the end of the exported page URL to make the game start on the chosen level, e.g. [for lvl 2 - ./example/game.html#2](./example/game.html#2)
  - append `#number.xyz` where `number` is the number of the level and `xyz` is a flag identifier to make the player start on the selected flag, e.g. [lvl 1 and flag with "Dow" id - ./example/game.html#1.Dow](./example/game.html#1.Dow)

<!--
  - TODO: on coin collected
  - TODO: on reaching checkpoint
- TODO: passing game launch values
- TODO: calling game functions
-->

---

Your existing Pocket Platformer games can be [imported and exported here](https://jakubiszon.github.io/pocket-platformer) to make the exports include the extra code.


## Events

If you have access to the browser window containing the game you can assign it a handler function to `gameEventCallback` property.
The function will be called when certain events happen during gameplay.

```js
// in your script
function myHandler( eventData ) {
    console.log( eventData );
}
```

```html
<!-- in your html -->
<iframe
    src="exported-game.html"
    onload="this.contentWindow.gameEventCallback = myHandler; this.focus();"
/>
```

If no such handler is specified and the game detects `window.opener`
it will instead use `postMessage` which the parent window can receive the following way:

```js
// in the parent window
window.addEventListener( 'message', myHandler )
```


#### Level Completed
```js
// argument passed when level is finisged
{
    "eventName": "level-completed",
    "levelIndex": number,
    "nextLevelIndex": number,
}
```

The `nextLevelIndex` property will contain either the level number targeted by the flag (you can click on finish flags and update it) or `levelIndex + 1`.

#### Death
```js
// argument passed when player dies
{
    "eventName": "player-death",
    "levelIndex": number,
}
```