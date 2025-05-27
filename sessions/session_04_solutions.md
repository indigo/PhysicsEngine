

**Solutions et Explications des Exercices – Session 4, Blocs 1 & 2**

Ce document fournit les solutions et des explications détaillées pour les exercices proposés lors des Blocs 1 (Cinématique de Rotation) et 2 (Moment de Force) de la Session 4. Utilisez-le pour vérifier vos réponses, comprendre les méthodes de résolution et identifier les points où vous pourriez avoir besoin de clarifications.

---

**Bloc 1 : Cinématique de Rotation - Décrire le Mouvement Angulaire**

**Exercice 1.1 : Conversions d'Angles**

*   **Énoncé :**
    *   a) Convertissez $45^\circ$, $90^\circ$, et $270^\circ$ en radians.
    *   b) Convertissez $\pi/6 \text{ rad}$, $3\pi/2 \text{ rad}$, et $1.5 \text{ rad}$ en degrés.
    *   c) Une hélice effectue $2.5$ tours complets. Quel est son déplacement angulaire en radians et en degrés ?

*   **Solution et Explications :**

    Pour les conversions, nous utilisons la relation fondamentale : $`180^\circ = \pi \text{ rad}`$.

    *   **a) Degrés en Radians :** Pour convertir des degrés en radians, on multiplie par $\frac{\pi \text{ rad}}{180^\circ}$.
        *   **$45^\circ$ :**
            $`45^\circ \times \frac{\pi \text{ rad}}{180^\circ} = \frac{45\pi}{180} \text{ rad} = \frac{1\pi}{4} \text{ rad} = \frac{\pi}{4} \text{ rad}`$
            (Environ $0.785 \text{ rad}$)
        *   **$90^\circ$ :**
            $`90^\circ \times \frac{\pi \text{ rad}}{180^\circ} = \frac{90\pi}{180} \text{ rad} = \frac{1\pi}{2} \text{ rad} = \frac{\pi}{2} \text{ rad}`$
            (Environ $1.571 \text{ rad}$)
        *   **$270^\circ$ :**
            $`270^\circ \times \frac{\pi \text{ rad}}{180^\circ} = \frac{270\pi}{180} \text{ rad} = \frac{3\pi}{2} \text{ rad}`$
            (Environ $4.712 \text{ rad}$)

    *   **b) Radians en Degrés :** Pour convertir des radians en degrés, on multiplie par $\frac{180^\circ}{\pi \text{ rad}}$.
        *   **$\pi/6 \text{ rad}$ :**
            $`\frac{\pi}{6} \text{ rad} \times \frac{180^\circ}{\pi \text{ rad}} = \frac{180^\circ}{6} = 30^\circ`$
        *   **$3\pi/2 \text{ rad}$ :**
            $`\frac{3\pi}{2} \text{ rad} \times \frac{180^\circ}{\pi \text{ rad}} = \frac{3 \times 180^\circ}{2} = 3 \times 90^\circ = 270^\circ`$
        *   **$1.5 \text{ rad}$ :**
            $`1.5 \text{ rad} \times \frac{180^\circ}{\pi \text{ rad}} = \frac{1.5 \times 180^\circ}{\pi} \approx \frac{270^\circ}{3.14159} \approx 85.94^\circ`$

    *   **c) Déplacement Angulaire de l'Hélice :**
        *   Un tour complet correspond à $2\pi \text{ rad}$ ou $360^\circ$.
        *   L'hélice effectue $2.5$ tours.
        *   **En radians :**
            Déplacement angulaire $\Delta \theta = 2.5 \text{ tours} \times 2\pi \frac{\text{rad}}{\text{tour}} = 5\pi \text{ rad}$
            (Environ $15.708 \text{ rad}$)
        *   **En degrés :**
            Déplacement angulaire $\Delta \theta = 2.5 \text{ tours} \times 360 \frac{^\circ}{\text{tour}} = 900^\circ$

---

**Exercice 1.2 : Vitesse Angulaire et Linéaire d'un Disque Vinyle**

*   **Énoncé :**
    *   a) Un disque de platine vinyle tourne à $33\frac{1}{3}$ tours par minute. Quelle est sa vitesse angulaire en rad/s ?
    *   b) Si un point sur le bord du disque est à 15 cm ($0.15 \text{ m}$) du centre, quelle est sa vitesse linéaire ?

