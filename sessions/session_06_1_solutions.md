# Solutions des Exercices - Session 6 - Bloc 1

## Exercice 1 : Analyse d'un Contact avec Frottement

### Données :
- Masse du bloc, m = 20 kg
- Coefficients de frottement : μₛ = 0.6 (statique), μₖ = 0.4 (cinétique)
- Accélération gravitationnelle, g = 9.8 m/s²

### Solution 1a : Force normale et frottement statique maximal
```
Force normale (N) = m × g
N = 20 kg × 9.8 m/s² = 196 N

Frottement statique maximal (f_s_max) = μₛ × N
f_s_max = 0.6 × 196 N = 117.6 N
```
**Réponse :** La force normale est de 196 N et le frottement statique maximal est de 117.6 N.

### Solution 1b : Force appliquée de 100 N
```
Force appliquée (F_app) = 100 N

Comparaison avec f_s_max :
100 N < 117.6 N

Comme F_app < f_s_max, le bloc ne se met pas en mouvement.
La force de frottement est égale à la force appliquée : f_s = 100 N
```
**Réponse :** Le bloc reste immobile avec une force de frottement statique de 100 N.

### Solution 1c : Force appliquée de 150 N
```
Force appliquée (F_app) = 150 N

Comparaison avec f_s_max :
150 N > 117.6 N

Comme F_app > f_s_max, le bloc se met en mouvement.

Frottement cinétique (f_k) = μₖ × N
f_k = 0.4 × 196 N = 78.4 N
```
**Réponse :** Le bloc se déplace avec une force de frottement cinétique de 78.4 N.

## Exercice 2 : Étude d'un Système Élastique

### Données :
- Constante de raideur, k = 200 N/m
- Déplacement, x = 10 cm = 0.1 m
- Masse, m = 0.5 kg (pour la question 2d)

### Solution 2a : Force requise pour maintenir l'étirement
```
Loi de Hooke : F = k × x
F = 200 N/m × 0.1 m = 20 N
```
**Réponse :** Une force de 20 N est nécessaire pour maintenir l'étirement.

### Solution 2b : Force de rappel du ressort
```
D'après la loi de Hooke, la force de rappel est égale en magnitude mais opposée en direction à la force appliquée.
F_rappel = -k × x = -20 N
```
**Réponse :** La force de rappel est de 20 N vers la position d'équilibre.

### Solution 2c : Énergie potentielle élastique
```
Énergie potentielle élastique (U_s) = (1/2) × k × x²
U_s = 0.5 × 200 N/m × (0.1 m)²
U_s = 0.5 × 200 × 0.01
U_s = 1 J
```
**Réponse :** L'énergie potentielle emmagasinée est de 1 Joule.

### Solution 2d : Mouvement harmonique simple
```
1. Pulsation (ω) = √(k/m)
   ω = √(200 N/m / 0.5 kg)
   ω = √(400) rad/s
   ω = 20 rad/s

2. Période (T) = 2π/ω
   T = 2π / 20 rad/s
   T ≈ 0.314 s
```
**Réponse :** 
- Pulsation : 20 rad/s
- Période : environ 0.314 secondes

## Synthèse
Ces exercices illustrent comment les concepts de frottement et de forces élastiques s'appliquent à des situations concrètes. Les calculs montrent l'importance de distinguer entre frottement statique et cinétique, ainsi que la relation directe entre déformation et force dans les systèmes élastiques.
