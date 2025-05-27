

**Session 4: Dynamique de Rotation des Corps Rigides et Introduction à Rapier**

---

**Bloc 1 : Cinématique de Rotation - Décrire le Mouvement Angulaire (1h30)**

*   **1. Introduction à la Rotation (15 minutes) :**
    *   Lors de nos sessions précédentes, nous avons exploré le *mouvement de translation*. Nous avons vu comment un objet, comme notre sphère dans la simulation de mouvement balistique, se déplace d'un point à un autre dans l'espace. Même si sa trajectoire était une courbe (une parabole due à la gravité), nous nous sommes concentrés sur le déplacement de son centre et comment sa vitesse linéaire changeait, sans nous préoccuper de savoir si la sphère tournait sur elle-même.
    *   Aujourd'hui, nous abordons un autre type de mouvement tout aussi fondamental : la *rotation*. La rotation décrit comment un objet tourne sur lui-même ou autour d'un point ou d'un axe. Des exemples quotidiens incluent les roues d'un vélo, les aiguilles d'une montre, la Terre qui tourne sur son axe, ou un personnage de jeu vidéo qui effectue une pirouette.
    *   **Différence Fondamentale entre Translation et Rotation :**
        *   Lors d'un mouvement de **translation pure**, tous les points constituant l'objet ont le même vecteur déplacement, la même vitesse et la même accélération à chaque instant.
        *   Lors d'un mouvement de **rotation pure autour d'un axe fixe**, les différents points de l'objet décrivent des trajectoires circulaires centrées sur cet axe. Leur vitesse linéaire et leur accélération linéaire dépendent de leur distance à l'axe. Cependant, tous les points de l'objet rigide subissent le *même changement d'angle* (ou déplacement angulaire) pendant le même intervalle de temps.
    *   Notre objectif dans ce bloc est de développer le langage et les outils mathématiques pour décrire précisément ce mouvement angulaire.

*   **2. Position Angulaire ($\theta$) (25 minutes) :**
    *   **Définition :** Pour spécifier l'orientation d'un objet en rotation, ou la position d'un point sur une trajectoire circulaire, nous utilisons la **position angulaire**, symbolisée par la lettre grecque $\theta$ (thêta). Elle représente l'angle formé par une ligne de référence (fixée à l'objet et passant par l'axe de rotation) avec une direction de référence fixe dans l'espace (par exemple, l'axe des abscisses positives).
        *   *Imaginez un rayon d'une roue de vélo. Sa position angulaire $\theta$ serait l'angle que ce rayon forme avec une ligne horizontale fixe passant par le centre de la roue.*
    *   **Unités de Mesure Angulaire :**
        *   **Degrés ($^\circ$) :** Unité familière, où un tour complet correspond à $360^\circ$.
        *   **Radians (rad) :** L'unité standard et la plus naturelle en physique et en mathématiques pour mesurer les angles.
            *   **Définition du Radian :** Un radian est l'angle au centre d'un cercle qui intercepte un arc de longueur égale au rayon du cercle.
            *   **Relation Arc-Rayon-Angle :** Si $s$ est la longueur de l'arc, $r$ est le rayon du cercle, et $\theta$ est l'angle en radians, alors : $`s = r\theta`$.
            *   **Conversions Clés :**
                *   Un tour complet ($360^\circ$) correspond à la circonférence $2\pi r$. Donc, $2\pi r = r \theta_{tour}$, ce qui implique $\theta_{tour} = 2\pi$ radians.
                *   $`360^\circ = 2\pi \text{ rad}`$
                *   $`180^\circ = \pi \text{ rad}`$
                *   Pour convertir des degrés en radians : angle en radians = angle en degrés $\times \frac{\pi}{180^\circ}$.
                *   Pour convertir des radians en degrés : angle en degrés = angle en radians $\times \frac{180^\circ}{\pi}$.
                *   $1 \text{ rad} \approx 57.3^\circ$.
    *   **Convention de Signe pour la Rotation :**
        *   Par convention, une rotation dans le **sens antihoraire** (inverse des aiguilles d'une montre) est considérée comme **positive (+)**.
        *   Une rotation dans le **sens horaire** est considérée comme **négative (-)**.
    *   **Déplacement Angulaire ($\Delta \theta$) :**
        *   Représente le changement de la position angulaire d'un objet.
        *   $`\Delta \theta = \theta_{finale} - \theta_{initiale}`$.
        *   C'est l'angle net dont l'objet a tourné. Contrairement à la position angulaire $\theta$ qui peut être définie par rapport à une origine arbitraire, $\Delta \theta$ est une mesure absolue de la rotation effectuée.
        *   *Exemple : Si une roue tourne d'une position initiale $\theta_i = \pi/4 \text{ rad}$ à une position finale $\theta_f = 3\pi/4 \text{ rad}$, son déplacement angulaire est $\Delta \theta = 3\pi/4 - \pi/4 = \pi/2 \text{ rad}$ (soit $90^\circ$).*

    *   **Exercice 1.1 (Énoncé) :**
        *   a) Convertissez $45^\circ$, $90^\circ$, et $270^\circ$ en radians.
        *   b) Convertissez $\pi/6 \text{ rad}$, $3\pi/2 \text{ rad}$, et $1.5 \text{ rad}$ en degrés.
        *   c) Une hélice effectue $2.5$ tours complets. Quel est son déplacement angulaire en radians et en degrés ?

