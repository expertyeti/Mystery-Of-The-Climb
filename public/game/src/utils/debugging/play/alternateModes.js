/**
 * @file alternateModes.js
 * Toggles between Physical and Anomaly worlds in PlayScene.
 */
window.AlternateModes = class AlternateModes {
    static COLORS = { PHYSICAL: 0x1e3a8a, ANOMALY: 0x991b1b };

    constructor(scene) {
        this.scene = scene;
        this.isActive = false;
    }

    inject() {
        if (!this.scene || !this.scene.input || !this.scene.input.keyboard) {
            logger.error("Keyboard input not available for AlternateModes");
            return;
        }

        // Default background
        this.scene.cameras.main.setBackgroundColor(AlternateModes.COLORS.PHYSICAL);

        this.scene.input.keyboard.on('keydown-M', () => {
            this.isActive = !this.isActive;
            const color = this.isActive ? AlternateModes.COLORS.ANOMALY : AlternateModes.COLORS.PHYSICAL;
            const world = this.isActive ? "Anomaly World" : "Physical World";
            
            this.scene.cameras.main.setBackgroundColor(color);
            logger.log(`Toggled to: ${world}`);
        });

        logger.log("M-Key listener injected into PlayScene");
    }
};