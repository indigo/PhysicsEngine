**Analyse Mathématique et Physique de la Détection et Réponse à la Collision entre Deux Palets Circulaires (A et B)**

La fonction `updatePhysics(dt)` gère l'évolution de l'état des palets. Nous allons détailler le processus de collision entre deux palets A et B, identifiés par leurs positions `posA`, `posB` (des `THREE.Vector2`), leurs vitesses `velA`, `velB` (des `THREE.Vector2`), leurs rayons `radiusA`, `radiusB`, et leurs masses `massA`, `massB`.

**1. Détection de Collision : Test d'Intersection Géométrique**

*   **1.a. Vecteur entre les Centres et Distance Carrée :**
    La première étape est de déterminer si les palets s'intersectent.
    ```javascript
    let tempCollisionNormalVec2 = new THREE.Vector2().subVectors(posB, posA);
    const distSq = tempCollisionNormalVec2.lengthSq();
    ```
    Ici, `tempCollisionNormalVec2` ($\vec{d}_{AB}$) est le vecteur allant du centre de A vers le centre de B ($\vec{d}_{AB} = \vec{posB} - \vec{posA}$).
    `distSq` ($d_{AB}^2$) est le carré de la distance entre les centres des palets. L'utilisation du carré de la distance évite un calcul de racine carrée, optimisant la comparaison.

*   **1.b. Condition de Collision :**
    La collision se produit si la distance entre les centres est inférieure à la somme de leurs rayons.
    ```javascript
    const sumRadii = simParams.radiusA + simParams.radiusB; // R_A + R_B
    const sumRadiiSq = sumRadii * sumRadii;                // (R_A + R_B)^2
    
    if (distSq < sumRadiiSq && distSq > 0.000001 /* ... autres conditions ... */) {
        // Collision détectée
    }
    ```
    La condition `distSq < sumRadiiSq` ($d_{AB}^2 < (R_A + R_B)^2$) confirme le chevauchement.
    La condition `distSq > 0.000001` est une précaution numérique pour éviter les problèmes si les centres coïncident (division par zéro ultérieure).

**2. Caractérisation de la Collision (si détectée et traitée)**

*   **2.a. Distance Réelle et Normale de Collision Unitaire :**
    Une fois la collision confirmée, nous calculons la distance réelle et la normale de collision.
    ```javascript
    const dist = Math.sqrt(distSq); // d_AB
    tempCollisionNormalVec2.divideScalar(dist); // n̂ = d_AB / ||d_AB||
    ```
    `tempCollisionNormalVec2` devient alors le vecteur unitaire $\hat{n}$, pointant de A vers B. C'est la **normale à la surface de contact** au point de collision (pour des sphères/cercles, elle passe par leurs centres).

*   **2.b. Informations pour Visualisation (non détaillé ici, mais conceptuellement important) :**
    Les positions des palets *au moment de l'impact* (avant correction) et la normale sont stockées pour un affichage ultérieur.

**3. Résolution de l'Interpénétration : Application du Vecteur de Translation Minimum (MTV)**

Étant donné que la simulation avance par pas de temps discrets ($\Delta t$), il est fréquent que les objets se soient déjà interpénétrés au moment où la collision est détectée. Il faut corriger cela.

*   **3.a. Profondeur de Pénétration :**
    ```javascript
    const penetrationDepth = sumRadii - dist; // p = (R_A + R_B) - d_AB
    ```
    `penetrationDepth` ($p$) est la mesure du chevauchement le long de la normale $\hat{n}$. Si $p > 0$, il y a pénétration.

*   **3.b. Répartition du Déplacement Correctif :**
    La correction est répartie entre les deux palets en fonction de l'inverse de leurs masses. Un objet plus léger sera repoussé davantage.
    ```javascript
    const totalInverseMass = (1/massA) + (1/massB); // (Si masses > 0)
    const pushA_factor = (1/massA) / totalInverseMass; // Proportion pour A
    const pushB_factor = (1/massB) / totalInverseMass; // Proportion pour B
    ```
    Si une masse est considérée comme infinie (par exemple, un mur statique, non applicable ici mais pour le concept), son `1/mass` serait nul, et elle ne serait pas déplacée.

*   **3.c. Calcul des Vecteurs de Déplacement (MTV) et Correction des Positions :**
    ```javascript
    // MTV pour A (opposé à n̂ car n̂ va de A vers B)
    mtvA_temp_vec2.copy(tempCollisionNormalVec2).multiplyScalar(-penetrationDepth * pushA_factor);
    // MTV pour B (dans le sens de n̂)
    mtvB_temp_vec2.copy(tempCollisionNormalVec2).multiplyScalar(penetrationDepth * pushB_factor);
    
    posA.add(mtvA_temp_vec2); // posA_corrigé = posA_initial + MTV_A
    posB.add(mtvB_temp_vec2); // posB_corrigé = posB_initial + MTV_B
    ```
    Les positions des palets sont ajustées pour qu'ils se touchent juste tangentiellement.

**4. Réponse aux Vitesses : Application du Modèle d'Impulsion**

