/**
 * Theme Customizer
 * A reusable component to allow real-time color customization for portfolio templates.
 */

class ThemeCustomizer {
    constructor(config = {}) {
        this.colors = config.colors || [
            { name: 'Primary', var: '--primary' },
            { name: 'Accent', var: '--accent' },
            { name: 'Secondary', var: '--secondary' },
            { name: 'Background', var: '--bg' }
        ];
        this.panelTitle = config.panelTitle || 'Customize Colors';
        this.init();
    }

    init() {
        this.createPanel();
        this.setupStyleTag();
        this.bindEvents();
        this.updateInputsFromDOM();
    }

    createPanel() {
        // Only create if it doesn't exist
        if (document.getElementById('customizerPanel')) return;

        const panelHtml = `
            <div id="customizerPanel" class="customizer-panel">
                <div class="customizer-header">
                    <h3>${this.panelTitle}</h3>
                    <button id="closeCustomizer" type="button"><i class="fas fa-times"></i></button>
                </div>
                <div class="customizer-body">
                    ${this.colors.map(color => `
                        <div class="color-item">
                            <label>${color.name}</label>
                            <div class="color-input-wrapper">
                                <input type="color" data-var="${color.var}">
                            </div>
                        </div>
                    `).join('')}
                    <button id="resetColors" class="reset-colors" type="button">Reset Defaults</button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', panelHtml);

        this.panel = document.getElementById('customizerPanel');
        this.closeBtn = document.getElementById('closeCustomizer');
        this.resetBtn = document.getElementById('resetColors');
        this.colorInputs = this.panel.querySelectorAll('input[type="color"]');
    }

    setupStyleTag() {
        this.styleTag = document.getElementById('dynamic-theme-overrides');
        if (!this.styleTag) {
            this.styleTag = document.createElement('style');
            this.styleTag.id = 'dynamic-theme-overrides';
            document.head.appendChild(this.styleTag);
        }
    }

    bindEvents() {
        // Toggle Panel - Support multiple toggles if they exist
        const toggleBtns = document.querySelectorAll('.customizer-toggle');
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.updateInputsFromDOM();
                this.panel.classList.toggle('active');
            });
        });

        // Close Panel
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => {
                this.panel.classList.remove('active');
            });
        }

        // Color Inputs
        this.colorInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const varName = e.target.getAttribute('data-var');
                const value = e.target.value;
                document.body.style.setProperty(varName, value);
                this.updateStyleTag();
            });
        });

        // Reset Colors
        if (this.resetBtn) {
            this.resetBtn.addEventListener('click', () => {
                document.body.style = '';
                this.styleTag.textContent = '';
                this.updateInputsFromDOM();
            });
        }
    }

    updateInputsFromDOM() {
        const styles = getComputedStyle(document.body);
        this.colorInputs.forEach(input => {
            const varName = input.getAttribute('data-var');
            const color = styles.getPropertyValue(varName).trim();

            if (color.startsWith('#')) {
                input.value = color;
            } else if (color.startsWith('rgb')) {
                const hex = this.rgbToHex(color);
                if (hex) input.value = hex;
            }
        });
    }

    rgbToHex(rgbStr) {
        const rgb = rgbStr.match(/\d+/g);
        if (rgb && rgb.length >= 3) {
            return "#" + ((1 << 24) + (parseInt(rgb[0]) << 16) + (parseInt(rgb[1]) << 8) + parseInt(rgb[2])).toString(16).slice(1);
        }
        return null;
    }

    updateStyleTag() {
        let css = ':root { \n';
        this.colorInputs.forEach(input => {
            const varName = input.getAttribute('data-var');
            css += `    ${varName}: ${input.value} !important;\n`;
        });
        css += '}\n';

        if (document.body.classList.contains('dark-mode')) {
            css += `body.dark-mode { \n`;
            this.colorInputs.forEach(input => {
                const varName = input.getAttribute('data-var');
                css += `    ${varName}: ${input.value} !important;\n`;
            });
            css += '}\n';
        }

        this.styleTag.textContent = css;
    }
}

// Global initialization function
window.initThemeCustomizer = function (config) {
    return new ThemeCustomizer(config);
};
