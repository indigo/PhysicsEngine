**Session 2 : Cinématique 2D et Mouvement de Projectile**


**Objectifs de la Session :**

- Comprendre et appliquer les concepts de vitesse, d'accélération et de position en deux dimensions.
- Analyser et calculer la trajectoire d'un projectile soumis à la gravité.
- Implémenter le mouvement de projectiles dans l'environnement Three.js.
- Introduire les lois de Newton et leur pertinence pour la simulation de mouvement.
- Réaliser un premier travail pratique de création d'objets en mouvement et de projectiles simples avec Rapier.

 

**Bloc 1 : Cinématique 2D - Position, Vitesse et Accélération (environ 1h30)**

**Objectifs spécifiques de ce bloc :**

- Comprendre la représentation mathématique de la position d'un objet dans un plan bidimensionnel.
- Définir et interpréter les concepts de vitesse moyenne et instantanée sous forme vectorielle en 2D.
- Définir et interpréter les concepts d'accélération moyenne et instantanée sous forme vectorielle en 2D.
- Visualiser et relier les vecteurs position, vitesse et accélération à la trajectoire d'un objet.

 

**1. Introduction et Rappels (15 minutes)**

- **Brève révision des vecteurs (5 minutes) :**

  - Rappel de la définition d'un vecteur comme une quantité possédant une magnitude (longueur) et une direction.
  - Représentation d'un vecteur en 2D à l'aide de ses composantes : $\vec{v} = \begin{pmatrix} v_x \\ v_y \end{pmatrix}$.
  - Opérations vectorielles de base (addition et soustraction) :
    - $\vec{a} + \vec{b} = \begin{pmatrix} a_x + b_x \\ a_y + b_y \end{pmatrix}$
    - $\vec{a} - \vec{b} = \begin{pmatrix} a_x - b_x \\ a_y - b_y \end{pmatrix}$
  - Multiplication d'un vecteur par un scalaire : $k \vec{a} = \begin{pmatrix} k a_x \\ k a_y \end{pmatrix}$.

- **Introduction à la cinématique (5 minutes) :**

  - Définition de la cinématique comme la branche de la mécanique qui décrit le mouvement des objets sans considérer les causes du mouvement (les forces).
  - Contrairement à la dynamique, qui relie le mouvement aux forces.
  - Notre objectif dans ce bloc est de développer les outils mathématiques pour décrire précisément _comment_ les objets se déplacent en 2D.

- **Présentation des objectifs du Bloc 1 (5 minutes) :**
  - Exprimer la position, la vitesse et l'accélération d'un objet en 2D sous forme vectorielle.
  - Comprendre la relation mathématique entre la position, la vitesse et l'accélération.
  - Interpréter physiquement les composantes de ces vecteurs.

 

**2. Position en 2D (20 minutes)**

- **Vecteur Position (10 minutes) :**

  - Pour décrire la localisation d'un point (ou d'un objet considéré comme un point) dans un plan bidimensionnel, nous utilisons le **vecteur position**, noté $\vec{r}$ (ou parfois $\vec{s}$ ou $\vec{x}$).
  - Si nous définissons un système de coordonnées cartésiennes avec un axe horizontal ($x$) et un axe vertical ($y$), le vecteur position d'un point $P$ de coordonnées $(x, y)$ est donné par :
    $
    \vec{r} = \begin{pmatrix} x \\ y \end{pmatrix} = x \hat{i} + y \hat{j}
    $
  où $\hat{i} = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$ est le vecteur unitaire dans la direction de l'axe $x$, et $\hat{j} = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$ est le vecteur unitaire dans la direction de l'axe $y$.
  - Le vecteur position pointe de l'origine du système de coordonnées vers la position de l'objet.
  - La **magnitude** du vecteur position, $|\vec{r}| = \sqrt{x^2 + y^2}$, représente la distance de l'objet à l'origine.
  - La **direction** du vecteur position peut être donnée par l'angle $\theta$ qu'il forme avec l'axe $x$, où $\tan(\theta) = \frac{y}{x}$.

    ![2D plane with position and velocity vectors](../images/vectors.png)