Après avoir résolu la pénétration, on modifie les vitesses des palets pour simuler le rebond. Cela se base sur la conservation de la quantité de mouvement et le coefficient de restitution, appliqués le long de la normale de collision $\hat{n}$.

*   **4.a. Projection des Vitesses Initiales sur la Normale de Collision :**
    On isole les composantes des vitesses qui sont alignées avec la direction de l'impact.
    ```javascript
    const velA_n_scalar = velA.dot(tempCollisionNormalVec2); // v_An = v⃗_A ⋅ n̂
    const velB_n_scalar = velB.dot(tempCollisionNormalVec2); // v_Bn = v⃗_B ⋅ n̂
    ```
    $v_{An}$ et $v_{Bn}$ sont les vitesses scalaires de A et B le long de $\hat{n}$.

*   **4.b. Condition d'Approche :**
    On applique une réponse uniquement si les objets s'approchent le long de la normale.
    ```javascript
    const relativeNormalVelocity = velB_n_scalar - velA_n_scalar; // v_Bn - v_An
    if (relativeNormalVelocity < -0.0001) { // Si v_Bn - v_An < 0 (approche)
        // ... application de la réponse
    }
    ```
    Si $v_{Bn} - v_{An} \ge 0$, ils s'éloignent déjà ou glissent tangentiellement sans s'approcher davantage le long de $\hat{n}$.

*   **4.c. Application des Formules de Collision 1D pour les Vitesses Normales Finales :**
    Les nouvelles vitesses scalaires $v'_{An}$ et $v'_{Bn}$ le long de la normale $\hat{n}$ après l'impact sont calculées en utilisant :
    *   La conservation de la quantité de mouvement le long de $\hat{n}$ : $m_A v_{An} + m_B v_{Bn} = m_A v'_{An} + m_B v'_{Bn}$
    *   La définition du coefficient de restitution 
    
    ##  $e = \frac{v'_{Bn} - v'_{An}}{v_{An} - v_{Bn}}$

    La résolution de ce système d'équations donne :
    ```javascript
    const e = simParams.restitution;
    const m1 = massA; const m2 = massB;
    
    // v'_An = [v_An(m1 - e*m2) + (1 + e)*m2*v_Bn] / (m1 + m2)
    const new_velA_n_scalar = (velA_n_scalar * (m1 - e*m2) + (1 + e) * m2 * velB_n_scalar) / (m1 + m2);
    // v'_Bn = [v_Bn(m2 - e*m1) + (1 + e)*m1*v_An] / (m1 + m2)
    const new_velB_n_scalar = (velB_n_scalar * (m2 - e*m1) + (1 + e) * m1 * velA_n_scalar) / (m1 + m2);
    ```

*   **4.d. Calcul du Changement de Vitesse (Impulsion) le long de la Normale :**
    L'impulsion appliquée à chaque palet change sa quantité de mouvement le long de la normale. Le changement de vitesse est :
    ```javascript
    const delta_velA_n = new_velA_n_scalar - velA_n_scalar; // Δv_An = v'_An - v_An
    const delta_velB_n = new_velB_n_scalar - velB_n_scalar; // Δv_Bn = v'_Bn - v_Bn
    ```

*   **4.e. Application du Changement aux Vecteurs Vitesse Complets :**
    Les composantes tangentielles des vitesses (perpendiculaires à $\hat{n}$) sont inchangées dans ce modèle de collision centrale sans frottement. On met à jour les vecteurs vitesse en ajoutant le changement le long de la normale :
    ```javascript
    velA.addScaledVector(tempCollisionNormalVec2, delta_velA_n); // v⃗'_A = v⃗_A + Δv_An * n̂
    velB.addScaledVector(tempCollisionNormalVec2, delta_velB_n); // v⃗'_B = v⃗_B + Δv_Bn * n̂
    ```

**Résumé du Processus Physique et Mathématique :**

1.  **Détection Géométrique :** Vérifier si $d_{AB} < R_A + R_B$.
2.  **Calcul de la Normale :** Déterminer la direction de l'impact $\hat{n}$.
3.  **Correction de Pénétration (MTV) :** Repositionner les objets pour qu'ils se touchent tangentiellement, en distribuant le déplacement proportionnellement à l'inverse de leurs masses.
    $\Delta\vec{p}_A = -p \cdot \frac{m_B}{m_A+m_B} \cdot \hat{n}$
    $\Delta\vec{p}_B = +p \cdot \frac{m_A}{m_A+m_B} \cdot \hat{n}$ (pour $m_A, m_B > 0$)
4.  **Réponse aux Vitesses (Impulsion) :** Modifier les composantes des vitesses le long de $\hat{n}$ en utilisant la conservation de la quantité de mouvement et le coefficient de restitution $e$. Les composantes tangentielles restent inchangées.
    $\vec{v}' = \vec{v}_{tangentiel} + \vec{v}'_{normal}$

Ce processus décompose la collision complexe en une série d'étapes gérables, basées sur des principes physiques fondamentaux.

---

Cette version se concentre davantage sur les équations et la justification physique derrière chaque étape du code, ce qui devrait être bien adapté pour une explication en cours.