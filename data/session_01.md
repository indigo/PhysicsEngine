# Session 1: Introduction et Mathématiques Essentielles (4 blocs)

---

Physique dans le Jeu Vidéo - Session 1: Introduction et Mathématiques Essentielles (avec Rapier)

Bienvenue ! Ce cours vous plongera dans la physique des jeux vidéo, en utilisant Rapier, un moteur physique performant en Rust, facilement utilisable dans le navigateur. Nous allons explorer les bases de la physique pour créer des expériences de jeu immersives et réalistes.

![Background image with moving shapes and Rapier logo](../images/intro.png)

---

Qu'allez-vous apprendre ?

- Comprendre les principes de la physique classique.
- Appliquer ces principes à la création de jeux vidéo.
- Utiliser **Rapier** (dans le navigateur) pour simuler des objets physiques.
- Développer des compétences en programmation orientées physique.

![Pyramid representing the course structure](../images/pyramide.png)

---

Comment se déroulera le cours ?

- 10 Sessions, 4 blocs par session.
- **Évaluation :**
  - Devoirs (30%) : Implémentations pratiques.
  - Examen de Mi-Session (30%) : Quiz Théorique
  - Examen Final (30%) : Théorie + Application (jeu complet).
- Accès aux ressources : (Livre de référence, Documentation Rapier, Forum en ligne).

![Calendar showing the course schedule](images/course_calendar.png)

---

La Physique : Plus que des explosions !

- L'immersion : le réalisme améliore l'expérience du joueur.
- Le gameplay : Nouvelles mécaniques de jeu, interactions dynamiques.
- Exemples : _The Legend of Zelda: Breath of the Wild_, _Portal_, _Angry Birds_ (rappeler que ces jeux sont toujours des exemples).

![Game screenshots showcasing physics](../images/example_01.png)

---

Vecteurs : Le GPS des Objets Virtuels

- Les vecteurs : Magnitude (longueur) et direction.
- Décrivent la position, la vitesse, l'accélération, les forces.
- Essentiels pour décrire le mouvement et les interactions.

![2D plane with position and velocity vectors](../images/vectors.png)

- Références: https://www.youtube.com/@3blue1brown

---

Déplacements et Différences

- **Addition :** $\vec{a} + \vec{b}$ (tête-bêche, parallélogramme).
- **Soustraction :** $\vec{a} - \vec{b}$.
- Utilisation : Déplacer un objet, trouver la distance entre deux points.

![Vector addition and subtraction](../images/addition.png)

---

Changer la Vitesse ou la Force

- $k \vec{a}$ : Modification de la _magnitude_ (longueur) du vecteur.
- $k > 1$ : "Accélérer" / Augmenter la force.
- $0 < k < 1$ : "Ralentir" / Diminuer la force.
- $k < 0$ : Inverser la direction.

![Scalar multiplication of a vector](../images/dim2.png)

---

Le secret des angles

- Explication du produit scalaire : Formule et explication géométrique (projection).
  $\vec{a}⋅ \vec{b} =∣a∣.∣b∣.cosθ$
- Exemples : Déterminer l'angle entre des vecteurs, l'éclairage (survol).
- Si proche de 1 : même direction ; -1 : directions opposées ; 0 : perpendiculaires.

![Two vectors with an angle θ and projection](../images/dot.png)

---

Rotation et Orientation

- En 2D : Calcul du sens d'une rotation (sens horaire ou anti-horaire).
- Applications : Utile pour le sens des rotations.

![Two vectors indicating rotation direction](images/cross_product_2d.png)

---

Le Rythme du Mouvement

- Vitesse : Dérivée de la position par rapport au temps ($\vec{v} = \frac{d\vec{x}}{dt}$).
- Accélération : Dérivée de la vitesse par rapport au temps ($\vec{a} = \frac{d\vec{v}}{dt}$).

![Object in motion with velocity and acceleration vectors](images/velocity_acceleration.png)

---

L'Inversion du Temps

- Position : Intégrale de la vitesse.
- Vitesse : Intégrale de l'accélération.
- Lien avec l'intégration numérique (concept général).

![Curve representing velocity and area under the curve](images/integration.png)

---

Bienvenue dans Rapier ! (dans le navigateur)

- Présentation du framework.
- Lien vers les ressources et la documentation.

![Screenshot of the browser](images/browser_screenshot.png)

---

Votre premier objet physique !

- Explication du code "Hello World" simplifié en Rapier.
- Classes clés : _RigidBody_, _Collider_, _PhysicsWorld_.
- (Mettre en évidence le code HTML, JS).

![A simple square falling under gravity in a web environment](images/falling_square_rapier.png)

---

Activité : Bouger un Carré (Ouverture de la session 2)

- Activité : Modifier les valeurs pour faire bouger le carré.
- Préparer les équations de la session 2, et les faire jouer.
- Questions et réponses

![Result of the activity](images/activity_result.png)
