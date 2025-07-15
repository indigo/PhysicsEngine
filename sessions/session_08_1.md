# Session 8: Simulation de Corps Souples

**Objectif de la session :** Apprendre à simuler des objets déformables comme des cordes, des tissus ou des cubes de gelée en utilisant les briques de base de Rapier.js.

---

## Partie 1 : Au-delà des Corps Rigides

Jusqu'à présent, tous les objets que nous avons simulés étaient **rigides**. Une sphère reste une sphère, un cube reste un cube. Ils ne peuvent ni se plier, ni s'étirer, ni se tordre.

[![Un cube rigide qui tombe et rebondit sans se déformer.](../images/cube.png)](../images/video/0249-0480.mp4)

*Description: Un simple cube rigide rebondit sur le sol. Sa forme reste inchangée.*

Mais dans de nombreux jeux, les objets réagissent de manière plus dynamique et "molle", ce qui les rend beaucoup plus vivants et amusants.

[![Collage de plusieurs exemples de corps souples dans des jeux.](../images/locoroco.png)
*Description: Exemples de corps souples en action : un personnage de jeu qui tombe, des fleurs qui flottent, une gelée qui tremble.*

**La question clé :** Comment simuler ces comportements si Rapier ne nous donne que des `Collider` rigides ?

**La réponse :** On ne simule pas *un* gros objet souple. On simule un **système de nombreux petits objets rigides** reliés entre eux. Le comportement de l'ensemble donne l'illusion d'un corps unique et déformable.


## **Partie 2 : Le Modèle Masse-Ressort - Notre Boîte à Outils**

Le modèle le plus courant pour simuler des corps souples est le **système masse-ressort**. C'est un concept à la fois simple et incroyablement puissant. L'idée est de décomposer n'importe quel objet en deux éléments de base :

1.  **Les Particules (Masses) :** Des points dans l'espace qui ont une masse. Ils représentent les "atomes" de notre objet.
2.  **Les Ressorts (Contraintes) :** Des liaisons invisibles qui connectent les particules entre elles. Ces ressorts essaient toujours de maintenir une certaine distance entre les particules.

[![Deux sphères représentant des particules, reliées par un ressort.](../images/soft-bodies/03-mass-spring-basic.png)](../images/soft-bodies/03-mass-spring-basic.png)

*Description: Le concept de base : deux masses (sphères bleues) connectées par une contrainte de type ressort.*

#### **La Physique du Ressort (Simplifiée)**

Le comportement d'un ressort est défini par deux concepts clés :

*   **La Loi de Hooke : `Force = -k * ΔL`**
    *   **`k` (Stiffness / Raideur) :** C'est la "force" du ressort. Plus `k` est grand, plus le ressort résiste à l'étirement ou à la compression.
    *   **`ΔL` (Delta L / Élongation) :** C'est la différence entre la longueur *actuelle* du ressort et sa longueur "préférée" (au repos).

*   **L'Amortissement (`Damping`)**
    *   Un ressort parfait oscillerait pour toujours. Pour un comportement réaliste, nous devons dissiper de l'énergie.
    *   L'amortissement est une force qui s'oppose à la *vitesse* d'étirement du ressort. Plus les particules s'éloignent vite, plus l'amortissement les freine, ce qui stabilise le système et évite les explosions.

**Conclusion :** Nous avons nos deux ingrédients : des particules qui peuvent bouger et des ressorts qui leur appliquent des forces pour les maintenir ensemble.

---

## **Partie 3 : L'Intégrateur - La Machine à Voyager dans le Temps**

Nous savons calculer les forces à un instant `t`. Comment connaître la position à l'instant `t + 1` ? C'est le rôle de l'**intégrateur numérique**, le moteur de notre simulation.

#### **Méthode 1 : L'Intégration d'Euler (Intuitive mais Instable)**

C'est la méthode la plus simple : on calcule la nouvelle vitesse, puis la nouvelle position.
1.  `nouvelle_vitesse = ancienne_vitesse + accélération * dt`
2.  `nouvelle_position = ancienne_position + nouvelle_vitesse * dt`

Le problème est qu'avec un pas de temps (`dt`) trop grand, les particules peuvent "dépasser" leur cible, ajoutant de l'énergie au système jusqu'à ce qu'il explose.

#### **Méthode 2 : L'Intégration de Verlet (Simple et Stable)**

C'est la méthode de choix pour les tissus, cordes et corps souples dans les jeux, car elle est remarquablement stable.

*   **L'idée géniale :** On se débarrasse de la gestion explicite de la vitesse ! On ne stocke que la position actuelle et la position *précédente*.
*   **La formule :** La nouvelle position est une simple extrapolation de l'ancien mouvement, à laquelle on ajoute l'effet de l'accélération.
    `nouvelle_position = position + (position - ancienne_position) + acceleration * dt²`

#### **La Stabilité par les Sous-Pas (`Sub-stepping`)**

Pour une simulation encore plus précise et robuste, surtout lors des collisions, on ne fait pas un grand pas de simulation par frame, mais plusieurs petits. Si notre jeu tourne à 60 FPS (16.6 ms par frame), on peut exécuter, par exemple, 5 sous-pas de 3.3 ms chacun. Cela permet au système de résoudre les forces de manière beaucoup plus fine.

---

## **Partie 4 : Le TP - Construction du "Jelly Cube"**

**Objectif :** Mettre en pratique les concepts précédents pour construire un cube souple interactif.

#### **Étape 1 : La Classe `Particle`**

*   Créer une  `Particle` qui stocke :
    *   `position` (Vector3)
    *   `oldPosition` (Vector3, pour l'intégration de Verlet)
    *   `acceleration` (Vector3)
    *   `mass` (nombre)
    *   `mesh` (le `THREE.Mesh` de la sphère pour le rendu)
*   Implémenter les méthodes :
    *   `applyForce(force)` : Ajoute à l'accélération (divisée par la masse).
    *   `integrate(dt)` : Met à jour la position en utilisant la formule de Verlet.

#### **Étape 2 : La Grille de Particules (Notre "Hello, World!")**

*   Générer une grille 3D d'instances de notre classe `Particle`.
*   Dans la boucle `animate`, appliquer uniquement la gravité à chaque particule et appeler leur méthode `integrate()`.
*   **Résultat attendu :** Un nuage de particules qui tombent indépendamment les unes des autres.

#### **Étape 3 : La Topologie - Créer les Ressorts**

*   Créer une structure de données simple pour les ressorts : ` { particleA, particleB, restLength } `.
*   Remplir un tableau de ces ressorts en connectant les particules voisines :
    1.  **Ressorts Structurels :** Le long des axes X, Y, et Z.
    2.  **(Amélioration)** **Ressorts de Cisaillement :** En diagonale sur les faces, pour empêcher le cube de s'affaisser.

#### **Étape 4 : Le Cœur de la Simulation**

Mettre en place la boucle `animate` finale, qui orchestre le tout, idéalement avec des sub-steps :

```
Pour chaque sous-pas :
  1. Appliquer les forces externes (gravité) à toutes les particules.
  2. Calculer et appliquer les forces de tous les ressorts.
  3. Intégrer le mouvement de toutes les particules.
  4. Gérer les collisions avec le sol.
```
Après la boucle de sous-pas, mettre à jour la position des `THREE.Mesh` pour le rendu.

#### **Étape 5 : Le Contrôle**

*   Ajouter un GUI (`dat.GUI`) pour permettre de modifier en temps réel `stiffness` et `damping`.
*   Observer l'impact direct de ces paramètres sur le comportement "jiggly" du cube.