/**
 * @file game.js
 * Game initialization and scene injection.
 */
const config = {
    type: Phaser.AUTO,
    parent: "game-container",
    width: calculatePanoramicWidth(),
    height: 720,
    gameTitle: "Mystery Of The Climb",
    gameVersion: "1.0.0",
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    callbacks: {
        preBoot: (game) => {
            game.registry.set("debugMode", true);
        }
    },
    // Only includes the primary scenes, HUD is added dynamically
    scene: [PlayScene]
};

// Start the engine
window.game = new Phaser.Game(config);

// Inject GlobalHud dynamically as requested
window.game.scene.add('GlobalHud', window.GlobalHudClass, true);

// Start versioning task
if (window.CommitManager) window.CommitManager.fetchLatest();