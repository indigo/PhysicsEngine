import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

// Function to create a custom arrow (cylinder + cone)
function createCustomArrow(direction, origin, length, color) {
    const cylinderLength = length * 0.8; // 80% of total length for cylinder
    const coneLength = length * 0.1;     // 20% for cone
    const cylinderRadius = 0.03;
    const coneRadius = 0.15;

    // Cylinder
    const cylinderGeometry = new THREE.CylinderGeometry(cylinderRadius, cylinderRadius, cylinderLength, 6);
    const cylinderMaterial = new THREE.MeshBasicMaterial({ color: color });
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

    // Cone (arrowhead)
    const coneGeometry = new THREE.ConeGeometry(coneRadius, coneLength, 18);
    const coneMaterial = new THREE.MeshBasicMaterial({ color: color });
    const cone = new THREE.Mesh(coneGeometry, coneMaterial);

    // Position and orient the cylinder and cone
    cylinder.position.y = cylinderLength / 2;
    cone.position.y = cylinderLength + coneLength / 2;

    // Create a group to hold the cylinder and cone
    const arrow = new THREE.Group();
    arrow.add(cylinder);
    arrow.add(cone);

    // Orient the arrow group to the desired direction
    // Default cylinder/cone is along Y-axis, so we need to rotate
    const up = new THREE.Vector3(0, 1, 0);
    arrow.quaternion.setFromUnitVectors(up, direction.clone().normalize());

    // Position the arrow at the origin
    arrow.position.copy(origin);

    return arrow;
}


// Function to create a text label
function createTextLabel(text, color, position) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = 'Bold 40px Arial';
    context.fillStyle = '#' + new THREE.Color(color).getHexString();
    context.fillText(text, 0, 40);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide
    });
    const geometry = new THREE.PlaneGeometry(canvas.width / 100, canvas.height / 100); // Adjust size as needed
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.copy(position);
    return mesh;
}

// Function to create a mesh label
function meshLabel(text, color, position){
    const loader = new FontLoader();
    loader.load( 'fonts/gentilis_regular.typeface.json', function ( font ) {

        init( font );

    } );
    function addLabel( name, location ) {

        const textGeo = new TextGeometry( name, {

            font: font,

            size: 20,
            depth: 1,
            curveSegments: 1

        } );

        const textMaterial = new THREE.MeshBasicMaterial();
        const textMesh = new THREE.Mesh( textGeo, textMaterial );
        textMesh.position.copy( location );
        return textMesh;
    }
}


// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

// Add a grid helper
const gridHelper = new THREE.GridHelper(20, 20, 0xfff0ff);
scene.add(gridHelper);

// Add an origin marker
const originGeometry = new THREE.SphereGeometry(0.1, 16, 16);
const originMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const origin = new THREE.Mesh(originGeometry, originMaterial);
scene.add(origin);

// Add some initial vectors
const originVec = new THREE.Vector3(0, 0, 0);
const hexA = 0xffff00; // Yellow
const hexB = 0x00ffff; // Cyan

// Vector Addition (A + B)
const vecA = new THREE.Vector3(0, 2, 0); // Use non-normalized for operations
const vecB = new THREE.Vector3(1, 0, 0);
const vecAplusB = new THREE.Vector3().addVectors(vecA, vecB);
const hexAplusB = 0xff00ff; // Magenta

const arrowA = createCustomArrow(vecA.clone().normalize(), originVec, vecAplusB.length(), hexA);
scene.add(arrowA);
const labelA = createTextLabel("AA", hexA, vecA);
scene.add(labelA);

const arrowAplusB = createCustomArrow(vecAplusB.clone().normalize(), originVec, vecAplusB.length(), hexAplusB);
scene.add(arrowAplusB);
const labelAplusB = createTextLabel("A+B", hexAplusB, vecAplusB);
scene.add(labelAplusB);

// Visual aid for A + B (Vector B starting from end of A)
const arrowB_translated = createCustomArrow(vecB.clone().normalize(), vecA, vecB.length(), hexB); // Use hexB for visual consistency
scene.add(arrowB_translated);
const labelB_translated = createTextLabel("B", hexB, vecA.clone().add(vecB));
scene.add(labelB_translated);
// Scalar Multiplication (2 * A)
const scalar1 = 2;
const vecScalar1A = vecA.clone().multiplyScalar(scalar1);
const hexScalar1A = 0xffa500; // Orange

const arrowScalar1A = createCustomArrow(vecScalar1A.clone().normalize(), originVec, vecScalar1A.length(), hexScalar1A);
scene.add(arrowScalar1A);
const labelScalar1A = createTextLabel("2A", hexScalar1A, vecScalar1A);
scene.add(labelScalar1A);


camera.position.z = 5;
camera.position.x = 1;
camera.position.y = 2;


// Animation loop
function animate() {
    requestAnimationFrame(animate);

    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

    renderer.render(scene, camera);
}

animate();

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});