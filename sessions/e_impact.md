Vous avez raison de demander des précisions ! L'équation $K_{relatif, normal, final} = e^2 \cdot K_{relatif, normal, initial}$ n'est pas toujours explicitement écrite sous cette forme dans tous les manuels ou cours introductifs, mais elle est une conséquence directe et importante de la définition du coefficient de restitution $e$ et de la définition de l'énergie cinétique.

Voyons comment on y arrive, car c'est une bonne façon de solidifier le lien entre $e$ et l'énergie.

**1. Rappels :**

*   **Coefficient de Restitution ($e$) (pour les composantes normales) :**
    $`e = \frac{v_{Bf,n} - v_{Af,n}}{v_{Ai,n} - v_{Bi,n}}`$
    On peut réarranger cela pour exprimer la vitesse relative normale finale :
    $`(v_{Bf,n} - v_{Af,n}) = e \cdot (v_{Ai,n} - v_{Bi,n})`$  (Équation 1)

*   **Énergie Cinétique :**
    $K = \frac{1}{2}mv^2$

**2. Énergie Cinétique Relative (le long de la normale)**

Quand on analyse l'énergie "disponible" pour la déformation et la restitution lors d'une collision, ou l'énergie "perdue", il est souvent utile de considérer le mouvement dans le **référentiel du centre de masse**, ou de manière équivalente, l'énergie cinétique associée au **mouvement relatif** des objets.

Pour un système à deux corps A et B, l'énergie cinétique associée à leur mouvement relatif le long de la normale est donnée par :

$`K_{relatif, normal} = \frac{1}{2} \mu (v_{relatif, normal})^2`$

Où :
*   $\mu$ (mu) est la **masse réduite** du système :
    $`\mu = \frac{m_A m_B}{m_A + m_B}`$
*   $v_{relatif, normal}$ est la magnitude de la vitesse relative normale.
    *   Avant la collision : $v_{relatif, normal, initial} = |v_{Ai,n} - v_{Bi,n}|$
    *   Après la collision : $v_{relatif, normal, final} = |v_{Bf,n} - v_{Af,n}|$

Donc :
*   **Énergie cinétique relative normale initiale ($K_{rni}$ ou $K_{relatif, normal, initial}$) :**
    $`K_{rni} = \frac{1}{2} \mu (v_{Ai,n} - v_{Bi,n})^2`$ (Équation 2)

*   **Énergie cinétique relative normale finale ($K_{rnf}$ ou $K_{relatif, normal, final}$) :**
    $`K_{rnf} = \frac{1}{2} \mu (v_{Bf,n} - v_{Af,n})^2`$ (Équation 3)

**3. Faire le Lien :**

Maintenant, utilisons l'Équation 1 (la définition de $e$ réarrangée) et substituons-la dans l'Équation 3 (pour $K_{rnf}$) :

On a : $(v_{Bf,n} - v_{Af,n}) = e \cdot (v_{Ai,n} - v_{Bi,n})$

Substituons cela dans l'expression de $K_{rnf}$:
$`K_{rnf} = \frac{1}{2} \mu [e \cdot (v_{Ai,n} - v_{Bi,n})]^2`$

En développant le carré :
$`K_{rnf} = \frac{1}{2} \mu \cdot e^2 \cdot (v_{Ai,n} - v_{Bi,n})^2`$

Réarrangeons les termes :
$`K_{rnf} = e^2 \cdot \left[ \frac{1}{2} \mu (v_{Ai,n} - v_{Bi,n})^2 \right]`$

Maintenant, regardez le terme entre crochets : $\left[ \frac{1}{2} \mu (v_{Ai,n} - v_{Bi,n})^2 \right]$. C'est exactement notre définition de $K_{rni}$ (Équation 2) !

Donc, on peut substituer $K_{rni}$ :

## $K_{rnf} = e^2 \cdot K_{rni}$

**Conclusion de la Dérivation :**

L'énergie cinétique associée au mouvement relatif des deux objets le long de la normale de collision *après* l'impact est égale à $e^2$ fois l'énergie cinétique associée à leur mouvement relatif le long de la normale *avant* l'impact.

