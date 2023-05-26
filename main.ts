namespace SpriteKind {
    export const Boss = SpriteKind.create()
}
function lifeDecrease () {
    info.changeLifeBy(-1)
    game.splash("OUCH! Lives remaining: " + info.life())
    tiles.placeOnRandomTile(protagonist, assets.tile`start`)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile0`, function (sprite, location) {
    game.gameOver(true)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    bullet = sprites.createProjectileFromSprite(assets.image`bullet`, protagonist, 250, 0)
})
function bossReset () {
    for (let value3 of sprites.allOfKind(SpriteKind.Player)) {
        sprites.destroy(value3)
    }
    for (let value4 of sprites.allOfKind(SpriteKind.Enemy)) {
        sprites.destroy(value4)
    }
    makePlayer()
    tiles.placeOnRandomTile(protagonist, assets.tile`boss_reset`)
    bossInit()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    protagonist.vy = -185
})
scene.onOverlapTile(SpriteKind.Enemy, assets.tile`hazard`, function (sprite, location) {
    sprites.destroy(sprite)
})
function enemyInit () {
    for (let value of tiles.getTilesByType(assets.tile`enemy_spawn`)) {
        bossEnemy = sprites.create(assets.image`enemy`, SpriteKind.Enemy)
        tiles.placeOnTile(bossEnemy, value)
        bossEnemy.follow(protagonist, 30)
        bossEnemy.ay = 500
    }
    for (let value2 of tiles.getTilesByType(assets.tile`flyingEnemy`)) {
        bossEnemy = sprites.create(assets.image`flying_enemy`, SpriteKind.Enemy)
        tiles.placeOnTile(bossEnemy, value2)
        bossEnemy.follow(protagonist, 30)
    }
}
function bossInit () {
    for (let value5 of tiles.getTilesByType(assets.tile`boss_spawn`)) {
        bossEnemy = sprites.create(assets.image`boss`, SpriteKind.Boss)
        tiles.placeOnTile(bossEnemy, value5)
        bossEnemy.follow(protagonist, 40)
    }
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    protagonist,
    [img`
        . . . f f f f f . . . . 
        . . f e e e e e f f . . 
        . f e e e e e e e f f . 
        f e e e e e e e f f f f 
        f e e 4 e e e f f f f f 
        f e e 4 4 e e e f f f f 
        f f e 4 4 4 4 4 f f f f 
        f f e 4 4 f f 4 e 4 f f 
        . f f d d d d 4 d 4 f . 
        . . f b b d d 4 f f f . 
        . . f e 4 4 4 e e f . . 
        . . f 1 1 1 e d d 4 . . 
        . . f 1 1 1 e d d e . . 
        . . f 6 6 6 f e e f . . 
        . . . f f f f f f . . . 
        . . . . . f f f . . . . 
        `,img`
        . . . . . . . . . . . . 
        . . . f f f f f f . . . 
        . . f e e e e e f f f . 
        . f e e e e e e e f f f 
        f e e e e e e e f f f f 
        f e e 4 e e e f f f f f 
        f e e 4 4 e e e f f f f 
        f f e 4 4 4 4 4 f f f f 
        . f e 4 4 f f 4 e 4 f f 
        . . f d d d d 4 d 4 f . 
        . . f b b d e e f f f . 
        . . f e 4 e d d 4 f . . 
        . . f 1 1 e d d e f . . 
        . f f 6 6 f e e f f f . 
        . f f f f f f f f f f . 
        . . f f f . . . f f . . 
        `,img`
        . . . . . . . . . . . . 
        . . . f f f f f f . . . 
        . . f e e e e e f f f . 
        . f e e e e e e e f f f 
        f e e e e e e e f f f f 
        f e e 4 e e e f f f f f 
        f e e 4 4 e e e f f f f 
        f f e 4 4 4 4 4 f f f f 
        . f e 4 4 f f 4 e 4 f f 
        . . f d d d d 4 d 4 f f 
        . . f b b d d 4 f f f . 
        . . f e 4 4 4 e d d 4 . 
        . . f 1 1 1 1 e d d e . 
        . f f 6 6 6 6 f e e f . 
        . f f f f f f f f f f . 
        . . f f f . . . f f . . 
        `],
    200,
    true
    )
})
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    animation.stopAnimation(animation.AnimationTypes.All, protagonist)
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    animation.stopAnimation(animation.AnimationTypes.All, protagonist)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.chestClosed, function (sprite, location) {
    tiles.setTileAt(location, sprites.dungeon.chestOpen)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    info.changeLifeBy(1)
})
function makePlayer () {
    protagonist = sprites.create(assets.image`player`, SpriteKind.Player)
    controller.moveSprite(protagonist, 100, 0)
    protagonist.ay = 500
    scene.cameraFollowSprite(protagonist)
    return protagonist
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    protagonist,
    [img`
        . . . . . . . . . . . . 
        . . . f f f f f f . . . 
        . f f f e e e e e f . . 
        f f f e e e e e e e f . 
        f f f f e e e e e e e f 
        f f f f f e e e 4 e e f 
        f f f f e e e 4 4 e e f 
        f f f f 4 4 4 4 4 e f f 
        f f 4 e 4 f f 4 4 e f . 
        f f 4 d 4 d d d d f . . 
        . f f f 4 d d b b f . . 
        . 4 d d e 4 4 4 e f . . 
        . e d d e 1 1 1 1 f . . 
        . f e e f 6 6 6 6 f f . 
        . f f f f f f f f f f . 
        . . f f . . . f f f . . 
        `,img`
        . . . . . . . . . . . . 
        . . . f f f f f f . . . 
        . f f f e e e e e f . . 
        f f f e e e e e e e f . 
        f f f f e e e e e e e f 
        f f f f f e e e 4 e e f 
        f f f f e e e 4 4 e e f 
        f f f f 4 4 4 4 4 e f f 
        f f 4 e 4 f f 4 4 e f . 
        . f 4 d 4 d d d d f . . 
        . f f f e e d b b f . . 
        . . f 4 d d e 4 e f . . 
        . . f e d d e 1 1 f . . 
        . f f f e e f 6 6 f f . 
        . f f f f f f f f f f . 
        . . f f . . . f f f . . 
        `,img`
        . . . . f f f f f . . . 
        . . f f e e e e e f . . 
        . f f e e e e e e e f . 
        f f f f e e e e e e e f 
        f f f f f e e e 4 e e f 
        f f f f e e e 4 4 e e f 
        f f f f 4 4 4 4 4 e f f 
        f f 4 e 4 f f 4 4 e f f 
        . f 4 d 4 d d d d f f . 
        . f f f 4 d d b b f . . 
        . . f e e 4 4 4 e f . . 
        . . 4 d d e 1 1 1 f . . 
        . . e d d e 1 1 1 f . . 
        . . f e e f 6 6 6 f . . 
        . . . f f f f f f . . . 
        . . . . f f f . . . . . 
        `],
    200,
    true
    )
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`hazard`, function (sprite, location) {
    game.gameOver(false)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile2`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`transparency16`)
    currentLevelId += 1
    game.splash("Level " + (currentLevelId + 1))
    tiles.setCurrentTilemap(levels[currentLevelId])
    levelInit()
})
function splash () {
    game.showLongText("******* STRANDED *******", DialogLayout.Bottom)
}
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    debugPass = game.askForNumber("Enter passcode...")
    if (debugPass == 675423) {
        currentLevelId = game.askForNumber("Go to which level?") - 1
        game.splash("Level " + (currentLevelId + 1))
        tiles.setCurrentTilemap(levels[currentLevelId])
        levelInit()
    }
})
info.onLifeZero(function () {
    game.setGameOverEffect(false, effects.dissolve)
    game.gameOver(false)
})
function levelInit () {
    for (let value32 of sprites.allOfKind(SpriteKind.Player)) {
        sprites.destroy(value32)
    }
    for (let value42 of sprites.allOfKind(SpriteKind.Enemy)) {
        sprites.destroy(value42)
    }
    makePlayer()
    tiles.placeOnRandomTile(protagonist, assets.tile`start`)
    if (currentLevelId == 5) {
        bossInit()
    } else {
        enemyInit()
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprite.bottom < otherSprite.y) {
        sprites.destroy(otherSprite)
        info.changeScoreBy(1)
        if (info.score() % 10 == 0) {
            info.changeLifeBy(1)
        }
    } else {
        lifeDecrease()
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`coin`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`transparency16`)
    music.play(music.melodyPlayable(music.magicWand), music.PlaybackMode.InBackground)
    info.changeScoreBy(1)
    if (info.score() % 10 == 0) {
        info.changeLifeBy(1)
        music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Boss, function (sprite, otherSprite) {
    if (sprite.bottom < otherSprite.y) {
        info.changeScoreBy(1)
        if (info.score() % 10 == 0) {
            info.changeLifeBy(1)
        }
        bossHits += 1
        sprites.destroy(otherSprite)
        bossReset()
        if (bossHits >= 9) {
            sprites.destroy(otherSprite)
            tiles.setTileAt(tiles.getTileLocation(20, 10), assets.tile`myTile0`)
        }
    } else {
        lifeDecrease()
    }
})
let debugPass = 0
let bossEnemy: Sprite = null
let bullet: Sprite = null
let protagonist: Sprite = null
let levels: tiles.TileMapData[] = []
let bossHits = 0
let currentLevelId = 0
currentLevelId = -1
bossHits = 0
levels = [
tilemap`level1`,
tilemap`level5`,
tilemap`level7`,
tilemap`level13`,
tilemap`level8`,
tilemap`level14`
]
info.setLife(3)
scene.setBackgroundColor(12)
scene.setBackgroundImage(assets.image`overworld_bg`)
tiles.setCurrentTilemap(tilemap`level0`)
splash()
levelInit()
