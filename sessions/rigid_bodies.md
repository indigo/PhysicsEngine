
**Types d'Objets Rigides (Rigid Bodies) dans un Moteur Physique :**

1.  **Dynamique (Dynamic) :**
    *   **Contrôle :** Entièrement contrôlé par le moteur physique.
    *   **Propriétés :** Possède une masse, une inertie, réagit aux forces (gravité, collisions, forces appliquées via le code) et aux couples. Sa position et son orientation sont mises à jour par le solveur du moteur physique en intégrant les équations du mouvement.
    *   **Interactions :** Peut entrer en collision et influencer d'autres objets dynamiques et cinématiques. Il est affecté par les objets statiques.
    *   **Exemples :** Une balle qui tombe, une caisse qui est poussée, un personnage de ragdoll.

2.  **Cinématique (Kinematic) :**
    *   **Contrôle :** Sa position et son orientation sont directement définies par l'utilisateur (via le code, une animation, la souris, etc.) à chaque pas de temps. Le moteur physique ne calcule pas son mouvement à partir des forces.
    *   **Propriétés :** Possède une forme de collision (collider) mais est traité comme ayant une **masse infinie** par le moteur physique lorsqu'il s'agit d'interactions *avec des objets dynamiques*. Il n'est pas affecté par les forces ou les collisions de la même manière qu'un objet dynamique (il ne "rebondit" pas, par exemple, à moins que vous ne le codiez spécifiquement).
    *   **Interactions :**
        *   Peut pousser et déplacer des objets dynamiques.
        *   Les objets dynamiques entrent en collision avec lui et réagissent (rebondissent, s'arrêtent).
        *   Il n'est pas (directement) affecté par les collisions avec les objets dynamiques (c'est-à-dire que sa trajectoire définie par l'utilisateur n'est pas modifiée par ces collisions).
        *   Peut traverser des objets statiques ou d'autres objets cinématiques si leur mouvement n'est pas géré pour l'éviter (le moteur ne résout pas les collisions cinématique-cinématique ou cinématique-statique en modifiant la trajectoire du cinématique).
    *   **Exemples :**
        *   Une plateforme mobile contrôlée par un script.
        *   Un personnage joueur contrôlé directement par les entrées du clavier/souris (souvent, le *corps principal* du personnage est cinématique, tandis que des parties comme un ragdoll peuvent devenir dynamiques).
        *   La main d'un joueur en VR.
        *   Un ascenseur.

3.  **Statique (Static) :**
    *   **Contrôle :** Ne bouge jamais. Sa position est fixe dans le monde.
    *   **Propriétés :** Possède une forme de collision mais est traité comme ayant une masse infinie et une inertie infinie.
    *   **Interactions :** Les objets dynamiques et cinématiques peuvent entrer en collision avec lui. Il ne réagit pas aux forces.
    *   **Exemples :** Le sol, les murs, les obstacles fixes.

**La "Force Infinie" et la Transition :**

Le concept de "force infinie" que vous mentionnez pour les objets cinématiques est une bonne façon de l'imaginer du point de vue d'un objet dynamique qui entre en collision avec.

*   **Pourquoi "masse infinie" ?** Lorsqu'un objet dynamique (ex: une balle) frappe un objet cinématique (ex: une plateforme que vous déplacez avec la souris), la plateforme cinématique continue son mouvement tel que défini par la souris, comme si de rien n'était. La balle, elle, va rebondir ou être repoussée. Pour que la plateforme ne soit pas affectée par la balle (qui a une masse finie), le moteur physique la traite *conceptuellement* comme si elle avait une masse infinie. Si vous appliquez les lois de conservation de la quantité de mouvement, un objet de masse finie ne peut pas altérer la vitesse d'un objet de masse infinie.

*   **Comment ça marche dans le moteur ?**
    1.  **Mouvement dicté :** À chaque frame, vous (ou l'animation) dites : "Objet cinématique, tu es maintenant à la position X, Y, Z avec l'orientation Q". Vous le "téléportez" essentiellement (ou interpolez son mouvement) à sa nouvelle position/orientation.
    2.  **Détection de collision :** Le moteur physique détecte que l'objet cinématique, dans sa nouvelle position, pourrait chevaucher un objet dynamique.
    3.  **Résolution de collision (pour l'objet dynamique) :** Le moteur résout cette collision principalement en affectant l'objet *dynamique*.
        *   **Repositionnement :** L'objet dynamique est repoussé pour ne plus chevaucher l'objet cinématique.
        *   **Changement de vitesse :** La vitesse de l'objet dynamique est modifiée comme s'il avait heurté un objet immobile ou un objet avec une masse infinie se déplaçant selon la trajectoire du cinématique. Le coefficient de restitution s'applique toujours.
    4.  **L'objet cinématique continue :** L'objet cinématique, lui, ignore cette interaction en termes de *sa propre trajectoire future* (sauf si vous ajoutez du code pour le faire réagir). Il continuera à suivre les instructions de l'utilisateur ou de l'animation à la frame suivante.

**Comprendre la Transition/Interaction :**

*   **Le "contrôle fort" :** L'objet cinématique a un contrôle absolu sur sa propre position et orientation. C'est comme une main divine qui déplace l'objet.
*   **L' "espace extérieur qui réagit" :** Ce sont les objets dynamiques. Ils subissent les conséquences du passage de l'objet cinématique. Si l'objet cinématique les pousse, ils sont poussés. S'il les écrase contre un mur, ils sont écrasés (ou le moteur tente de résoudre la situation, ce qui peut parfois conduire à des instabilités si les forces deviennent trop grandes).
*   **Pas de "retour de force" naturel sur le cinématique :** Si une balle dynamique frappe votre plateforme cinématique, la plateforme ne va pas "sentir" l'impact et ralentir ou changer de direction *à cause du moteur physique*. Si vous voulez un tel effet (par exemple, que le joueur sente une résistance lorsqu'il pousse des objets lourds), vous devez le coder manuellement :
    *   Détecter la collision.
    *   Calculer la force de réaction (par exemple, via l'impulsion appliquée à l'objet dynamique).
    *   Modifier le mouvement *imposé* à l'objet cinématique en fonction de cette force de réaction (par exemple, limiter sa vitesse).

**Cas d'usage et défis :**

*   **Personnages joueurs :** Souvent, le contrôleur de personnage principal est un corps cinématique (souvent une capsule). Cela donne un contrôle direct et réactif au joueur. Les collisions avec l'environnement statique l'empêchent de traverser les murs. Lorsqu'il pousse des objets dynamiques, ceux-ci réagissent.
*   **Problème du "mur de briques" :** Si un objet cinématique se déplace très rapidement et pousse un objet dynamique contre un objet statique, l'objet dynamique peut se retrouver "compressé" et le moteur peut avoir du mal à résoudre la situation, conduisant parfois à ce que l'objet dynamique soit éjecté à grande vitesse (effet "tunneling" ou "explosion").
*   **Transition Cinématique <-> Dynamique :** Certains moteurs permettent de changer le type d'un objet à la volée. Par exemple, un personnage contrôlé cinématiquement peut passer en mode "ragdoll" (entièrement dynamique) lorsqu'il est touché par une explosion.

En résumé, la distinction cinématique/dynamique est une astuce fondamentale des moteurs physiques pour permettre à la fois un contrôle précis par l'utilisateur/script et une simulation physique réactive pour les autres objets. L'objet cinématique agit comme une "perturbation" contrôlée dans le monde physique des objets dynamiques.