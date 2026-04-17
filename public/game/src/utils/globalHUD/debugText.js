/**
 * @file debugText.js
 * Renders real-time debug information in the GlobalHUD.
 */
window.GlobalHUD.register((scene) => {
    const isDebug = scene.game.registry.get('debugMode');
    if (!isDebug) return;

    const style = {
        fontFamily: 'monospace', fontSize: '12px', fill: '#FFFFFF',
        backgroundColor: 'rgba(0,0,0,0.7)', padding: { x: 6, y: 6 }
    };

    const debugText = scene.add.text(10, scene.cameras.main.height - 10, "", style);
    debugText.setOrigin(0, 1).setDepth(1000);

    const updateInfo = () => {
        const title = scene.game.config.gameTitle || "Engine";
        const version = scene.game.config.gameVersion || "1.0.0";
        const hash = window.CommitManager ? window.CommitManager.fullHash : "loading...";
        
        debugText.setText([
            `DEBUG: ACTIVE`,
            `GAME: ${title} v${version}`,
            `COMMIT: ${hash}`
        ].join('\n'));
    };

    updateInfo();
    scene.time.addEvent({ delay: 1000, callback: updateInfo, loop: true });
});