

## Rapier.js et les Joints (2h30)

**Objectif :** Comprendre le concept des joints (liaisons) en physique de jeu, se familiariser avec l'API des joints de Rapier.js et implémenter des exemples concrets en 3D avec Three.js, en partant de notre code de démonstration existant.

### Partie 1 : Cours Théorique - Les Joints et Rapier.js (1h)

---

**1. Introduction aux Joints (10 min)**
*   **Pourquoi les joints ?**
    *   Limitations des corps rigides isolés : comment simuler des portes, des roues, des chaînes, des personnages articulés ?
    *   **Concept de contrainte :** Les joints sont des contraintes qui limitent le mouvement relatif entre deux corps rigides, réduisant leurs degrés de liberté.
*   **Rappel sur les Degrés de Liberté (DdF) :**
    *   Un corps rigide libre en 3D a 6 DdF : 3 pour la translation (x, y, z) et 3 pour la rotation (autour de X, Y, Z).
    *   Chaque joint enlève un ou plusieurs DdF pour le mouvement *relatif* entre les deux corps.

**2. Les Joints dans Rapier.js (15 min)**
*   **Introduction à `ImpulseJoint` :**
    *   Rapier utilise principalement des `ImpulseJoint`.
    *   **Structure générale d'un joint :** Relie deux corps (`body1`, `body2`).
    *   **Points clés :** Les **ancres locales (`localAnchor1`, `localAnchor2`)** et les **cadres/axes locaux (`localFrame1`, `localFrame2`, `axis1`, `axis2`)**. Ce sont des positions et des orientations *relatives au centre de masse* (ou au point de référence) de *chaque corps*, et non des coordonnées de monde fixes. C'est crucial pour que le joint suive le corps.
    *   **Création d'un joint :** `RAPIER.JointSet` et `world.createImpulseJoint(jointData, body1, body2, wakeUp)`
        *   Expliquer `wakeUp` : réveille les corps pour que le joint soit actif.
        *   Expliquer le 4ème paramètre `true` pour `createImpulseJoint` : il indique si les colliders attachés aux deux corps du joint *doivent ignorer leurs collisions mutuelles*. Généralement `true` pour éviter des problèmes d'auto-collision.

