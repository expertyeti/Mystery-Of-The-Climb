/**
 * @file preloadScripts.js
 * Sequential script injector.
 */
async function loadScript(src) {
    return new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = src;
        s.async = false;
        s.onload = resolve;
        s.onerror = () => reject(new Error(`Failed: ${src}`));
        document.head.appendChild(s);
    });
}

(async function init() {
    const base = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, "/");
    const jsonUrl = base + "src/core/preload.scripts.jsonc";
    
    try {
        const res = await fetch(jsonUrl);
        const text = await res.text();
        // Simple JSONC cleaning
        const scripts = JSON.parse(text.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, ''));
        
        for (const path of scripts) {
            await loadScript(base + path);
        }
        console.log("[Engine] All scripts loaded successfully");
    } catch (e) {
        console.error("[Engine] Boot error:", e);
    }
})();