/**
 * @file globalHud.js
 * Persistent overlay scene with global registration system.
 */
window.GlobalHUD = {
    modules: [],
    instance: null,
    register: function(initFn) {
        this.modules.push(initFn);
        if (this.instance && this.instance.scene.isActive()) {
            initFn(this.instance);
        }
    }
};

window.GlobalHudClass = class GlobalHud extends Phaser.Scene {
    constructor() {
        super({ key: 'GlobalHud' });
    }

    create() {
        window.GlobalHUD.instance = this;
        this.scene.bringToTop();
        logger.log("Global HUD Scene created");
        window.GlobalHUD.modules.forEach(fn => fn(this));
    }
};