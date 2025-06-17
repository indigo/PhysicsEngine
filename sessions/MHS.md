
**L'Objectif :**
Démontrer comment l'application de la 2ème loi de Newton à un système avec une force de rappel linéaire (comme un ressort idéal) conduit à une équation différentielle spécifique, puis trouver la solution générale de cette équation, qui décrit le mouvement.

**Le Système : Système Masse-Ressort Idéal (Horizontal, Sans Frottement)**

1.  **Masse ($m$)**: Un objet de masse $m$.
2.  **Ressort Idéal**:
    *   Obéit à la loi de Hooke : La force exercée *par* le ressort ($F_s$) est directement proportionnelle à son déplacement ($x$) par rapport à sa position d'équilibre et agit dans la direction opposée au déplacement.
    *   $F_s = -kx$
        *   $k$ est la constante de raideur du ressort (N/m).
        *   $x$ est le déplacement par rapport à la position d'équilibre.
        *   La position d'équilibre est celle où le ressort n'est ni étiré ni comprimé, et n'exerce donc aucune force ($x=0$).
    *   La masse du ressort lui-même est négligeable.
3.  **Absence de Frottement/Amortissement**: Nous supposons qu'il n'y a pas de résistance de l'air ou d'autres forces dissipatives.
4.  **Mouvement Unidimensionnel**: La masse se déplace le long d'un seul axe (par exemple, l'axe des x).

**Étape 1 : Application de la 2ème Loi de Newton**

La 2ème loi de Newton stipule que :
$`\Sigma F = ma`$
où :
*   $\Sigma F$ est la force nette agissant sur l'objet.
*   $m$ est la masse de l'objet.
*   $a$ est l'accélération de l'objet.

