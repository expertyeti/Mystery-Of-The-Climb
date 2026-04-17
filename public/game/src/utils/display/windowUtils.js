/**
 * @file windowUtils.js
 * Standard window resolution utilities.
 */
function calculatePanoramicWidth() {
    const gameHeight = 720;
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const windowRatio = window.innerWidth / window.innerHeight;
    const baseRatio = 16 / 9;

    if (windowRatio > baseRatio) {
        if (isMobile) return Math.ceil(gameHeight * windowRatio);
        const clampedRatio = Math.min(windowRatio, 20 / 9);
        return Math.ceil(gameHeight * clampedRatio);
    }
    return 1280;
}