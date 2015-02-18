/*
 * State Class for preloading game assets
 * Created by Zachary Ferguson
 */

"use strict";
 
function PreloadState() {};

PreloadState.prototype = 
{
	/* Load assets */
	preload: function()
	{ 
		var loadingBar = this.add.sprite(400,300,"loading");
        loadingBar.anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(loadingBar);
		  
		/* Load tile map */
		this.game.load.image("tileset", "assets/tileset.png");
		this.game.load.tilemap("world", "assets/world.json", null, 
			Phaser.Tilemap.TILED_JSON);
		
		/* Load images */
		this.game.load.image("sky", "assets/sky.png");
		
		/* Load sprites */
		this.game.load.spritesheet("player", "assets/player.png", 34, 52);
		this.game.load.spritesheet("enemy", "assets/enemy.png", 34, 52);
		this.game.load.spritesheet("meteor", "assets/meteor.png", 32, 32);
		
		/* Load Sounds */

	},
	
	/* Play the intro */
	create: function()
	{
		console.log("Preload");
		this.game.state.start("intro");
	}
};