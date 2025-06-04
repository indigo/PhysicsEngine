
**Explication Détaillée de la Physique dans `updatePhysics(dt)` pour la Collision de Deux Palets**

La fonction `updatePhysics(dt)` est le cœur de notre simulation. Elle est appelée à chaque "pas de temps" `dt` pour calculer le nouvel état de nos palets. Concentrons-nous sur la partie qui gère la détection et la réponse à la collision entre les palets A et B.

```javascript
// Dans updatePhysics(dt), après la mise à jour initiale des positions par addScaledVector :

// --- Détection et Réponse à la Collision entre Palet A et Palet B ---

// 1. Calcul du Vecteur entre les Centres et de la Distance
let tempCollisionNormalVec2 = new THREE.Vector2().subVectors(posB, posA); 
const distSq = tempCollisionNormalVec2.lengthSq(); 
const sumRadii = simParams.radiusA + simParams.radiusB;
const sumRadiiSq = sumRadii * sumRadii;

// 2. Test de Collision
if (distSq < sumRadiiSq && distSq > 0.000001 && !collisionOccurredThisRun) { 
    // Une collision est détectée ET c'est la première de cette "run" !
    
    collisionOccurredThisRun = true; // On marque cette collision comme "enregistrée"
    const dist = Math.sqrt(distSq); // Distance réelle entre les centres

    // 3. Calcul de la Normale de Collision Unitaire (n̂)
    tempCollisionNormalVec2.divideScalar(dist); // Normalise le vecteur (pointe de A vers B)
                                               // C'est notre n̂, la direction de l'impact.

    // 3.a. Stockage des Informations pour la Visualisation Statique de l'Impact
    paletAPosAtCollision_vis.set(posA.x, PALET_THICKNESS/2, posA.y); // Position de A à l'impact
    paletBPosAtCollision_vis.set(posB.x, PALET_THICKNESS/2, posB.y); // Position de B à l'impact
    collisionPointNormal.set(tempCollisionNormalVec2.x, 0, tempCollisionNormalVec2.y); // Normale en Vector3
    const midPointVec2 = new THREE.Vector2().addVectors(posA, posB).multiplyScalar(0.5);
    collisionPointMid.set(midPointVec2.x, PALET_THICKNESS + 0.05, midPointVec2.y); // Point pour afficher la flèche normale

    // 4. Résolution de l'Interpénétration (calcul et application du MTV)
    const penetrationDepth = sumRadii - dist; // De combien ils se chevauchent
    let mtvA_temp_vec2 = new THREE.Vector2(); // Vecteur de correction pour A
    let mtvB_temp_vec2 = new THREE.Vector2(); // Vecteur de correction pour B

    if (penetrationDepth > 0) {
        const totalInverseMass = (massA > 0.00001 ? 1/massA : 0) + (massB > 0.00001 ? 1/massB : 0);
        if (totalInverseMass > 0.00001) {
            // Proportion du déplacement pour A (inversement proportionnel à sa masse)
            const pushA_factor = (massA > 0.00001 ? (1/massA) / totalInverseMass : 0);
            // Proportion du déplacement pour B
            const pushB_factor = (massB > 0.00001 ? (1/massB) / totalInverseMass : 0);
            
            // Vecteur de déplacement pour A (opposé à la normale, car n̂ va de A vers B)
            mtvA_temp_vec2.copy(tempCollisionNormalVec2).multiplyScalar(-penetrationDepth * pushA_factor);
            // Vecteur de déplacement pour B (dans le sens de la normale)
            mtvB_temp_vec2.copy(tempCollisionNormalVec2).multiplyScalar(penetrationDepth * pushB_factor);
            
            // Appliquer la correction aux positions PHYSIQUES des palets
            posA.add(mtvA_temp_vec2); 
            posB.add(mtvB_temp_vec2);

            // Stocker les MTV appliqués pour la visualisation
            mtvAppliedA_vis.set(mtvA_temp_vec2.x, 0, mtvA_temp_vec2.y);
            mtvAppliedB_vis.set(mtvB_temp_vec2.x, 0, mtvB_temp_vec2.y);
        }
    }

    // 5. Réponse Impulsionnelle aux Vitesses (Changement de Vitesses)
    // On travaille maintenant avec les vitesses des objets (velA, velB) qui sont des Vector2.

    // 5.a. Projection des Vitesses Initiales sur la Normale de Collision
    // Ceci nous donne les composantes scalaires des vitesses le long de la ligne d'impact.
    const velA_n_scalar = velA.dot(tempCollisionNormalVec2); // v_A ⋅ n̂
    const velB_n_scalar = velB.dot(tempCollisionNormalVec2); // v_B ⋅ n̂

    // 5.b. Vérifier si les objets s'approchent réellement (avant d'appliquer la réponse)
    // Si la vitesse relative le long de la normale (v_B_n - v_A_n) est positive,
    // ils s'éloignent déjà le long de cet axe, donc pas besoin de réponse impulsionnelle.
    // On utilise une petite tolérance (epsilon) pour les erreurs de flottants.
    const relativeNormalVelocity = velB_n_scalar - velA_n_scalar;
    if (relativeNormalVelocity < -0.0001) { // S'ils s'approchent (vitesse relative négative)
    
        // 5.c. Application des Formules de Collision 1D (Conservation de la Quantité de Mouvement et Coefficient de Restitution)
        // Ces formules calculent les NOUVELLES composantes scalaires des vitesses le long de la normale.
        const e = simParams.restitution; // Coefficient de restitution
        const m1 = massA;               // Masse du palet A
        const m2 = massB;               // Masse du palet B
        
        // Précaution : Si la masse totale est négligeable, on ne fait rien.
        if ( (m1 + m2) > 0.00001 ) {
            // Vitesse normale finale de A : v'_An = [v_An(m1 - e*m2) + v_Bn(m2*(1+e))] / (m1 + m2)
            const new_velA_n_scalar = (velA_n_scalar * (m1 - e*m2) + (1 + e) * m2 * velB_n_scalar) / (m1 + m2);
            // Vitesse normale finale de B : v'_Bn = [v_Bn(m2 - e*m1) + v_An(m1*(1+e))] / (m1 + m2)
            const new_velB_n_scalar = (velB_n_scalar * (m2 - e*m1) + (1 + e) * m1 * velA_n_scalar) / (m1 + m2);

            // 5.d. Calcul du Changement de Vitesse le long de la Normale pour chaque palet
            const delta_velA_n = new_velA_n_scalar - velA_n_scalar; // Δv_An = v'_An - v_An
            const delta_velB_n = new_velB_n_scalar - velB_n_scalar; // Δv_Bn = v'_Bn - v_Bn

            // 5.e. Application de ce changement aux vecteurs vitesse complets
            // Les composantes tangentielles des vitesses (perpendiculaires à n̂)
            // ne sont pas modifiées dans ce modèle de collision simple sans frottement.
            // En ajoutant un vecteur (Δv_n * n̂) à la vitesse originale, on modifie
            // uniquement sa composante le long de n̂.
            velA.addScaledVector(tempCollisionNormalVec2, delta_velA_n);
            velB.addScaledVector(tempCollisionNormalVec2, delta_velB_n);
        }
    } // Fin du if (s'ils s'approchent)
} // Fin du if (collision ET !collisionOccurredThisRun) pour le traitement de la première collision
```

