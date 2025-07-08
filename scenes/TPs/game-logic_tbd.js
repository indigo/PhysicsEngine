// game-logic.js (Version Étudiant)

// ... (imports et début du fichier) ...

// ==========================================
// EXERCICE 2: APPLICATION DE L'IMPULSION
// ==========================================
// TODO: Complétez cette fonction. Elle est appelée quand le joueur a fini de viser.
export function fireCurrentProjectile(angleH, angleV, power, gameContext) {
    if (!state.currentProjectile) return;

    // 1. Calculez le vecteur de direction 3D à partir des angles H et V.
    //    C'est la même logique que pour la visée : partez d'un vecteur (0,0,1),
    //    appliquez la rotation horizontale, puis la rotation verticale.
    const direction = new THREE.Vector3(/* ... */);
    
    // 2. Calculez la magnitude de l'impulsion à partir de la puissance.
    //    Vous pouvez utiliser un simple multiplicateur.
    const impulseStrength = power * 1.0; 

    // 3. Récupérez le corps rigide (body) du projectile actuel depuis son 'userData'.
    const body = state.currentProjectile.userData.physics.body;
    
    // 4. Appliquez l'impulsion au corps rigide en utilisant la méthode appropriée de Rapier.
    //    body.apply...
    
    // Le reste de la fonction (réinitialisation, etc.) est fourni.
    state.currentProjectile = null;
    resetAim();
    setTimeout(() => prepareNextProjectile(gameContext.scene, gameContext.world, gameContext.physicsObjects), 2000);
}


// ==========================================
// EXERCICE 3: VÉRIFICATION DE L'ÉTAT DU JEU
// ==========================================
// TODO: Complétez cette fonction pour déterminer si le jeu est gagné ou perdu.
export function checkGameState(physicsObjects, targetObjects) {
    if(state.currentProjectile) return; // Ne rien faire si on est en train de jouer.

    // 1. Condition de Victoire :
    //    - Comptez le nombre de cibles (`targetObjects`) dont la position 'y' est encore > -1.
    //    - Si ce nombre est 0, le joueur a gagné. Affichez le message de victoire.
    
    // 2. Condition de Défaite (si pas de victoire) :
    //    - Vérifiez d'abord si le joueur n'a plus de projectiles (`state.projectilesLeft <= 0`).
    //    - Si c'est le cas, vérifiez si TOUS les objets dynamiques de la scène sont "endormis" (`isSleeping()`).
    //      (Utilisez la méthode .every() sur `physicsObjects`).
    //    - Si toutes ces conditions sont réunies, le joueur a perdu. Affichez le message de défaite.
}

// ... (Le reste du fichier est fourni aux étudiants) ...