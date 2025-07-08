// player-controls.js
import * as THREE from 'three';
import { showPowerBar, updatePowerBarUI } from './ui-manager.js';

export const AimState = { IDLE: 0, AIMING_H: 1, AIMING_V: 2, POWERING: 3 };

const state = {
    currentAimState: AimState.IDLE,
    aimHelper: null,
    aimAngleH: 0,
    aimAngleV: 0,
    aimPower: 0,
};

let onFireCallback = () => {}; 

export function initPlayerControls(scene, renderer, fireCallback) {
    state.aimHelper = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 5, 0xff0000, 1, 0.5);
    state.aimHelper.visible = false;
    scene.add(state.aimHelper);
    onFireCallback = fireCallback;
    renderer.domElement.addEventListener('pointerdown', handlePointerDown);
}

function handlePointerDown() {
    switch (state.currentAimState) {
        case AimState.IDLE: state.currentAimState = AimState.AIMING_H; state.aimHelper.visible = true; break;
        case AimState.AIMING_H: state.currentAimState = AimState.AIMING_V; state.aimHelper.setColor(0xffff00); break;
        case AimState.AIMING_V: state.currentAimState = AimState.POWERING; state.aimHelper.setColor(0x00ff00); showPowerBar(true); break;
        case AimState.POWERING: onFireCallback(state.aimAngleH, state.aimAngleV, state.aimPower); break;
    }
}

export function updateAiming(deltaTime, clock, currentProjectile, settings) {
    if (state.currentAimState === AimState.IDLE || !currentProjectile) return;
    state.aimHelper.position.copy(currentProjectile.position);
    let direction = new THREE.Vector3();
    switch (state.currentAimState) {
        case AimState.AIMING_H:
            state.aimAngleH += settings.hSpeed * deltaTime;
            direction.set(Math.sin(state.aimAngleH), 0, Math.cos(state.aimAngleH));
            state.aimHelper.setDirection(direction);
            break;
        case AimState.AIMING_V:
            const oscillation = (Math.sin(clock.getElapsedTime() * settings.vSpeed) + 1) / 2; // Oscille entre 0 et 1
            state.aimAngleV = oscillation * settings.maxAngleV; // Mappe à [0, maxAngleV]
            
            direction.set(Math.sin(state.aimAngleH), 0, Math.cos(state.aimAngleH));
            const rotationAxisV = new THREE.Vector3().crossVectors(direction, new THREE.Vector3(0,1,0)).normalize();
            direction.applyAxisAngle(rotationAxisV, THREE.MathUtils.degToRad(state.aimAngleV));
            state.aimHelper.setDirection(direction);
            break;
        case AimState.POWERING:
            state.aimPower = (Math.sin(clock.getElapsedTime() * settings.powerSpeed * 0.1) + 1) / 2 * settings.maxPower;
            updatePowerBarUI(state.aimPower, settings.maxPower);
            break;
    }
}

export function resetAim() {
    state.currentAimState = AimState.IDLE;
    if (state.aimHelper) {
        state.aimHelper.visible = false;
        state.aimHelper.setColor(0xff0000);
    }
    showPowerBar(false);
    updatePowerBarUI(0, 1);
    state.aimAngleH = 0; state.aimAngleV = 0; state.aimPower = 0;
}