Presque, mais il y a une nuance importante ! On n'enlève pas vraiment $m$ de l'équation de l'énergie elle-même, mais la **définition de $e$** est formulée de manière à ce que les masses (via la masse réduite $\mu$) présentes dans les expressions de $K_{rni}$ et $K_{rnf}$ "s'équilibrent" ou se simplifient lorsqu'on considère le rapport qui mène à $e^2$.

Reprenons :

1.  **Énergie Cinétique Relative Normale Initiale ($K_{rni}$):**
    $`K_{rni} = \frac{1}{2} \mu (v_{Ai,n} - v_{Bi,n})^2`$
    où $\mu = \frac{m_A m_B}{m_A + m_B}$ (la masse réduite, qui **contient $m_A$ et $m_B$**).

2.  **Énergie Cinétique Relative Normale Finale ($K_{rnf}$):**
    $`K_{rnf} = \frac{1}{2} \mu (v_{Bf,n} - v_{Af,n})^2`$
    (La même masse réduite $\mu$ s'applique car le système est le même).

3.  **La relation clé :**
    $`K_{rnf} = e^2 \cdot K_{rni}`$

**Si on substitue les expressions complètes de $K_{rni}$ et $K_{rnf}$ :**

$`\frac{1}{2} \mu (v_{Bf,n} - v_{Af,n})^2 = e^2 \cdot \left[ \frac{1}{2} \mu (v_{Ai,n} - v_{Bi,n})^2 \right]`$

Maintenant, regardez cette équation. Le terme $\frac{1}{2}\mu$ apparaît des deux côtés. On peut donc le **simplifier mathématiquement** de l'équation :

$`(v_{Bf,n} - v_{Af,n})^2 = e^2 \cdot (v_{Ai,n} - v_{Bi,n})^2`$

En prenant la racine carrée des deux côtés (et en considérant que $e$ est positif, et que les vitesses relatives sont définies de manière cohérente pour que le rapport soit positif) :

$`|v_{Bf,n} - v_{Af,n}| = e \cdot |v_{Ai,n} - v_{Bi,n}|`$

Ou, si l'on gère les signes pour que $(v_{Ai,n} - v_{Bi,n})$ soit la vitesse d'approche et $(v_{Bf,n} - v_{Af,n})$ soit la vitesse de séparation :

$`v_{Bf,n} - v_{Af,n} = e \cdot (v_{Ai,n} - v_{Bi,n})`$

**C'est la définition du coefficient de restitution $e$ !**

**Donc, ce n'est pas qu'on "enlève $m$" de l'énergie, mais plutôt que :**

*   Le coefficient de restitution $e$ est **défini** comme un rapport de vitesses relatives.
*   Il se trouve que ce rapport de vitesses relatives est tel que lorsqu'on l'élève au carré ($e^2$), il correspond au rapport des énergies cinétiques relatives (où le facteur $\frac{1}{2}\mu$ commun aux deux énergies s'annule).

**Pour le dire autrement :**

1.  Les physiciens ont observé que le rapport $\frac{|v_{relative, final}|}{|v_{relative, initial}|}$ était une constante utile, $e$.
2.  Ils ont aussi observé que l'énergie n'était pas toujours conservée. La fraction d'énergie cinétique *relative normale* conservée est $e^2$.
3.  Ces deux observations sont cohérentes parce que l'énergie cinétique est proportionnelle à $v^2$ et contient un terme de masse (la masse réduite $\mu$) qui est le même pour $K_{rni}$ et $K_{rnf}$.

**Donc, quand on DÉFINIT $e$, on se concentre sur le rapport des vitesses relatives.** On n'y met pas les masses explicitement parce qu'on essaie de caractériser l'élasticité de l'interface.

Quand on ANALYSE L'ÉNERGIE, les masses sont absolument là (via $\mu$). La relation $K_{rnf} = e^2 K_{rni}$ montre comment l'énergie (qui inclut les masses) est affectée, et $e^2$ est le facteur clé.