---

**Explication Détaillée des Étapes Numérotées :**

1.  **Calcul du Vecteur entre les Centres et de la Distance :**
    *   `tempCollisionNormalVec2 = new THREE.Vector2().subVectors(posB, posA);`
        *   On crée un vecteur 2D qui va du centre du palet A (`posA`) au centre du palet B (`posB`). Ce vecteur est fondamental car il définit la ligne d'impact potentiel.
    *   `const distSq = tempCollisionNormalVec2.lengthSq();`
        *   On calcule le carré de la longueur de ce vecteur. Utiliser `lengthSq()` (longueur au carré) est plus rapide que `length()` (qui implique une racine carrée) si l'on a seulement besoin de comparer des distances.
    *   `const sumRadii = simParams.radiusA + simParams.radiusB;`
    *   `const sumRadiiSq = sumRadii * sumRadii;`
        *   On calcule la somme des rayons des deux palets, puis son carré pour la comparaison avec `distSq`.

2.  **Test de Collision :**
    *   `if (distSq < sumRadiiSq && distSq > 0.000001 && !collisionOccurredThisRun)`
        *   `distSq < sumRadiiSq` : Si le carré de la distance entre les centres est inférieur au carré de la somme des rayons, cela signifie que la distance est inférieure à la somme des rayons, donc les cercles se chevauchent ou se touchent. **C'est la condition de collision principale.**
        *   `distSq > 0.000001` : Une petite précaution pour éviter les problèmes si les centres des palets sont *exactement* au même endroit (distance nulle), ce qui pourrait causer une division par zéro plus tard lors de la normalisation du vecteur.
        *   `!collisionOccurredThisRun` : Cette condition assure que nous ne traitons et "figeons" les informations que pour la **première collision** détectée depuis le dernier reset.

