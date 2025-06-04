

**Le Principe Fondamental de la Simulation Physique Discrète : De Newton à l'Écran**

En simulation physique pour les jeux (et de nombreux autres domaines), nous cherchons à prédire comment les objets vont se déplacer et interagir au fil du temps sous l'effet des forces. La "vraie" physique se déroule de manière continue, mais les ordinateurs fonctionnent de manière discrète, par étapes. Nous devons donc "découper" le temps en petits intervalles, appelés **pas de temps** (ou *timestep*), notés $`\Delta t`$.

L'objectif est, à chaque pas de temps, de calculer le nouvel état (position, vitesse) de chaque objet en fonction de son état précédent et des forces qui s'appliquent à lui.

**1. Les Fondations : Les Lois de Newton**

Au cœur de la simulation des mouvements se trouvent les lois de Newton :

*   **Première Loi de Newton (Loi d'Inertie) :**
    *   Un objet au repos reste au repos, et un objet en mouvement rectiligne uniforme conserve ce mouvement, à moins qu'une force nette n'agisse sur lui.
    *   **Implication pour la simulation :** Si la somme des forces ($\vec{F}_{net}$) sur un objet est nulle, son accélération est nulle, et sa vitesse ne change pas.
*   **Deuxième Loi de Newton (Principe Fondamental de la Dynamique) :**
    *   L'accélération ($\vec{a}$) d'un objet est directement proportionnelle à la force nette ($\vec{F}_{net}$) agissant sur lui et inversement proportionnelle à sa masse ($m$).
    *   **Équation clé :** 
    ## $\vec{F}_{net} = m \vec{a}$
    *   On peut la réarranger pour trouver l'accélération : $`\vec{a} = \frac{\vec{F}_{net}}{m}`$
    *   **Implication pour la simulation :** C'est cette équation qui nous permet de déterminer comment la vitesse d'un objet va changer. Si nous connaissons les forces, nous pouvons calculer l'accélération.
*   **Troisième Loi de Newton (Principe des Actions Réciproques) :**
    *   Pour toute action, il existe une réaction égale et opposée. Si un objet A exerce une force sur un objet B, alors l'objet B exerce une force de même magnitude et de direction opposée sur l'objet A.
    *   **Implication pour la simulation :** Essentielle pour gérer les collisions et les interactions entre objets.

**2. Le Lien avec la Cinématique : Dérivées et Intégrales**

Rappelons les relations fondamentales de la cinématique :

*   La **vitesse** ($\vec{v}$) est la dérivée temporelle de la **position** ($\vec{r}$) : $`\vec{v} = \frac{d\vec{r}}{dt}`$
*   L'**accélération** ($\vec{a}$) est la dérivée temporelle de la **vitesse** ($\vec{v}$) : $`\vec{a} = \frac{d\vec{v}}{dt}`$

Inversement, pour passer de l'accélération à la vitesse, et de la vitesse à la position, nous devons effectuer des **intégrations** :

*   $`\vec{v}(t) = \vec{v}_0 + \int_{t_0}^{t} \vec{a}(\tau) d\tau`$
*   $`\vec{r}(t) = \vec{r}_0 + \int_{t_0}^{t} \vec{v}(\tau) d\tau`$

Le problème est que, souvent, l'accélération $\vec{a}(\tau)$ n'est pas une fonction simple du temps que nous pouvons intégrer analytiquement (surtout si les forces dépendent de la position ou de la vitesse). C'est là qu'interviennent les **méthodes d'intégration numérique**.

**3. La Boucle de Simulation Discrète et l'Intégration Numérique**

La boucle de simulation typique pour un objet (simplifié, sans rotation pour l'instant) :

**État Actuel (au temps $t_n$) :**
*   Position : $\vec{r}_n$
*   Vitesse : $\vec{v}_n$
*   Masse : $m$

**Calculs pour le Pas de Temps Suivant (pour atteindre le temps $t_{n+1} = t_n + \Delta t$) :**

1.  **Calculer les Forces (au temps $t_n$) :**
    *   Déterminer toutes les forces agissant sur l'objet (gravité, vent, ressorts, frottement, etc.).
    *   Sommer ces forces pour obtenir la force nette : $\vec{F}_{net, n}$.
    *   *Note : Certaines forces peuvent dépendre de $\vec{r}_n$ et/ou $\vec{v}_n$.*
2.  **Calculer l'Accélération (au temps $t_n$) :**
    *   Utiliser la deuxième loi de Newton : $\vec{a}_n = \frac{\vec{F}_{net, n}}{m}$.
3.  **Mettre à jour la Vitesse et la Position (Intégration Numérique) :**
    *   C'est ici que les différentes méthodes d'intégration entrent en jeu pour estimer $\vec{v}_{n+1}$ et $\vec{r}_{n+1}$.

**4. Méthodes d'Intégration Numérique Courantes**

Ces méthodes sont des approximations de l'intégration mathématique continue.

**a) Méthode d'Euler Explicite (ou Euler Progressif)**

*   **Idée :** On suppose que l'accélération $\vec{a}_n$ reste constante pendant tout l'intervalle $\Delta t$. On utilise la vitesse *au début* de l'intervalle pour calculer la nouvelle position.
*   **Équations :**
    1.  $`\vec{v}_{n+1} = \vec{v}_n + \vec{a}_n \cdot \Delta t`$
    2.  $`\vec{r}_{n+1} = \vec{r}_n + \vec{v}_n \cdot \Delta t`$
*   **Caractéristiques :**
    *   **Simple à implémenter.**
    *   **Premier ordre :** L'erreur locale est proportionnelle à $(\Delta t)^2$, et l'erreur globale à $\Delta t$. Cela signifie que pour réduire l'erreur par 2, il faut réduire $\Delta t$ par 2.
    *   **Peu stable :** Peut diverger (les valeurs deviennent infinies) ou introduire de l'énergie artificielle dans le système si $\Delta t$ est trop grand, surtout pour des systèmes oscillants (comme des ressorts).
    *   Ne conserve pas l'énergie.

**b) Méthode d'Euler Semi-Implicite (ou Euler Symplectique)**