*   **3. Vitesse Angulaire ($\omega$) (25 minutes) :**
    *   **Définition :** La vitesse angulaire, symbolisée par $\omega$ (oméga minuscule), mesure la rapidité avec laquelle la position angulaire d'un objet change dans le temps. Elle indique "à quelle vitesse l'objet tourne".
    *   **Vitesse Angulaire Moyenne ($\omega_{moy}$) :**
        *   Si un objet subit un déplacement angulaire $\Delta \theta$ pendant un intervalle de temps $\Delta t$, sa vitesse angulaire moyenne est :
            $`\omega_{moy} = \frac{\Delta \theta}{\Delta t} = \frac{\theta_f - \theta_i}{t_f - t_i}`$
    *   **Vitesse Angulaire Instantanée ($\omega$) :**
        *   Pour connaître la vitesse angulaire à un instant précis, nous prenons la limite de la vitesse angulaire moyenne lorsque $\Delta t$ tend vers zéro. C'est la dérivée de la position angulaire par rapport au temps :
            $`\omega = \lim_{\Delta t \to 0} \frac{\Delta \theta}{\Delta t} = \frac{d\theta}{dt}`$
    *   **Unités :** L'unité SI de la vitesse angulaire est le **radian par seconde (rad/s)**.
        *   D'autres unités courantes incluent les tours par minute (tr/min ou rpm) ou les degrés par seconde ($^\circ$/s). Il est important de savoir les convertir en rad/s pour les calculs physiques.
        *   *Conversion : $1 \text{ tr/min} = \frac{2\pi \text{ rad}}{60 \text{ s}} = \frac{\pi}{30} \text{ rad/s}$*.
    *   **Caractère Vectoriel de la Vitesse Angulaire ($\vec{\omega}$) (pour la 3D) :**
        *   Bien que nous puissions souvent traiter $\omega$ comme un scalaire avec un signe en 2D (positif pour antihoraire, négatif pour horaire), en 3D, la vitesse angulaire est plus formellement un **vecteur $\vec{\omega}$**.
        *   La **magnitude** de $\vec{\omega}$ est la vitesse angulaire scalaire $|\omega|$.
        *   La **direction** de $\vec{\omega}$ est le long de l'**axe de rotation**. Pour déterminer le sens sur cet axe, on utilise la **règle de la main droite** : si vous enroulez les doigts de votre main droite dans le sens de la rotation, votre pouce étendu indiquera la direction de $\vec{\omega}$.
        *   *Exemple : Si un disque tourne dans le plan xy dans le sens antihoraire, $\vec{\omega}$ pointera le long de l'axe +z.*
    *   **Relation entre Vitesse Linéaire et Vitesse Angulaire :**
        *   Considérons un point sur un corps rigide en rotation, situé à une distance $r$ de l'axe de rotation. Lorsque le corps tourne d'un angle $d\theta$, ce point parcourt un arc de longueur $ds = r d\theta$.
        *   La vitesse linéaire (ou tangentielle) $v_t$ de ce point est $v_t = ds/dt = r (d\theta/dt) = r\omega$.
        *   $`v_t = r\omega`$ (où $\omega$ est en rad/s et $v_t$ en m/s).
        *   *Important : Tous les points d'un corps rigide en rotation ont la même vitesse angulaire $\omega$, mais leur vitesse linéaire $v_t$ dépend de leur distance $r$ à l'axe.*

    *   **Exercice 1.2 (Énoncé) :**
        *   a) Un disque de platine vinyle tourne à $33\frac{1}{3}$ tours par minute. Quelle est sa vitesse angulaire en rad/s ?
        *   b) Si un point sur le bord du disque est à 15 cm ($0.15 \text{ m}$) du centre, quelle est sa vitesse linéaire ?

