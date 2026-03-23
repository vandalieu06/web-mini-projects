# Mòdul 0612: Desenvolupament web en entorn client
## 5.1_ACT14: Ping Pong JS


## Objectius:
RA5. Desenvolupa aplicacions web analitzant i aplicant les característiques del model d’objectes del document.

## Requisits:
- Navegador Web.
- Editor de text.

## Entrega:
- HTML, CSS, JS.

Implementar un joc de Ping Pong per a dos jugadors, controlat per teclat, utilitzant HTML, CSS i JavaScript proporcionat.

## El joc consisteix en:

- Una pilota que es mou automàticament pel camp de joc, rebotant contra les parets superiors i inferiors.
- Dues paletes:
  - La paleta del jugador 1 (esquerra), controlada amb les tecles W (amunt) i S (avall).
  - La paleta del jugador 2 (dreta), controlada amb les tecles de fletxa ↑ (amunt) i ↓ (avall).
- Quan la pilota passa darrere d’una paleta, l’altre jugador fa un punt, i la pilota es reinicia al centre.

## Tasques a realitzar:

1. Afegir el control de la paleta del jugador 1:
   - Tecla W → Mou cap amunt.
   - Tecla S → Mou cap avall.
   - La paleta no pot sortir fora dels límits del canvas.

2. Afegir el control de la paleta del jugador 2:
   - Tecla ↑ (fletxa amunt) → Mou cap amunt.
   - Tecla ↓ (fletxa avall) → Mou cap avall.
   - La paleta no pot sortir fora dels límits del canvas.

3. Afegir sistema de puntuació per als dos jugadors:
   - Cada cop que la pilota passa darrere d’una paleta, l’altre jugador suma un punt.
   - Mostrar el marcador a la part superior de la pantalla.

4. Reiniciar la pilota cada cop que es marca un punt:
   - La pilota ha de tornar al centre i començar a moure’s cap al jugador que ha perdut el punt.

5. Afegir un límit de punts per guanyar la partida:
   - Ex: Quan un jugador arribi a 5 punts, mostrar "Guanyador!" i parar el joc.

6. Crear un botó de reinici:
   - Permetre que els jugadors puguin reiniciar el marcador i la pilota sense refrescar la pàgina.

---

## Opcional:

- Afegir sons quan la pilota colpeja les paletes o es fa un punt.
- Implementar efectes especials en el moviment de la pilota (per exemple, més velocitat amb el temps).
- Crear diferents temes visuals (fons de colors, dissenys personalitzats).
- Fer el joc responsive per jugar en pantalles de diferents mides.