*   **Idée :** On calcule d'abord la nouvelle vitesse, puis on utilise cette *nouvelle* vitesse pour calculer la nouvelle position.
*   **Équations :**
    1.  $`\vec{v}_{n+1} = \vec{v}_n + \vec{a}_n \cdot \Delta t`$
    2.  $`\vec{r}_{n+1} = \vec{r}_n + \vec{v}_{n+1} \cdot \Delta t`$  (Notez l'utilisation de $\vec{v}_{n+1}$ ici)
*   **Caractéristiques :**
    *   **Aussi simple à implémenter.**
    *   **Premier ordre,** mais souvent **plus stable** que l'Euler explicite pour les systèmes physiques, en particulier les systèmes hamiltoniens (conservant l'énergie, comme un pendule sans frottement).
    *   Ne conserve pas exactement l'énergie, mais a tendance à mieux la borner sur de longues périodes (l'erreur d'énergie n'explose pas aussi facilement).
    *   C'est une méthode très populaire dans les jeux pour sa simplicité et sa stabilité relative.

**c) Méthode de Verlet (et Leapfrog)**

*   **Idée :** Conçue spécifiquement pour les systèmes de la mécanique moléculaire, elle est très bonne pour conserver l'énergie et la stabilité. Elle ne stocke pas explicitement la vitesse, mais la déduit des positions passées et actuelles.
*   **Formulation de base de Verlet (Position Verlet) :**
    1.  $`\vec{r}_{n+1} = 2\vec{r}_n - \vec{r}_{n-1} + \vec{a}_n (\Delta t)^2`$
    *   *Nécessite de connaître $\vec{r}_n$ et $\vec{r}_{n-1}$ (la position au pas précédent).*
    *   Pour le premier pas, on a besoin d'une initialisation spéciale pour $\vec{r}_{-1}$ (souvent $\vec{r}_{-1} = \vec{r}_0 - \vec{v}_0 \Delta t$).
*   **Vitesse (peut être calculée si besoin) :**
    *   $`\vec{v}_n = \frac{\vec{r}_{n+1} - \vec{r}_{n-1}}{2 \Delta t}`$ (approximation centrée)
