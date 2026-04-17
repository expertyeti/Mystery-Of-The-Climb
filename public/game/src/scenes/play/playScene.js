/**
 * @file playScene.js
 * Main gameplay scene.
 */

class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: "PlayScene" });
    this.alternateModes = null;
  }

  preload() {}

  create() {
    if (window.AlternateModes) {
      this.alternateModes = new window.AlternateModes(this);
      this.alternateModes.inject();
    }
  }

  update() {}

  /**
   * Retrieve alternate modes status.
   * @returns {boolean|null} Status or null if not injected.
   */
  getAlternateModesStatus() {
    return this.alternateModes?.getStatus() ?? null;
  }

  /**
   * Retrieve current world name.
   * @returns {string|null} Name or null if not injected.
   */
  getCurrentWorldName() {
    return this.alternateModes?.getCurrentWorldName() ?? null;
  }

  shutdown() {
    this.alternateModes?.destroy();
  }
}
