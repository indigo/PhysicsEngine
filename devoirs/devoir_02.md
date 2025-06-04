
## **Devoir 2 : Simulation de Collisions Multi-Palets et Optimisation**

**Date de Remise :** 10 juin 2025

**Objectif Principal :**

Ce devoir consiste à compléter la physique des collisions entre plusieurs palets dans une simulation 2D. Vous implémenterez la détection, la résolution des interpénétrations, et le calcul des nouvelles vitesses après impact, en utilisant les principes de conservation et le coefficient de restitution. La simulation utilise déjà une grille spatiale ("broad phase") pour optimiser la détection ; vous observerez son efficacité.

**Scénario :**

Une simulation de type "mini-billard" où des palets interagissent sur une surface avec des murs et subissent un frottement. Un palet joueur peut être lancé pour heurter des palets cibles disposés en triangle.
Une broad phase simple est déjà implémentée et vous permet de voir le nombre de tests de collision, ce qui va vous aider à comprendre l'efficacité de cette approche lorsque le nombre de palets augmente.

**Votre Tâche :**

Attention il y a aussi des questions à la fin de ce document auquelles vous devez répondre dans un document séparé, ou en commentaires dans le code.

Concentrez-vous sur la fonction `updatePhysics()` dans le fichier template fourni. À l'intérieur de la boucle qui traite les paires de palets `(p1, p2)` candidates pour une collision (identifiées par la grille) :

1.  **Détection de Collision (Cercle-Cercle) :**
    *   Déterminez si `p1` et `p2` se chevauchent en comparant la distance entre leurs centres à la somme de leurs rayons.

