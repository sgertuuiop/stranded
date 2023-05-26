@namespace
class SpriteKind:
    Invincible = SpriteKind.create()
def lifeDecrease():
    info.change_life_by(-1)
    game.splash("OUCH! Lives remaining: " + str(info.life()))
    tiles.place_on_random_tile(protagonist, assets.tile("""
        start
    """))

def on_overlap_tile(sprite, location):
    game.game_over(True)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile0
    """),
    on_overlap_tile)

def on_b_pressed():
    global bullet
    bullet = sprites.create_projectile_from_sprite(assets.image("""
        bullet
    """), protagonist, 250, 0)
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_a_pressed():
    protagonist.vy = -185
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_overlap_tile2(sprite2, location2):
    sprites.destroy(sprite2)
scene.on_overlap_tile(SpriteKind.enemy,
    assets.tile("""
        hazard
    """),
    on_overlap_tile2)

def enemyInit():
    global myEnemy
    for value in tiles.get_tiles_by_type(assets.tile("""
        enemy_spawn
    """)):
        myEnemy = sprites.create(assets.image("""
            enemy
        """), SpriteKind.enemy)
        tiles.place_on_tile(myEnemy, value)
        myEnemy.follow(protagonist, 30)
        myEnemy.ay = 500
    for value2 in tiles.get_tiles_by_type(assets.tile("""
        flyingEnemy
    """)):
        myEnemy = sprites.create(assets.image("""
            flying_enemy
        """), SpriteKind.enemy)
        tiles.place_on_tile(myEnemy, value2)
        myEnemy.follow(protagonist, 30)

def on_left_pressed():
    animation.run_image_animation(protagonist,
        [img("""
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
            """),
            img("""
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
            """),
            img("""
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
            """)],
        200,
        True)
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_right_released():
    animation.stop_animation(animation.AnimationTypes.ALL, protagonist)
controller.right.on_event(ControllerButtonEvent.RELEASED, on_right_released)

def on_left_released():
    animation.stop_animation(animation.AnimationTypes.ALL, protagonist)
controller.left.on_event(ControllerButtonEvent.RELEASED, on_left_released)

def on_overlap_tile3(sprite3, location3):
    tiles.set_tile_at(location3, sprites.dungeon.chest_open)
    music.play(music.melody_playable(music.power_up),
        music.PlaybackMode.IN_BACKGROUND)
    info.change_life_by(1)
scene.on_overlap_tile(SpriteKind.player,
    sprites.dungeon.chest_closed,
    on_overlap_tile3)

def makePlayer():
    global protagonist
    protagonist = sprites.create(assets.image("""
        player
    """), SpriteKind.player)
    controller.move_sprite(protagonist, 100, 0)
    protagonist.ay = 500
    scene.camera_follow_sprite(protagonist)
    return protagonist

def on_right_pressed():
    animation.run_image_animation(protagonist,
        [img("""
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
            """),
            img("""
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
            """),
            img("""
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
            """)],
        200,
        True)
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def on_overlap_tile4(sprite4, location4):
    game.game_over(False)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        hazard
    """),
    on_overlap_tile4)

def on_overlap_tile5(sprite5, location5):
    global currentLevelId
    tiles.set_tile_at(location5, assets.tile("""
        transparency16
    """))
    currentLevelId += 1
    game.splash("Level " + str(currentLevelId))
    if currentLevelId == 1:
        tiles.set_current_tilemap(tilemap("""
            level1
        """))
    elif currentLevelId == 2:
        tiles.set_current_tilemap(tilemap("""
            level5
        """))
    elif currentLevelId == 3:
        tiles.set_current_tilemap(tilemap("""
            level7
        """))
    elif currentLevelId == 4:
        pass
    else:
        game.show_long_text("Level " + str(currentLevelId) + " is undefined.",
            DialogLayout.CENTER)
        tiles.set_current_tilemap(tilemap("""
            level_error
        """))
    levelInit()
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile2
    """),
    on_overlap_tile5)

def on_life_zero():
    game.set_game_over_effect(False, effects.dissolve)
    game.game_over(False)
info.on_life_zero(on_life_zero)

def levelInit():
    for value3 in sprites.all_of_kind(SpriteKind.player):
        sprites.destroy(value3)
    for value4 in sprites.all_of_kind(SpriteKind.enemy):
        sprites.destroy(value4)
    makePlayer()
    tiles.place_on_random_tile(protagonist, assets.tile("""
        start
    """))
    enemyInit()

def on_on_overlap(sprite6, otherSprite):
    sprites.destroy(otherSprite)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap)

def on_on_overlap2(sprite7, otherSprite2):
    if sprite7.bottom < otherSprite2.y:
        sprites.destroy(otherSprite2)
        info.change_score_by(1)
        if info.score() % 10 == 0:
            info.change_life_by(1)
    else:
        lifeDecrease()
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap2)

def on_overlap_tile6(sprite8, location6):
    tiles.set_tile_at(location6, assets.tile("""
        transparency16
    """))
    music.play(music.melody_playable(music.magic_wand),
        music.PlaybackMode.IN_BACKGROUND)
    info.change_score_by(1)
    if info.score() % 10 == 0:
        info.change_life_by(1)
        music.play(music.melody_playable(music.power_up),
            music.PlaybackMode.IN_BACKGROUND)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        coin
    """),
    on_overlap_tile6)

myEnemy: Sprite = None
bullet: Sprite = None
protagonist: Sprite = None
currentLevelId = 0
currentLevelId = 0
info.set_life(3)
scene.set_background_color(12)
scene.set_background_image(assets.image("""
    overworld_bg
"""))
tiles.set_current_tilemap(tilemap("""
    level0
"""))
levelInit()