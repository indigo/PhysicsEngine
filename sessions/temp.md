
---

**Bloc 1 : Introduction aux Forces et Application Manuelle (Ajustement)**

*   **Rappel et Connexion :** 
*   **Les Forces en Physique du Jeu :** 
*   **Appliquer des Forces *Manuellement* (Simulation Simplifiée) :**
    *   **Principe :** Si une force constante $\vec{F}$ agit sur un objet de masse $m$ pendant un intervalle de temps $\Delta t_{simu}$ (le "pas de temps" de notre simulation simplifiée) :
        1.  Calculer l'accélération : $\vec{a} = \vec{F} / m$.
        2.  Mettre à jour la vitesse : $\vec{v}_{nouvelle} = \vec{v}_{ancienne} + \vec{a} \cdot \Delta t_{simu}$.
        3.  Mettre à jour la position : $\vec{r}_{nouvelle} = \vec{r}_{ancienne} + \vec{v}_{nouvelle} \cdot \Delta t_{simu}$ (ou $\vec{r}_{ancienne} + \vec{v}_{ancienne} \cdot \Delta t_{simu}$ pour une intégration d'Euler simple).
    *   **Activité Pratique Guidée (Manuelle) :**
        *   Reprendre la simulation de projectile de la session précédente (ou une version simplifiée).
        *   Modifier le code pour appliquer une force constante supplémentaire (simulant un vent latéral) à chaque "pas de temps" de la simulation.
        *   Observer comment la trajectoire du projectile est modifiée par cette force continue.
        *   Discuter des approximations (ex: l'intégration d'Euler et ses limitations si $\Delta t_{simu}$ est grand).
*   **Questions / Réponses.**

---

**Bloc 2 : Impulsions et Quantité de Mouvement (Entièrement Manuel)**

**Objectifs Spécifiques de ce Bloc :**

*   Définir et calculer la quantité de mouvement et l'impulsion.
*   Appliquer le théorème de l'impulsion pour déterminer les changements de vitesse.
*   Comprendre le principe de conservation de la quantité de mouvement dans des scénarios simples.
*   Implémenter manuellement une simulation d'application d'impulsion pour observer le changement instantané de vitesse d'un objet.

---

*   **1. Quantité de Mouvement : L'Élan d'un Objet (20 minutes)**
    *   **Définition et Intuition :** (Identique à la version précédente)
        *   Question d'introduction (camion vs. bicyclette).
        *   Formule : $\vec{p} = m \vec{v}$.
        *   Unités, signification, caractère vectoriel.
    *   **Exemples de Calcul :** (Identique à la version précédente)
        *   Calculs pour des objets variés, comparaison.
*   **2. Impulsion : Le Coup de Pouce ou le Choc (25 minutes)**
    *   **Définition et Intuition :** (Identique à la version précédente)
        *   Exemple d'introduction (bille, collision).
        *   Formule simplifiée : $\vec{J} = \vec{F}_{moy} \Delta t$.
        *   Unités, signification.
    *   **Théorème de l'Impulsion :** (Identique à la version précédente)
        *   Le lien fondamental : $\vec{J} = \Delta \vec{p} = \vec{p}_f - \vec{p}_i$.
        *   Dérivation simple.
        *   Utilité et exemple (batte de baseball).
*   **3. Conservation de la Quantité de Mouvement (15 minutes)**
    *   **Système Isolé :** (Identique à la version précédente)
        *   Définition, forces internes vs. externes.
    *   **Principe de Conservation :** (Identique à la version précédente)
        *   Énoncé : $\vec{P}_{totale, avant} = \vec{P}_{totale, après}$.
        *   Explication (rôle des forces internes).
        *   Importance et exemples conceptuels (patineurs, explosion).
*   **4. Activité Pratique Guidée : Implémentation Manuelle d'une Impulsion (30 minutes)**
    *   **Objectif :** Simuler l'effet d'une impulsion sur la vitesse d'un objet ponctuel en 2D, sans moteur physique, en programmant les équations.
    *   **Mise en Place (Pseudocode ou langage simple comme Python, JavaScript en console, ou même un tableur pour les calculs) :**
        1.  **Définir un Objet (Particule) :**
            *   Propriétés : `masse (m)`, `position_x`, `position_y`, `vitesse_x`, `vitesse_y`.
            *   Initialiser ces valeurs.
        2.  **Afficher l'état initial :**
            *   Afficher la masse, la position initiale, la vitesse initiale, et la quantité de mouvement initiale ($\vec{p}_i = m \vec{v}_i$).
        3.  **Définir une Impulsion à appliquer :**
            *   $\vec{J} = (J_x, J_y)$ (valeurs à choisir par l'étudiant ou données).
        4.  **Appliquer le Théorème de l'Impulsion pour calculer la nouvelle vitesse :**
            *   Calculer la quantité de mouvement finale : $\vec{p}_f = \vec{p}_i + \vec{J}$.
                *   $p_{fx} = p_{ix} + J_x$
                *   $p_{fy} = p_{iy} + J_y$
            *   Calculer la nouvelle vitesse : $\vec{v}_f = \vec{p}_f / m$.
                *   $v_{fx} = p_{fx} / m$
                *   $v_{fy} = p_{fy} / m$
        5.  **Mettre à jour la vitesse de l'objet :**
            *   `vitesse_x = v_fx`
            *   `vitesse_y = v_fy`
        6.  **Afficher l'état final :**
            *   Afficher la nouvelle vitesse et la nouvelle quantité de mouvement ($\vec{p}_f$).
            *   Vérifier que $\Delta \vec{p}$ est bien égal à $\vec{J}$.
    *   **Extension Optionnelle (pour visualiser le mouvement après impulsion) :**
        *   Après avoir mis à jour la vitesse, simuler quelques pas de temps le mouvement de l'objet avec sa nouvelle vitesse constante (en l'absence d'autres forces) :
            *   Pour `i` de 1 à N_pas:
                *   `position_x = position_x + vitesse_x * delta_t_simulation`
                *   `position_y = position_y + vitesse_y * delta_t_simulation`
                *   Afficher la nouvelle position.
    *   **Points de Discussion pendant/après l'activité :**
        *   Le changement de vitesse est-il progressif ou instantané dans ce modèle ? (Instantané, car l'impulsion est appliquée en un seul "coup").
        *   Quel serait l'effet d'une impulsion plus grande ? D'une impulsion dans une direction différente ?
        *   Comment cette simulation manuelle diffère-t-elle de l'application d'une force continue vue au Bloc 1 ?
*   **5. Questions / Réponses (10 minutes).**

---

**Bloc 3 : Introduction aux Corps Rigides et à Rapier (Ajustement)**

*   **Qu'est-ce qu'un Corps Rigide ?** (Pas de changement majeur, mais insister sur le fait que maintenant on va utiliser un outil qui gère ces propriétés pour nous).
*   **Transition vers Rapier : Pourquoi utiliser un Moteur Physique ?**
    *   Discuter des limitations des simulations manuelles que l'on vient de faire (gestion complexe de multiples objets, collisions, contraintes, forces continues multiples, rotations, etc.).
    *   Introduire Rapier comme une solution qui encapsule toute cette complexité et fournit une API pour interagir avec un monde physique simulé.
*   **Les Corps Rigides (`RigidBody`) dans Rapier :**
    *   Maintenant, montrer comment Rapier permet de créer et manipuler ces `RigidBody` facilement.
    *   **Reprendre les concepts :** `BodyStatus`, masse, densité, lien avec `Collider`.
    *   **Montrer l'API Rapier :** Comment créer un `RigidBody`, lui attacher un `Collider`, définir sa masse, son `BodyStatus`.
    *   **Comparer avec l'implémentation manuelle :** Souligner ce que Rapier fait "automatiquement" (calcul du centre de masse, du moment d'inertie à partir du `Collider`, gestion de la boucle de simulation).
*   **Appliquer des Forces et Impulsions *avec Rapier* :**
    *   Revisiter `apply_force` et introduire `apply_impulse` dans le contexte de l'API Rapier.
    *   Montrer des exemples de code simples pour appliquer une force continue et une impulsion à un `RigidBody` dans Rapier.
    *   Comparer la facilité d'utilisation par rapport à l'implémentation manuelle.
*   **Préparation au TP2 :** (L'objectif et les étapes restent similaires, mais maintenant les étudiants utiliseront Rapier dès le début pour créer leur scène).
*   **Questions / Réponses.**

---

**Bloc 4 : TP2 - Création et Positionnement de Corps Rigides et leurs Interactions (avec Rapier)**

*   **Travail Pratique :** (Identique à la version précédente, mais entièrement avec Rapier).
    *   Les étudiants utilisent maintenant Rapier pour créer leurs corps rigides, leur appliquer la gravité (gérée par le monde Rapier), et observer les interactions.
    *   Ils peuvent expérimenter avec `apply_force` et `apply_impulse` sur leurs objets dans le TP s'ils le souhaitent, en plus de la gravité.
*   **Démonstrations et Discussion des Résultats :** (Identique)
*   **Conclusion de la Session et Introduction à la Session 4 :** (Identique)
*   **Questions / Réponses et Fin du TP.**

---

**Avantages de cette révision :**

*   **Meilleure Progression Pédagogique :** Les étudiants comprennent d'abord les équations et les concepts "bruts" avant de voir comment une librairie les implémente.
*   **Compréhension Approfondie :** L'implémentation manuelle, même simple, force une meilleure compréhension de ce qui se passe "sous le capot".
*   **Valorisation de la Librairie :** Après avoir fait l'effort manuel, les étudiants apprécieront davantage la puissance et la commodité de Rapier.
*   **Cohérence :** Le Bloc 1 introduit l'application manuelle de forces continues, le Bloc 2 l'application manuelle d'impulsions, puis le Bloc 3 montre comment Rapier gère tout cela de manière intégrée.

Cette approche rendra la transition vers Rapier plus naturelle et la compréhension des fonctionnalités de la librairie plus solide.


Absolument ! Voici cette note sur les frottements mise en forme pour être claire et compréhensible par les étudiants.

---

**Note sur les Forces de Frottement de l'Air (Traînée Aérodynamique)**

Lorsque nous avons parlé des forces de frottement, nous avons mentionné le "frottement visqueux/de l'air". Cette force, également appelée **traînée aérodynamique**, s'oppose au mouvement d'un objet à travers un fluide (comme l'air). Son calcul peut être complexe car il dépend de plusieurs facteurs, notamment la vitesse de l'objet, sa forme, et les propriétés du fluide.

Pour un objet sphérique se déplaçant dans l'air, il existe principalement deux régimes de frottement, déterminés par le **Nombre de Reynolds (Re)**. Le nombre de Reynolds est une valeur sans dimension qui aide à prédire le type d'écoulement du fluide autour de l'objet.

**1. Régime Laminaire (Basse Vitesse, Petits Objets)**

*   **Condition :** Nombre de Reynolds (Re) inférieur à environ 1. L'écoulement de l'air autour de la sphère est régulier et sans tourbillons.
*   **Loi applicable : Loi de Stokes**
*   **Équation de la Force de Frottement (F) :**
    $`F = 6 \pi \eta r v`$
    Où :
    *   $`F`$ : Force de frottement (en Newtons, N)
    *   $`\pi`$ : Nombre Pi (environ 3.14159)
    *   $`\eta`$ (êta) : Viscosité dynamique de l'air (en Pascal-seconde, Pa·s). La viscosité mesure la "résistance à l'écoulement" du fluide.
    *   $`r`$ : Rayon de la sphère (en mètres, m)
    *   $`v`$ : Vitesse de la sphère par rapport à l'air (en mètres par seconde, m/s)
*   **Caractéristiques :** Dans ce régime, la force de frottement est directement proportionnelle à la vitesse de l'objet. Si vous doublez la vitesse, la force de frottement double également.

**2. Régime Turbulent (Haute Vitesse, Objets plus Grands)**

*   **Condition :** Nombre de Reynolds (Re) supérieur à environ 1 (et souvent bien plus élevé pour les objets courants). L'écoulement de l'air devient chaotique avec des tourbillons.
*   **Loi applicable : Force de Traînée (Drag Force)**
*   **Équation de la Force de Frottement (F) :**
    $`F = \frac{1}{2} \rho C_d A v^2`$
    Où :
    *   $`F`$ : Force de frottement (en Newtons, N)
    *   $`\rho`$ (rhô) : Densité de l'air (en kilogrammes par mètre cube, kg/m³).
    *   $`C_d`$ : Coefficient de traînée (sans dimension). Ce coefficient dépend de la forme de l'objet. Pour une sphère lisse, $`C_d`$ est approximativement 0.47 - 0.5.
    *   $`A`$ : Aire de la section transversale de la sphère (la surface du cercle que la sphère présente au flux d'air, en mètres carrés, m²). Pour une sphère, $`A = \pi r^2`$.
    *   $`v`$ : Vitesse de la sphère par rapport à l'air (en mètres par seconde, m/s)
*   **Caractéristiques :** Dans ce régime, la force de frottement est proportionnelle au *carré* de la vitesse. Si vous doublez la vitesse, la force de frottement est multipliée par quatre ! C'est le régime le plus courant pour la plupart des objets que nous voyons se déplacer dans l'air (balles, voitures, etc.).

**Comment savoir quel régime utiliser ? Le Nombre de Reynolds (Re)**

Pour déterminer si l'écoulement est laminaire ou turbulent, et donc quelle équation de frottement utiliser, on calcule le Nombre de Reynolds :

$`Re = \frac{\rho v d}{\eta}`$

Où :
*   $`\rho`$ : Densité de l'air
*   $`v`$ : Vitesse de l'objet
*   $`d`$ : Diamètre de la sphère ($`d = 2r`$)
*   $`\eta`$ : Viscosité dynamique de l'air

**En résumé pour la simulation de jeux :**

*   **Loi de Stokes (Régime laminaire) :** $`F = 6 \pi \eta r v`$ (Souvent moins pertinent pour les objets typiques des jeux à des vitesses normales, mais peut s'appliquer à de très petites particules ou à des mouvements très lents dans des fluides plus visqueux que l'air).
*   **Force de Traînée (Régime turbulent) :** $`F = \frac{1}{2} \rho C_d A v^2`$ (C'est l'équation la plus couramment utilisée pour simuler la résistance de l'air dans les jeux pour des objets comme des balles, des personnages, des véhicules, etc.).

Dans les simulations de jeux, pour simplifier, on utilise souvent directement la formule de la force de traînée (proportionnelle à $`v^2`$) ou une approximation encore plus simple où le frottement est juste proportionnel à $`v`$ (comme $`F = -kv`$, où $`k`$ est une constante de frottement). Le choix dépend du niveau de réalisme souhaité et des performances. Les moteurs physiques comme Rapier peuvent offrir des moyens de configurer le frottement de manière plus ou moins détaillée.

---

L'unité de mesure de la force dans le Système International (SI) est le **Newton**, symbolisé par la lettre **N**.

**Définition du Newton :**

Un Newton (1 N) est la force nécessaire pour donner à une masse d'un kilogramme (1 kg) une accélération d'un mètre par seconde au carré (1 m/s²).

Cela découle directement de la deuxième loi de Newton :

**F = m × a**

Où :
*   **F** est la force (en Newtons, N)
*   **m** est la masse (en kilogrammes, kg)
*   **a** est l'accélération (en mètres par seconde au carré, m/s²)

Donc, on peut aussi exprimer le Newton en termes d'unités de base du SI :

**1 N = 1 kg·m/s²**
