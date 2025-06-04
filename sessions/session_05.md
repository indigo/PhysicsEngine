
**Session 5 : Collisions - Types, Détection, Réponse et Préparation du Devoir 2**

**(Durée Totale Estimée : 6 heures, divisées en 4 blocs de 1h30)**

**Objectifs Clés de la Session :**

*   Comprendre les différents types de collisions (élastiques, inélastiques) et le rôle du coefficient de restitution.
*   Saisir les principes de base de la détection de collision pour des formes simples.
*   Analyser comment répondre à une collision en modifiant les vitesses des objets.
*   Se préparer pour le Devoir 2 qui impliquera l'implémentation de ces concepts.

---

**BLOC 1 : Comprendre les Collisions (1h30)**

*   **A. Introduction et Rappels Fondamentaux (20 minutes)**

    1.  **Rappel – Lois de Newton et Conservation de la Quantité de Mouvement (10 minutes)**
        *   *Points Clés :*
            La **2ème Loi de Newton** 

            ## $\vec{F}_{net} = m\vec{a}$ 
                
            ou
            ## $\vec{F}_{net} = \frac{d\vec{p}}{dt}$ 
            
        nous dit que les forces causent un changement de quantité de mouvement.
        
        La **3ème Loi de Newton** (Action-Réaction) est essentielle pour comprendre que les forces de collision entre deux objets sont internes à leur système.
        
        Le principe de **Conservation de la Quantité de Mouvement** ($`\vec{P}_{total}`$ du système est conservée si $`\vec{F}_{net, externe} = 0`$) est notre outil le plus important pour analyser ce qui se passe *pendant* une collision. Les forces externes (comme la gravité) sont souvent négligeables par rapport aux forces de contact intenses et brèves.

    2.  **Rappel – Énergie et Puissance (10 minutes)**
        *   *Points Clés :*
            *   L'**Énergie Cinétique** ($K = \frac{1}{2}mv^2$) est l'énergie due au mouvement. C'est cette forme d'énergie qui nous aidera à distinguer les types de collisions.
            *   Dans une collision, l'énergie cinétique est-elle toujours conservée ? C'est la question clé qui nous permettra de classer les collisions.

*   **B. Analyse de Votre Exemple Existant : La Balle qui Rebondit (15 minutes)**
    *   Nous allons observer votre simulation actuelle de la balle qui rebondit sur le sol.
    *   *Discussion :*
        *   Que se passe-t-il exactement lorsque la balle touche le sol ? (Sa vitesse change, surtout verticalement).
        *   Quelle est la cause de ce changement de vitesse ? (Une force de contact brève et intense exercée par le sol).
        *   La balle remonte-t-elle toujours à la même hauteur ? Cela nous donne un indice sur le type de collision.
        *   Comment pourrions-nous contrôler la "perte" d'énergie lors du rebond pour le rendre plus ou moins "énergique" ?
    *   Cette discussion nous amène naturellement aux différents types de collisions et à comment les quantifier.

*   **C. Types de Collisions (30 minutes)**
    *   La principale distinction entre les types de collisions se base sur ce qui arrive à l'**énergie cinétique totale** du système des objets qui entrent en collision.
    *   1.  **Collision Parfaitement Élastique :**
            *   **Définition :** L'énergie cinétique totale du système est **conservée** ($K_{total, initial} = K_{total, final}$).
            *   **Caractéristiques :** Aucune énergie n'est "perdue" sous forme de chaleur, de son, ou de déformation permanente des objets. Ils "rebondissent" parfaitement.
            *   *Exemples (idéalisés) :* Choc entre deux boules de billard, collisions entre atomes à basse énergie.
    *   2.  **Collision Inélastique :**
            *   **Définition :** L'énergie cinétique totale du système **diminue** ($K_{total, final} < K_{total, initial}$).
            *   **Caractéristiques :** Une partie de l'énergie cinétique initiale est transformée en d'autres formes d'énergie (chaleur due au frottement interne, son, énergie nécessaire pour déformer les objets de manière permanente).
            *   C'est le type de collision le plus courant dans le monde réel.
    *   3.  **Collision Parfaitement Inélastique (ou "Plastique") :**
            *   **Définition :** Un cas extrême de collision inélastique où les objets **collent ensemble** après l'impact.
            *   **Caractéristiques :** Ils se déplacent ensuite avec une **vitesse finale commune**. La perte d'énergie cinétique est maximale (tout en respectant la conservation de la quantité de mouvement).
            *   *Exemples :* Une boule de pâte à modeler qui frappe un mur et y reste collée, deux wagons de train qui s'accrochent.
    *   **Point Crucial à Retenir :** Dans *tous* ces types de collisions, si le système est isolé, la **quantité de mouvement totale du système est TOUJOURS conservée**.

        ![rebond](../images/rebond.png)

