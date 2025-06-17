**Session 6: Approfondissement des Forces - Frottement et Ressorts (Simulation Manuelle) (4 blocs)**

*   **Objectif :** Consolider la compréhension des forces de contact (frottement) et des forces de rappel (ressorts) par une analyse théorique et une implémentation manuelle. Préparer le terrain pour le Devoir 2 qui inclura le frottement.
*   **Bloc 1 : Forces de Frottement en Détail (1h30)**
    *   **Théorie du Frottement :**
        *   Distinction entre frottement statique ($f_s \le \mu_s N$) et cinétique ($f_k = \mu_k N$).
        *   Coefficients de frottement ($\mu_s, \mu_k$).
        *   Force Normale ($N$) : comment la déterminer sur un plan horizontal et (brièvement) sur un plan incliné.
        *   Direction de la force de frottement (toujours opposée au mouvement ou à la tendance au mouvement).
    *   **Activité Pratique : Analyse de Scénarios**
        *   Petits problèmes théoriques : calculer la force de frottement maximale, déterminer si un objet va glisser.
*   **Bloc 2 : Implémentation Manuelle du Frottement (1h30)**
    *   **Application à la Simulation :**
        *   Comment ajouter la force de frottement cinétique à la $\vec{F}_{net}$ dans la boucle de simulation (par exemple, sur la balle du Devoir 2 qui glisse au sol).
            $`\vec{a} = (\vec{F}_{autres} + \vec{f}_k) / m`$.
        *   Gestion du frottement statique (plus complexe : l'objet ne bouge que si $\vec{F}_{appliquée} > f_{s,max}$). On peut se concentrer sur une version simplifiée où l'objet s'arrête si sa vitesse devient très faible et que les forces motrices sont insuffisantes.
    *   **TP (Partie 1) ou Activité Guidée : Ajout du Frottement au Sol**
        *   Reprendre la simulation de la balle (celle de la démo de la Session 5, ou la base du Devoir 2).
        *   Implémenter la force de frottement cinétique lorsque la balle est en contact avec le sol et a une vitesse horizontale.
        *   Observer comment la balle ralentit et s'arrête sur le sol. Tester différents $\mu_k$.
*   **Bloc 3 : Forces de Ressort et Mouvement Harmonique Simple (1h30)**
    *   **Loi de Hooke :** $F_s = -kx$ (force de rappel proportionnelle à l'élongation/compression $x$ par rapport à la position d'équilibre).
    *   Constante de raideur $k$ (N/m).
    *   Énergie Potentielle Élastique : $U_s = \frac{1}{2}kx^2$.
    *   **Mouvement Harmonique Simple (MHS) :** Le mouvement oscillatoire qui résulte lorsqu'un objet est soumis uniquement à une force de rappel de type loi de Hooke.
        *   Caractéristiques : période, fréquence, amplitude. (Introduction conceptuelle, sans dérivation complète des équations différentielles si trop avancé).
*   **Bloc 4 : Implémentation Manuelle d'un Système Masse-Ressort Simple (1h30)**
    *   **TP (Partie 2) ou Activité Guidée : Simulation d'un Oscillation**
        *   Simuler une masse attachée à un ressort horizontal (glissant sans frottement) ou vertical (oscillant autour de sa position d'équilibre sous l'effet de la gravité et du ressort).
        *   **Boucle de simulation :**
            1.  Calculer l'élongation/compression $x$.
            2.  Calculer la force du ressort $F_s = -kx$.
            3.  Calculer $F_{net}$ (inclure la gravité si ressort vertical).
            4.  Calculer $a = F_{net}/m$.
            5.  Mettre à jour $v$ et $x$ (position).
        *   Observer le mouvement oscillatoire. Expérimenter avec $m$ et $k$.
*   **Fin de Session : Examen de Mi-Session (Quiz théorique)**
    *   Couvre les concepts des Sessions 1 à 5 (vecteurs, cinématique, lois de Newton, forces, énergie, quantité de mouvement, rotation de base, types de collisions, détection simple, restitution).

---