*   **4. Accélération Angulaire ($\alpha$) (20 minutes) :**
    *   **Définition :** L'accélération angulaire, symbolisée par $\alpha$ (alpha minuscule), mesure la rapidité avec laquelle la vitesse angulaire d'un objet change dans le temps. Elle indique si la rotation de l'objet s'accélère, ralentit, ou si sa vitesse de rotation reste constante.
    *   **Accélération Angulaire Moyenne ($\alpha_{moy}$) :**
        *   Si la vitesse angulaire d'un objet change de $\Delta \omega$ pendant un intervalle de temps $\Delta t$, son accélération angulaire moyenne est :
            $`\alpha_{moy} = \frac{\Delta \omega}{\Delta t} = \frac{\omega_f - \omega_i}{t_f - t_i}`$
    *   **Accélération Angulaire Instantanée ($\alpha$) :**
        *   L'accélération angulaire à un instant précis est la dérivée de la vitesse angulaire par rapport au temps :
            $`\alpha = \lim_{\Delta t \to 0} \frac{\Delta \omega}{\Delta t} = \frac{d\omega}{dt}`$
        *   Puisque $\omega = d\theta/dt$, on a aussi $\alpha = \frac{d^2\theta}{dt^2}$ (la dérivée seconde de la position angulaire).
    *   **Unités :** L'unité SI de l'accélération angulaire est le **radian par seconde au carré (rad/s²)**.
    *   **Caractère Vectoriel de l'Accélération Angulaire ($\vec{\alpha}$) (pour la 3D) :**
        *   Comme la vitesse angulaire, l'accélération angulaire est aussi un vecteur $\vec{\alpha}$ en 3D.
        *   Si la vitesse angulaire scalaire augmente (la rotation s'accélère), $\vec{\alpha}$ a la même direction que $\vec{\omega}$ (pour un axe de rotation fixe).
        *   Si la vitesse angulaire scalaire diminue (la rotation ralentit), $\vec{\alpha}$ a une direction opposée à $\vec{\omega}$ (pour un axe de rotation fixe).
        *   Si l'axe de rotation change, la relation est plus complexe.
    *   **Relation entre Accélération Linéaire Tangentielle et Accélération Angulaire :**
        *   Pour un point à une distance $r$ de l'axe de rotation, son accélération tangentielle $a_t$ (la composante de son accélération linéaire le long de sa trajectoire circulaire) est liée à $\alpha$ par :
        *   $`a_t = r\alpha`$ (où $\alpha$ est en rad/s² et $a_t$ en m/s²).
        *   *Note : Il existe aussi une accélération centripète (ou radiale) $a_c = v_t^2/r = r\omega^2$, qui est toujours présente lors d'un mouvement circulaire, même si $\omega$ (et donc $\alpha$) est constant. Cette accélération est dirigée vers le centre de la rotation.*

    *   **Exercice 1.3 (Énoncé) :**
        *   Un ventilateur initialement au repos atteint une vitesse angulaire de $20 \text{ rad/s}$ en $4 \text{ secondes}$ avec une accélération angulaire constante.
            *   a) Quelle est son accélération angulaire ?
            *   b) De combien de radians a-t-il tourné pendant ces 4 secondes ?

