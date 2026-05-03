# Activitat: Simil de Xarxa Social amb AJAX

Crear una aplicació web que simuli una xarxa social bàsica, on els usuaris puguin publicar missatges curts (tipus X) i visualitzar-los de forma dinàmica, sense recarregar la pàgina.

## Requisits

* **Formulari de publicació:** Un usuari pot introduir el seu nom i un missatge i fer clic a "Publicar".
* **Mostra de missatges:** Els missatges es mostren automàticament a sota, ordenats per data (del més recent al més antic), sense recarregar la pàgina.
* **Eliminar missatges:** Cada missatge té un botó per eliminar-lo. Quan es prem, el missatge desapareix tant de la base de dades com de la pàgina.
* **Tot el sistema funciona amb AJAX:** Cap acció (ni publicar, ni carregar, ni eliminar) ha de recarregar la pàgina.

## Estructura del Projecte

El projecte ha de tenir almenys els següents fitxers:

| Fitxer | Descripció |
| :--- | :--- |
| `index.html` | Interfície d’usuari i JavaScript amb AJAX. |
| `publicar.php` | Rep les dades per POST i les desa a la base de dades. |
| `listar.php` | Retorna tots els missatges en format JSON. |
| `eliminar.php` | Elimina un missatge donat el seu ID. |

---

**DAW M06** | **7.1_ACT16** *Marcos Venteo Díaz* | *marcos.venteo@jviladoms.cat* | *Desenvolupament d’Aplicacions Web*

---

## Base de Dades (BBDD)

```sql
CREATE TABLE mensajes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    autor VARCHAR(50),
    contenido TEXT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP
);