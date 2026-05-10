# Plan: Backend PHP + SQLite (Archivos Individuales)

## Estructura

```
class23/
├── docker-compose.yaml
├── server/
│   ├── db.php              (connexió PDO)
│   ├── add-estat.php       (POST - guardar estat)
│   ├── get-avui.php        (GET - estat d'avui)
│   ├── get-fecha.php       (GET?data=YYYY-MM-DD)
│   ├── get-historial.php   (GET?dies=7)
│   └── database/
│       └── feelings.db     (SQLite)
```

---

## Rutes i Fitxers

| Fitxer | Mètode | Input | Output |
|--------|--------|-------|--------|
| `add-estat.php` | POST | `{ "estat": "felic" }` | `{ "success": true, "id": 5 }` |
| `get-avui.php` | GET | - | `{ "data": "2026-05-10", "total": 15, "estats": {...}, "percentatges": {...} }` |
| `get-fecha.php` | GET | `?data=2026-05-09` | Mateix que get-avui.php |
| `get-historial.php` | GET | `?dies=7` | `{ "dies": 7, "registres": [...] }` |

---

## Detall de Cada Fitxer

### add-estat.php (POST)

**Reb:** `{"estat": "felic"}`  
**Torna (201):** `{"success": true, "id": 5, "message": "Estat registrat"}`  
**Error (400):** `{"error": "Estat obligatori"}`

### get-avui.php (GET)

**Reb:** Res  
**Torna (200):**
```json
{
  "data": "2026-05-10",
  "total": 15,
  "estats": { "felic": 8, "cansat": 3, "estressat": 2, "tranquil": 1, "motivat": 1 },
  "percentatges": { "felic": 53.3, "cansat": 20.0, "estressat": 13.3, "tranquil": 6.7, "motivat": 6.7 }
}
```

### get-fecha.php (GET)

**Reb:** `?data=2026-05-09`  
**Torna:** Mateix que get-avui.php

### get-historial.php (GET)

**Reb:** `?dies=7` (per defecte 7, màx 30)  
**Torna (200):**
```json
{
  "dies": 7,
  "registres": [
    { "data": "2026-05-10", "total": 15, "mes_frequent": "felic" },
    { "data": "2026-05-09", "total": 12, "mes_frequent": "cansat" }
  ]
}
```

---

## Notes

- **Anonimat:** No es guarda IP ni ID d'usuari
- **Estats vàlids:** `felic`, `cansat`, `estressat`, `tranquil`, `motivat`, `trist`, `energia`
- **CORS:** Afegir headers a cada fitxer per permetre peticions del frontend

## Docker Compose

```yaml
version: '3.8'
services:
  web:
    image: php:8.2-apache
    ports:
      - "8080:80"
    volumes:
      - ./server:/var/www/html
    command: >
      sh -c "docker-php-ext-install pdo_sqlite && apache2-foreground"
```

## Base de Dades

```sql
CREATE TABLE IF NOT EXISTS estats_anims (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    estat TEXT NOT NULL,
    data DATE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_data ON estats_anims(data);
```