*   **5. Mouvement de Rotation à Accélération Angulaire Constante ($\alpha = \text{constante}$) (15 minutes) :**
    *   **Rappel du Mouvement Linéaire à Accélération Constante ($a = \text{constante}$) :**
        *   Nous avons vu qu'en translation, si l'accélération $a$ est constante, les équations suivantes s'appliquent :
            1.  $`v_f = v_i + at`$
            2.  $`\Delta x = v_i t + \frac{1}{2}at^2`$
            3.  $`v_f^2 = v_i^2 + 2a\Delta x`$
    *   **Analogie Directe pour la Rotation :**
        *   Si l'accélération angulaire $\alpha$ d'un objet en rotation est constante, nous pouvons utiliser un ensemble d'équations parfaitement analogues pour décrire son mouvement angulaire. Il suffit de remplacer chaque grandeur linéaire par son équivalent angulaire :
            *   Déplacement linéaire $\Delta x \rightarrow$ Déplacement angulaire $\Delta \theta$
            *   Vitesse linéaire $v \rightarrow$ Vitesse angulaire $\omega$
            *   Accélération linéaire $a \rightarrow$ Accélération angulaire $\alpha$
    *   **Les Équations de la Cinématique Angulaire (pour $\alpha$ constante) :**
        1.  $`\omega_f = \omega_i + \alpha t`$
            *   *Vitesse angulaire finale = vitesse angulaire initiale + (accélération angulaire × temps)*
        2.  $`\Delta \theta = \omega_i t + \frac{1}{2}\alpha t^2`$
            *   *Déplacement angulaire = (vitesse angulaire initiale × temps) + (½ × accélération angulaire × temps²)*
        3.  $`\omega_f^2 = \omega_i^2 + 2\alpha\Delta \theta`$
            *   *(Carré de la vitesse angulaire finale) = (carré de la vitesse angulaire initiale) + (2 × accélération angulaire × déplacement angulaire)*
    *   **D'où vient la troisième équation ?**
        *   Elle est dérivée des deux premières en éliminant la variable temps ($t$).
        *   De l'équation (1), on isole $t$: $t = (\omega_f - \omega_i) / \alpha$.
        *   On substitue cette expression de $t$ dans l'équation (2). Après simplification algébrique (similaire à ce que nous avons vu pour le cas linéaire), on obtient l'équation (3).
        *   **Son utilité :** Elle est particulièrement pratique lorsque le temps n'est pas une information connue ou recherchée, mais que l'on souhaite relier les vitesses angulaires, l'accélération angulaire et le déplacement angulaire.
    *   **Condition d'utilisation cruciale :** Ces trois équations ne sont valides **que si l'accélération angulaire $\alpha$ est constante**. Cela se produit typiquement si le moment de force net agissant sur l'objet est constant et que son moment d'inertie ne change pas (nous verrons cela plus en détail).

    *   **Exercice 1.4 (Énoncé) :**
        *   Utilisez les équations de la cinématique angulaire pour résoudre la partie (b) de l'Exercice 1.3 d'une autre manière (en utilisant l'équation qui ne contient pas $\alpha$ directement, ou celle qui ne contient pas $t$).

---

**Bloc 2 : Moment de Force (Torque) - La Cause de la Rotation (1h30)**

*   **1. Introduction au Moment de Force : Qu'est-ce qui Fait Tourner les Objets ? (20 minutes) :**
    *   Nous savons maintenant décrire la rotation (avec $\theta, \omega, \alpha$). Mais qu'est-ce qui *cause* un changement dans l'état de rotation d'un objet ? Qu'est-ce qui provoque une accélération angulaire $\alpha$ ?
    *   De même que les forces ($\vec{F}$) sont responsables des changements de mouvement linéaire (accélération $\vec{a}$), une "influence rotationnelle" est responsable des changements de mouvement de rotation. Cette influence est appelée le **moment de force**, ou **torque** (symbolisé par la lettre grecque $\tau$, tau).
    *   **Définition Intuitive :** Le moment de force est une mesure de la capacité d'une force à faire tourner un objet autour d'un axe ou d'un point de pivot. C'est une sorte "d'effort de rotation".
    *   *Exemple simple : Pour ouvrir une porte (qui tourne autour de ses gonds), vous appliquez une force. L'efficacité de cette force à faire tourner la porte dépend non seulement de l'intensité de votre poussée, mais aussi de l'endroit où vous poussez et de la direction de votre poussée.*
    *   **L'Analogie Fondamentale à retenir :**
        *   Force $\vec{F} \quad \longleftrightarrow \quad$ Moment de Force (Torque) $\vec{\tau}$
        *   Accélération Linéaire $\vec{a} \quad \longleftrightarrow \quad$ Accélération Angulaire $\vec{\alpha}$
*   **2. Les Trois Facteurs Clés qui Déterminent le Moment de Force (35 minutes) :**
    *   Pour comprendre comment une force produit un moment de force, considérons une force $\vec{F}$ appliquée à un point $P$ d'un objet qui peut tourner autour d'un axe fixe $O$. Soit $\vec{r}$ le vecteur position allant de $O$ à $P$.
    *   **a) Magnitude de la Force ($|\vec{F}|$) :**
        *   Intuitivement, plus la force appliquée est grande, plus l'effet de rotation sera important (si les autres facteurs sont constants).
        *   *Pousser plus fort sur une porte la fera tourner plus rapidement.*
    *   **b) Distance du Point d'Application à l'Axe de Rotation ($|\vec{r}|$) :**
        *   La distance entre l'axe de rotation et le point où la force est appliquée est cruciale.
        *   *Il est beaucoup plus facile d'ouvrir une porte en poussant sur la poignée (loin des gonds) qu'en poussant près des gonds. Même si la force est la même, l'effet de rotation est plus grand si vous appliquez la force plus loin de l'axe.*
        *   Cette distance $r$ est souvent liée au concept de "bras de levier".
    *   **c) Angle d'Application de la Force ($\phi$) :**
        *   L'orientation de la force par rapport au "levier" (le vecteur $\vec{r}$) est également déterminante.
        *   Imaginez essayer d'ouvrir une porte en poussant directement *vers* les gonds (force parallèle à $\vec{r}$ pointant vers l'axe) ou en tirant directement *depuis* les gonds (force parallèle à $\vec{r}$ s'éloignant de l'axe). La porte ne tournera pas !
        *   La force est la plus efficace pour provoquer une rotation lorsqu'elle est appliquée **perpendiculairement** au vecteur $\vec{r}$ (c'est-à-dire tangentiellement au cercle que le point P décrirait).
        *   Si la force est appliquée avec un angle $\phi$ par rapport à $\vec{r}$, seule la composante de la force perpendiculaire à $\vec{r}$ ($F_{\perp} = F \sin \phi$) contribue au moment de force. La composante parallèle à $\vec{r}$ ($F_{\parallel} = F \cos \phi$) ne fait que tirer ou pousser sur l'axe, sans créer de rotation.
        *   *Visualisation : Schéma avec un vecteur $\vec{r}$ et un vecteur $\vec{F}$ appliqué à son extrémité, montrant l'angle $\phi$ et les composantes $F_{\perp}$ et $F_{\parallel}$.*
