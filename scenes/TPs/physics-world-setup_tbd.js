// physics-world-setup.js (Version Étudiant)

import * as THREE from 'three';
import RAPIER from '@dimforge/rapier3d-compat';

// ... (la fonction setupWorld() est fournie car c'est du boilerplate) ...

// ==========================================
// EXERCICE 1: CRÉATION D'UN CORPS PHYSIQUE
// ==========================================
// TODO: Complétez cette fonction. Elle doit prendre un mesh Three.js, des propriétés physiques,
//       le monde Rapier et la liste des objets physiques en arguments.
export function addPhysicsObject(mesh, props, world, physicsObjects) {
    // 1. Créer la description du corps rigide (RigidBodyDesc).
    //    - Doit-il être 'fixed()' ou 'dynamic()' ? (Indice: regardez props.mass).
    //    - Appliquez la position initiale et la rotation du mesh au RigidBodyDesc.
    //    - N'oubliez pas le CCD si c'est demandé (props.ccdEnabled).
    let rigidBodyDesc; // = RAPIER.RigidBodyDesc. ...

    // 2. Créer le corps rigide (RigidBody) à partir de la description.
    let body; // = world.createRigidBody(...);

    // 3. Créer la description du collider (ColliderDesc).
    //    - Utilisez un 'switch' ou des 'if/else' sur le 'mesh.geometry.type' pour choisir
    //      la bonne forme : 'cuboid()', 'ball()', ou 'cylinder()'.
    //    - Les dimensions se trouvent dans 'mesh.geometry.parameters'.
    //      (Attention: Rapier utilise les demi-dimensions pour les boîtes).
    let colliderDesc; // = RAPIER.ColliderDesc. ...

    // 4. Appliquer les propriétés physiques (masse, friction, restitution) au ColliderDesc.
    //    colliderDesc.setMass(...).setFriction(...).setRestitution(...);

    // 5. Créer le collider et l'attacher au corps rigide.
    let collider; // = world.createCollider(colliderDesc, body);

    // 6. Stocker les objets pour la synchronisation et lier le corps au mesh.
    physicsObjects.push({ mesh, body, collider });
    mesh.userData.physics = { body, collider };
}

// ... (clearAllPhysicsObjects est fournie car elle est triviale une fois la première faite) ...