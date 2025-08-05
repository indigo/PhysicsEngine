### **Partie A : Questionnaire Théorique **

**Instructions :** Répondez directement sur cette feuille. Soyez clair et concis. Garder le format .md.

---

**Section 1 : Dynamique et Simulation (10 points)**

**1. La Première Loi de Newton (Loi de l'Inertie) **
   Dans une boucle de simulation utilisant l'intégration d'Euler (`v = v + a * dt`), que se passe-t-il si la force nette appliquée à un objet devient nulle (`F_net = 0`) ? Comment cela démontre-t-il la loi de l'inertie ?

**2. La Finalité de la Simulation **
   Quelle est la grandeur physique finale que nous cherchons à calculer à chaque pas de temps pour pouvoir afficher un objet à l'écran ? Expliquez pourquoi, dans certaines méthodes d'intégration comme celle de Verlet, le calcul explicite de la vitesse n'est pas nécessaire pour y parvenir.

**3. Application d'une Force : la Résistance de l'Air (Drag) **
   La résistance de l'air est souvent modélisée comme une force qui s'oppose au mouvement (`F_drag = -k * v`). Comment implémenteriez-vous cette force dans une boucle de simulation ? (Une description en pseudo-code ou en une phrase suffit).

---

**Section 2 : Intégration Numérique et Stabilité **

**4. Stabilité Temporelle : Boucle de Jeu vs. Boucle de Physique **
   La boucle de rendu d'un jeu s'exécute à un `delta time` variable, qui peut devenir grand lors d'une chute de framerate. La simulation physique, elle, gagne en précision avec un `delta time` petit et constant.

   *   a) Quel est le principal problème d'**imprécision** si on exécute la physique une seule fois en utilisant un grand `delta time` variable ? (2 points)
   *   b) Décrivez la technique de l'**accumulateur de temps** qui permet de résoudre ce problème. Expliquez comment cette technique mène naturellement au concept de **"sous-étapes"** (sub-steps) de physique. (2 points)

**5. Intégration d'Euler Semi-Implicite **
   L'intégration d'Euler **semi-implicite** est plus stable que l'Euler simple.
   *   a) Quelle est la seule différence dans l'ordre des calculs entre ces deux méthodes ? (2 points)
   *   b) Pourquoi ce simple changement améliore-t-il la stabilité (en particulier pour des objets en orbite ou attachés à des ressorts) ? (2 points)

---

**Section 3 : Collisions et Moteur Physique **

**6. Détection de Collision (Narrow-Phase) **
   Citez **deux algorithmes ou techniques** qui peuvent être utilisés durant la **Narrow-Phase** pour déterminer si deux formes géométriques simples (ex: sphères, boîtes) se chevauchent.

**7. Propriétés des Corps Rigides (QCM)**
   Quelle propriété physique représente la résistance d'un corps à un changement de son état de rotation ?
   a) La masse
   b) Le moment de force (torque)
   c) La quantité de mouvement
   d) Le moment d'inertie

**8. Broad-Phase vs. Narrow-Phase **
   Expliquez le rôle de la **Broad-Phase** dans un moteur physique. Pourquoi est-elle indispensable pour la performance quand il y a de nombreux objets dans une scène ?

**9. Contraintes et Corps Souples **
   Comment un système masse-ressort permet-il de simuler un corps déformable en utilisant uniquement des corps rigides et des contraintes ?

---

**Section 4 : Boîte à Outils Mathématiques **

**10. Produit Scalaire (Dot Product) **
    À quoi peut servir le produit scalaire entre deux vecteurs unitaires (normalisés) dans un contexte de jeu vidéo ? Citez une application concrète.

**11. Produit Vectoriel (Cross Product) **
    Si vous avez un vecteur `direction` et un vecteur `up` (qui pointe vers le haut), quelle information utile le produit vectoriel `direction x up` vous donne-t-il ? Citez une application concrète.

**12. Normalisation d'un Vecteur **
    Qu'est-ce que la "normalisation" d'un vecteur et pourquoi est-ce une opération si courante en physique de jeu ?

**13. Interpolation Linéaire (Lerp) **
    La fonction `lerp(a, b, t)` calcule un point entre `a` et `b`. Que se passe-t-il si le paramètre `t` est `0` ? Et s'il est `0.5` ?