3.  **Calcul de la Normale de Collision Unitaire ($\hat{n}$) :**
    *   `const dist = Math.sqrt(distSq);` : Maintenant que nous savons qu'il y a collision, nous calculons la distance réelle `dist` (avec la racine carrée).
    *   `tempCollisionNormalVec2.divideScalar(dist);` : On divise le vecteur `tempCollisionNormalVec2` (qui allait de A vers B) par sa propre longueur `dist`. Cela transforme `tempCollisionNormalVec2` en un **vecteur unitaire** (de longueur 1) qui conserve la même direction. Ce vecteur unitaire est la **normale de collision $\hat{n}$**. Elle pointe toujours du centre de A vers le centre de B.

    *   **3.a. Stockage des Informations pour la Visualisation :**
        *   À ce stade, comme `collisionOccurredThisRun` vient de devenir `true`, on enregistre les positions actuelles des palets (`posA`, `posB`) dans `paletAPosAtCollision_vis` et `paletBPosAtCollision_vis`. Ces positions sont celles *avant* la correction de la pénétration.
        *   On stocke aussi la `tempCollisionNormalVec2` (convertie en `Vector3` pour Three.js) dans `collisionPointNormal`, et le point médian entre les palets dans `collisionPointMid` pour savoir où dessiner la flèche normale.

4.  **Résolution de l'Interpénétration (MTV) :**
    *   `const penetrationDepth = sumRadii - dist;` : Calcule de combien les cercles se "pénètrent" le long de la normale. Si `dist < sumRadii`, alors `penetrationDepth` est positive.
    *   `if (penetrationDepth > 0)` : On effectue la correction seulement s'il y a réellement pénétration.
    *   `const totalInverseMass = ...` : On calcule la somme des inverses des masses. L'inverse de la masse ($1/m$) peut être vu comme une mesure de la "mobilité" d'un objet (un objet de masse infinie a une mobilité nulle).
    *   `const pushA_factor = ...`, `const pushB_factor = ...` : Ces facteurs déterminent quelle proportion de la correction totale chaque palet va subir. Ils sont calculés pour que l'objet le plus léger bouge davantage. Par exemple, si $m_A$ est très petite et $m_B$ est très grande, $1/m_A$ sera grand, $1/m_B$ sera petit. Donc, `pushA_factor` sera proche de 1 (A subit presque toute la correction) et `pushB_factor` sera proche de 0 (B ne bouge presque pas).
    *   `mtvA_temp_vec2.copy(tempCollisionNormalVec2).multiplyScalar(-penetrationDepth * pushA_factor);` : Le vecteur de déplacement (MTV) pour A est dans la direction opposée à $\hat{n}$ (car $\hat{n}$ pointe de A vers B).
    *   `mtvB_temp_vec2.copy(tempCollisionNormalVec2).multiplyScalar(penetrationDepth * pushB_factor);` : Le MTV pour B est dans la direction de $\hat{n}$.
    *   `posA.add(mtvA_temp_vec2); posB.add(mtvB_temp_vec2);` : Les positions physiques des palets sont corrigées pour éliminer l'interpénétration.
    *   `mtvAppliedA_vis.set(...)`, `mtvAppliedB_vis.set(...)` : Les MTV calculés sont stockés pour être visualisés par les flèches vertes.