- **Trajectoire (10 minutes) :**

  - Si la position d'un objet change au cours du temps, nous pouvons décrire son mouvement en spécifiant son vecteur position en fonction du temps : $\vec{r}(t) = \begin{pmatrix} x(t) \\ y(t) \end{pmatrix}$.
  - L'ensemble des points atteints par l'objet au cours de son mouvement forme sa **trajectoire**. La trajectoire est une courbe dans l'espace (ici, en 2D).
  - Exemples de trajectoires :
    - **Mouvement rectiligne uniforme :** $\vec{r}(t) = \begin{pmatrix} x_0 + v_x t \\ y_0 + v_y t \end{pmatrix}$, où $x_0, y_0, v_x, v_y$ sont des constantes. La trajectoire est une ligne droite.
    - **Mouvement circulaire uniforme :** $\vec{r}(t) = \begin{pmatrix} R \cos(\omega t) \\ R \sin(\omega t) \end{pmatrix}$, où $R$ est le rayon et $\omega$ la vitesse angulaire. La trajectoire est un cercle.
    - **Mouvement parabolique (projectile) :** $\vec{r}(t) = \begin{pmatrix} v_{0x} t \\ y_0 + v_{0y} t - \frac{1}{2} g t^2 \end{pmatrix}$ (sous l'effet de la gravité). La trajectoire est une parabole.
  - Visualisation de différentes trajectoires et des vecteurs position correspondants à différents instants.

- **Démo cinématique :** Pour visualiser les concepts de cinématique, consultez la démo : [file:../scenes/session02.html](../scenes/session02.html)

 

**3. Vitesse en 2D (25 minutes)**


- **Vitesse Moyenne (10 minutes) :**
    ![2D plane with position and velocity vectors](../images/position02.png)

  - Considérons un objet qui se déplace de la position $\vec{r}_i$ à l'instant $t_i$ à la position $\vec{r}_f$ à l'instant $t_f$.
  - Le **déplacement** de l'objet pendant cet intervalle de temps $\Delta t = t_f - t_i$ est le vecteur :

    $\Delta \vec{r} = \vec{r}_f - \vec{r}_i = \begin{pmatrix} x_f - x_i \\ y_f - y_i \end{pmatrix} = \begin{pmatrix} \Delta x \\ \Delta y \end{pmatrix}$

  - Le **vecteur vitesse moyenne** $\vec{v}_{moy}$ est défini comme le rapport du déplacement au temps écoulé :

    $
    \vec{v}_{moy} = \frac{\Delta \vec{r}}{\Delta t} = \frac{\vec{r}_f - \vec{r}_i}{t_f - t_i} = \begin{pmatrix} \frac{\Delta x}{\Delta t} \\ \frac{\Delta y}{\Delta t} \end{pmatrix} = \begin{pmatrix} v_{moy, x} \\ v_{moy, y} \end{pmatrix}
    $

  - La vitesse moyenne est un vecteur dont la direction est la même que celle du déplacement, et dont la magnitude est le déplacement total divisé par le temps écoulé.

- **Vitesse Instantanée (15 minutes) :**

  - Pour décrire la vitesse de l'objet à un instant précis $t$, nous utilisons la notion de **vitesse instantanée**, $\vec{v}(t)$.
  - Mathématiquement, la vitesse instantanée est définie comme la limite de la vitesse moyenne lorsque l'intervalle de temps $\Delta t$ tend vers zéro :

    $
    \vec{v}(t) = \lim_{\Delta t \to 0} \frac{\Delta \vec{r}}{\Delta t} = \frac{d\vec{r}}{dt}
    $

  - En termes de composantes, la vitesse instantanée est la dérivée des composantes de la position par rapport au temps :

    $
    \vec{v}(t) = \begin{pmatrix} \frac{dx(t)}{dt} \\ \frac{dy(t)}{dt} \end{pmatrix} = \begin{pmatrix} v_x(t) \\ v_y(t) \end{pmatrix}
    $

    où $v_x(t)$ est la composante de la vitesse selon l'axe $x$, et $v_y(t)$ est la composante de la vitesse selon l'axe $y$ à l'instant $t$.

  - La **magnitude** de la vitesse instantanée, $|\vec{v}(t)| = \sqrt{v_x(t)^2 + v_y(t)^2}$, est appelée **vitesse scalaire**.
  - La **direction** de la vitesse instantanée est tangente à la trajectoire de l'objet au point considéré. Visualisation de ce concept avec des exemples de trajectoires courbes.

 

**4. Accélération en 2D (25 minutes)**

- **Accélération Moyenne (10 minutes) :**

  - Si la vitesse d'un objet change au cours du temps, l'objet est en train d'accélérer.
  - Le **vecteur accélération moyenne** $\vec{a}_{moy}$ pendant un intervalle de temps $\Delta t = t_f - t_i$ est défini comme le rapport du changement de vitesse au temps écoulé :

    $
    \vec{a}_{moy} = \frac{\Delta \vec{v}}{\Delta t} = \frac{\vec{v}_f - \vec{v}_i}{t_f - t_i} = \begin{pmatrix} \frac{\Delta v_x}{\Delta t} \\ \frac{\Delta v_y}{\Delta t} \end{pmatrix} = \begin{pmatrix} a_{moy, x} \\ a_{moy, y} \end{pmatrix}
    $

  - L'accélération moyenne est un vecteur dont la direction est celle du changement de vitesse.

- **Accélération Instantanée (15 minutes) :**

  - L'**accélération instantanée** $\vec{a}(t)$ décrit la manière dont la vitesse d'un objet change à un instant précis $t$. Elle est définie comme la dérivée de la vitesse par rapport au temps :

    $
    \vec{a}(t) = \lim_{\Delta t \to 0} \frac{\Delta \vec{v}}{\Delta t} = \frac{d\vec{v}}{dt}
    $

  - En termes de composantes, l'accélération instantanée est la dérivée des composantes de la vitesse par rapport au temps, ou la deuxième dérivée des composantes de la position par rapport au temps :

    $
    \vec{a}(t) = \begin{pmatrix} \frac{dv_x(t)}{dt} \\ \frac{dv_y(t)}{dt} \end{pmatrix} = \begin{pmatrix} a_x(t) \\ a_y(t) \end{pmatrix} = \begin{pmatrix} \frac{d^2 x(t)}{dt^2} \\ \frac{d^2 y(t)}{dt^2} \end{pmatrix}
    $

  - L'accélération peut changer la magnitude de la vitesse (l'objet accélère ou décélère), sa direction, ou les deux en même temps.
  - **Cas particulier : Accélération constante.** Si l'accélération $\vec{a}$ est constante, alors $\vec{a}(t) = \vec{a} = \begin{pmatrix} a_x \\ a_y \end{pmatrix}$, où $a_x$ et $a_y$ sont des constantes. Dans ce cas, nous pouvons intégrer les équations de l'accélération pour obtenir la vitesse et la position en fonction du temps :

    $
    \vec{v}(t) = \vec{v}_0 + \vec{a} t = \begin{pmatrix} v_{0x} + a*x t \\ v_{0y} + a*y t \end{pmatrix}
    $

    $
    \vec{r}(t) = \vec{r}_0 + \vec{v}_0 t + \frac{1}{2} \vec{a} t^2 = \begin{pmatrix} x_0 + v_{0x} t + \frac{1}{2} a*x t^2 \\ y_0 + v_{0y} t + \frac{1}{2} a*y t^2 \end{pmatrix}
    $

    où $\vec{v}_0 = \begin{pmatrix} v_{0x} \\ v_{0y} \end{pmatrix}$ est la vitesse initiale

    et $\vec{r}_0 = \begin{pmatrix} x_0 \\ y_0 \end{pmatrix}$ est la position initiale.

    C'est ce cas particulier qui sera crucial pour l'étude du mouvement de projectile sous l'effet de la gravité.