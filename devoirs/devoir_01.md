**Devoir 1 : Simulation Manuelle d'un "Lanceur Rotatif"**

**Date de Remise :** [3 Juin 2025]

**Objectif du Devoir :**

Mettre en œuvre une simulation 2D (en fait 3D mais dans un plan) complète et **manuelle** d'un projectile lancé par un mécanisme rotatif simple. Ce devoir vous demandera d'appliquer les principes de :

1.  **Cinématique et Dynamique de Rotation :** Pour le mouvement du bras de lancement.
2.  **Moment de Force et Moment d'Inertie :** Pour initier et simuler la rotation du bras.
3.  **Cinématique et Dynamique de Translation :** Pour le mouvement du projectile une fois qu'il est lancé (mouvement balistique).
4.  **Intégration Numérique (Euler semi-implicite recommandé) :** Pour simuler l'évolution des états de votre système (bras et projectile) au fil du temps par petits pas discrets ($\Delta t$).

**Scénario : Le Lanceur Rotatif Simplifié**

Imaginez une barre simple avec une boule à l'extrémité. 

Il est constitué d'un **bras** (une barre) qui pivote autour d'un **axe fixe** (le pivot) (la barre tourne finalement a partir d'une de ses extrémités). 

Un **projectile** (une boule) est initialement placé à l'extrémité libre de ce bras.

La simulation se déroulera en plusieurs phases :

1.  **Phase de Lancement du Bras :** Un moment de force (torque) est appliqué au bras (pendant une courte durée). Cela fait tourner le bras vers l'avant.
2.  **Phase de Relâchement du Projectile :** Lorsque l'utilisateur appuie sur un bouton, le projectile se détache.
3.  **Phase de Vol Balistique du Projectile :** Une fois en l'air, le projectile n'est soumis qu'à la gravité.

**Ce que vous devez remettre :** (code + rapport/commentaires)

---


**Instructions pour les Étudiants avec ce Template :**

Votre mission est de compléter la simulation d'un lanceur rotatif. Nous vous fournissons la structure de la scène Three.js, la gestion des paramètres avec `dat.GUI`, et la structure générale de la simulation.

**Votre Tâche :**

Vous devez compléter les sections marquées `// TODO: ÉTUDIANT - ...` dans les fonctions suivantes :

1.  **`calculateArmInertiaSystem()` :**
    *   Calculez le moment d'inertie total (`simParams.momentOfInertiaArmSystem`) du système "bras + projectile" lorsque le projectile est attaché au bras.
    *   Le bras est considéré comme une tige mince de masse `simParams.armMass` et de longueur `simParams.armLength`, pivotant autour d'une de ses extrémités. La formule est $I_{bras} = \frac{1}{3} M_{bras} L_{bras}^2$.
    *   Le projectile, de masse `simParams.projectileMass`, est à l'extrémité du bras (distance `simParams.armLength` du pivot) et peut être traité comme une masse ponctuelle pour son contribution au moment d'inertie du système ($I_{projectile} = m_{projectile} L_{bras}^2$).
    *   Le moment d'inertie total du système est la somme de ces deux, *uniquement si `isProjectileAttachedToArm` est `true`*. Si le projectile n'est pas attaché, considérez seulement l'inertie du bras pour ce calcul (bien que pour ce devoir, l'inertie du système est surtout importante *avant* le lancement).

2.  **`tryLaunchProjectile()` :**
    *   Calculez la **vitesse linéaire initiale** du projectile (`projectileVelocity`) au moment exact où il est lancé.
        *   La magnitude de cette vitesse est la vitesse tangentielle de l'extrémité du bras : $v_t = L_{bras} \cdot \omega_{bras}$ (utilisez `simParams.armLength` et `currentArmAngularVelocity`).
        *   La direction de cette vitesse est perpendiculaire au bras au moment du lancement. Si `currentArmAngle` est l'angle du bras par rapport à l'axe X+, la direction de la vitesse tangentielle est à `currentArmAngle + Math.PI / 2`. Décomposez $v_t$ en composantes $v_x$ et $v_y$.

3.  **`updateSimulation(dt)` - Dans la phase `'swinging_arm'` :**
    *   Calculez `angularAcceleration` du bras : $`\alpha = \tau_{net} / I_{systeme}`$. Le `torqueToApplyThisStep` (qui inclut `simParams.appliedTorqueToArm` et le damping) vous est donné. Utilisez `simParams.momentOfInertiaArmSystem`.
    *   Mettez à jour `currentArmAngularVelocity` : $`\omega_{n+1} = \omega_n + \alpha \Delta t`$.
    *   Mettez à jour `currentArmAngle` : $`\theta_{n+1} = \theta_n + \omega_{n+1} \Delta t`$ (Euler semi-implicite).

4.  **`updateSimulation(dt)` - Dans la phase `'projectile_flying'` :**
    *   Calculez la **Force Nette** sur le projectile (`forceNetProjectileX`, `forceNetProjectileY`). Pour la version minimale, seule la gravité agit ($F_y = m_{projectile} \cdot g_y$).
    *   Calculez l'**Accélération** du projectile ($\vec{a} = \vec{F}_{net} / m_{projectile}$).
    *   Mettez à jour la **Vitesse** du projectile ($\vec{v}_{n+1} = \vec{v}_n + \vec{a} \Delta t$).
    *   Mettez à jour la **Position** du projectile ($\vec{r}_{n+1} = \vec{r}_n + \vec{v}_{n+1} \Delta t$ - Euler semi-implicite).

**Conseils :**

*   Utilisez les variables globales et les `simParams` fournis.
*   Faites attention aux unités (mètres, kg, secondes, radians).
*   Testez votre simulation avec différentes valeurs dans le panneau `dat.GUI`.
*   Utilisez `console.log()` pour déboguer et vérifier les valeurs de vos variables physiques à chaque étape.

Bonne chance !
Je suis disponible sur Discord pour vous aider si vous avez des questions.