*   **Variante : Leapfrog ("Saute-Mouton")**
    *   La vitesse est calculée à des demi-pas de temps par rapport à la position.
    1.  $`\vec{v}_{n+1/2} = \vec{v}_{n-1/2} + \vec{a}_n \cdot \Delta t`$
    2.  $`\vec{r}_{n+1} = \vec{r}_n + \vec{v}_{n+1/2} \cdot \Delta t`$
*   **Caractéristiques de Verlet/Leapfrog :**
    *   **Symplectique et réversible dans le temps.**
    *   **Deuxième ordre :** L'erreur locale est proportionnelle à $(\Delta t)^3$, l'erreur globale à $(\Delta t)^2$. Plus précis qu'Euler pour le même $\Delta t$.
    *   **Excellente stabilité à long terme et conservation de l'énergie** pour les systèmes conservatifs.
    *   Un peu plus complexe à initialiser et la vitesse n'est pas directement disponible au même "instant" que la position dans certaines formulations.

**d) Méthodes de Runge-Kutta (RK)**

*   **Idée Générale :** Au lieu de prendre une seule évaluation de la "pente" (l'accélération) au début de l'intervalle (comme Euler), les méthodes RK effectuent plusieurs évaluations de la pente à différents points *à l'intérieur* de l'intervalle $\Delta t$, puis combinent ces évaluations de manière pondérée pour obtenir une meilleure approximation de la solution.
*   **Analogie :** Pensez à estimer l'aire sous une courbe. Euler utilise un seul rectangle. Runge-Kutta utilise plusieurs trapèzes ou des approximations polynomiales plus fines.

*   **Runge-Kutta d'Ordre 2 (RK2) - Exemple : Méthode du Point Milieu Améliorée ou Méthode de Heun**
    1.  Calculer une estimation de la vitesse au milieu de l'intervalle :
        $`\vec{k}_1 = \vec{a}(\vec{r}_n, \vec{v}_n, t_n) \cdot \Delta t`$ (variation de vitesse selon Euler)
        $`\vec{v}_{milieu} = \vec{v}_n + \frac{1}{2}\vec{k}_1`$
        $`\vec{r}_{milieu} = \vec{r}_n + \frac{1}{2}\vec{v}_n \Delta t`$  (ou $\frac{1}{2}\vec{v}_{milieu} \Delta t$ pour une variante)
    2.  Calculer l'accélération au point milieu estimé (utilisant $\vec{r}_{milieu}, \vec{v}_{milieu}, t_n + \frac{1}{2}\Delta t$) : $\vec{a}_{milieu}$.
    3.  Mettre à jour la vitesse et la position en utilisant cette accélération du point milieu :
        $`\vec{v}_{n+1} = \vec{v}_n + \vec{a}_{milieu} \cdot \Delta t`$
        $`\vec{r}_{n+1} = \vec{r}_n + \vec{v}_{milieu} \cdot \Delta t`$  (ou $\vec{r}_n + \frac{1}{2}(\vec{v}_n + \vec{v}_{n+1})\Delta t$)
    *   *Note : Il existe plusieurs formulations de RK2.*

*   **Runge-Kutta d'Ordre 4 (RK4) - La "Classique"**
    *   C'est la méthode RK la plus populaire car elle offre un bon équilibre entre précision et coût de calcul. Elle nécessite quatre évaluations de la fonction dérivée (c'est-à-dire quatre calculs d'accélération basés sur différentes estimations de position/vitesse).
    *   **Pour un système d'équations $y' = f(t, y)$ :**
        1.  $`k_1 = \Delta t \cdot f(t_n, y_n)`$
        2.  $`k_2 = \Delta t \cdot f(t_n + \frac{\Delta t}{2}, y_n + \frac{k_1}{2})`$
        3.  $`k_3 = \Delta t \cdot f(t_n + \frac{\Delta t}{2}, y_n + \frac{k_2}{2})`$
        4.  $`k_4 = \Delta t \cdot f(t_n + \Delta t, y_n + k_3)`$
        5.  $`y_{n+1} = y_n + \frac{1}{6}(k_1 + 2k_2 + 2k_3 + k_4)`$
    *   Pour notre système physique, $y$ représente le vecteur $(\vec{r}, \vec{v})$ et $f(t,y)$ représente $(\vec{v}, \vec{a})$. Les calculs se font donc pour la position et la vitesse simultanément, ou séquentiellement.
*   **Caractéristiques de Runge-Kutta :**
    *   **Plus précis :** RK4 est d'ordre 4 (erreur globale en $(\Delta t)^4$). Pour réduire l'erreur par 16, il suffit de réduire $\Delta t$ par 2.
    *   **Plus coûteux en calcul :** Nécessite plusieurs évaluations de la fonction force/accélération par pas de temps (RK4 en nécessite 4).
    *   **Bonne stabilité générale,** mais pas nécessairement symplectique (ne conserve pas aussi bien l'énergie que Verlet sur de très longues simulations de systèmes conservatifs).
    *   Souvent utilisé lorsque la précision est critique et que le coût de calcul supplémentaire est acceptable.

**5. Choisir une Méthode d'Intégration**

Le choix dépend de plusieurs facteurs :

*   **Précision requise :** Pour des simulations visuellement plausibles dans les jeux, Euler semi-implicite ou Verlet sont souvent suffisants. Pour des simulations scientifiques, RK4 ou des méthodes d'ordre supérieur peuvent être nécessaires.
*   **Stabilité :** Les systèmes "raides" (avec des forces qui changent très rapidement, comme des ressorts très durs) nécessitent des méthodes plus stables ou des pas de temps très petits.
*   **Conservation de l'énergie :** Si la conservation de l'énergie est cruciale (ex: simulation orbitale à long terme), Verlet est un excellent choix.
*   **Coût de calcul :** Euler est le moins cher, RK4 le plus cher parmi ceux mentionnés. Dans les jeux, où l'on simule de nombreux objets, le coût par objet est important.
*   **Facilité d'implémentation.**

**En pratique dans les moteurs de jeux :**

*   Beaucoup de moteurs de jeux utilisent des variantes d'**Euler semi-implicite** ou de **Verlet** pour leur bon compromis performance/stabilité/simplicité.
*   Les solveurs de contraintes (pour les articulations, les contacts persistants) peuvent utiliser des techniques plus avancées.
*   Le pas de temps $\Delta t$ est souvent fixe (ex: 1/60ème de seconde) pour assurer la cohérence et la reproductibilité de la simulation.

**Pour l'Activité Pratique Guidée (Manuelle) :**

1.  Commencer par **Euler Explicite** pour sa simplicité conceptuelle.
2.  Puis, implémenter **Euler Semi-Implicite** et comparer les résultats (surtout si vous avez un système avec un ressort, la différence de stabilité peut être visible).
3.  Mentionner Verlet et Runge-Kutta comme des étapes suivantes plus avancées que les moteurs physiques utilisent souvent, mais dont l'implémentation manuelle est plus complexe pour une première approche.

Vous avez tout à fait raison de poser cette question, c'est une nuance importante !

La **conservation de la quantité de mouvement n'est pas une des trois lois de Newton *en tant que telle***, mais elle est une **conséquence directe et très importante de la deuxième et de la troisième loi de Newton** lorsqu'elles sont appliquées à un système d'objets.

Voici comment on peut l'expliquer et la dériver :

---

**Conservation de la Quantité de Mouvement : Une Conséquence des Lois de Newton**

Bien que les trois lois de Newton soient les fondations, le principe de **conservation de la quantité de mouvement** est un outil extrêmement puissant qui découle de ces lois, surtout lorsqu'on analyse des systèmes de plusieurs objets en interaction (comme lors des collisions).

**Définition de la Quantité de Mouvement (Rappel) :**

Pour un objet unique de masse $m$ et de vitesse $\vec{v}$, sa quantité de mouvement (ou moment linéaire) est :

## $\vec{p} = m\vec{v}$

Pour un système de plusieurs objets, la **quantité de mouvement totale du système** ($\vec{P}_{total}$) est la somme vectorielle des quantités de mouvement de chaque objet :

## $\vec{P}_{total} = \vec{p}_1 + \vec{p}_2 + \vec{p}_3 + \dots = \sum_i m_i\vec{v}_i$

**Lien avec la Deuxième Loi de Newton :**

La deuxième loi de Newton peut s'écrire sous la forme :

## $\vec{F}_{net} = \frac{d\vec{p}}{dt}$

Cela signifie que la force nette agissant sur un objet est égale au taux de changement de sa quantité de mouvement.

Si la **force nette externe** agissant sur un **système** d'objets est nulle, alors le taux de changement de la **quantité de mouvement totale du système** est nul :
Si $`\vec{F}_{net, externe\_sur\_système} = 0`$, alors $`\frac{d\vec{P}_{total}}{dt} = 0`$.

Et si la dérivée d'une quantité par rapport au temps est nulle, cela signifie que cette quantité **reste constante**.

**Principe de Conservation de la Quantité de Mouvement :**

> Si la force nette externe agissant sur un système d'objets est nulle, alors la quantité de mouvement totale de ce système reste constante (est conservée).

Mathématiquement :
Si $`\vec{F}_{net, externe\_sur\_système} = 0`$, alors $`\vec{P}_{total, initial} = \vec{P}_{total, final}`$.

**Rôle de la Troisième Loi de Newton dans la Conservation :**

La troisième loi de Newton (action-réaction) est cruciale pour comprendre *pourquoi* la quantité de mouvement totale d'un système isolé est conservée, même lorsque les objets à l'intérieur du système exercent des forces les uns sur les autres (forces internes).

Considérons un système de deux objets A et B qui interagissent (par exemple, lors d'une collision) :
*   L'objet A exerce une force $\vec{F}_{A \text{ sur } B}$ sur l'objet B.
*   Selon la troisième loi, l'objet B exerce une force $\vec{F}_{B \text{ sur } A}$ sur l'objet A, telle que $\vec{F}_{B \text{ sur } A} = - \vec{F}_{A \text{ sur } B}$.

Ces forces sont des **forces internes** au système {A, B}.
Le changement de quantité de mouvement de B dû à A est $d\vec{p}_B/dt = \vec{F}_{A \text{ sur } B}$.
Le changement de quantité de mouvement de A dû à B est $d\vec{p}_A/dt = \vec{F}_{B \text{ sur } A}$.

Le taux de changement de la quantité de mouvement *totale* du système dû à ces forces internes est :
$`\frac{d\vec{P}_{total}}{dt} = \frac{d\vec{p}_A}{dt} + \frac{d\vec{p}_B}{dt} = \vec{F}_{B \text{ sur } A} + \vec{F}_{A \text{ sur } B}`$
Puisque $\vec{F}_{B \text{ sur } A} = - \vec{F}_{A \text{ sur } B}$, alors :
$`\frac{d\vec{P}_{total}}{dt} = -\vec{F}_{A \text{ sur } B} + \vec{F}_{A \text{ sur } B} = 0`$

Cela montre que les **forces internes s'annulent par paires et ne peuvent pas changer la quantité de mouvement totale du système**. Seules les **forces externes nettes** peuvent le faire.

**En résumé pour les étudiants :**

1.  **Lois de Newton :**
    *   **1ère :** Inertie (un objet conserve son mouvement si $\vec{F}_{net}=0$).
    *   **2ème :** $`\vec{F}_{net} = m\vec{a}`$ ou $`\vec{F}_{net} = \frac{d\vec{p}}{dt}`$ (la force nette cause un changement de mouvement).
    *   **3ème :** Action-Réaction ($`\vec{F}_{AB} = -\vec{F}_{BA}`$).

2.  **Conservation de la Quantité de Mouvement :**
    *   **Découle de la 2ème et 3ème loi.**
    *   **Principe :** Si la somme des forces *externes* sur un système est nulle, la quantité de mouvement *totale* de ce système ne change pas.
    *   **Utilité :** Très important pour analyser les collisions, les explosions, les reculs, etc., car souvent, pendant la brève durée de ces interactions, les forces internes sont beaucoup plus grandes que les forces externes (qui peuvent alors être négligées).