*   **D. Coefficient de Restitution ($e$) (25 minutes)**
    *   **Définition :** Pour mesurer le degré "d'élasticité" d'une collision, nous utilisons le **coefficient de restitution**, noté $e$.
    *   Pour une collision frontale (en une dimension) entre deux objets A et B, ou pour un objet A rebondissant sur une surface B fixe (comme votre balle sur le sol) :
        $`e = \frac{|\text{Vitesse relative de séparation des objets APRES la collision}|}{|\text{Vitesse relative d'approche des objets AVANT la collision}|}`$
        Pour un objet rebondissant sur une surface fixe, si $v_{i, normal}$ est la composante de sa vitesse perpendiculaire à la surface juste avant l'impact, et $v_{f, normal}$ est cette composante juste après :
        $`e = \frac{|v_{f, normal}|}{|v_{i, normal}|}`$
    *   **Interprétation des valeurs de $e$ :**
        *   $`e = 1`$ : Collision **parfaitement élastique**.
        *   $`0 < e < 1`$ : Collision **inélastique**. (Plus $e$ est proche de 0, plus la collision est inélastique).
        *   $`e = 0`$ : Collision **parfaitement inélastique**. (Les objets ne se séparent pas, ou la balle ne rebondit pas du tout sur la surface).
    *   **Application à votre Exemple de Balle :**
        *   "Comment utiliser $e$ pour contrôler le rebond de notre balle ?"
        *   Si $v_{iy}$ est la vitesse verticale de la balle avant de toucher le sol, sa vitesse verticale juste après, $v_{fy}$, sera : $`v_{fy} = -e \cdot v_{iy}`$. Le signe "moins" indique que la direction de la vitesse s'inverse.
        *   *Démonstration :* Montrez (ou demandez aux étudiants d'essayer) de changer la valeur de $e$ dans le code de votre balle (par exemple, $e=0.9$ pour un bon rebond, $e=0.5$ pour un rebond mou, $e=0$ pour aucun rebond). Observez comment la hauteur du rebond change.
    *   Ce coefficient $e$ est un paramètre très utilisé dans les moteurs physiques pour définir le comportement des matériaux lors des chocs.


---

**BLOC 2 : Détection de Collision - Les Bases (1h30)**

*   **A. Qu'est-ce que la Détection de Collision ? Le Problème Fondamental (20 minutes)**

    1.  **Introduction : Pourquoi Détecter ?**
        *   Dans les sessions précédentes, nous avons vu comment les objets bougent et peuvent même rebondir. Mais avant qu'un rebond puisse se produire, notre simulation doit d'abord *savoir* que deux objets sont entrés en contact ou sont sur le point de le faire.
        *   C'est le rôle fondamental de la **détection de collision** : déterminer si, quand, et potentiellement comment, deux (ou plusieurs) objets dans notre monde virtuel occupent le même espace ou se chevauchent.
        *   Imaginez un jeu sans détection de collision : votre personnage passerait à travers les murs, les balles traverseraient les raquettes ! La détection de collision est donc essentielle pour créer des mondes interactifs et crédibles.

    2.  **Le Défi de la Détection :**
        *   Dans un jeu typique, il peut y avoir des centaines, voire des milliers d'objets en mouvement. Vérifier si chaque objet entre en collision avec chaque autre objet à chaque nouvelle image (frame) peut devenir une tâche très lourde pour l'ordinateur. Si nous avons $N$ objets, cela pourrait signifier environ $N^2/2$ paires à vérifier, ce qui augmente très vite !
        *   De plus, les objets peuvent avoir des formes très complexes (personnages 3D, terrains, bâtiments). Tester l'intersection de formes aussi complexes est difficile.
        *   C'est pourquoi des stratégies et des simplifications sont utilisées pour rendre la détection de collision efficace.

        ![collision-circle-circle](../images/collision_04.png)
    3.  **L'Idée de Base : Le Test d'Intersection**
        *   Fondamentalement, détecter une collision revient à poser la question : "Est-ce que la forme géométrique de l'objet A et la forme géométrique de l'objet B se chevauchent (s'intersectent) dans l'espace à cet instant précis ?"
        *   **Exemple très simple : Deux points en 1D.** Si l'objet A est juste un point à la position $x_A$ et l'objet B est un point à $x_B$, ils sont en collision si $x_A = x_B$.
        *   **Exemple un peu plus complexe : Deux cercles en 2D.**
            *   Soit un cercle 1 de centre $C_1=(x_1, y_1)$ et de rayon $R_1$.
            *   Soit un cercle 2 de centre $C_2=(x_2, y_2)$ et de rayon $R_2$.
            *   Intuitivement, quand se touchent-ils ? Quand la distance $d$ entre leurs centres ($C_1$ et $C_2$) est inférieure ou égale à la somme de leurs rayons ($R_1 + R_2$).
            *   La distance $d$ se calcule avec le théorème de Pythagore : $d = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$.
            *   La condition de collision est donc : $d \le R_1 + R_2$.
            *   C'est un exemple de **test d'intersection** que nous allons examiner plus en détail. Notre objectif sera de nous concentrer sur de tels tests pour des formes géométriques simples.

![collision-circle-circle](../images/collision_01.png)
*   **B. Techniques de Détection pour Formes Simples ("Narrow Phase" pour Primitives) (40 minutes)**

    *Ici, nous allons voir comment effectuer des tests d'intersection précis pour quelques formes géométriques de base. C'est ce qu'on appelle souvent la "phase étroite" de la détection de collision.*

    1.  **Test Cercle-Cercle (ou Sphère-Sphère en 3D) (10 minutes) :**
        *   C'est l'un des tests les plus simples et les plus rapides.
        *   **Données :**
            *   Cercle 1 : centre $\vec{c}_1 = (x_1, y_1)$, rayon $r_1$.
            *   Cercle 2 : centre $\vec{c}_2 = (x_2, y_2)$, rayon $r_2$.
        *   **Calculs :**
            *   Vecteur entre les centres : $\vec{d}_{centres} = \vec{c}_2 - \vec{c}_1 = (x_2-x_1, y_2-y_1)$.
            *   Distance (scalaire) entre les centres : $d = |\vec{d}_{centres}| = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$.
        *   **Condition de Collision :** Il y a collision si $`d \le r_1 + r_2`$.
        *   **Informations utiles si collision :**
            *   **Profondeur de Pénétration ($p$) :** Indique de combien les cercles se chevauchent. $`p = (r_1 + r_2) - d`$. Une valeur positive signifie pénétration.
            *   **Normale de Collision ($\hat{n}$) :** C'est un vecteur unitaire qui indique la direction "de l'impact". Elle est généralement définie comme le vecteur unitaire allant du centre d'un cercle vers le centre de l'autre (ou l'inverse, l'important est d'être cohérent). $`\hat{n} = \frac{\vec{d}_{centres}}{d}`$ (si $d \neq 0$). Cette normale est cruciale pour calculer la réponse à la collision (le rebond).
        *   *Utilisations : Parfait pour les balles, projectiles ronds, ou comme première approximation pour des objets plus complexes (on parle alors de "sphères englobantes").*

    2.  **Test Rectangle-Rectangle Alignés sur les Axes (AABB vs AABB) (15 minutes) :**
        *   Un **AABB** (Axis-Aligned Bounding Box) est un rectangle dont les côtés sont toujours parallèles aux axes X et Y du système de coordonnées du monde. Il ne tourne pas avec l'objet qu'il pourrait représenter.
        *   Un AABB est défini par ses coordonnées minimales et maximales :
            *   AABB A : $(A_{xmin}, A_{ymin})$ et $(A_{xmax}, A_{ymax})$
            *   AABB B : $(B_{xmin}, B_{ymin})$ et $(B_{xmax}, B_{ymax})$
        *   **Condition de Collision :** Deux AABB se touchent s'il y a un chevauchement de leurs intervalles sur l'axe X **ET** un chevauchement de leurs intervalles sur l'axe Y.
            *   Il est souvent plus facile de vérifier la condition de **NON-collision** : les AABB *ne se touchent pas* si :
                *   A est complètement à gauche de B : $A_{xmax} < B_{xmin}$ **OU**
                *   A est complètement à droite de B : $A_{xmin} > B_{xmax}$ **OU**
                *   A est complètement en dessous de B : $A_{ymax} < B_{ymin}$ **OU**
                *   A est complètement au-dessus de B : $A_{ymin} > B_{ymax}$
            *   Si *aucune* de ces quatre conditions de non-collision n'est vraie, alors il y a collision.
        *   **Informations utiles si collision :**
            *   On peut calculer le **Vecteur de Translation Minimum (MTV)**. C'est le plus petit déplacement à appliquer à l'une des boîtes pour résoudre l'interpénétration. La **normale de collision** sera alignée avec l'axe du MTV (l'axe où le chevauchement est le plus faible pour la séparation).
        *   *Utilisations : Idéal pour les niveaux basés sur des tuiles, les plateformes, les murs fixes, ou comme boîtes englobantes grossières.*

            ![collision-aabb-aabb](../images/collision_03.png)

    3.  **Autres Primitives Simples (Brève Présentation) (5 minutes) :**
        *   **Point dans Cercle :** 
            
            Un point $P$ est dans un cercle de centre $C$ et rayon $R$ si $\text{distance}(P,C) \le R$.
        *   **Point dans Rectangle (AABB) :** 
        
        Un point $P(x_p, y_p)$ est dans une AABB si $x_{min} \le x_p \le x_{max}$ ET $y_{min} \le y_p \le y_{max}$.

    4.  **Le Défi des Formes Orientées et Complexes (Ouverture) (10 minutes) :**
        *   Les tests précédents fonctionnent bien pour des formes simples ou alignées sur les axes. Mais que faire si nous avons des rectangles qui peuvent tourner (on parle alors de Boîtes Englobantes Orientées - OBB) ou des formes polygonales plus complexes (comme un personnage de jeu) ?
        *   Les tests d'intersection deviennent plus complexes. Une méthode générale et très importante pour les formes **convexes** (formes sans "creux") est le **Théorème des Axes Séparateurs (SAT)**.
        *   **Concept du SAT (sans entrer dans l'implémentation) :** Si deux formes convexes ne s'intersectent pas, on peut toujours trouver une ligne (un "axe séparateur") telle que si l'on projette les deux formes sur cette ligne (comme faire leur "ombre"), ces ombres ne se chevauchent pas. Le SAT consiste à tester un ensemble spécifique d'axes (généralement les lignes perpendiculaires aux faces de chaque forme). Si l'on trouve *un seul* axe où les projections ne se chevauchent pas, il n'y a pas de collision. Si les projections se chevauchent sur *tous* les axes testés, alors il y a collision.
        *   Le SAT est une technique puissante que les moteurs physiques utilisent souvent.
        ![sat](../images/sat.png)

*   **C. Optimisation de la Détection : Phases "Broad" et "Narrow" (15 minutes)**
    *   Dans un jeu avec de nombreux objets, même des tests simples comme AABB vs AABB peuvent devenir trop lents si on doit tester chaque paire d'objets ($N^2$ tests).
    *   Pour optimiser, on utilise souvent une approche en deux étapes :
    *   **1. Phase Large ("Broad Phase") – Le Grand Tri :**
        *   **Objectif :** Éliminer rapidement la grande majorité des paires d'objets qui sont clairement trop éloignés pour entrer en collision.
        *   **Méthodes :** On utilise des formes englobantes très simples (AABB ou sphères) autour de chaque objet. Des structures de données spatiales (comme des grilles qui divisent le monde, ou des arbres comme les Quadtrees/Octrees) sont utilisées pour rapidement identifier quels objets sont dans la même "région" et pourraient donc potentiellement se toucher.
        *   Cette phase ne dit pas "oui, il y a collision", mais plutôt "ces deux objets sont assez proches, ils *pourraient* être en collision, il faut vérifier plus en détail". Elle produit une liste de paires "candidates".
    *   **2. Phase Étroite ("Narrow Phase") – L'Examen Détaillé :**
        *   **Objectif :** Pour chaque paire d'objets candidate fournie par la phase large, on effectue maintenant un test de collision précis en utilisant leurs formes géométriques réelles (ou des approximations convexes plus fines).
        *   C'est ici que l'on utilise les tests que nous avons vus (Cercle-Cercle, AABB-AABB, SAT pour les polygones, etc.).
        *   Si une collision est confirmée, cette phase calcule également des informations importantes pour la réponse à la collision, comme le point de contact, la normale de collision, et la profondeur de pénétration.
    *   Cette stratégie en deux phases améliore considérablement les performances de la détection de collision dans les scènes complexes.

---

**BLOC 3 : Réponse aux Collisions et Démonstration Interactive (1h30)**

*   **A. Principes Fondamentaux de la Réponse aux Collisions (20 minutes)**
    *   "Nous savons maintenant comment détecter si des objets se touchent (Bloc 2). L'étape suivante est de décider comment ils doivent réagir à cet impact. C'est ce qu'on appelle la **réponse à la collision**."
    *   Le but principal de la réponse à la collision est de :
        1.  **Empêcher les objets de s'interpénétrer** (ou de corriger l'interpénétration si elle s'est déjà produite).
        2.  **Modifier les vitesses** des objets d'une manière qui respecte les lois de la physique (conservation de la quantité de mouvement) et le type de collision souhaité (élastique, inélastique, via le coefficient de restitution).

*   **B. Étape 1 de la Réponse : Résolution de l'Interpénétration (25 minutes)**
    *   **Le Problème de l'Interpénétration :**
        *   Dans nos simulations, nous avançons par petits pas de temps discrets ($\Delta t$). Il est très fréquent qu'au moment où nous détectons une collision, les objets aient déjà "dépassé" le point exact de contact et se soient légèrement enfoncés l'un dans l'autre.
        *   Si nous ne corrigeons pas cette interpénétration, les objets peuvent sembler "collés", vibrer étrangement, ou même passer complètement à travers sur les frames suivantes.
    *   **La Solution Conceptuelle : Repositionnement**
        *   L'idée est de **repositionner** un ou plusieurs des objets impliqués pour qu'ils se touchent juste tangentiellement, sans se chevaucher.
        *   Pour cela, on a souvent besoin de connaître :
            *   La **normale de collision ($\hat{n}$)** : La direction perpendiculaire à la surface de contact au point de collision.
            *   La **profondeur de pénétration ($p$)**: De combien les objets se chevauchent le long de cette normale.
        *   **Action :** On déplace un (ou les deux) objet(s) le long de la normale $\hat{n}$ d'une distance égale à $p$.
            *   *Exemple simple : Une balle de rayon $R$ à la position $y_{balle}$ touche un sol horizontal à $y_{sol}=0$. Si $y_{balle} - R < 0$, il y a pénétration. La profondeur de pénétration est $p = R - y_{balle}$. On repositionne la balle à $y_{balle\_corrigee} = R$ (ou $y_{sol} + R$).*
        *   "Dans les moteurs physiques, le calcul de la normale et de la profondeur de pénétration pour des formes complexes peut être sophistiqué (souvent un résultat du test SAT ou GJK)."
        *   "Pour notre Devoir 2 avec des murs alignés sur les axes, la normale et la pénétration seront plus simples à déterminer."

*   **C. Étape 2 de la Réponse : Modification des Vitesses (Le Rebond) (25 minutes)**
    *   C'est ici que nous utilisons notre connaissance des types de collisions et du coefficient de restitution ($e$) du Bloc 1.
    *   **Cas d'une Balle (objet A) contre un Mur Immobile et Massif (objet B) :**
        *   Le mur ne bougera pas significativement, donc sa vitesse avant et après est considérée comme nulle ($\vec{v}_{B,i} = \vec{v}_{B,f} \approx 0$).
        *   Nous nous concentrons sur le changement de vitesse de la balle ($\vec{v}_{A,i} \rightarrow \vec{v}_{A,f}$).
        *   **Rappel de la Définition de $e$ pour un rebond sur surface fixe :**
            $`e = \frac{|v_{A,f,normal}|}{|v_{A,i,normal}|}`$
            Où $v_{normal}$ est la composante de la vitesse de la balle perpendiculaire à la surface du mur.
        *   Cela mène à la règle de rebond pour la composante normale :
            > $`v_{A,f,normal} = -e \cdot v_{A,i,normal}`$
            Le signe "moins" indique que la direction de la composante normale de la vitesse est inversée.
        *   **Et la composante tangentielle ?**
            *   La composante de la vitesse de la balle *parallèle* (tangentielle) à la surface du mur ($v_{A,i,tangentiel}$) est souvent considérée comme **inchangée** si l'on néglige le frottement pendant l'impact :
                $`v_{A,f,tangentiel} = v_{A,i,tangentiel}`$.
            *   (Le frottement lors de l'impact, ou le frottement de glissement après, affecterait cette composante tangentielle).

*   **D. Démonstration Interactive : Balle Rebondissante dans une Boîte (20 minutes)**
    *   **Objectif :** Visualiser la détection et la réponse aux collisions pour une balle avec des murs.
    *   **Environnement :** Nous allons utiliser un code Three.js simple (similaire à votre exemple de balle balistique, ou une version que je peux vous fournir/construire avec vous).
    *   **Modifications à apporter (en direct ou sur un code préparé) :**
        1.  **Définir les Limites de la Boîte :** Créer des variables pour $x_{min}, x_{max}, y_{min}$ (sol), $y_{max}$ (plafond). Dessiner des lignes ou des plans semi-transparents pour visualiser ces limites.
        2.  **Logique de Détection Balle-Murs :** Dans la boucle `animate` (ou `updateSimulation`), après avoir mis à jour la position de la balle ($pos_x, pos_y$) en fonction de sa vitesse et de la gravité :
            *   Ajouter des conditions `if` pour chaque mur :
                *   `if (balle.position.x - balle.rayon < x_min_mur) { /* collision mur gauche */ }`
                *   `if (balle.position.x + balle.rayon > x_max_mur) { /* collision mur droit */ }`
                *   `if (balle.position.y - balle.rayon < y_min_sol) { /* collision sol */ }`
                *   `if (balle.position.y + balle.rayon > y_max_plafond) { /* collision plafond */ }`
        3.  **Implémenter la Réponse pour Chaque Mur :**
            *   À l'intérieur de chaque `if` de collision :
                *   **Résolution de Pénétration (simple) :**
                    `balle.position.x = x_min_mur + balle.rayon;` (pour le mur gauche)
                    `balle.position.y = y_min_sol + balle.rayon;` (pour le sol)
                *   **Modification de la Vitesse :**
                    `balle.vitesse.x = -coefficientDeRestitution * balle.vitesse.x;` (pour murs verticaux)
                    `balle.vitesse.y = -coefficientDeRestitution * balle.vitesse.y;` (pour murs horizontaux)
        4.  **Paramètre `coefficientDeRestitution` :** Ajouter cette variable et la rendre modifiable (par exemple, avec `dat.GUI`).
        5.  **Lancer et Observer :** Lancer la balle dans la boîte avec une vitesse initiale. Observer les rebonds. Changer la valeur du `coefficientDeRestitution` (de 0 à 1) et voir comment cela affecte le comportement de la balle (hauteur des rebonds, "vivacité").
    *   Cette démonstration pratique est la meilleure façon de comprendre comment ces concepts s'appliquent.

---

**BLOC 4 : Introduction au Frottement de Contact et Présentation du Devoir 2 (1h30)**

*   **A. Au-delà du Rebond : Les Forces de Frottement de Contact (35 minutes)**
    *   "Lorsque notre balle rebondit sur un mur, nous avons considéré que sa vitesse parallèle au mur ne changeait pas. Mais si le mur est rugueux, ou si la balle glisse sur le sol, il y a une autre force importante : le **frottement**."
    *   **1. Le Frottement : Une Force qui s'Oppose au Mouvement Relatif**
        *   Le frottement est une force de contact qui apparaît lorsque deux surfaces tentent de glisser ou glissent l'une par rapport à l'autre.
        *   Sa direction est toujours **opposée** à la direction du mouvement relatif (ou de la tendance au mouvement).
    *   **2. Frottement Cinétique (ou Dynamique, $f_k$) :**
        *   C'est le frottement qui agit lorsqu'un objet **glisse** déjà sur une surface.
        *   Sa magnitude est généralement approximée par :
            > $`f_k = \mu_k N`$
            Où :
            *   $\mu_k$ (mu-ka) est le **coefficient de frottement cinétique**. C'est un nombre sans dimension qui dépend de la nature des deux surfaces en contact (ex: caoutchouc sur béton, acier sur glace). Des surfaces plus rugueuses ont un $\mu_k$ plus élevé.
            *   $N$ est la magnitude de la **force normale**. C'est la force de support que la surface exerce sur l'objet, perpendiculairement à la surface.
        *   **Important :** $f_k$ ne dépend (approximativement) *ni de l'aire de contact, ni de la vitesse relative* (pour des vitesses non extrêmes).
    *   **3. Calcul de la Force Normale ($N$) (Cas Simple : Sol Horizontal) :**
        *   Si un objet de masse $m$ est sur un sol horizontal et que les seules forces verticales sont la gravité ($\vec{F}_g$, vers le bas) et la force normale ($\vec{N}$, vers le haut), alors pour que l'objet ne s'enfonce pas ou ne décolle pas, ces forces doivent s'équilibrer : $N - mg = 0$, donc $N = mg$.
        *   Dans ce cas, la force de frottement cinétique devient : $f_k = \mu_k mg$.
    *   **4. Appliquer la Force de Frottement dans la Simulation (pour le Devoir 2) :**
        *   Lorsque votre balle est en contact avec le sol et a une vitesse horizontale ($v_x$ et/ou $v_z$ si en 3D) :
            *   La force de frottement cinétique agira pour s'opposer à ces composantes de vitesse.
            *   Par exemple, pour la composante $x$ :
                $`F_{frottement,x} = -\mu_k N \cdot \text{signe}(v_x)`$
                Le terme $\text{signe}(v_x)$ (+1 si $v_x > 0$, -1 si $v_x < 0$) assure que la force s'oppose à la direction de $v_x$.
            *   Cette force de frottement sera ajoutée à la somme des forces ($\vec{F}_{net}$) pour calculer l'accélération de la balle :
                $`a_x = (\sum F_x \text{ autres} + F_{frottement,x}) / m`$.
                Causant une décélération constante (si $\mu_k$ et $N$ sont constants) qui arrêtera éventuellement le glissement.
    *   **5. Frottement Statique ($f_s$) (Concept rapide) :**
        *   Force qui empêche un objet de commencer à bouger. S'ajuste jusqu'à $f_{s,max} = \mu_s N$. Si la force motrice < $f_{s,max}$, l'objet reste immobile. (Plus complexe à simuler de manière stable, souvent les moteurs utilisent des approximations). Pour le Devoir 2, le frottement cinétique est suffisant.

*   **B. Démonstration (Optionnelle) : Ajout d'un Frottement Simple au Sol (15 minutes)**
    *   Si vous avez le temps, modifiez votre démo de "balle dans une boîte" :
    *   **Logique à ajouter :**
        *   Vérifiez si la balle est au sol ( `Math.abs(balle.position.y - balle.rayon) < epsilon_contact` )
        *   ET si elle a une vitesse horizontale ( `Math.abs(balle.vitesse.x) > epsilon_vitesse` ).
        *   Si oui, calculez la force de frottement cinétique opposée à `balle.vitesse.x`.
        *   Appliquez l'accélération correspondante à `balle.vitesse.x`.
        *   `// Attention à ce que la balle ne change pas de sens juste à cause du frottement;`
        *   `// si la vitesse devient très petite, mettez-la à zéro.`
    *   Ajoutez un paramètre `coefficientFrottementSol` au GUI.
    *   Observez comment la balle ralentit et s'arrête de glisser sur le sol.

*   **C. Présentation Détaillée du Devoir 2 (30 minutes)**
    *   **Objectif :** "Votre mission pour le Devoir 2 sera de prendre le template de la sphère balistique (celui du Devoir 1 est une bonne base, ou celui que nous fournirons) et d'y implémenter :
        1.  Des **murs** formant une boîte de confinement.
        2.  La **détection de collision** entre la sphère et ces murs.
        3.  La **réponse aux collisions** avec les murs, en utilisant un **coefficient de restitution** que vous pourrez faire varier.
        4.  Une **force de frottement cinétique** simple lorsque la sphère est en contact avec le sol et glisse horizontalement."
    *   **Repasser les Fonctionnalités Minimales Attendues (celles détaillées dans l'énoncé du Devoir 2).**
    *   **Montrer le Template du Devoir 2 et identifier les sections `// TODO: ÉTUDIANT - ...` où ils devront écrire leur code :**
        *   La section de détection/réponse aux collisions avec les murs Xmin, Xmax, Ymax, Zmin, Zmax (le Ymin/sol est déjà partiellement là comme exemple).
        *   La section de calcul et d'application de la force de frottement au sol.
    *   **Rappeler les Critères d'Évaluation.**
*   **D. Questions / Réponses sur le Devoir et la Session (10 minutes)**
    *   Clarifier tout aspect du Devoir 2.
    *   Répondre aux questions sur les concepts de collision, détection, réponse, et frottement vus aujourd'hui.
    *   Annoncer la Date de Remise pour le Devoir 2.

---
