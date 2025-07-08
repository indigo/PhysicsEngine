// ui-manager.js
import { GUI } from 'lil-gui';

let statusEl, powerBarContainer, powerBarFill;

export function initUI() {
    statusEl = document.getElementById('status');
    powerBarContainer = document.getElementById('power-bar-container');
    powerBarFill = document.getElementById('power-bar-fill');
    
    // --- CONSOLE LOG DE DÉBOGAGE ---
    if (powerBarContainer) {
        console.log("UI Manager: Power bar container found successfully.");
    } else {
        console.error("UI Manager: ERROR! Power bar container NOT found.");
    }
}

export function setupDebugGUI(settings) {
    const gui = new GUI();
    gui.add(settings, 'hSpeed', 0.5, 5.0).name('Horizontal Speed');
    gui.add(settings, 'vSpeed', 0.5, 5.0).name('Vertical Speed');
    gui.add(settings, 'powerSpeed', 10, 100).name('Power Speed');
    gui.add(settings, 'maxAngleV', 10, 80).name('Max Vertical Angle');
    gui.add(settings, 'maxPower', 50, 200).name('Max Power');
}

export function updateStatusUI(text) {
    if (statusEl) statusEl.innerText = text;
}

export function showPowerBar(visible) {
    // --- CONSOLE LOG DE DÉBOGAGE ---
    console.log(`Attempting to set power bar visibility to: ${visible}`);
    if (powerBarContainer) {
        powerBarContainer.style.display = visible ? 'block' : 'none';
    } else {
        console.error("Cannot show/hide power bar because container is null!");
    }
}

export function updatePowerBarUI(power, maxPower) {
    if (powerBarFill) {
        const percentage = (power / maxPower) * 100;
        powerBarFill.style.width = `${percentage}%`;
    }
}