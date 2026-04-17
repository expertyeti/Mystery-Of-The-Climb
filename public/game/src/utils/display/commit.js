/**
 * @file commit.js
 * Handles GitHub API integration to retrieve the full commit SHA.
 */
window.CommitManager = {
    fullHash: "fetching...",
    
    async fetchLatest() {
        try {
            const response = await fetch('https://api.github.com/repos/expertyeti/Mystery-Of-The-Climb/commits/main');
            if (!response.ok) throw new Error("API Limit or Network Error");
            const data = await response.json();
            this.fullHash = data.sha;
            window.GAME_COMMIT = this.fullHash;
            logger.info("GitHub version updated");
        } catch (e) {
            this.fullHash = "unknown";
            logger.error("Commit fetch failed", e);
        }
    }
};