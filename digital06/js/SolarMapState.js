/*
 * Created by Zachary Ferguson
 * Game State Class for displaying the Game Over screen and the player's score
 */

"use strict";

function SolarMapState() {};

SolarMapState.prototype = {
    /* Create the tilemap, player, and groups */
    create: function() {
        console.log("Solar Map");

        /* Enable p2 physics */
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.setImpactEvents(true);

        this.game.world.setBounds(0, 0, 800, 600);

        this.game.add.image(0, 0, "stars");

        /* Set up the collision groups */
        this.shipCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.game.physics.p2.updateBoundsCollisionGroup();

        /*******************/
        /* CelestialBodies */
        /*******************/

        /* Create the Solar System */
        this.earth = this.game.add.existing(
            new CelestialBody(this.game, 40, 240, 0, this.shipCollisionGroup)
        );
        this.moon = this.game.add.existing(
            new CelestialBody(this.game, this.earth.x + 30, this.earth.y - 30, 2,
                this.shipCollisionGroup)
        );
        //this.earth.addChild(this.moon);
        this.mars = this.game.add.existing(
            new CelestialBody(this.game, 400, 500, 1, this.shipCollisionGroup)
        );
        this.neptune = this.game.add.existing(
            new CelestialBody(this.game, 700, 80, 3, this.shipCollisionGroup)
        );

        /****************/
        /* SolarMapShip */
        /****************/

        if (this.game.solarX == undefined || this.game.solarY == undefined) {
            this.game.solarX = this.earth.x;
            this.game.solarY = this.earth.y + 35;
        }

        /* Create the ship near earth */
        this.ship = this.game.add.existing(
            new SolarMapShip(this.game, this.game.solarX, this.game.solarY,
                this.shipCollisionGroup)
        );
        this.ship.rotation = Math.PI;

        /* Set-up the collisions with the celestial bodies */
        this.ship.body.collides(this.earth.collisionGroup,
            function() {
                this.explore("explore_earth");
            }, this);
        this.ship.body.collides(this.moon.collisionGroup,
            function() {
                this.explore("explore_moon");
            }, this);
        this.ship.body.collides(this.mars.collisionGroup,
            function() {
                this.explore("explore_mars");
            }, this);
        this.ship.body.collides(this.neptune.collisionGroup,
            function() {
                this.explore("explore_neptune");
            }, this);

        this.ship.rotation = Math.PI;

        /* Enable the arrow keys for controls */
        this.controls = this.game.input.keyboard.createCursorKeys();

        PlayState.prototype.create_hud.call(this);

        this.music = this.game.add.audio("spaceMusic");
        this.music.play("", 0, 1, true);
    },

    /* Update game every frame */
    update: function() {
        PlayState.prototype.controlShip.call(this);

        this.fuelDisplay.text = "Fuel: " + Math.floor((this.ship.fuel));
    },

    /* Sets the initial velocities and goes to the specified state. */
    explore: function(statename) {
        if (this.game.solarX === this.ship.x || this.game.solarY === this.ship.y) {
            return;
        }
        this.game.initialVelocityX = this.ship.body.velocity.x;
        this.game.initialVelocityY = this.ship.body.velocity.Y;
        this.game.solarX = this.ship.x;
        this.game.solarY = this.ship.y;
        this.game.state.start(statename);
    }
};