
**Session 3: Forces, Impulsions, Quantité de Mouvement et Corps Rigides Basiques**

**Objectifs d'Apprentissage de la Session :**


*   Comprendre et démontrer l'application de la notion de force, d'impulsion et de quantité de mouvement dans des simulations simples.
*   Comprendre le fonctionnement des corps rigides et manipuler leurs propriétés de base (masse, type de corps) dans Rapier.
*   Mettre en œuvre l'application de forces et d'impulsions à des corps rigides dans Rapier et observer leurs interactions rudimentaires.
*   Préparer le terrain pour l'étude détaillée des collisions et de leurs réponses dans les sessions suivantes.

---

**Bloc 1 : Introduction aux Forces et Application**

*   **Rappel et Connexion :**
    *   Discussion sur les forces implicites (gravité) rencontrées dans le TP1.
    *   Objectif : Explorer *explicitement* comment définir et appliquer différentes forces.
*   **Les Forces en Physique du Jeu :**
    *   **Forces Environnementales :**
        *   **Gravité :** Force d'attraction constante vers le bas. (Rappel de son implémentation possible dans Rapier).
        *   **Frottement (conceptuel) :** Forces qui s'opposent au mouvement.
            *   *Frottement visqueux/de l'air :* Résistance due au déplacement dans un fluide.
            *   *Frottement de contact :* Résistance entre deux surfaces en contact.
    *   **Forces Appliquées :**
        *   **Forces de Propulsion :** Forces qui poussent ou tirent un objet (ex: moteur, poussée d'un personnage).
        *   **Forces de Ressort (conceptuel) :** Forces exercées par un ressort étiré ou comprimé.
*   **Appliquer des Forces sans Rapier :**
    *   **Forces Persistantes :** Simuler des influences continues (ex: vent, poussée constante).
        *   Une force appliquée sur la durée modifie l'accélération de l'objet, et donc sa vitesse progressivement.
    *   **Activité Pratique Guidée :** Appliquer une force constante (simulant un vent latéral) à un projectile et observer la modification de sa trajectoire.
*   **Questions / Réponses.**

---

**Bloc 2 : Impulsions et Quantité de Mouvement**

*   **Comprendre l'Impact Instantané : Impulsion et Quantité de Mouvement :**
    *   **Quantité de Mouvement**

         ###    $\vec{p} = m \vec{v}$
        
    *   Mesure de "l'élan" ou de la "difficulté à arrêter" un objet en mouvement.
    *   Dépend de la masse ($m$) et de la vitesse ($\vec{v}$) de l'objet.
    
    *   **Impulsion ($\vec{J}$) :**
        *   Décrit un changement brusque de mouvement dû à une force agissant pendant un court instant (ex: un coup, une explosion).
        *   Peut être vue comme $\vec{J} = \vec{F}_{moy} \Delta t$ (force moyenne pendant une courte durée) ou plus formellement $\vec{J} = \int \vec{F} dt$.
    *   **Théorème de l'Impulsion ($\Delta \vec{p} = \vec{J}$) :**
        *   L'impulsion appliquée à un objet est égale au changement de sa quantité de mouvement.
    *   **Conservation de la Quantité de Mouvement :**
        *   Dans un système isolé (sans forces externes nettes), la quantité de mouvement totale du système reste constante. Ce principe est fondamental pour analyser les collisions.
*   **Questions / Réponses.**