*   **Solution et Explications :**

    *   **a) Vitesse Angulaire ($\omega$) en rad/s :**
        *   La vitesse donnée est de $33\frac{1}{3} \text{ tr/min} = \frac{100}{3} \text{ tr/min}$.
        *   Nous devons convertir les tours en radians et les minutes en secondes.
            *   $1 \text{ tour} = 2\pi \text{ rad}$
            *   $1 \text{ minute} = 60 \text{ secondes}$
        *   Donc :
            $`\omega = \frac{100 \text{ tours}}{3 \text{ minutes}} \times \frac{2\pi \text{ rad}}{1 \text{ tour}} \times \frac{1 \text{ minute}}{60 \text{ secondes}}`$
            $`\omega = \frac{100 \times 2\pi}{3 \times 60} \frac{\text{rad}}{\text{s}} = \frac{200\pi}{180} \frac{\text{rad}}{\text{s}} = \frac{10\pi}{9} \text{ rad/s}`$
            *   Valeur approximative : $\omega \approx \frac{10 \times 3.14159}{9} \approx 3.49 \text{ rad/s}$.

    *   **b) Vitesse Linéaire ($v_t$) du Point sur le Bord :**
        *   La relation entre la vitesse linéaire (tangentielle) $v_t$ d'un point et la vitesse angulaire $\omega$ de l'objet est $v_t = r\omega$, où $r$ est la distance du point à l'axe de rotation.
        *   Ici, $r = 0.15 \text{ m}$ et nous avons calculé $\omega = \frac{10\pi}{9} \text{ rad/s}$.
        *   $`v_t = (0.15 \text{ m}) \times \left(\frac{10\pi}{9} \frac{\text{rad}}{\text{s}}\right)`$
            *   (Note : Le "radian" est une unité sans dimension physique, donc il disparaît dans le produit pour donner des m/s).
        *   $`v_t = \frac{1.5\pi}{9} \text{ m/s} = \frac{\pi}{6} \text{ m/s}`$
            *   Valeur approximative : $v_t \approx \frac{3.14159}{6} \approx 0.524 \text{ m/s}$.

---

**Exercice 1.3 : Accélération Angulaire d'un Ventilateur**

*   **Énoncé :**
    *   Un ventilateur initialement au repos atteint une vitesse angulaire de $20 \text{ rad/s}$ en $4 \text{ secondes}$ avec une accélération angulaire constante.
        *   a) Quelle est son accélération angulaire ?
        *   b) De combien de radians a-t-il tourné pendant ces 4 secondes ?

*   **Solution et Explications :**

    Nous sommes dans un cas de mouvement de rotation à accélération angulaire constante.
    Données :
    *   Vitesse angulaire initiale $\omega_i = 0 \text{ rad/s}$ (car "initialement au repos").
    *   Vitesse angulaire finale $\omega_f = 20 \text{ rad/s}$.
    *   Temps $t = 4 \text{ s}$.
    *   Accélération angulaire $\alpha = \text{constante}$.

    *   **a) Accélération Angulaire ($\alpha$) :**
        *   Nous utilisons l'équation : $\omega_f = \omega_i + \alpha t$.
        *   En réarrangeant pour trouver $\alpha$ : $`\alpha = \frac{\omega_f - \omega_i}{t}`$.
        *   $`\alpha = \frac{20 \text{ rad/s} - 0 \text{ rad/s}}{4 \text{ s}} = \frac{20}{4} \frac{\text{rad/s}}{\text{s}} = 5 \text{ rad/s}^2`$.
        *   L'accélération angulaire du ventilateur est de $5 \text{ rad/s}^2$.

    *   **b) Déplacement Angulaire ($\Delta \theta$) :**
        *   Nous pouvons utiliser l'équation : $\Delta \theta = \omega_i t + \frac{1}{2}\alpha t^2$.
        *   $`\Delta \theta = (0 \text{ rad/s})(4 \text{ s}) + \frac{1}{2}(5 \text{ rad/s}^2)(4 \text{ s})^2`$
        *   $`\Delta \theta = 0 + \frac{1}{2}(5 \text{ rad/s}^2)(16 \text{ s}^2)`$
        *   $`\Delta \theta = \frac{1}{2} \times 5 \times 16 \text{ rad} = \frac{1}{2} \times 80 \text{ rad} = 40 \text{ rad}`$.
        *   Le ventilateur a tourné de $40 \text{ radians}$ pendant ces 4 secondes.

---

**Exercice 1.4 : Alternative pour le Déplacement Angulaire du Ventilateur**

*   **Énoncé :**
    *   Utilisez les équations de la cinématique angulaire pour résoudre la partie (b) de l'Exercice 1.3 d'une autre manière.

