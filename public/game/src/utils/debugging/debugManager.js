/**
 * @file debugManager.js
 * Centralized debugging system manager.
 */

class DebugManager {
    constructor() {
        this.debugEnabled = false;
        this.isInitialized = false;
        this.scene = null;
        this.statusLogged = false;
        this.keybindAdded = false;
    }

    /**
     * Initializes the Debug Manager.
     * @param {Phaser.Scene} scene - Phaser scene instance.
     */
    init(scene) {
        if (this.isInitialized) return;

        this.debugEnabled = scene.game.registry.get('debugMode') || false;
        this.scene = scene;
        this.isInitialized = true;

        if (!this.statusLogged) {
            logger.log(`Debug Mode: ${this.debugEnabled ? 'ON' : 'OFF'}`);
            this.statusLogged = true;
        }

        if (this.debugEnabled) this.setupDebugger();
    }

    /**
     * Enables the debugging system.
     */
    enableDebug() {
        if (this.debugEnabled) return;
        this.debugEnabled = true;
        this.scene?.game.registry.set('debugMode', true);
        logger.log("Debug Enabled");
        this.setupDebugger();
    }

    /**
     * Disables the debugging system.
     */
    disableDebug() {
        if (!this.debugEnabled) return;
        this.debugEnabled = false;
        this.scene?.game.registry.set('debugMode', false);
        logger.log("Debug Disabled");
    }

    /**
     * Returns current debug state.
     * @returns {boolean} True if enabled.
     */
    isDebugEnabled() {
        return this.debugEnabled;
    }

    /**
     * Configures debugging utilities.
     */
    setupDebugger() {
        if (!this.scene || this.keybindAdded) return;

        this.scene.input.keyboard?.addKey('CTRL_D').on('down', () => {
            this.debugEnabled ? this.disableDebug() : this.enableDebug();
        });
        
        this.keybindAdded = true;
    }
}

if (!window.debugManager) window.debugManager = new DebugManager();