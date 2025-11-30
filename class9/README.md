# Aplicació web completa per gestionar tasques de manera eficient

## Introducció

- **Autenticació**: Iniciar sessió amb un usuari predefinit.
- **Gestió de tasques**: Afegir, visualitzar, modificar i eliminar tasques.
- **Organització**: Assignar tasques a persones, establir dates límit i marcar tasques com a finalitzades.
- **Persistència**: Guardar les dades al navegador per mantenir-les disponibles entre sessions.

## Requisits

### 1. Inici de sessió:
-	Crear un formulari d’autenticació (usuari i contrasenya).
-	Validar l’usuari amb un array predefinit d’usuaris.
-	Si l’autenticació és correcta, guardar l’usuari a sessionStorage.
-	Bloquejar l’accés a l’aplicació si no hi ha un usuari autenticat.

### 2.	Gestió de tasques:
-	Implementar un formulari per afegir tasques amb els següents camps:
  -	Títol.
  -	Descripció.
  -	Persona assignada (usuaris de l’aplicació).
  - Data i hora límit.
-	Mostrar totes les tasques en una llista o taula. Cada tasca ha de mostrar:
-	El títol, la descripció, la persona assignada, la data i hora.
-	Estat de la tasca (pendent o finalitzada).


### 3.	Funcionalitats addicionals:
-	Permetre marcar tasques com a finalitzades.
-	Filtrar les tasques per pendents i finalitzades.
-	Afegir una opció per eliminar tasques.

### 4.	Persistència de dades:
-	Utilitzar localStorage per guardar les tasques.
-	Assegurar que les tasques es carreguen correctament quan l’aplicació es reinicia.

### 5.	Interfície gràfica:
-	Crear una interfície amb HTML i CSS que sigui fàcil d’utilitzar i visualment atractiva.
-	Fer servir botons, formularis i altres elements interactius per facilitar la navegació.

### 6.	Validació:
-	Validar els camps del formulari abans d’afegir una tasca (p. ex., assegurar-se que el títol no està buit i que la data és futura).
