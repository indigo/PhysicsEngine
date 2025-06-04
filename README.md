FR
Ceci est le git repo du cours sur les engins de physiques (branche jeu vidéo)

The sessions' content is in the sessions directory

**Plan de Cours : Physique dans le Jeu Vidéo (203-J28-BB) - 10 Sessions**
Appliquer des notions de mécanique classique et des méthodes numériques pour simuler des objets physiques en mouvement.

**Objectifs Généraux (Identiques au plan précédent)**

**Évaluation:**

- **Devoirs (40%):** Implémentations pratiques, analyses de code, résolutions de problèmes.
- **Examen de Mi-Session (30%):** Quiz théorique
- **Examen Final (30%):** Théorie et pratique (implémentation complète d'une mécanique de jeu).

---

**Pre requis**

- Installation de Visual Studio Code
- Installation de Live Preview: https://marketplace.visualstudio.com/items/?itemName=ms-vscode.live-server
- Installation de Markdown Viewer: https://marketplace.visualstudio.com/items/?itemName=bierner.markdown-mermaid

**Déroulement des Sessions (10 Sessions)**

**Session 1: Introduction et Mathématiques Essentielles (4 blocs)**

- Présentation du cours, des objectifs, des attentes et des méthodes d'évaluation.
- Révision : Vecteurs (opérations, produit scalaire, produit vectoriel).
- Révision : Dérivées et Intégrales (survol).
- Activité, introduction à Rapier : Installation, configuration, tester les exemples, explication des bases.

**Session 2: Cinématique 2D et Mouvement de Projectile (4 blocs)**

- Cinématique 2D : Vitesse, accélération  et position.
- Mouvement de projectile (calculs, implémentation dans Box2D).
- Implémentation des projectiles et explication des lois de Newton.
- TP1: Création d'un objet en mouvement et d'un projectile simple dans Rapier (avec gravité).

**Session 3: Forces, Impulsions, Quantité de Mouvement et Corps Rigides Basiques (4 blocs)**

- Forces : Gravité, frottement (conceptuel), forces de ressort (conceptuel).
- Impulsions et quantité de mouvement : Conservation, calculs.
- Introduction aux corps rigides dans Rapier.
- TP2: Création et positionnement de corps rigides et leurs interactions.

**Session 4: Rotation, Équations du Mouvement, et Devoir 1 (4 blocs)**

- Rotation : Vitesse angulaire, accélération angulaire, moment de force.
- Équations du mouvement pour les corps rigides (avec rotation).
- TP3: implémentation basique des rotations des corps rigides.
- Devoir 1: Implémentation d'un mouvement de projectile en 2D.

**Session 5: Collisions, Réponse aux Collisions et Devoir 2 (4 blocs)**

- Types de collisions (élastique, inélastique, oblique). Restitution.
- Techniques de détection de collision (AABB, primitives géométriques simples) et Expliquer la méthode de détection de collision
- Implémentation de la réponse aux collisions (démonstration).
- Devoir 2: Ajout des collisions (élastique/inélastique) et le frottement avec l'air à une simulation.

**Session 6: Approfondissement des Forces - Frottement et Ressorts (Simulation Manuelle) (4 blocs)**

*   **Objectif :** Consolider la compréhension des forces de contact (frottement) et des forces de rappel (ressorts) par une analyse théorique et une implémentation manuelle. Préparer le terrain pour le Devoir 2 qui inclura le frottement.
*   **Bloc 1 : Forces de Frottement en Détail (1h30)**
    *   **Théorie du Frottement :**
        *   Distinction entre frottement statique ($f_s \le \mu_s N$) et cinétique ($f_k = \mu_k N$).
        *   Coefficients de frottement ($\mu_s, \mu_k$).
        *   Force Normale ($N$) : comment la déterminer sur un plan horizontal et (brièvement) sur un plan incliné.
        *   Direction de la force de frottement (toujours opposée au mouvement ou à la tendance au mouvement).
    *   **Activité Pratique : Analyse de Scénarios**
        *   Petits problèmes théoriques : calculer la force de frottement maximale, déterminer si un objet va glisser.
*   **Bloc 2 : Implémentation Manuelle du Frottement (1h30)**
    *   **Application à la Simulation :**
        *   Comment ajouter la force de frottement cinétique à la $\vec{F}_{net}$ dans la boucle de simulation (par exemple, sur la balle du Devoir 2 qui glisse au sol).
            $`\vec{a} = (\vec{F}_{autres} + \vec{f}_k) / m`$.
        *   Gestion du frottement statique (plus complexe : l'objet ne bouge que si $\vec{F}_{appliquée} > f_{s,max}$). On peut se concentrer sur une version simplifiée où l'objet s'arrête si sa vitesse devient très faible et que les forces motrices sont insuffisantes.
    *   **TP (Partie 1) ou Activité Guidée : Ajout du Frottement au Sol**
        *   Reprendre la simulation de la balle (celle de la démo de la Session 5, ou la base du Devoir 2).
        *   Implémenter la force de frottement cinétique lorsque la balle est en contact avec le sol et a une vitesse horizontale.
        *   Observer comment la balle ralentit et s'arrête sur le sol. Tester différents $\mu_k$.
*   **Bloc 3 : Forces de Ressort et Mouvement Harmonique Simple (1h30)**
    *   **Loi de Hooke :** $F_s = -kx$ (force de rappel proportionnelle à l'élongation/compression $x$ par rapport à la position d'équilibre).
    *   Constante de raideur $k$ (N/m).
    *   Énergie Potentielle Élastique : $U_s = \frac{1}{2}kx^2$.
    *   **Mouvement Harmonique Simple (MHS) :** Le mouvement oscillatoire qui résulte lorsqu'un objet est soumis uniquement à une force de rappel de type loi de Hooke.
        *   Caractéristiques : période, fréquence, amplitude. (Introduction conceptuelle, sans dérivation complète des équations différentielles si trop avancé).
*   **Bloc 4 : Implémentation Manuelle d'un Système Masse-Ressort Simple (1h30)**
    *   **TP (Partie 2) ou Activité Guidée : Simulation d'un Oscillation**
        *   Simuler une masse attachée à un ressort horizontal (glissant sans frottement) ou vertical (oscillant autour de sa position d'équilibre sous l'effet de la gravité et du ressort).
        *   **Boucle de simulation :**
            1.  Calculer l'élongation/compression $x$.
            2.  Calculer la force du ressort $F_s = -kx$.
            3.  Calculer $F_{net}$ (inclure la gravité si ressort vertical).
            4.  Calculer $a = F_{net}/m$.
            5.  Mettre à jour $v$ et $x$ (position).
        *   Observer le mouvement oscillatoire. Expérimenter avec $m$ et $k$.
*   **Fin de Session : Examen de Mi-Session (Quiz théorique)**
    *   Couvre les concepts des Sessions 1 à 5 (vecteurs, cinématique, lois de Newton, forces, énergie, quantité de mouvement, rotation de base, types de collisions, détection simple, restitution).

---

**Session 7: Systèmes de Particules et Introduction aux Moteurs Physiques (Rapier) (4 blocs)**

*   **Objectif :** Introduire une nouvelle technique de simulation (systèmes de particules) pour des effets spécifiques, puis présenter formellement un moteur physique (Rapier) comme solution pour gérer des scénarios de corps rigides complexes.
*   **Bloc 1 : Systèmes de Particules - Théorie et Applications (1h30)**
    *   **Qu'est-ce qu'un Système de Particules ?** Un ensemble de nombreuses particules (masses ponctuelles) qui peuvent interagir ou être soumises à des forces globales.
    *   **Pourquoi ?** Utile pour simuler des phénomènes qui ne sont pas facilement modélisables comme des corps rigides uniques :
        *   Fluides simples (eau, fumée).
        *   Tissus, cordes, cheveux.
        *   Effets spéciaux (feu, étincelles, explosions, magie).
    *   **Simulation de Base :**
        *   Chaque particule a : masse (peut être la même pour toutes), position, vitesse.
        *   Forces agissant sur chaque particule : gravité, vent, forces d'attraction/répulsion entre particules, forces de liaison (ressorts entre particules).
        *   Boucle d'intégration pour chaque particule : $\vec{F}_{net,i} \rightarrow \vec{a}_i \rightarrow \vec{v}_i \rightarrow \vec{r}_i$.
    *   Gestion du cycle de vie des particules : émission, durée de vie, disparition.
*   **Bloc 2 : TP - Implémentation Manuelle d'un Système de Particules Simple (1h30)**
    *   **TP4 : Fontaine de Particules ou Effet de "Neige"**
        *   Émettre des particules depuis un point source avec une vitesse initiale aléatoire (dans un certain cône).
        *   Les particules sont soumises à la gravité et (optionnellement) à une simple résistance de l'air.
        *   Les particules disparaissent après un certain temps ou si elles sortent d'une zone définie.
        *   Se concentrer sur la gestion d'un tableau de particules et la mise à jour de chacune.
        *   Visualisation dans Three.js (chaque particule est une petite sphère ou un point).
*   **Bloc 3 : Introduction Formelle aux Moteurs Physiques : Rapier (1h30)**
    *   **Motivation :** "Nous avons vu comment simuler manuellement la translation, la rotation, les rebonds simples, le frottement, les ressorts, et même des systèmes de particules. C'est très formateur, mais imaginez gérer tout cela pour des dizaines d'objets 3D complexes qui entrent en collision et interagissent avec des articulations !"
    *   **Qu'est-ce qu'un Moteur Physique ?** Une bibliothèque de code spécialisée qui gère :
        *   La dynamique des corps rigides (translation et rotation 3D complexe).
        *   La détection de collision (Broad et Narrow phase pour formes variées).
        *   La réponse aux collisions (avec restitution, frottement de contact).
        *   Les contraintes (articulations, joints).
        *   L'intégration numérique stable.
        *   L'optimisation.
    *   **Présentation de Rapier :**
        *   Introduction à la librairie (2D/3D, Rust/Wasm/JS).
        *   **Concepts Clés dans Rapier :**
            *   `World` : L'environnement de simulation, gère la gravité, les paramètres d'intégration.
            *   `RigidBody` : L'objet physique. `RigidBodyDesc` pour sa création (type : `Dynamic`, `Fixed`, `KinematicPositionBased`, `KinematicVelocityBased`), position initiale, etc.
            *   `Collider` : La forme géométrique de l'objet, attachée au `RigidBody`. `ColliderDesc` pour sa création (type de forme : `ball`, `cuboid`, `capsule`, `trimesh`, etc.), masse/densité, friction, restitution.
            *   `IntegrationParameters` : Paramètres de la simulation (ex: `dt`).
        *   **La Boucle de Simulation Rapier :** `world.step()`. Cette seule fonction fait tout le travail !
*   **Bloc 4 : Première Simulation avec Rapier - Objets qui Tombent et se Touchent (1h30)**
    *   **Démonstration Guidée et TP5 (Découverte de Rapier) :**
        1.  Mettre en place un projet Rapier minimal (importation, création du `World`).
        2.  Créer un sol statique (`RigidBodyDesc.fixed()`, `ColliderDesc.cuboid()`).
        3.  Créer plusieurs corps rigides dynamiques (balles, boîtes) avec des `ColliderDesc` différents (masse via densité, friction, restitution).
        4.  Les positionner au-dessus du sol.
        5.  Mettre en place la boucle `animate` qui appelle `world.step()` et synchronise les positions/rotations des `RigidBody` Rapier avec des `Mesh` Three.js.
        6.  **Observer :** Les objets tombent, entrent en collision entre eux et avec le sol, rebondissent, s'empilent.
        7.  **Expérimenter :** Modifier les `ColliderDesc` (friction, restitution) et observer l'impact.
    *   **L'objectif ici est la prise en main de l'API de base de Rapier.**

---

**Session 8: Forces, Joints et Interactions Avancées avec Rapier (4 blocs)**

*   **Objectif :** Explorer comment appliquer des forces, créer des liaisons (joints), et gérer des interactions plus complexes en utilisant Rapier.
*   **Bloc 1 : Forces et Impulsions dans Rapier**
    *   Appliquer des forces continues (`addForce`, `applyForceAtPoint`).
    *   Appliquer des impulsions (`applyImpulse`, `applyImpulseAtPoint`).
    *   Appliquer des torques (`addTorque`, `applyTorqueImpulse`).
    *   Lien avec les concepts manuels : Rapier gère l'intégration pour nous.
    *   **Activité :** Reprendre la scène du TP5 et ajouter des forces/impulsions aux objets pour les propulser, les faire tourner.
*   **Bloc 2 : Introduction aux Joints (Contraintes) dans Rapier**
    *   Que sont les joints ? Des liaisons qui restreignent le mouvement relatif entre deux corps rigides.
    *   Types de joints courants et leur équivalent dans Rapier (s'ils existent directement ou comment les simuler) :
        *   `FixedJoint` (soude deux objets ensemble).
        *   `RevoluteJoint` (pivot, comme une charnière de porte).
        *   `PrismaticJoint` (glissière).
        *   `BallJoint` (rotule).
        *   `SpringJoint` (si disponible, ou comment le simuler avec des forces).
    *   Paramètres des joints (ancrages, limites, moteurs).
*   **Bloc 3 & 4 : TP - Construction d'un Système Articulé Simple avec Rapier**
    *   **TP6 :**
        *   Option A : Créer un pendule simple ou double en utilisant des `RevoluteJoint`.
        *   Option B : Créer une petite "voiture" basique avec des roues qui tournent (les roues sont des corps séparés attachés au châssis par des joints).
        *   Option C : Un pont de singe simple fait de segments reliés par des joints.
    *   Se concentrer sur la configuration des `RigidBody`, `Collider`, et `ImpulseJoint` (ou `MultibodyJoint`).
    *   Explorer les limites et les moteurs des joints si le temps le permet.
*   **Devoir 3 (Attribution/Rappel) :** Pourrait être une extension du TP6, ou un autre système articulé/contraint à modéliser avec Rapier. Ou, si vous voulez continuer sur du manuel : un système masse-ressort-amortisseur plus complexe, ou une simulation de corde/tissu simple (particules + ressorts). *Clarifier l'orientation (manuel vs Rapier) du Devoir 3 est important ici.*

---

**Session 9: Optimisation et Détection de Collision Avancée (Concepts et Rapier) (2 blocs)**

*   **Objectif :** Comprendre les défis de performance en détection de collision et les solutions utilisées par les moteurs comme Rapier, et avoir un aperçu de techniques de détection plus avancées.
*   **Bloc 1 : Optimisation de la Détection de Collision (Broad Phase)**
    *   Révision du problème $N^2$.
    *   **Principes de la Broad Phase :**
        *   Formes Englobantes (AABB, Sphères).
        *   Partitionnement Spatial (Grilles, Quadtrees/Octrees).
        *   Sweep and Prune.
    *   **Discussion :** Comment Rapier gère sa phase large (généralement une combinaison ou un algorithme sophistiqué comme DBVT - Dynamic Bounding Volume Tree). Le but n'est pas de l'implémenter, mais de comprendre pourquoi c'est nécessaire.
    *   **API Rapier :** Mentionner le `QueryPipeline` pour des requêtes spatiales (raycasting, shapecasting, intersections) qui s'appuient sur ces structures optimisées.
*   **Bloc 2 : Détection de Collision Précise (Narrow Phase - SAT) et Examen Théorique Final**
    *   **Théorème des Axes Séparateurs (SAT) :**
        *   Revue du concept (pour polygones/polyèdres convexes).
        *   Importance pour les formes non-AABB et non-sphériques.
        *   Mentionner que c'est une des techniques utilisées en interne par Rapier pour les `Collider` de type `cuboid` (orienté), `convexPolyhedron`, etc.
    *   **Examen Théorique Final (45-60 minutes)**
        *   Couvre S1-S8. Cinématique, Newton, Forces (gravité, frottement, ressort), Quantité de Mouvement, Énergie, Rotation (cinématique, moment de force, moment d'inertie, $\tau=I\alpha$), Collisions (types, restitution), Détection de Collision (principes, formes simples, broad/narrow phase), Systèmes de Particules (concept), Moteurs Physiques (concepts Rapier : World, RigidBody, Collider, Joints).

---

**Session 10: Projet Final Pratique (Examen Pratique avec Rapier) et Conclusion (2 blocs)**

*   **Objectif :** Permettre aux étudiants de synthétiser leurs connaissances en utilisant Rapier pour créer une simulation interactive avec des corps rigides, des collisions, et potentiellement des forces ou des joints.
*   **Bloc 1 & 2 : Examen Pratique - Création d'un Mini-Jeu/Simulation avec Rapier**
    *   **Contexte :** Un énoncé précis leur est donné. L'accent est mis sur l'utilisation correcte de l'API Rapier pour mettre en place la physique.
    *   **Exemples d'Énoncés :**
        *   Un mini-jeu de flipper simple (lancer une balle avec des "flippers" (kinematic bodies), faire rebondir sur des obstacles).
        *   Une simulation d'un tas d'objets qui tombent et interagissent (tester la stabilité, l'effet de la friction/restitution).
        *   Une petite voiture simple qui peut être contrôlée (appliquer des forces/torques aux roues qui sont des `RigidBody` séparés et jointés).
        *   Un "Angry Birds" très simplifié où l'on lance un objet pour faire tomber une structure.
    *   **Ce qui est évalué :**
        *   Configuration correcte du `World` Rapier.
        *   Création appropriée de `RigidBody` et `Collider` (types, formes, propriétés physiques comme masse/densité, friction, restitution).
        *   Application de forces/torques ou utilisation de joints si nécessaire.
        *   Gestion basique des collisions (Rapier le fait, mais ils doivent configurer les propriétés).
        *   Synchronisation avec une visualisation Three.js.
        *   Fonctionnalité globale du scénario demandé.
*   **Conclusion du Cours :** (Identique au plan précédent)

