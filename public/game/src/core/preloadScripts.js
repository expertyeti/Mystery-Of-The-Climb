/**
 * @file preloadScripts.js (Client-Side Dynamic Loader)
 * Lee preload.scripts.json mediante fetch y carga los scripts dinámicamente en el navegador.
 * Arquitectura sin-compilación (No-Build).
 */

(async function initGenesisEngine() {
    // Asegurar el BASE_URL para Neutralino / React Native
    if (!window.BASE_URL) {
        window.BASE_URL = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, "/");
    }

    const jsonUrl = window.BASE_URL + "src/core/preload.scripts.json";

    try {
        // Descargar el JSON directamente desde el navegador
        const response = await fetch(jsonUrl);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        
        const scripts = await response.json();
        console.log(`%cInyectando ${scripts.length} módulos...`, "color: #00ff00; font-weight: bold;");

        let loadedCounter = 0;
        const totalScripts = scripts.length;

        // Inyectar los scripts dinámicamente
        for (let i = 0; i < totalScripts; i++) {
            const scriptEl = document.createElement("script");
            
            // Combinar BASE_URL con la ruta relativa del JSON
            scriptEl.src = window.BASE_URL + scripts[i];
            
            // Permite descargar en paralelo pero ejecuta secuencialmente
            scriptEl.async = false; 

            scriptEl.onload = () => {
                loadedCounter++;
                if (loadedCounter === totalScripts) {
                    console.log("%cTodos los módulos cargados! Motor listo.", "color: #00ff00; font-weight: bold;");
                }
            };

            scriptEl.onerror = () => {
                console.log(`%cError crítico al cargar: ${scripts[i]}`, "color: #ff4444; font-weight: bold;");
            };

            document.head.appendChild(scriptEl);
        }

    } catch (error) {
        console.log("%cFallo al inicializar el motor:", "color: #ff4444; font-weight: bold;", error);
    }
})();