2.  **Si une collision est détectée :**
    *   **Préparation :** Calculez la distance exacte et la normale de collision.
    *   **Résolution de l'Interpénétration (MTV) :** Modifiez les positions de `p1` et `p2` pour qu'ils ne se chevauchent plus, en répartissant le déplacement en fonction de leurs masses.
    *   **Calcul des Nouvelles Vitesses :** Modifiez les vecteurs vitesse `p1.vel` et `p2.vel`.
        *   Cette étape implique de considérer les composantes des vitesses le long de la normale de collision.
        *   Vous utiliserez le **coefficient de restitution ($e$)** et les masses des palets pour déterminer comment ces composantes normales des vitesses sont modifiées par l'impact.
        *   *(Une explication détaillée sur la dérivation et l'application des formules pour les nouvelles vitesses normales est fournie dans un document/section séparé(e).)*

**Instructions Générales :**

*   Suivez les commentaires `// TODO ÉTUDIANT - ...` dans le template. Ils vous guideront à travers les étapes spécifiques.
*   Utilisez les propriétés des objets `palet` (`.pos`, `.vel`, `.radius`, `.mass`) et les méthodes des `THREE.Vector2`.
*   Le frottement, les collisions avec les murs, et la mise à jour de la grille (broad phase) sont déjà gérés.
*   Observez les statistiques affichées pour comprendre l'impact de la grille sur le nombre de tests de collision.

**Questions d'Observation et d'Analyse (à inclure dans votre rapport/commentaires) :**

**Concernant la Physique des Collisions :**

1.  **Effet du Coefficient de Restitution (`restitutionPalet`) :**
    *   Décrivez ce que vous observez en faisant varier `restitutionPalet` entre 0 et 1. Comment cela affecte-t-il le comportement des palets après une collision entre eux ? Quel est le lien avec l'énergie cinétique du système ?

2.  **Effet de la Masse (`paletFixedMass`) :**
    *   Si vous modifiez la `paletFixedMass` (rendant tous les palets plus lourds ou plus légers), comment cela semble-t-il influencer les collisions, en particulier si le palet joueur (qui a aussi cette masse) frappe un groupe de palets cibles ? (Note : Le *rapport* des masses est ce qui compte le plus dans les formules de collision, mais ici toutes les masses sont égales).

3.  **Phénomène de "Tunneling" (ou Transpercement) :**
    *   Augmentez considérablement la `launchForce` du palet joueur. Essayez également de diminuer fortement le `timeScale` pour ralentir la simulation visuellement (tout en gardant une grande force de lancement).
    *   Est-ce que vous observez des cas où le palet joueur semble "traverser" un autre palet sans qu'une collision ne soit correctement détectée et résolue ?
    *   Si oui, pourquoi pensez-vous que ce phénomène (appelé "tunneling" ou effet tunnel discret) se produit dans une simulation à pas de temps discrets ?
    *   Comment les "sous-pas de physique" (la variable `numSubSteps` dans la fonction `animate`) pourraient-ils aider à mitiger ce problème ? Essayez d'augmenter `numSubSteps` (par exemple à 5 ou 10) avec une `launchForce` élevée et un `timeScale` normal. Cela améliore-t-il la situation ? Expliquez pourquoi.

**Concernant la Broad Phase (Grille Spatiale) et les Performances :**

4.  **Efficacité de la Grille :**
    *   Avec un nombre modéré de palets (par exemple, `numTriangleRows = 5`), notez le "Ratio" de tests affiché.
    *   Augmentez significativement le nombre de palets (par exemple, `numTriangleRows = 10` ou plus si votre machine le supporte). Comment évolue le "Ratio" ? Est-ce que la grille devient plus ou moins efficace (en termes de pourcentage de tests économisés) lorsque le nombre total de palets augmente ? Expliquez votre observation.

5.  **Impact de la Taille des Cellules de la Grille (`gridCellSizeFactor`) :**
    *   Fixez un nombre de palets (par exemple, `numTriangleRows = 7`).
    *   Faites varier le `gridCellSizeFactor` :
        *   Utilisez une valeur **très petite** (ex: 1.5 ou 2.0, ce qui signifie que les cellules sont à peine plus grandes que le rayon des palets). Observez le nombre de `Narrow Tests`.
        *   Utilisez une valeur **très grande** (ex: 8.0 ou 10.0, ce qui signifie que les cellules sont beaucoup plus grandes que les palets, et pourraient même couvrir une grande partie de l'aire de jeu). Observez le nombre de `Narrow Tests`.
        *   Utilisez une valeur **moyenne** (ex: 4.0).
    *   Comment le `gridCellSizeFactor` influence-t-il le nombre de `Narrow Tests` et donc l'efficacité de la grille ? Quel semble être le compromis ?

6.  **Cas Limite pour la Grille :**
    *   Si vous mettez un `gridCellSizeFactor` tellement grand qu'il n'y a qu'une seule cellule pour toute l'aire de jeu (ou très peu de cellules), à quoi devrait tendre le "Ratio" de tests ? Vérifiez votre hypothèse.

**Questions de Réflexion (Optionnel, ou pour aller plus loin) :**

7.  **Limites de la Grille Uniforme :** Dans quelles situations une grille spatiale uniforme (comme celle implémentée) pourrait-elle ne pas être la solution de "broad phase" la plus optimale ? (Pensez à des distributions d'objets très inégales). Quelles autres structures de "broad phase" existent (juste les nommer si vous les connaissez de par le cours ou vos recherches) ?

---

**Conseil:**

*   Soyez précis dans vos observations.
*   Essayez de lier ce que vous voyez aux concepts théoriques vus en cours (conservation de l'énergie/quantité de mouvement, discrétisation du temps, compromis algorithmiques).
*   Pour les questions sur le "tunneling" et la grille, il n'y a pas forcément une "seule bonne réponse" pour les valeurs optimales, mais plutôt une compréhension des tendances et des compromis.

**Ce que vous devez remettre :**

*   Le fichier HTML/JavaScript complété.
*   Un bref rapport ou des commentaires clairs dans votre code expliquant votre implémentation des sections `TODO`, en particulier la logique de réponse à la collision.
*  N'oubliez pas de répondre aux questions d'observation et d'analyse.

Bonne chance !
