

**Session 6 : Approfondissement des Forces - Frottement et Ressorts (Partie 2/2)**

**Bloc 2 : Donner Vie aux Forces : Frottement et Ressorts en Code (1h30)**

**Objectif du bloc :** Traduire notre compréhension théorique du frottement et des ressorts en code JavaScript fonctionnel dans une simulation Three.js. On va "enseigner" à nos objets virtuels comment ressentir ces forces.

**(5 minutes) Introduction : Des Équations au Comportement Émergent**

*   **Rappel du Bloc 1 :** "Nous avons décortiqué les 'règles du jeu' du frottement et des ressorts (leurs équations). Maintenant, on passe de la théorie à la pratique : comment faire en sorte que nos objets dans la simulation *suivent* ces règles ?"
*   **La Magie de l'Intégration Numérique (rappel rapide) :** "Souvenez-vous, on ne résout pas d'équations complexes directement. On calcule les forces à chaque instant, on en déduit l'accélération ($F=ma$), puis on met à jour la vitesse et la position petit pas par petit pas ($\Delta t$)."
*   **Objectif du Bloc :** Intégrer concrètement $f_k = \mu_k N$ et $F_s = -kx$ dans une boucle de simulation.

---

**1. Dompter la Glisse : Implémenter le Frottement Cinétique (35-40 minutes)**
    *(On se concentre sur le frottement cinétique, car le statique est plus complexe à implémenter de manière robuste et est souvent géré différemment dans les moteurs complets).*

*   **A. Scénario : Notre Objet Glissant (5 minutes)**
    *   Imaginons un palet (ou notre masse du pendule si elle touche un sol) qui glisse sur une surface. On veut qu'il ralentisse et s'arrête, comme dans la vraie vie, à cause du frottement.
    *   **Prérequis :** L'objet a une masse ($m$) et une vitesse ($\vec{v}$). On a besoin de connaître la force normale ($N$) et le coefficient de frottement cinétique ($\mu_k$).

