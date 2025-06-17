
---

**Session 6 : Introduction Pratique à Rapier.js**

**Bloc 3 : Premiers Pas avec le Moteur Physique Rapier.js (1h30)**

**Objectif Pédagogique :** Se familiariser avec les concepts fondamentaux et le workflow de base pour mettre en place une simulation physique simple avec Rapier.js, en manipulant des corps rigides, leurs propriétés, et en observant leur interaction, le tout en s'appuyant sur l'exemple de la "boîte tombante" que nous allons analyser.

**(10 minutes) Introduction : De la Physique Manuelle à la Puissance d'un Moteur Dédié**

*   **Rappel des Limites de l'Implémentation Manuelle (Bloc 2) :**
    *   Complexité croissante avec le nombre d'objets et d'interactions.
    *   Défis de performance et de stabilité (tunneling, erreurs d'intégration).
*   **Présentation de Rapier.js comme Solution :**
    *   "Nous allons maintenant explorer comment un moteur physique comme Rapier.js simplifie radicalement ces tâches en nous fournissant une 'boîte à outils' physique prête à l'emploi."
    *   "Nous allons décortiquer un exemple concret : une boîte qui tombe et interagit avec un sol."
*   **Objectifs Spécifiques de ce Bloc (en lien avec notre exemple) :**
    1.  Comprendre comment Rapier.js est initialisé et comment un "monde" physique est créé.
    2.  Voir comment on définit un sol statique et une boîte dynamique avec leurs formes et propriétés.
    3.  Analyser la boucle de simulation : comment Rapier fait avancer la physique et comment on synchronise cela avec notre affichage Three.js.
    4.  Expérimenter avec les paramètres pour observer leur impact.

---

**1. Configuration de Base d'une Scène Physique avec Rapier.js (35 minutes) - Analyse de Notre Exemple**

*   **A. Initialisation du Monde Rapier (10 minutes) :**
    *   **Analyse du Code (dans `init()`) :**
        ```javascript
        const rapierModule = await import('https://cdn.skypack.dev/@dimforge/rapier2d-compat');
        RAPIER = rapierModule.default;
        await RAPIER.init();
        console.log("Rapier.js chargé et initialisé.");
        ```
        *   **Explication :** "La première étape cruciale est d'importer la bibliothèque Rapier.js. L'appel `RAPIER.init()` est essentiel car il charge et prépare le moteur WebAssembly sous-jacent. Nous attendons (`await`) que cela soit fait avant de continuer."
    *   **Analyse du Code (dans `createPhysicsWorld_rapier()`) :**
        ```javascript
        let gravity = { x: 0.0, y: simParams.gravityY };
        world_rapier = new RAPIER.World(gravity);
        ```
        *   **Explication :** "Une fois Rapier initialisé, nous créons un `RAPIER.World`. C'est notre 'univers' physique. On lui spécifie la gravité (ici, un vecteur pointant vers le bas avec l'intensité de `simParams.gravityY`). Tous nos objets physiques vivront dans ce `world`."
    *   **Concepts Clés :** `RAPIER.init()`, `RAPIER.World`, définition de la gravité.

*   **B. Création d'un Environnement Statique : Le Sol (10 minutes) :**
    *   **Analyse du Code (dans `createPhysicsWorld_rapier()`) :**
        ```javascript
        let groundColliderDesc = RAPIER.ColliderDesc.cuboid(simParams.groundSizeX / 2, 0.1)
            .setTranslation(0.0, simParams.groundY - 0.1)
            .setRestitution(simParams.groundRestitution);
        groundCollider_rapier = world_rapier.createCollider(groundColliderDesc);
        ```
    *   **Explication :**
        *   "Pour notre sol, nous utilisons un `RAPIER.ColliderDesc`. C'est un 'plan' ou une 'description' de la forme et des propriétés physiques du sol."
        *   `.cuboid(demiLargeur, demiHauteur)` : Définit une forme rectangulaire (en 2D). `simParams.groundSizeX / 2` et `0.1` sont les demi-extensions.
        *   `.setTranslation(x, y)` : Positionne le *centre* de ce collider.
        *   `.setRestitution(valeur)` : Définit 'l'élasticité' du sol lors d'un contact, en utilisant `simParams.groundRestitution`.
        *   `world_rapier.createCollider(groundColliderDesc)` : "Cette ligne ajoute effectivement le collider au monde physique. Comme nous ne l'attachons pas à un `RigidBody` spécifique, Rapier le considère comme **statique** (il ne bougera pas)."
    *   **Paramètres de Matériaux :** "Notez que la restitution (et plus tard le frottement, si ajouté) sont des propriétés du *collider*."
    *   **Lien avec Three.js (dans `createVisuals_three()`) :**
        ```javascript
        const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x8899aa, metalness:0.2, roughness:0.8 });
        const floorGeometry = new THREE.PlaneGeometry(simParams.groundSizeX, simParams.groundSizeZ);
        groundMesh_three = new THREE.Mesh(floorGeometry, floorMaterial);
        groundMesh_three.rotation.x = -Math.PI / 2;
        groundMesh_three.position.y = simParams.groundY;
        ```
        *   "En parallèle, nous créons un `THREE.Mesh` pour *voir* ce sol. Sa position dans Three.js doit correspondre à celle définie dans Rapier."

*   **C. Création d'un Objet Dynamique : Notre Boîte (15 minutes) :**
    *   **Analyse du Code (dans `createPhysicsWorld_rapier()`) :**
        ```javascript
        let rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic();
        dynamicBoxBody_rapier = world_rapier.createRigidBody(rigidBodyDesc);

        let colliderDesc = RAPIER.ColliderDesc.cuboid(simParams.boxSize, simParams.boxSize)
            .setRestitution(simParams.boxRestitution)
            .setMass(simParams.boxMass);
        dynamicBoxCollider_rapier = world_rapier.createCollider(colliderDesc, dynamicBoxBody_rapier);
        ```
    *   **Explication :**
        *   "Pour notre boîte qui doit tomber et bouger, nous avons besoin de deux choses dans Rapier :"
            1.  `let rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic();` : "Ceci décrit un 'corps rigide' qui peut bouger, tourner, et être affecté par les forces. La position initiale sera définie plus tard dans `resetPhysicsState`."
            2.  `dynamicBoxBody_rapier = world_rapier.createRigidBody(rigidBodyDesc);` : "On ajoute ce corps dynamique au monde."
            3.  `let colliderDesc = RAPIER.ColliderDesc.cuboid(simParams.boxSize, simParams.boxSize)` : "Il définit la forme (un carré de demi-côté `simParams.boxSize`) et les propriétés matérielles."
            4.  `.setRestitution(simParams.boxRestitution)` et `.setMass(simParams.boxMass)` : "On règle son élasticité et sa masse."
            5.  `dynamicBoxCollider_rapier = world_rapier.createCollider(colliderDesc, dynamicBoxBody_rapier);` : "Crucialement, ce collider est **attaché** au `dynamicBoxBody_rapier`. C'est ce qui lie la forme physique au corps mobile."
    *   **Propriétés des Corps et Colliders :**
        *   `RigidBodyDesc` : Type (dynamique). Position/vitesse initiales sont gérées dans `resetPhysicsState`.
        *   `ColliderDesc` : Forme, masse, restitution.
    *   **Lien avec Three.js (dans `createVisuals_three()` et `animate()`) :**
        ```javascript
        const boxGeom = new THREE.BoxGeometry(simParams.boxSize * 2, simParams.boxSize * 2, simParams.boxSize * 2);
        const boxMat = new THREE.MeshStandardMaterial({ color: 0xff8844, metalness:0.4, roughness:0.6 });
        dynamicBoxMesh_three = new THREE.Mesh(boxGeom, boxMat);
        // ... plus tard dans animate() ...
        dynamicBoxMesh_three.position.set(position_rapier.x, position_rapier.y, 0);
        dynamicBoxMesh_three.rotation.z = rotation_rapier;
        ```
        *   "De même, un `THREE.Mesh` est créé pour la boîte. Sa position et sa rotation seront continuellement mises à jour."

---

**2. Prise en Main : Expérimentation et Interaction avec la Simulation Rapier (70 minutes)**

*   **A. La Boucle de Simulation et la Synchronisation avec Three.js (15 minutes)**
    *   **Analyse du Code (dans `animate()`) :**
        ```javascript
        if (world_rapier && dynamicBoxBody_rapier && dynamicBoxMesh_three) {
            world_rapier.step();

            let position_rapier = dynamicBoxBody_rapier.translation();
            let rotation_rapier = dynamicBoxBody_rapier.rotation();

            dynamicBoxMesh_three.position.set(position_rapier.x, position_rapier.y, 0);
            dynamicBoxMesh_three.rotation.z = rotation_rapier;
        }
        ```
    *   **Explication du Flux :**
        1.  **`world_rapier.step();` : C'est le moteur de la physique.** "À chaque appel, Rapier :
            *   Applique les forces (comme la gravité).
            *   Détecte toutes les collisions.
            *   Résout les contacts (calcule les impulsions, gère la pénétration, applique le frottement et la restitution).
            *   Intègre les équations du mouvement pour mettre à jour les positions et vitesses de tous les corps dynamiques."
        2.  **Récupération des Données :** "Après le `step()`, l'état des objets physiques a changé. On récupère la nouvelle position (`.translation()`) et rotation (`.rotation()`) de notre `dynamicBoxBody_rapier`."
        3.  **Mise à Jour du Visuel :** "Ces nouvelles coordonnées physiques sont utilisées pour mettre à jour la `position` et la `rotation` de notre `dynamicBoxMesh_three`. C'est ce qui fait bouger le cube à l'écran !"
    *   **Exécution de l'Exemple de Base :** Lancer la simulation. "Vous devriez voir le cube tomber et rebondir sur le sol. Tout cela est géré par ce simple `world_rapier.step()` !"

*   **B. Expérimenter avec les Paramètres (via Dat.GUI) (25 minutes)**
    *   **Présentation du Dat.GUI :** "Le panneau de contrôle nous permet de modifier les `simParams` en direct et de réinitialiser la simulation pour voir les effets."
    *   **Analyse du Code (dans `resetPhysicsState()`) :**
        ```javascript
        dynamicBoxBody_rapier.setTranslation({ x: 0.0, y: simParams.boxInitialY }, true);
        dynamicBoxBody_rapier.setLinvel({ x: 0.0, y: 0.0 }, true);
        dynamicBoxBody_rapier.setAngvel(0.0, true);
        dynamicBoxBody_rapier.wakeUp();

        if (dynamicBoxCollider_rapier) {
            dynamicBoxCollider_rapier.setRestitution(simParams.boxRestitution);
            dynamicBoxCollider_rapier.setMass(simParams.boxMass);
        }
        if (groundCollider_rapier) {
            groundCollider_rapier.setRestitution(simParams.groundRestitution);
        }
        world_rapier.gravity.y = simParams.gravityY;
        ```
        *   **Explication :** "Quand on modifie un paramètre dans Dat.GUI et que `resetSimulation()` est appelé, cette fonction `resetPhysicsState()` remet la boîte à sa position initiale et applique les nouvelles valeurs de masse, restitution et gravité au monde physique Rapier."
    *   **Expériences Guidées (Les étudiants modifient les valeurs et observent) :**
        1.  **`simParams.gravityY` :**
            *   Mettre une valeur plus faible (ex: -2.0), puis plus forte (ex: -20.0).
            *   **Observation & Discussion :** "Comment la 'lourdeur' apparente et la vitesse de chute changent-elles ? La gravité est la force motrice principale ici."
        2.  **`simParams.boxMass` :**
            *   Modifier la masse (ex: 0.2, puis 5.0).
            *   **Observation & Discussion :** "La masse affecte-t-elle la *vitesse de chute libre* ? (Non, $a=g$). Dans quelles situations la masse deviendrait-elle plus évidente ?" (Lors de collisions avec d'autres objets dynamiques, ou si on appliquait une force finie pour la pousser).
        3.  **`simParams.boxRestitution` et `simParams.groundRestitution` :**
            *   Faire varier ces valeurs (0.1, 0.5, 0.9).
            *   **Observation & Discussion :** "Comment la hauteur des rebonds est-elle affectée ? C'est le coefficient de restitution qui dicte 'l'élasticité' de l'impact."
        4.  **(Si le frottement est ajouté aux `simParams` et colliders) `simParams.boxFriction` / `simParams.groundFriction` :**
            *   (Expliquer que pour voir le frottement, il faudrait ajouter `.setFriction()` aux `ColliderDesc` et un contrôle GUI).
            *   Donner une impulsion horizontale à la boîte dans `resetPhysicsState()` (exemple à montrer) :
                `dynamicBoxBody_rapier.setLinvel({ x: 3.0, y: 0.0 }, true);`
            *   **Observation & Discussion (théorique si non implémenté) :** "Si on ajoutait du frottement, la boîte glisserait-elle plus ou moins loin ?"

*   **C. Ajouter Plusieurs RigidBody (Démonstration Conceptuelle ou Simplifiée) (20 minutes)**
    *   **Objectif :** Montrer que Rapier peut gérer plusieurs objets et leurs interactions sans code de collision manuel de notre part.
    *   **Approche :**
        *   "Imaginons que nous voulions ajouter une deuxième boîte."
        *   **Expliquer les Étapes (sans forcément coder en direct si le temps manque, mais en montrant où dans le code existant on le ferait) :**
            1.  "Dans `createPhysicsWorld_rapier`, nous appellerions à nouveau `RAPIER.RigidBodyDesc.dynamic()` et `world_rapier.createRigidBody()` pour créer un `dynamicBoxBodyB_rapier`."
            2.  "Nous créerions un `RAPIER.ColliderDesc` pour cette deuxième boîte et l'attacherions à `dynamicBoxBodyB_rapier`."
            3.  "Dans `createVisuals_three`, nous créerions un `dynamicBoxMeshB_three`."
            4.  "Dans `resetPhysicsState`, nous définirions la position/vitesse initiale de `dynamicBoxBodyB_rapier`."
            5.  "Dans `animate`, nous récupérerions la position/rotation de `dynamicBoxBodyB_rapier` et mettrions à jour `dynamicBoxMeshB_three`."
    *   **Scénarios d'Interaction à Discuter :**
        *   "Si les deux boîtes sont lâchées l'une au-dessus de l'autre, que se passera-t-il ?"
        *   "Si on leur donne des vitesses initiales opposées pour qu'elles se heurtent ?"
        *   **Point Clé :** "Rapier gère toutes ces collisions multiples, le calcul des forces de contact, la restitution, le frottement entre toutes les paires d'objets en contact, le tout à l'intérieur de `world.step()`."

*   **D. Visualisation des Informations de Debug (Bref Aperçu - 10 minutes)**
    *   **Le Besoin de Debugger :** "Parfois, la simulation ne se comporte pas comme prévu. Comment voir ce que Rapier 'fait' ?"
    *   **Debug Rendering (Concept) :**
        *   "Rapier (comme d'autres moteurs) peut générer des informations pour un 'debug renderer'. Cela permettrait de dessiner les contours exacts des colliders, les points de contact, les normales, etc., directement dans notre scène Three.js."
        *   (Montrer une image ou un exemple externe si possible). "C'est très utile pour vérifier que les formes de collision sont correctes et que les contacts se produisent où on s'y attend."
        *   "L'intégration complète est un peu plus avancée, mais c'est un outil standard."
    *   **Logging de Base (comme déjà présent dans le code pour la position) :**
        *   "Pour un debug simple, on peut toujours utiliser `console.log` dans la boucle `animate` pour afficher les propriétés des corps Rapier :"
            ```javascript
            // Dans la boucle animate, après avoir récupéré position_rapier et rotation_rapier :
            console.log("Rapier pos:", position_rapier.x.toFixed(2), position_rapier.y.toFixed(2));
            // On pourrait aussi afficher la vitesse :
            // let linvel_rapier = dynamicBoxBody_rapier.linvel();
            // console.log("Rapier vel:", linvel_rapier.x.toFixed(2), linvel_rapier.y.toFixed(2));
            ```
    *   **`EventQueue` (Mention Avancée) :**
        *   "Rapier utilise une `EventQueue` pour gérer les événements de simulation. On peut l'interroger pour détecter des collisions spécifiques entre objets."
        *   `let eventQueue = new RAPIER.EventQueue(true);` (créée une fois, par exemple dans `createPhysicsWorld_rapier`)
        *   `world_rapier.step(eventQueue);` (passer la queue à `step` dans `animate`)
        *   `eventQueue.drainCollisionEvents((handle1, handle2, started) => { console.log("Collision Event:", handle1, handle2, "Started:", started); });` (à appeler après `world.step`)
        *   "Cela permet de déclencher des logiques de jeu (sons, scores) lors des collisions."

---

**(10 minutes) Conclusion et Perspectives**

*   **Récapitulation des Acquis :**
    *   Structure de base d'une simulation Rapier.js : `World`, `RigidBodyDesc`, `ColliderDesc`, `world.step()`.
    *   Lien entre les objets physiques Rapier et les objets visuels Three.js.
    *   Expérimentation avec les paramètres fondamentaux (gravité, masse, restitution).
    *   Aperçu de la gestion des interactions entre plusieurs corps et des outils de debug.
*   **Les Avantages d'un Moteur Physique :** "Rapier nous permet de nous concentrer sur la *configuration* de la physique et la *logique de jeu*, plutôt que sur l'implémentation de bas niveau des algorithmes de collision et d'intégration, qui est complexe et sujette aux erreurs."
*   **Prochaines Étapes Possibles avec Rapier (pour aller plus loin) :**
    *   Application de forces et d'impulsions personnalisées.
    *   Création de joints (contraintes entre corps).
    *   Utilisation de capteurs.
---