5.  **Réponse Impulsionnelle aux Vitesses (Changement de Vitesses) :**
    *   Maintenant que les palets sont positionnés comme s'ils se touchaient juste tangentiellement (grâce à la résolution de pénétration), nous calculons comment leurs vitesses vont changer à cause de l'impact.
    *   **5.a. Projection des Vitesses Initiales sur la Normale :**
        *   `const velA_n_scalar = velA.dot(tempCollisionNormalVec2);` : Calcule $v_{An}$, la composante de la vitesse de A *le long de la normale $\hat{n}$*.
        *   `const velB_n_scalar = velB.dot(tempCollisionNormalVec2);` : Calcule $v_{Bn}$, la composante de la vitesse de B *le long de la normale $\hat{n}$*.
        *   Ces valeurs scalaires nous disent à quelle vitesse chaque palet se déplace vers (ou s'éloigne de) l'autre le long de la ligne d'impact.
    *   **5.b. Vérifier s'ils s'approchent :**
        *   `const relativeNormalVelocity = velB_n_scalar - velA_n_scalar;` : C'est la vitesse de B par rapport à A, le long de la normale.
        *   `if (relativeNormalVelocity < -0.0001)` : On applique la réponse (le rebond) seulement si cette vitesse relative est négative, ce qui signifie que les palets **s'approchent l'un de l'autre** le long de la normale (ou que B s'approche de A plus vite que A ne s'éloigne de B dans la même direction, etc.). Une petite tolérance négative est utilisée pour éviter les problèmes de flottants si les vitesses sont presque nulles. S'ils s'éloignent déjà, l'impact a déjà eu lieu ou est en train de se terminer, et on ne veut pas les "retirer" l'un vers l'autre.
    *   **5.c. Application des Formules de Collision 1D :**
        *   Ici, on utilise les formules classiques pour une collision 1D élastique ou inélastique, appliquées *uniquement* aux composantes normales des vitesses. Ces formules proviennent de la résolution simultanée de l'équation de conservation de la quantité de mouvement (le long de $\hat{n}$) et de l'équation définissant le coefficient de restitution $e$ (aussi le long de $\hat{n}$).
        *   `const new_velA_n_scalar = ...`
        *   `const new_velB_n_scalar = ...`
        *   Ces lignes calculent quelles seraient les nouvelles composantes scalaires des vitesses le long de la normale $\hat{n}$ après l'impact, en tenant compte de leurs masses ($m1, m2$) et du coefficient de restitution ($e$).
    *   **5.d. Calcul du Changement de Vitesse le long de la Normale :**
        *   `const delta_velA_n = new_velA_n_scalar - velA_n_scalar;`
        *   `const delta_velB_n = new_velB_n_scalar - velB_n_scalar;`
        *   Ces `delta` représentent le *changement* net à apporter à la composante normale de la vitesse de chaque palet pour atteindre les nouvelles vitesses post-collision.
    *   **5.e. Application de ce changement aux Vecteurs Vitesse Complets :**
        *   `velA.addScaledVector(tempCollisionNormalVec2, delta_velA_n);`
        *   `velB.addScaledVector(tempCollisionNormalVec2, delta_velB_n);`
        *   On ajoute le vecteur `delta_v_n * n̂` (qui est `tempCollisionNormalVec2` multiplié par `delta_velA_n` ou `delta_velB_n`) au vecteur vitesse original de chaque palet.
        *   **Pourquoi cela fonctionne :** Les composantes des vitesses *tangentielles* (perpendiculaires à $\hat{n}$) ne sont pas affectées par ce modèle de collision centrale sans frottement. Donc, en modifiant seulement la partie de la vitesse qui est *le long de la normale*, nous mettons à jour correctement le vecteur vitesse total pour simuler le rebond.

En résumé, cette section de code :
1.  Détecte si les palets se touchent.
2.  Si c'est la première collision de la simulation en cours, elle stocke les informations de cet impact.
3.  Corrige toute interpénétration en repoussant les palets.
4.  Calcule et applique les changements de vitesse dus à l'impact, en se basant sur la physique des collisions le long de la normale.

C'est une implémentation assez complète (pour un niveau introductif) de la détection et de la réponse pour une collision cercle-cercle !