*   **Solution et Explications :**

    Nous voulons trouver $\Delta \theta$ en utilisant une autre équation, par exemple celle qui ne contient pas explicitement le temps $t$ (si nous avions déjà $\alpha$) ou celle qui utilise la vitesse moyenne.

    *   **Méthode 1 : Utilisation de $\omega_f^2 = \omega_i^2 + 2\alpha\Delta \theta$**
        *   Nous avons $\omega_i = 0 \text{ rad/s}$, $\omega_f = 20 \text{ rad/s}$, et nous avons calculé $\alpha = 5 \text{ rad/s}^2$.
        *   En réarrangeant pour $\Delta \theta$ : $`\Delta \theta = \frac{\omega_f^2 - \omega_i^2}{2\alpha}`$.
        *   $`\Delta \theta = \frac{(20 \text{ rad/s})^2 - (0 \text{ rad/s})^2}{2(5 \text{ rad/s}^2)} = \frac{400 \text{ (rad/s)}^2}{10 \text{ rad/s}^2} = 40 \text{ rad}`$.
        *   Nous retrouvons le même résultat.

    *   **Méthode 2 : Utilisation de la Vitesse Angulaire Moyenne**
        *   Pour un mouvement à accélération constante, la vitesse angulaire moyenne peut aussi être calculée comme : $`\omega_{moy} = \frac{\omega_i + \omega_f}{2}`$.
        *   $`\omega_{moy} = \frac{0 \text{ rad/s} + 20 \text{ rad/s}}{2} = 10 \text{ rad/s}`$.
        *   Le déplacement angulaire est alors $\Delta \theta = \omega_{moy} \times t$.
        *   $`\Delta \theta = (10 \text{ rad/s}) \times (4 \text{ s}) = 40 \text{ rad}`$.
        *   Encore une fois, nous retrouvons le même résultat. Cela montre la cohérence des équations.

---

**Bloc 2 : Moment de Force (Torque) - La Cause de la Rotation**

**Exercice 2.1 : Moment de Force sur une Clé**

*   **Énoncé :**
    *   Une clé de 0.3 m de long est utilisée pour serrer un écrou. Une force de 50 N est appliquée à l'extrémité de la clé. Calculez la magnitude du moment de force si la force est appliquée :
        *   a) Perpendiculairement à la clé.
        *   b) À un angle de $60^\circ$ par rapport à la clé.
        *   c) Parallèlement à la clé (en poussant le long de la clé vers l'écrou).

*   **Solution et Explications :**

    La formule pour la magnitude du moment de force est $\tau = r F \sin \phi$.
    Ici, $r = 0.3 \text{ m}$ (distance du pivot – l'écrou – au point d'application de la force) et $F = 50 \text{ N}$. L'angle $\phi$ est l'angle entre le vecteur "bras de la clé" (allant de l'écrou à l'extrémité) et le vecteur force.

    *   **a) Force Appliquée Perpendiculairement à la Clé :**
        *   Si la force est perpendiculaire à la clé, alors l'angle $\phi = 90^\circ$.
        *   $\sin(90^\circ) = 1$.
        *   $`\tau = (0.3 \text{ m})(50 \text{ N})\sin(90^\circ) = (0.3 \text{ m})(50 \text{ N})(1)`$
        *   $`\tau = 15 \text{ N·m}`$.

    *   **b) Force Appliquée à un Angle de $60^\circ$ par rapport à la Clé :**
        *   Ici, $\phi = 60^\circ$.
        *   $\sin(60^\circ) = \frac{\sqrt{3}}{2} \approx 0.866$.
        *   $`\tau = (0.3 \text{ m})(50 \text{ N})\sin(60^\circ) = (0.3 \text{ m})(50 \text{ N})\left(\frac{\sqrt{3}}{2}\right)`$
        *   $`\tau = 15 \times \frac{\sqrt{3}}{2} \text{ N·m} = 7.5\sqrt{3} \text{ N·m}`$
        *   Valeur approximative : $\tau \approx 15 \times 0.866 \text{ N·m} \approx 12.99 \text{ N·m}$.
        *   *Note : Le moment de force est plus faible car seule la composante perpendiculaire de la force contribue à la rotation.*

    *   **c) Force Appliquée Parallèlement à la Clé (vers l'écrou) :**
        *   Si la force est parallèle à la clé et dirigée vers l'écrou, l'angle $\phi = 180^\circ$ (ou $0^\circ$ si on considère la direction opposée, mais le résultat pour $\sin \phi$ sera 0 dans les deux cas où la force est alignée avec le levier).
        *   $\sin(180^\circ) = 0$ (et $\sin(0^\circ) = 0$).
        *   $`\tau = (0.3 \text{ m})(50 \text{ N})\sin(180^\circ) = (0.3 \text{ m})(50 \text{ N})(0)`$
        *   $`\tau = 0 \text{ N·m}`$.
        *   *Interprétation : Si vous poussez directement le long de la clé vers l'écrou (ou tirez directement en l'éloignant), vous n'exercerez aucun effet de rotation sur l'écrou. La force n'a pas de "bras de levier effectif" ou sa composante perpendiculaire est nulle.*

---

J'espère que ces solutions détaillées aideront vos étudiants !