*   **3. Calcul de la Magnitude du Moment de Force (30 minutes) :**
    *   En combinant ces facteurs, la magnitude du moment de force ($\tau$) est donnée par :
        $`\tau = r (F \sin \phi)`$
        Où :
        *   $r = |\vec{r}|$ est la distance du pivot (ou de l'axe) au point d'application de la force.
        *   $F = |\vec{F}|$ est la magnitude de la force appliquée.
        *   $\phi$ est l'angle (le plus petit) entre les directions des vecteurs $\vec{r}$ et $\vec{F}$.
    *   **Interprétations Équivalentes :**
        1.  $`\tau = r (F_{\perp})`$ : Distance au point d'application multipliée par la composante de la force perpendiculaire à $\vec{r}$.
        2.  $`\tau = (r \sin \phi) F = r_{\perp} F`$ : Force multipliée par le **bras de levier** ($r_{\perp}$). Le bras de levier $r_{\perp}$ est la distance perpendiculaire de l'axe de rotation à la ligne d'action de la force. C'est souvent la définition la plus pratique pour visualiser et calculer.
            *   *Ligne d'action d'une force : la droite infinie le long de laquelle le vecteur force est dirigé.*
    *   **Unités :** Le moment de force se mesure en **Newton-mètre (N·m)**.
        *   Note : Bien que les unités soient les mêmes que pour le travail ou l'énergie (Joules), le moment de force et l'énergie sont des concepts physiques distincts. Ne pas les confondre.
    *   **Signe du Moment de Force (Convention en 2D) :**
        *   Si le moment de force tend à produire une rotation dans le sens **antihoraire** (conventionnellement positif pour les angles), alors $\tau$ est considéré comme **positif (+)**.
        *   Si le moment de force tend à produire une rotation dans le sens **horaire**, alors $\tau$ est considéré comme **négatif (-)**.
    *   **Exercice 2.1 (Énoncé) :**
        *   Une clé de 0.3 m de long est utilisée pour serrer un écrou. Une force de 50 N est appliquée à l'extrémité de la clé. Calculez la magnitude du moment de force si la force est appliquée :
            *   a) Perpendiculairement à la clé.
            *   b) À un angle de $60^\circ$ par rapport à la clé.
            *   c) Parallèlement à la clé (en poussant le long de la clé vers l'écrou).
*   **4. Vecteur Moment de Force ($\vec{\tau}$) et Produit Vectoriel (introduction) (15 minutes) :**
    *   En 3D, le moment de force est un **vecteur $\vec{\tau}$**. Sa direction indique l'axe autour duquel la rotation tend à se produire, et son sens est donné par la règle de la main droite.
    *   Il est défini par le **produit vectoriel** des vecteurs $\vec{r}$ et $\vec{F}$ :
        $`\vec{\tau} = \vec{r} \times \vec{F}`$
        *   $\vec{r}$ : vecteur allant du point de pivot (ou d'un point sur l'axe de rotation) au point d'application de la force.
    *   **Propriétés du Produit Vectoriel (Rappel ou Introduction) :**
        *   Le vecteur résultant $\vec{A} \times \vec{B}$ est perpendiculaire au plan formé par $\vec{A}$ et $\vec{B}$.
        *   Sa magnitude est $|\vec{A}| |\vec{B}| \sin \phi$, où $\phi$ est l'angle entre $\vec{A}$ et $\vec{B}$. (Ceci correspond à notre formule scalaire pour $\tau$).
        *   La direction est donnée par la règle de la main droite (orienter les doigts de la main droite de $\vec{A}$ vers $\vec{B}$ par le plus petit angle, le pouce indique la direction de $\vec{A} \times \vec{B}$).
        *   $\vec{A} \times \vec{B} = - (\vec{B} \times \vec{A})$ (non commutatif).
    *   "Le produit vectoriel est l'outil mathématique qui capture naturellement les trois facteurs (magnitude de F, distance r, et angle $\phi$) ainsi que la nature axiale du moment de force."
*   **5. Moment de Force Net (10 minutes) :**
    *   Si plusieurs forces agissent sur un objet, chacune peut produire un moment de force par rapport à un axe donné.
    *   Le **moment de force net ($\vec{\tau}_{net}$)** est la **somme vectorielle** de tous les moments de force individuels agissant sur l'objet :
        $`\vec{\tau}_{net} = \sum_i \vec{\tau}_i = \vec{\tau}_1 + \vec{\tau}_2 + \dots`$
    *   En 2D, cela se réduit souvent à une somme algébrique en tenant compte des signes (+ pour antihoraire, - pour horaire).
    *   C'est le $\vec{\tau}_{net}$ qui va déterminer comment l'état de rotation de l'objet va changer (c'est-à-dire son accélération angulaire).
    *   **Condition d'Équilibre de Rotation :** Pour qu'un objet soit en équilibre de rotation (soit il ne tourne pas, soit il tourne à vitesse angulaire constante), le moment de force net agissant sur lui doit être nul : $\vec{\tau}_{net} = 0$.

---

J'ai essayé de rendre les explications plus progressives, avec des définitions claires, des analogies, des exemples et des énoncés d'exercices. J'espère que ce format est plus adapté pour vos étudiants !