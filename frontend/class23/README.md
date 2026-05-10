# Activitat: Registre d'Estat d'Ànim de la Classe

Crear una aplicació web on cada alumne pugui registrar de manera anònima com se sent cada dia, i veure una representació global de l’estat d’ànim de la classe. Aquesta activitat combina programació i empatia, i pot generar debat o reflexió posterior.

## Requisits

* **Pantalla de selecció d’estat d’ànim**
    * L’usuari selecciona com se sent: feliç, cansat, estressat, tranquil, motivat, etc.
    * Es pot representar amb emojis o colors.
* **Enviament de dades via AJAX (POST)**
    * L’estat seleccionat s’envia al servidor (PHP), que el desa a la base de dades amb la data i una ID anònima.
* **Visualització de resultats globals (gràfica en JS)**
    * Es mostra en temps real un resum de l’estat de la classe: gràfica circular, barres o núvol de paraules.
* **Filtrar per dies anteriors**
    * Es pot consultar com ha estat l’estat d’ànim els últims dies.

## Opcions creatives

* Fer servir emojis per representar els estats.
* Canviar el fons de pantalla segons com està la classe.
* Afegir frases motivadores segons la mitjana emocional del dia.
* Compartir la mitjana amb el/la profe per adaptar la classe.

## Base de dades (BBDD)

```sql
CREATE TABLE estats_anims (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estat VARCHAR(50),
    data DATE
);