**3. Types de Joints Courants dans Rapier.js (25 min)**
*(Présenter les concepts et un bref exemple d'utilisation pour chaque)*

*   **1. `FixedJoint (Joint Fixe)` (0 DdF relatifs) :**
    *   **Description :** Bloque complètement le mouvement relatif entre deux corps. Agit comme si les deux corps étaient fusionnés en un seul corps rigide.
    *   **Utilisation :** C'est ce que notre démo actuelle montre ! Nous allons le modifier pour créer un haltère. C'est utile pour assembler des pièces qui ne doivent jamais bouger l'une par rapport à l'autre (ex: une carrosserie de voiture, des murs préfabriqués).
    *   **Propriétés clés :** `localAnchor1`, `localAnchor2`, `localFrame1`, `localFrame2` (ces cadres locaux définissent l'alignement relatif).
    *   **Très Important :** Discuter de l'efficacité ! Pourquoi Rapier préférerait qu'on utilise un seul `RigidBody` avec plusieurs `Collider`s au lieu de plusieurs `RigidBody`s avec un `FixedJoint` si l'objet ne se "cassera" jamais ? (Voir l'explication simplifiée précédente : moins de `RigidBody`s = moins de travail pour le solveur, les joints sont coûteux).

*   **2. `RevoluteJoint (Joint Révolution / Charnière)` (1 DdF de rotation) :**
    *   **Description :** Permet la rotation autour d'un seul axe. Agit comme une charnière ou un pivot. (Pensez à une porte, une roue).
    *   **Utilisation :** Pendules, roues simples, portes, bras articulés. C'est le joint que nous allons implémenter dans le second exercice du TP.
    *   **Propriétés clés :** `localAnchor1`, `localAnchor2` (le point pivot sur chaque corps), `axis1`, `axis2` (l'axe autour duquel la rotation est permise, en coordonnées locales des corps). Ces axes doivent être colinéaires en coordonnées mondiales pour que le joint fonctionne correctement.

*   **3. `PrismaticJoint (Joint Prismatique / Glissière)` (1 DdF de translation) :**
    *   **Description :** Permet la translation le long d'un seul axe. Agit comme une glissière ou un piston.
    *   **Utilisation :** Portes coulissantes, vérins, ascenseurs simples.
    *   **Propriétés clés :** `localAnchor1`, `localAnchor2`, `axis1`, `axis2` (l'axe le long duquel la translation est permise, en coordonnées locales des corps).

*   *(Mention rapide - si le temps le permet - et pour la culture)* : `BallJoint` (rotule, 3 DdF de rotation), `SphericalJoint` (similaire à BallJoint mais avec limites), `GenericJoint` (très flexible pour créer des joints personnalisés).

**4. Débogage des Joints (5 min)**
*   L'importance du `debugRender()` de Rapier pour visualiser les joints : des lignes et des croix pour les ancres et les axes aident énormément à comprendre pourquoi un joint ne se comporte pas comme prévu.
*   Erreurs fréquentes : ancres mal placées, axes mal orientés.

---

### Partie 2 : Travaux Pratiques (TP) - Implémentation de Joints avec Rapier.js et Three.js (1h30)

**Matériel :** Le code du template HTML/JS 3D avec le `FixedJoint` que nous venons de revoir, un éditeur de code, un navigateur.

**Objectifs :**
*   Observer et modifier un `FixedJoint` existant.
*   Mettre en pratique la création d'un `RevoluteJoint`.
*   Apprendre à manipuler les corps et les joints dans votre scène Rapier/Three.js.
*   Utiliser le débogage visuel pour vérifier le comportement des joints.

---

**Préparation et Analyse de la Démo `FixedJoint` Existante (15 min) :**
*   **Lancez la démo :** Demandez aux étudiants d'ouvrir le fichier HTML actuel dans leur navigateur. Observez comment les deux cubes tombent ensemble comme un seul bloc.
*   **Activez le débogage Rapier (`showRapierDebug = true` par défaut ou via le GUI) :** Observez la ligne verte entre les deux cubes. C'est la visualisation de notre `FixedJoint`.
*   **Analyse du code :**
    *   Ouvrez le fichier HTML dans l'éditeur.
    *   Montrez dans `createPhysicsWorld_rapier()` comment `body1` et `body2` sont créés, et où le `FixedJoint` est créé et attaché (`world_rapier.createImpulseJoint`).
    *   Expliquez la signification des `localAnchor1` et `localAnchor2` *actuels* (par exemple, `simParams.boxSize` et `-simParams.boxSize` pour que les faces se touchent) par rapport aux positions initiales (`-separationX / 2` et `separationX / 2`) définies dans `resetPhysicsState()`. Insistez sur le fait que les ancres sont **relatives au centre de leur propre corps**.

**Exercice 1 : Modifier le `FixedJoint` pour créer un "Haltère" (30 min)**

*   **But :** Modifier le code existant pour que les deux cubes soient séparés par un espace, mais toujours connectés rigidement par un point central invisible, formant un haltère.
*   **Consignes :**
    1.  **Dans `createPhysicsWorld_rapier()` :**
        *   Changez les `localAnchor1` et `localAnchor2` pour qu'ils ne soient plus aux bords des cubes, mais à des points qui seront les extrémités d'une "barre" imaginaire. Par exemple, si nous voulons que le joint soit au centre du monde (0,0,0) et que les cubes soient à une distance de ce centre :
            *   `localAnchor1` pour `body1` (qui sera à gauche) pourrait être `{ x: simParams.boxSize * 2, y: 0.0, z: 0.0 }` (pour un point à droite de son centre, à une distance de deux fois sa demi-taille).
            *   `localAnchor2` pour `body2` (qui sera à droite) pourrait être `{ x: -simParams.boxSize * 2, y: 0.0, z: 0.0 }` (pour un point à gauche de son centre).
            *   (Les `localFrame` peuvent rester `{x:0, y:0, z:0, w:1}` pour une orientation fixe).
    2.  **Dans `resetPhysicsState()` :**
        *   Ajustez les `body.setTranslation()` pour `body1` et `body2` afin qu'ils soient positionnés là où vous souhaitez qu'ils apparaissent *autour* du point de jointure.
        *   Si l'ancre du joint est au point (0,0,0) du monde, et que `localAnchor1` est à `(2*boxSize, 0, 0)` par rapport au centre de `body1`, alors `body1` devrait être translaté à `(-2*boxSize, initialY, 0)`. Inversement pour `body2`.
        *   Par exemple :
            ```javascript
            // Positionnement des deux corps pour former un haltère
            const initialY = simParams.boxInitialY;
            const distanceBetweenCenters = simParams.boxSize * 4; // Ex: 4x la demi-taille pour les espacer
            body1.setTranslation({ x: -distanceBetweenCenters / 2, y: initialY, z: 0.0 }, true);
            body2.setTranslation({ x: distanceBetweenCenters / 2, y: initialY, z: 0.0 }, true);
            ```
*   **Vérification :** Lancez la simulation. Les cubes devraient tomber séparés par un espace mais rigidement liés, formant un haltère. Utilisez le débogage pour voir la ligne du joint et comment elle maintient les positions relatives.

**Exercice 2 : Création d'un Pendule Simple avec `RevoluteJoint` (45 min)**

*   **But :** Remplacer le `FixedJoint` et les deux corps dynamiques par un système de pendule simple, où une boîte dynamique est attachée à un point fixe par une charnière (`RevoluteJoint`).
*   **Consignes :**
    1.  **Dans `createPhysicsWorld_rapier()` :**
        *   **Supprimez** tout le code de création de `body1`, `body2`, leurs colliders et le `FixedJoint`.
        *   **Créez un corps statique pour le pivot :**
            ```javascript
            let pivotBodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(0.0, simParams.boxInitialY + 2.0, 0.0); // Au-dessus du sol
            let pivotBody = world_rapier.createRigidBody(pivotBodyDesc);
            let pivotColliderDesc = RAPIER.ColliderDesc.cuboid(0.1, 0.1, 0.1); // Petite boîte pour le pivot
            world_rapier.createCollider(pivotColliderDesc, pivotBody);
            // Stockez-le pour le mesh visuel, par exemple dans un tableau séparé ou en modifiant dynamicBodies_rapier
            // Pour l'exercice, nous allons le gérer séparément pour simplifier la modification de dynamicBodies_rapier.
            ```
        *   **Créez un corps dynamique pour le pendule :**
            ```javascript
            let pendulumBodyDesc = RAPIER.RigidBodyDesc.dynamic();
            let pendulumBody = world_rapier.createRigidBody(pendulumBodyDesc);
            let pendulumColliderDesc = RAPIER.ColliderDesc.cuboid(simParams.boxSize, simParams.boxSize, simParams.boxSize)
                .setRestitution(simParams.boxRestitution)
                .setMass(simParams.boxMass);
            world_rapier.createCollider(pendulumColliderDesc, pendulumBody);
            // Ajoutez ce corps dynamique à dynamicBodies_rapier (en remplaçant les anciens)
            dynamicBodies_rapier = [pendulumBody];
            dynamicColliders_rapier = [pendulumColliderDesc]; // Noter que ce n'est pas l'instance du collider mais sa description
            ```
        *   **Créez le `RevoluteJoint` :**
            ```javascript
            // Ancre sur le corps statique (le point de pivot) : Son centre est (0,0,0) localement.
            let anchorPivot = { x: 0.0, y: 0.0, z: 0.0 };
            // Ancre sur le corps dynamique (le point d'attache sur le pendule) : C'est le 'sommet' de la boîte du pendule.
            let anchorPendulum = { x: 0.0, y: simParams.boxSize, z: 0.0 }; // Si la boîte fait 2*boxSize de haut, son sommet est à +boxSize local.
            // Axe de rotation (local aux corps) : Pour un pendule qui se balance dans le plan XY, l'axe est Z.
            let axis = { x: 0.0, y: 0.0, z: 1.0 }; 
            let revoluteJoint = RAPIER.JointData.revolute(anchorPivot, axis, anchorPendulum, axis);
            // Créez le joint entre le pivot statique et le pendule dynamique. 'true' pour ignorer les collisions entre eux.
            world_rapier.createImpulseJoint(revoluteJoint, pivotBody, pendulumBody, true);
            ```    2.  **Dans `resetPhysicsState()` :**
        *   Ajustez la position initiale de `pendulumBody` pour qu'il soit juste en dessous du `pivotBody` et prêt à pendre.
        *   Par exemple : `pendulumBody.setTranslation({ x: 0.0, y: pivotBody.translation().y - (simParams.boxSize * 2) - 0.1, z: 0.0 }, true);`
        *   Assurez-vous d'appeler `pendulumBody.wakeUp();`
    3.  **Dans `createVisuals_three()` :**
        *   **Supprimez** la création des deux meshes précédentes.
        *   **Créez le mesh visuel pour le pivot** (ex: une petite sphère ou cube, couleur grise).
        *   **Créez le mesh visuel pour le pendule** (votre boîte dynamique, utilisez une couleur vive).
        *   Assurez-vous d'ajouter le mesh du pendule à `dynamicMeshes_three` (`dynamicMeshes_three = [pendulumMesh];`) pour qu'il soit mis à jour dans `animate()`.
        *   Le mesh du pivot ne bougera pas physiquement, donc vous pouvez simplement le positionner une fois.
            ```javascript
            // Exemple pour pivotMesh (ajoutez-le dans createVisuals_three)
            const pivotGeom = new THREE.SphereGeometry(0.1, 16, 8); // Petite sphère pour le pivot
            const pivotMat = new THREE.MeshStandardMaterial({ color: 0x888888 });
            const pivotMesh = new THREE.Mesh(pivotGeom, pivotMat);
            pivotMesh.position.set(0.0, simParams.boxInitialY + 2.0, 0.0); // Positionner au même endroit que pivotBody
            scene.add(pivotMesh);
            ```
    4.  **Lancez la simulation :** Le pendule devrait osciller.
    5.  **Challenge :** Appliquez une petite impulsion (`pendulumBody.applyImpulse()`) au pendule dans `resetPhysicsState()` pour le faire osciller au début.

**Défi/Discussion (10 min) :**
*   **Expérimentation :** Encouragez les étudiants à modifier les `localAnchor` et `axis` du `RevoluteJoint` pour voir l'impact. Qu'arrive-t-il si l'axe n'est pas Z ? Ou si les ancres ne sont pas alignées ?
*   **Le `PrismaticJoint` :** Brève explication et défi de l'implémenter si certains sont en avance ou pour un projet futur.
*   **Debug visuel des joints :** Insistez sur le fait que les lignes de debug de Rapier (`showRapierDebug`) sont *indispensables* pour comprendre pourquoi un joint se comporte étrangement. Elles montrent les ancres et les axes, ce qui aide à corriger les erreurs de placement local.