Dans notre système masse-ressort, la seule force agissant sur la masse dans la direction du mouvement (le long de l'axe des x) est la force du ressort $F_s$.
Donc, $\Sigma F = F_s$.

En substituant la loi de Hooke ($F_s = -kx$) :
$`-kx = ma`$

**Étape 2 : Expression de l'Accélération comme une Dérivée**

L'accélération ($a$) est le taux de variation de la vitesse, et la vitesse est le taux de variation de la position. Par conséquent, l'accélération est la dérivée seconde de la position ($x$) par rapport au temps ($t$) :
$`a = \frac{dv}{dt} = \frac{d}{dt} \left( \frac{dx}{dt} \right) = \frac{d^2x}{dt^2}`$

Nous pouvons aussi utiliser la notation pointée pour les dérivées par rapport au temps : $a = \ddot{x}$.

**Étape 3 : Formation de l'Équation Différentielle**

Substituons l'expression de l'accélération dans notre équation issue de la 2ème loi de Newton :
$`-kx = m \frac{d^2x}{dt^2}`$

C'est l'équation différentielle qui régit le mouvement du système masse-ressort. C'est une équation qui relie la fonction $x(t)$ (position en fonction du temps) à sa dérivée seconde.

Pour la mettre sous une forme plus standard, nous la réarrangeons :
$`m \frac{d^2x}{dt^2} + kx = 0`$

Et typiquement, nous divisons par $m$ (en supposant $m \neq 0$) :
$`\frac{d^2x}{dt^2} + \frac{k}{m}x = 0`$

C'est une **équation différentielle ordinaire (EDO), linéaire, homogène, du second ordre, à coefficients constants**.

**Étape 4 : Introduction de la Pulsation ($\omega$)**

Pour simplifier l'équation et mettre en évidence une quantité physique clé, nous définissons la **pulsation** (ou vitesse angulaire, fréquence angulaire) $\omega$ (oméga) comme :
$`\omega^2 = \frac{k}{m}`$
Donc, $`\omega = \sqrt{\frac{k}{m}}`$.

Notez que $\omega$ a pour unité le radian par seconde (rad/s). Elle est liée à la rapidité avec laquelle le système oscille.

En substituant $\omega^2$ dans l'équation différentielle, nous obtenons la forme canonique de l'équation du MHS :
$`\frac{d^2x}{dt^2} + \omega^2 x = 0`$
ou
$`\ddot{x} + \omega^2 x = 0`$

**Étape 5 : Résolution de l'Équation Différentielle**

Nous cherchons une fonction $x(t)$ dont la dérivée seconde est proportionnelle à l'opposé de la fonction elle-même. Les fonctions qui se comportent ainsi sont les sinus et les cosinus.

Essayons une solution générale de la forme :
$`x(t) = A \cos(\Omega t + \phi)`$
où :
*   $A$ est l'amplitude (déplacement maximal).
*   $\Omega$ (Oméga majuscule, à ne pas confondre avec $\omega$ pour l'instant, nous allons montrer qu'ils sont identiques) est la pulsation de notre solution proposée.
*   $\phi$ (phi) est la constante de phase (ou angle de phase), qui détermine la position/vitesse initiale.

Maintenant, nous devons trouver les dérivées de cette solution proposée :
*   Dérivée première (vitesse, $\dot{x}$) :
    $`\dot{x}(t) = \frac{dx}{dt} = -A\Omega \sin(\Omega t + \phi)`$
*   Dérivée seconde (accélération, $\ddot{x}$) :
    $`\ddot{x}(t) = \frac{d^2x}{dt^2} = -A\Omega^2 \cos(\Omega t + \phi)`$

Remarquez que $`-A\Omega^2 \cos(\Omega t + \phi) = -\Omega^2 [A \cos(\Omega t + \phi)] = -\Omega^2 x(t)`$.
Donc, $`\ddot{x}(t) = -\Omega^2 x(t)`$.

Maintenant, substituons cela dans notre équation différentielle $`\ddot{x} + \omega^2 x = 0`$ :
$`(-\Omega^2 x(t)) + \omega^2 x(t) = 0`$
$`(\omega^2 - \Omega^2) x(t) = 0`$

Pour que cette équation soit vraie pour tout temps $t$ (et pour des solutions non triviales où $x(t)$ n'est pas toujours nul), le terme entre parenthèses doit être nul :
$`\omega^2 - \Omega^2 = 0`$
$`\Omega^2 = \omega^2`$
Puisque $\Omega$ et $\omega$ sont typiquement définis comme positifs (représentant des fréquences), nous avons :
$`\Omega = \omega`$

Cela confirme que la pulsation de notre solution en cosinus est bien le $\omega = \sqrt{k/m}$ que nous avions défini à partir des paramètres du système.

**La Solution Générale**

Par conséquent, la solution générale de l'équation différentielle du MHS $`\ddot{x} + \omega^2 x = 0`$ est :
$`x(t) = A \cos(\omega t + \phi)`$
où $\omega = \sqrt{k/m}$.

**Formes Alternatives de la Solution Générale :**

La solution générale peut aussi être exprimée sous d'autres formes équivalentes :

1.  **En utilisant un sinus :**
    $`x(t) = B \sin(\omega t + \psi)`$
    (Ceci n'est qu'un déphasage par rapport à la forme en cosinus : $\cos(\theta) = \sin(\theta + \pi/2)$).

2.  **En utilisant une combinaison linéaire de sinus et cosinus :**
    $`x(t) = C_1 \cos(\omega t) + C_2 \sin(\omega t)`$
    Cette forme est souvent plus facile à utiliser lorsqu'on applique des conditions initiales (position $x_0$ et vitesse $v_0$ à $t=0$).
    Les constantes $C_1$ et $C_2$ sont liées à $A$ et $\phi$ :
    $A = \sqrt{C_1^2 + C_2^2}$
    $\tan \phi = -C_2/C_1$ (attention au quadrant de $\phi$)
    Plus précisément, si $x(0) = x_0$ et $v(0) = v_0$ :
    $x_0 = C_1 \cos(0) + C_2 \sin(0) \implies C_1 = x_0$
    $v(t) = -C_1 \omega \sin(\omega t) + C_2 \omega \cos(\omega t)$
    $v_0 = -C_1 \omega \sin(0) + C_2 \omega \cos(0) \implies C_2 \omega = v_0 \implies C_2 = v_0/\omega$
    Donc, $`x(t) = x_0 \cos(\omega t) + \frac{v_0}{\omega} \sin(\omega t)`$.

**Quantités Physiques Clés Dérivées de la Solution :**

*   **Amplitude ($A$)**: Le déplacement maximal par rapport à la position d'équilibre. Elle dépend des conditions initiales (de combien on tire/pousse initialement ou à quelle vitesse on le lance).
*   **Pulsation ($\omega$)**: $`\omega = \sqrt{k/m}`$. C'est une propriété intrinsèque du système (dépend seulement de $k$ et $m$).
*   **Période ($T$)**: Le temps nécessaire pour une oscillation complète.
    $`T = \frac{2\pi}{\omega} = 2\pi \sqrt{\frac{m}{k}}`$
*   **Fréquence ($f$)**: Le nombre d'oscillations par unité de temps.
    $`f = \frac{1}{T} = \frac{\omega}{2\pi} = \frac{1}{2\pi} \sqrt{\frac{k}{m}}`$
*   **Constante de Phase ($\phi$)**: Déterminée par les conditions initiales. Elle spécifie la position de la particule à $t=0$. Par exemple :
    *   Si la particule est lâchée depuis son déplacement positif maximal ($x_0 = A$) à $t=0$ avec une vitesse initiale nulle, alors $\phi = 0$.
    *   Si la particule est à l'équilibre ($x_0 = 0$) à $t=0$ et se déplace dans la direction positive avec sa vitesse maximale, alors $\phi = -\pi/2$ (pour $x(t) = A \cos(\omega t + \phi)$) ou $\psi = 0$ (pour $x(t) = B \sin(\omega t + \psi)$).

**Résumé de la "Preuve" :**

1.  **Modéliser la Force**: Identifier la force de rappel, $F_s = -kx$.
2.  **Appliquer la 2ème Loi de Newton**: $\Sigma F = ma \implies -kx = ma$.
3.  **Utiliser la Définition de l'Accélération en Calcul Différentiel**: $a = \ddot{x} \implies -kx = m\ddot{x}$.
4.  **Réarranger en Forme Standard**: $\ddot{x} + (k/m)x = 0$.
5.  **Définir $\omega^2 = k/m$**: $\ddot{x} + \omega^2 x = 0$. C'est l'équation différentielle du MHS.
6.  **Proposer une Solution**: Supposer $x(t) = A \cos(\Omega t + \phi)$.
7.  **Vérifier la Solution**: Dériver $x(t)$ deux fois pour obtenir $\ddot{x}(t) = -\Omega^2 x(t)$.
8.  **Substituer dans l'Équation Différentielle**: $-\Omega^2 x(t) + \omega^2 x(t) = 0 \implies \Omega^2 = \omega^2$.
9.  **Conclure**: La solution proposée fonctionne si $\Omega = \omega$, menant à la solution générale $x(t) = A \cos(\omega t + \phi)$.
