
**Session 3: Forces, Impulsions, Quantité de Mouvement et Corps Rigides Basiques**

**Objectifs d'Apprentissage de la Session :**

À la fin de cette session, vous serez capable de :

*   Comprendre et démontrer l'application de la notion de force, d'impulsion et de quantité de mouvement dans des simulations simples.
*   Comprendre le fonctionnement des corps rigides et manipuler leurs propriétés de base (masse, type de corps) dans Rapier.
*   Mettre en œuvre l'application de forces et d'impulsions à des corps rigides dans Rapier et observer leurs interactions rudimentaires.
*   Préparer le terrain pour l'étude détaillée des collisions et de leurs réponses dans les sessions suivantes.

---

**Bloc 1 : Introduction aux Forces et Application sans Rapier**

*   **Rappel et Connexion :**
    *   Discussion sur les forces implicites (gravité) rencontrées dans le TP1.
    *   Objectif : Explorer *explicitement* comment définir et appliquer différentes forces.
*   **Les Forces en Physique du Jeu :**
    *   **Forces Environnementales :**
        *   **Gravité :** Force d'attraction constante vers le bas. (Rappel de son implémentation possible dans Rapier).
        *   **Frottement (conceptuel) :** Forces qui s'opposent au mouvement.
            *   *Frottement visqueux/de l'air :* Résistance due au déplacement dans un fluide.
            *   *Frottement de contact :* Résistance entre deux surfaces en contact.
    *   **Forces Appliquées :**
        *   **Forces de Propulsion :** Forces qui poussent ou tirent un objet (ex: moteur, poussée d'un personnage).
        *   **Forces de Ressort (conceptuel) :** Forces exercées par un ressort étiré ou comprimé.
*   **Appliquer des Forces sans Rapier :**
    *   **Forces Persistantes :** Simuler des influences continues (ex: vent, poussée constante).
        *   Une force appliquée sur la durée modifie l'accélération de l'objet, et donc sa vitesse progressivement.
    *   **Activité Pratique Guidée :** Appliquer une force constante (simulant un vent latéral) à un projectile et observer la modification de sa trajectoire.
*   **Questions / Réponses.**

---

**Bloc 2 : Impulsions et Quantité de Mouvement**

*   **Comprendre l'Impact Instantané : Impulsion et Quantité de Mouvement :**
    *   **Quantité de Mouvement ($\vec{p} = m \vec{v}$) :**
        *   Mesure de "l'élan" ou de la "difficulté à arrêter" un objet en mouvement.
        *   Dépend de la masse ($m$) et de la vitesse ($\vec{v}$) de l'objet.
    *   **Impulsion ($\vec{J}$) :**
        *   Décrit un changement brusque de mouvement dû à une force agissant pendant un court instant (ex: un coup, une explosion).
        *   Peut être vue comme $\vec{J} = \vec{F}_{moy} \Delta t$ (force moyenne pendant une courte durée) ou plus formellement $\vec{J} = \int \vec{F} dt$.
    *   **Théorème de l'Impulsion ($\Delta \vec{p} = \vec{J}$) :**
        *   L'impulsion appliquée à un objet est égale au changement de sa quantité de mouvement.
    *   **Conservation de la Quantité de Mouvement :**
        *   Dans un système isolé (sans forces externes nettes), la quantité de mouvement totale du système reste constante. Ce principe est fondamental pour analyser les collisions.
*   **Appliquer des Impulsions dans Rapier :**
    *   **Changements de Vitesse Instantanés :** Utilisation de `apply_impulse` pour modifier directement la vitesse d'un objet (ex: donner un coup de pouce, simuler un tir).
    *   **Différence Force vs. Impulsion :**
        *   Une *force* change l'accélération (vitesse change *progressivement*).
        *   Une *impulsion* change la vitesse *directement et instantanément*.
    *   **Scénarios d'Utilisation :** Saut d'un personnage, tir d'une arme, explosions.
*   **Activité Pratique Guidée :** Lancer un projectile en lui appliquant une impulsion initiale, au lieu d'une vitesse initiale. Comparer les approches.
*   **Questions / Réponses.**

---

**Bloc 3 : Introduction aux Corps Rigides dans Rapier**

*   **Qu'est-ce qu'un Corps Rigide ?**
    *   Un objet considéré comme indéformable, dont toutes les parties conservent leurs distances relatives.
    *   **Centre de Masse :**
        *   Point d'équilibre où l'on peut considérer que toute la masse de l'objet est concentrée pour l'étude de son mouvement de translation.
        *   Rapier le calcule automatiquement en fonction de la forme du `Collider` et de la répartition de la masse.
    *   **Moment d'Inertie :**
        *   Mesure la résistance d'un objet à la rotation (analogue à la masse pour la translation).
        *   Dépend de la masse de l'objet et de la manière dont cette masse est distribuée par rapport à l'axe de rotation.
        *   Rapier le calcule généralement à partir de la forme du `Collider` et de la masse/densité.
*   **Les Corps Rigides (`RigidBody`) dans Rapier :**
    *   Le `RigidBody` représente l'entité physique (avec sa masse, sa position, sa vitesse, son mouvement).
    *   **Statut du Corps (`BodyStatus` ou équivalent) :**
        *   `Dynamic` : Bouge et est affecté par les forces et les collisions.
        *   `Static` : Immobile, sert d'obstacle fixe dans l'environnement (ex: le sol, les murs).
        *   `Kinematic` : Son mouvement est contrôlé directement par le code (position/rotation mises à jour manuellement), il n'est pas affecté par les forces mais peut pousser les corps dynamiques.
    *   **Masse et Densité :** Vous pouvez spécifier la masse d'un `RigidBody` directement ou via la densité du `Collider` qui lui est attaché.
    *   **Relation avec le `Collider` :** Le `RigidBody` a besoin d'un (ou plusieurs) `Collider`(s) pour définir sa forme géométrique, qui est utilisée pour la détection des collisions.
*   **Préparation au TP2 :**
    *   **Objectif du TP2 :** Créer une scène simple avec plusieurs corps rigides (`Static` et `Dynamic`) de formes et masses différentes. Observer comment ils tombent, s'empilent (rudimentairement) et interagissent sous l'effet de la gravité.
    *   **Étapes Suggérées :**
        1.  Créer un sol (`Static RigidBody` + `Collider` rectangulaire).
        2.  Créer plusieurs objets (`Dynamic RigidBody` + `Collider` de formes variées : cubes, sphères).
        3.  Varier les masses (ou densités) de certains objets.
        4.  Les positionner initialement au-dessus du sol, certains empilés.
        5.  Lancer la simulation et observer attentivement leur comportement.
*   **Questions / Réponses.**

---

**Bloc 4 : TP2 - Création et Positionnement de Corps Rigides et leurs Interactions**

*   **Travail Pratique :**
    *   Mise en œuvre du TP2 en suivant les étapes suggérées.
    *   **Expérimentations Suggérées :**
        *   Empilez 3 cubes de même masse. Que se passe-t-il ? Sont-ils stables ?
        *   Remplacez le cube du milieu par un cube beaucoup plus lourd ou beaucoup plus léger. Observez la différence.
        *   Faites tomber une sphère sur un tas de cubes. Comment réagissent-ils ?
        *   Testez différents types de `BodyStatus`.
    *   L'accent est mis sur l'observation, l'expérimentation et la compréhension intuitive du comportement des corps rigides.
*   **Démonstrations et Discussion des Résultats :**
    *   Partage des observations.
    *   Discussion sur l'importance de la masse, l'effet de la forme sur la stabilité, et les interactions basiques observées.
*   **Conclusion de la Session et Introduction à la Session 4 :**
    *   Récapitulatif des forces, impulsions, et des bases des corps rigides.
    *   Prochain sujet : Comment faire *tourner* nos objets ? Introduction à la rotation et au moment de force.
*   **Questions / Réponses et Fin du TP.**

---

Cette version est plus directe et se concentre sur les informations que les étudiants doivent assimiler et mettre en pratique.