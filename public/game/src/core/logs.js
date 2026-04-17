/**
 * @file logs.js
 * Centralized logging with forced dark backgrounds and white text.
 */
if (!window.Logger) {
    window.Logger = class Logger {
        constructor() {
            this.fileColors = new Map();
        }

        /**
         * Generates a dark hex color based on string hash.
         */
        stringToColor(str) {
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                hash = str.charCodeAt(i) + ((hash << 5) - hash);
            }
            let color = '#';
            for (let i = 0; i < 3; i++) {
                const value = Math.abs((hash >> (i * 8)) % 100) + 20;
                color += value.toString(16).padStart(2, '0');
            }
            return color;
        }

        getCallerFile() {
            try {
                const stack = new Error().stack;
                const lines = stack.split('\n');
                for (let line of lines) {
                    if (!line.includes('logs.js') && line.includes('.js')) {
                        const match = line.match(/\/([^/:]+)\.js/);
                        if (match) return match[1];
                    }
                }
            } catch (e) {}
            return 'system';
        }

        print(type, message, data = null) {
            const filename = this.getCallerFile();
            if (!this.fileColors.has(filename)) {
                this.fileColors.set(filename, this.stringToColor(filename));
            }
            const bgColor = this.fileColors.get(filename);
            const label = `[${filename}]${type === 'log' ? '' : ' ' + type.toUpperCase()}`;
            const style = `background: ${bgColor}; color: #FFFFFF; padding: 2px 5px; border-radius: 2px; font-weight: bold;`;
            data ? console[type](`%c${label}%c ${message}`, style, '', data) : console[type](`%c${label}%c ${message}`, style, '');
        }

        log(msg, data) { this.print('log', msg, data); }
        error(msg, err) { this.print('error', msg, err); }
        warn(msg, data) { this.print('warn', msg, data); }
        info(msg, data) { this.print('info', msg, data); }
    };
    window.logger = new window.Logger();
}