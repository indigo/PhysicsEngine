// game-data.js
import * as THREE from 'three';

export const gameLevels = [
    { projectilePos: new THREE.Vector3(-10, 1, 0), projectiles: 5, structure: [ { type: 'box', size: [2, 0.5, 6], pos: [0, 0.25, 0], rot: [0, 0, 0], material: 'wood' }, { type: 'box', size: [1, 3, 1], pos: [0, 1.75, -2], rot: [0, 0, 0], material: 'wood' }, { type: 'box', size: [1, 3, 1], pos: [0, 1.75, 2], rot: [0, 0, 0], material: 'wood' }, { type: 'box', size: [1, 0.5, 4], pos: [0, 3.5, 0], rot: [0, 0, 0], material: 'wood' }, { type: 'cylinder', size: [0.5, 1], pos: [0, 4.25, 0], rot: [0, 0, 0], material: 'target' } ] },
    { projectilePos: new THREE.Vector3(-15, 1, 0), projectiles: 4, structure: [ { type: 'box', size: [10, 0.5, 10], pos: [0, 0.25, 0], rot: [0, 0, 0], material: 'stone' }, { type: 'box', size: [3, 1, 1], pos: [0, 1, 0], rot: [0, 0, 0], material: 'wood' }, { type: 'box', size: [1, 1, 3], pos: [0, 2, 0], rot: [0, 90, 0], material: 'wood' }, { type: 'box', size: [3, 1, 1], pos: [0, 3, 0], rot: [0, 0, 0], material: 'wood' }, { type: 'sphere', size: [0.7], pos: [-2, 4, 0], rot: [0,0,0], material: 'target' }, { type: 'sphere', size: [0.7], pos: [2, 4, 0], rot: [0,0,0], material: 'target' } ] }
];

export const gameMaterials = {
    wood: { color: 0x8B4513, friction: 0.8, restitution: 0.1, mass: 1 },
    stone: { color: 0x808080, friction: 0.7, restitution: 0.05, mass: 5 },
    target: { color: 0x00FF00, friction: 0.5, restitution: 0.5, mass: 0.5, isTarget: true },
    projectile: { color: 0xFF0000, friction: 0.5, restitution: 0.5, mass: 2 }
};