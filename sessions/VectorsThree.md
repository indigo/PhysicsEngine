Three.js offre des classes `Vector2`, `Vector3` (et `Vector4`) très complètes avec de nombreuses méthodes utiles, qui modifient souvent le vecteur *en place* (pour des raisons de performance, afin d'éviter de créer de nouveaux objets en permanence) et retournent `this` pour permettre le chaînage.

Voici une liste des méthodes les plus courantes et pratiques, principalement pour `Vector2` et `Vector3`. Beaucoup sont similaires entre les deux.

---

**Pour `THREE.Vector2` (et souvent applicable à `THREE.Vector3`)**

Un `Vector2` a les composantes `.x` et `.y`.
Un `Vector3` a les composantes `.x`, `.y`, et `.z`.

**1. Création et Initialisation**

*   `new THREE.Vector2(x, y)` ou `new THREE.Vector3(x, y, z)`
    *   Crée un nouveau vecteur avec les composantes spécifiées. Si non spécifiées, elles sont à 0.
*   `.set(x, y, [z])`
    *   Modifie les composantes du vecteur actuel.
    *   Ex: `monVecteur.set(10, 5);`
*   `.setScalar(scalar)`
    *   Met toutes les composantes (x, y, et z si Vector3) à la valeur `scalar`.
    *   Ex: `monVecteur.setScalar(0); // Équivaut à monVecteur.set(0,0);`
*   `.setX(x)`, `.setY(y)`, `.setZ(z)` (pour Vector3)
    *   Modifie une composante spécifique.
*   `.clone()`
    *   Crée et retourne une **nouvelle** instance du vecteur avec les mêmes composantes.
    *   Ex: `let nouveauVecteur = monVecteur.clone();`
*   `.copy(v)`
    *   Copie les composantes du vecteur `v` dans le vecteur actuel.
    *   Ex: `vecteurA.copy(vecteurB); // vecteurA a maintenant les valeurs de vecteurB`

**2. Opérations Arithmétiques (modifient le vecteur en place)**

*   `.add(v)`
    *   Ajoute les composantes du vecteur `v` à celles du vecteur actuel.
    *   Ex: `position.add(vitesse); // position = position + vitesse`
*   `.addScalar(s)`
    *   Ajoute `s` à chaque composante du vecteur actuel.
*   `.addVectors(a, b)`
    *   Définit le vecteur actuel comme la somme des vecteurs `a` et `b`.
    *   Ex: `resultat.addVectors(vec1, vec2); // resultat = vec1 + vec2`
*   `.addScaledVector(v, s)`
    *   Ajoute `v` multiplié par le scalaire `s` au vecteur actuel. Très utile en physique !
    *   Ex: `position.addScaledVector(vitesse, deltaTime); // position = position + vitesse * deltaTime`
*   `.sub(v)`
    *   Soustrait les composantes de `v` de celles du vecteur actuel.
*   `.subScalar(s)`
    *   Soustrait `s` de chaque composante.
*   `.subVectors(a, b)`
    *   Définit le vecteur actuel comme la différence `a - b`.
    *   Ex: `direction.subVectors(pointB, pointA); // direction de A vers B`
*   `.multiply(v)`
    *   Multiplie les composantes du vecteur actuel par celles de `v` (multiplication composante par composante, ou "Hadamard product").
*   `.multiplyScalar(s)`
    *   Multiplie chaque composante du vecteur actuel par le scalaire `s`.
    *   Ex: `vitesse.multiplyScalar(0.5); // Réduit la vitesse de moitié`
*   `.divide(v)`
    *   Divise les composantes du vecteur actuel par celles de `v` (division composante par composante).
*   `.divideScalar(s)`
    *   Divise chaque composante par `s`. Attention à ne pas diviser par zéro !

**3. Propriétés et Calculs (ne modifient généralement pas le vecteur en place, sauf indication contraire)**

*   `.length()`
    *   Retourne la magnitude (longueur) du vecteur.
    *   Ex: `let speed = velocity.length();`
*   `.lengthSq()`
    *   Retourne la magnitude au carré. Plus rapide que `.length()` car évite `Math.sqrt()`. Utile pour les comparaisons de distances.
    *   Ex: `if (force.lengthSq() > maxForceSq) { ... }`
*   `.normalize()`
    *   Modifie le vecteur pour qu'il ait une longueur de 1 (en conservant sa direction). **Modifie en place.**
    *   Ex: `direction.normalize();`
*   `.dot(v)`
    *   Retourne le produit scalaire entre le vecteur actuel et `v`. Utile pour calculer des angles, des projections.
    *   Ex: `let cosAngle = vecA.dot(vecB) / (vecA.length() * vecB.length());`
*   `.distanceTo(v)`
    *   Retourne la distance entre le point représenté par ce vecteur et le point `v`.
*   `.distanceToSquared(v)`
    *   Retourne la distance au carré. Plus rapide.
*   `.angleTo(v)` (pour `Vector2`)
    *   Retourne l'angle (en radians) entre ce vecteur et le vecteur `v`. Le résultat est toujours positif.
*   `.angle()` (pour `Vector2` uniquement)
    *   Retourne l'angle (en radians) du vecteur par rapport à l'axe X positif, dans l'intervalle `(-PI, PI]`.

**4. Comparaison**

*   `.equals(v)`
    *   Retourne `true` si les composantes de ce vecteur sont égales à celles de `v`.
*   `.isZero()` (pas une méthode native, mais facile à implémenter)
    *   Vous pouvez vérifier `if (vec.x === 0 && vec.y === 0)` ou `if (vec.lengthSq() < epsilon)`

**5. Manipulation et Utilitaires (modifient souvent en place)**

*   `.negate()`
    *   Inverse le signe de chaque composante. `v.negate()` est équivalent à `v.multiplyScalar(-1)`. **Modifie en place.**
*   `.lerp(v, alpha)`
    *   Effectue une interpolation linéaire entre ce vecteur et `v`. `alpha` est le pourcentage d'interpolation (0 = ce vecteur, 1 = v). **Modifie en place.**
    *   Ex: `currentPos.lerp(targetPos, 0.1); // Déplace currentPos de 10% vers targetPos`
*   `.min(v)`
    *   Pour chaque composante, prend la valeur minimale entre celle du vecteur actuel et celle de `v`. **Modifie en place.**
*   `.max(v)`
    *   Idem, mais avec la valeur maximale. **Modifie en place.**
*   `.clamp(minVec, maxVec)`
    *   Limite les composantes du vecteur actuel pour qu'elles soient entre les composantes correspondantes de `minVec` et `maxVec`. **Modifie en place.**
*   `.clampScalar(minVal, maxVal)`
    *   Limite chaque composante du vecteur actuel pour qu'elle soit entre `minVal` et `maxVal`. **Modifie en place.**
*   `.clampLength(min, max)`
    *   Si la longueur du vecteur est inférieure à `min`, elle est augmentée à `min`. Si supérieure à `max`, elle est réduite à `max`. **Modifie en place.**
*   `.floor()`, `.ceil()`, `.round()`, `.roundToZero()`
    *   Applique les fonctions mathématiques correspondantes à chaque composante. **Modifient en place.**

---

**Spécificités de `THREE.Vector3`**

En plus de la plupart des méthodes ci-dessus (adaptées pour 3 composantes), `Vector3` a des méthodes spécifiques à la 3D :

*   `.cross(v)`
    *   Calcule le produit vectoriel entre ce vecteur et `v`, et stocke le résultat dans ce vecteur. **Modifie en place.**
    *   Ex: `normal.crossVectors(vecA, vecB); // normal est perpendiculaire à A et B`
*   `.crossVectors(a, b)`
    *   Définit ce vecteur comme le produit vectoriel de `a` et `b`.
*   `.projectOnVector(v)`
    *   Projette ce vecteur sur le vecteur `v`. **Modifie en place.**
*   `.projectOnPlane(planeNormal)`
    *   Projette ce vecteur sur un plan défini par sa normale `planeNormal` (qui doit être unitaire). **Modifie en place.**
*   `.reflect(normal)`
    *   Réfléchit ce vecteur par rapport à un plan défini par sa normale `normal` (qui doit être unitaire). **Modifie en place.** Utile pour les rebonds.
*   `.applyMatrix3(m)`
    *   Multiplie ce vecteur par une matrice 3x3 `m`. Utile pour les rotations (sans translation). **Modifie en place.**
*   `.applyMatrix4(m)`
    *   Transforme ce vecteur par une matrice 4x4 `m` (qui peut inclure rotation, translation, échelle). Gère la perspective. **Modifie en place.**
*   `.applyQuaternion(q)`
    *   Applique une rotation définie par le quaternion `q` à ce vecteur. **Modifie en place.**
*   `.project(camera)`
    *   Projette ce vecteur (interprété comme un point dans l'espace 3D) dans l'espace normalisé du dispositif (NDC) de la caméra. **Modifie en place.**
*   `.unproject(camera)`
    *   Fait l'inverse de `.project()`. **Modifie en place.**
*   `.angleTo(v)` (pour `Vector3`)
    *   Retourne l'angle (en radians, non signé, entre 0 et PI) entre ce vecteur et le vecteur `v`.

---

**Conseils d'utilisation :**

1.  **Attention aux modifications en place :** Beaucoup de méthodes modifient le vecteur sur lequel elles sont appelées. Si vous avez besoin de conserver la valeur originale, utilisez `.clone()` d'abord :
    ```javascript
    let direction = vitesse.clone().normalize(); // vitesse n'est pas modifiée
    ```
2.  **Chaînage :** Comme beaucoup de méthodes retournent `this`, vous pouvez les enchaîner :
    ```javascript
    monVecteur.add(autreVecteur).multiplyScalar(2).normalize();
    ```
3.  **Performance :** Utilisez `.lengthSq()` et `.distanceToSquared()` pour les comparaisons lorsque la valeur exacte de la longueur/distance n'est pas nécessaire, car cela évite un `Math.sqrt()` coûteux.
4.  **`Vector2` vs `Vector3` pour la 2D :** Dans ton code, tu utilises `THREE.Vector2` pour la physique 2D (`pos`, `vel`), ce qui est une excellente pratique. Tu mappes ensuite `pos.x` et `pos.y` (de la simu 2D) sur `mesh.position.x` et `mesh.position.z` (de Three.js 3D).

La documentation officielle de Three.js est la référence :
*   `Vector2`: [https://threejs.org/docs/#api/en/math/Vector2](https://threejs.org/docs/#api/en/math/Vector2)
*   `Vector3`: [https://threejs.org/docs/#api/en/math/Vector3](https://threejs.org/docs/#api/en/math/Vector3)