*   **B. Le "Code Secret" du Frottement Cinétique en Action (15-20 minutes)**
    *   **Étape 1 : Calculer la Magnitude de la Force de Frottement.**
        *   On a notre formule : $f_k = \mu_k N$ 
        *   En code, ça donne :
            ```javascript
            // Supposons qu'on ait :
            let mu_k = 0.2; // Coefficient de frottement cinétique
            let mass = 1.0; // kg
            let gravity = 9.81; // m/s^2
            let normalForce = mass * gravity; // Pour un sol horizontal simple

            const frictionMagnitude = mu_k * normalForce;
            ```
        *   Ici, `frictionMagnitude` est la *valeur* de la force de frottement. Mais une force a aussi une direction !

    *   **Étape 2 : Déterminer la Direction de la Force de Frottement.**
        *   "Le frottement s'oppose *toujours* au mouvement. Donc, sa direction est opposée à celle de la vitesse actuelle de l'objet."
        *   "Comment obtenir un vecteur qui pointe à l'opposé de la vitesse ?"
            1.  Prendre le vecteur vitesse `velocity`.
            2.  Le normaliser (pour obtenir un vecteur de longueur 1 qui ne donne que la direction).
            3.  Le multiplier par -1 (pour l'inverser).
        *   "En code (avec `THREE.Vector2` ou `THREE.Vector3`) :"
            ```javascript
            // let velocity; // Notre vecteur vitesse actuel (ex: THREE.Vector2)
            let frictionDirection = velocity.clone().normalize().multiplyScalar(-1);
            // .clone() pour ne pas modifier la vitesse originale ici !
            ```

    *   **Étape 3 : Construire le Vecteur Force de Frottement.**
        *   "On a la magnitude et la direction, on les combine :"
            ```javascript
            let frictionForce = frictionDirection.multiplyScalar(frictionMagnitude);
            // frictionDirection est déjà unitaire, donc multiplier par frictionMagnitude lui donne la bonne longueur.
            ```
        *   "Voilà notre $\vec{f}_k$ !"

    *   **Étape 4 : Appliquer cette Force pour Modifier l'Accélération.**
        *   "Comme toute autre force, le frottement contribue à l'accélération nette de l'objet ($a = F/m$)."
        *   "Si `acceleration` est le vecteur accélération totale (qui pourrait déjà inclure la gravité ou d'autres forces) :"
            ```javascript
            // let acceleration; // Vecteur accélération (ex: THREE.Vector2)
            // let mass;         // Masse de l'objet

            acceleration.addScaledVector(frictionForce, 1/mass);
            // ou acceleration.add(frictionForce.clone().divideScalar(mass));
            ```
        *   "Et voilà ! À chaque pas de temps, si l'objet a une vitesse, cette force de frottement va générer une accélération opposée, le ralentissant."

*   **C. Pièges et Astuces (5-10 minutes)**
    *   **Arrêt de l'objet :** "Que se passe-t-il si le frottement est si fort qu'il 'inverserait' la vitesse en un seul pas de temps ? L'objet se mettrait à glisser en arrière, ce qui n'est pas réaliste pour le frottement."
    *   **Solution simple :** Après avoir mis à jour la vitesse avec cette accélération, si la nouvelle vitesse a un signe opposé à l'ancienne (pour une composante) ET que la vitesse est très faible, on peut simplement la mettre à zéro.
        ```javascript
        // Après v_new = v_old + a * dt;
        // Si (v_new.x * v_old.x < 0 && Math.abs(v_new.x) < threshold) v_new.x = 0; (idem pour y)
        // Ou plus simplement : si la magnitude de la vitesse est inférieure à un seuil, la mettre à zéro.
        if (velocity.lengthSq() < 0.0001) { // 0.0001 est un exemple de seuil au carré
            velocity.set(0,0);
        }
        ```
    *   **Frottement Statique (mention rapide) :** "Le frottement qui empêche de démarrer est plus complexe. Souvent, on le simule en disant : si l'objet est 'au repos' (vitesse très faible) et que la somme des autres forces (celles qui essaient de le faire bouger) est inférieure à $f_{s,max}$, alors on annule ces forces et l'objet reste immobile. C'est un 'hack' courant."

*   **D. Démo Interactive / TP Guidé (Partie 1) : Frottement sur un Objet (10-15 minutes)**
    *   Prendre un exemple existant (la masse du pendule qu'on pose au sol, ou un nouveau cube/sphère).
    *   Lui donner une vitesse initiale.
    *   **En direct :** Ajouter les lignes de code pour calculer et appliquer la force de frottement cinétique (basé sur un $\mu_k$ et une force normale $N=mg$ simplifiée pour un sol horizontal).
    *   Montrer comment l'objet ralentit et s'arrête.
    *   Faire varier $\mu_k$ avec Dat.GUI pour voir l'effet.

---

**2. Donner de l'Élasticité : Implémenter un Système Masse-Ressort (35-40 minutes)**

*   **A. Scénario : Notre Masse Rebondissante (5 minutes)**
    *   "On va recréer notre pendule élastique, ou simplement une masse attachée à un point fixe par un ressort. On veut qu'elle oscille !"
    *   **Prérequis :** La masse ($m$), la position de la masse ($\vec{p}$), la position du point d'attache du ressort ($\vec{p}_{attache}$), la constante de raideur ($k$), la longueur au repos ($L_0$).

*   **B. Le "Code Secret" de la Loi de Hooke en Action (15-20 minutes)**
    *   **Étape 1 : Calculer le Vecteur du Ressort et son Élongation.**
        *   "On a besoin de savoir de combien le ressort est étiré (ou comprimé) et dans quelle direction il tire/pousse."
        *   "Le vecteur allant du point d'attache à la masse nous donne la direction et la longueur actuelle."
            ```javascript
            // let positionMasse = new THREE.Vector2(x_masse, y_masse);
            // let positionAttache = new THREE.Vector2(x_attache, y_attache);
            // let L0 = 1.0; // Longueur au repos

            let vecteurRessort = new THREE.Vector2().subVectors(positionMasse, positionAttache);
            let longueurActuelle = vecteurRessort.length();
            let elongation = longueurActuelle - L0;
            ```

    *   **Étape 2 : Calculer la Magnitude de la Force du Ressort.**
        *   "Loi de Hooke : $F_s = -k \cdot \text{elongation}$ (si elongation est $x$ de la formule)."
            ```javascript
            // let k = 20.0; // Constante de raideur
            let forceMagnitudeRessort = -k * elongation;
            // Si elongation > 0 (étiré), forceMagnitudeRessort est négative (rappel).
            // Si elongation < 0 (comprimé), forceMagnitudeRessort est positive (pousse).
            ```

    *   **Étape 3 : Déterminer la Direction de la Force du Ressort.**
        *   "La force du ressort agit le long de la ligne du ressort."
        *   "Si le ressort est étiré (elongation > 0), la force tire la masse *vers* le point d'attache (opposé à `vecteurRessort`)."
        *   "Si le ressort est comprimé (elongation < 0), la force pousse la masse *loin* du point d'attache (dans la même direction que `vecteurRessort` si `vecteurRessort` pointe de l'attache vers la masse, ou opposé si on a pris le vecteur de la masse vers l'attache. Soyons cohérents !)."
        *   "Plus simple : le vecteur unitaire de `vecteurRessort` (de l'attache vers la masse) est `vecteurRessort.clone().normalize()`. La force est `forceMagnitudeRessort` appliquée dans cette direction."
            ```javascript
            let directionRessortNormalisee = new THREE.Vector2();
            if (longueurActuelle > 0.0001) { // Éviter division par zéro
                directionRessortNormalisee.copy(vecteurRessort).divideScalar(longueurActuelle);
            }
            // else, si longueurActuelle est quasi nulle, la force est nulle (pas d'élongation)
            ```

    *   **Étape 4 : Construire le Vecteur Force du Ressort.**
        *
         ```javascript
            let forceRessort = directionRessortNormalisee.multiplyScalar(forceMagnitudeRessort);
            ```

    Et voilà notre $ \vec{F} $ !

    *   **Étape 5 : Appliquer cette Force (et d'autres, comme la gravité).**
        *   La force du ressort s'ajoute à la force nette.
            ```javascript
            let acceleration = new THREE.Vector2(0,0);
            let mass = 1.0;
            let gravityForceY = mass * -9.81;
            F_net_x = forceRessort.x;
            F_net_y = forceRessort.y + gravityForceY;
            acceleration.x = F_net_x / mass;
            acceleration.y = F_net_y / mass;
            ```
        *   Ensuite, on intègre cette accélération pour mettre à jour vitesse et position, comme d'habitude.

*   **C. Classe `Spring` (Optionnel, mais bonne pratique) (5-7 minutes)**
    *   "Pour des systèmes plus complexes avec plusieurs ressorts, il peut être utile de créer une 'classe' ou un objet pour représenter un ressort."
        ```javascript
        class Spring {
           constructor(pointA, pointB, k, L0) {
             // Un objet avec .position (peut être fixe ou une autre masse)
            this.pointB = pointB; // L'autre masse
            this.pointA = pointA; 
            this.k = k;
            this.L0 = L0;
          }

          calculateForceOnB() {
            let force = new THREE.Vector2();
            let pA = (this.pointA.isVector2) ? this.pointA : this.pointA.position; // Gérer si pointA est un Vector2 fixe ou un objet avec .position
            let pB = this.pointB.position;
            let springVector = new THREE.Vector2().subVectors(pB, pA);
            let currentLength = springVector.length();
            if (currentLength < 0.0001) return force; // Pas de force si superposés
            let elongation = currentLength - this.L0;
            let forceMagnitude = -this.k * elongation;
            force.copy(springVector).normalize().multiplyScalar(forceMagnitude);
            return force;
          }
        } -->
        ```
    *   "Cela rend le code plus organisé : dans la boucle principale, on demanderait à chaque ressort de calculer la force qu'il exerce."

*   **D. Démo Interactive / TP Guidé (Partie 2) : Le Pendule Élastique (10-15 minutes)**
    *   exemple du pendule élastique
    *   **Revoir ensemble les lignes de code** qui calculent la force du ressort et la gravité.
    *   Montrer comment la combinaison de ces forces et l'intégration numérique produit l'oscillation.
    *   Faire varier $k$, $m$, $L_0$ avec Dat.GUI et observer les changements de comportement (fréquence d'oscillation, position d'équilibre).
    *   Relier à la période $T = 2\pi\sqrt{m/k}$ pour les oscillations verticales.



**(5 minutes) Conclusion : Le Pouvoir des Forces Simples**

*   **Récap' :** On a vu comment, avec quelques lignes de code bien pensées, on peut traduire les lois du frottement et des ressorts en comportements dynamiques pour nos objets.
*   **La Beauté de la Simulation :** Le point clé est qu'on ne programme pas l'oscillation ou le ralentissement *directement*. On programme les forces, et le comportement *émerge* de leur application répétée via les lois de Newton et l'intégration.
*   **Prochaines Étapes :** Avec ces briques, on peut commencer à construire des interactions plus riches et des systèmes plus complexes.
