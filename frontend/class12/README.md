# ACTIVADAD 12

L’objectiu d’aquest projecte és desenvolupar una aplicació web que permeti gestionar diferents tipus de mascotes (gossos, gats, ocells, etc.). 

S’haurà d’implementar una estructura de classes en JavaScript per representar les característiques de les mascotes i fer ús de la seva herència per diferenciar els tipus específics. A més, l’aplicació haurà de permetre interactuar amb l’usuari mitjançant una interfície.


## Requisits del Projecte
1.	Jerarquia de Classes (Lògica en JavaScript):
o	Crear una classe base Mascota amb les següents propietats:
	nom (string): Nom de la mascota.
	edat (número): Edat de la mascota.
	Foto (string): URL de la foto assignada.
	tipus (string): Tipus de mascota (gos, gat, ocell, etc.).
o	Implementar les classes derivades:
	Gos: Afegir una propietat raça (string).
	Gat: Afegir un mètode ferSo que retorni "Miau miau".
	Ocell: Afegir un mètode ferSo que retorni "Piu piu".
o	Implementar els mètodes getters i setters.
o	Crear un mètode detalls a la classe base que retorni una descripció general de la mascota, i sobreescriure’l a les classes derivades per incloure les propietats específiques.


2.	Interacció amb l’Usuari (Frontend):
o	Desenvolupar un formulari en HTML que permeti introduir les dades de noves mascotes:
	Nom, edat, tipus de mascota i propietats específiques (com la raça en el cas dels gossos).
o	Mostrar la llista de mascotes registrades a la pàgina, incloent-hi les seves característiques i el so que fan (si correspon).
o	Permetre eliminar una mascota de la llista.
o	Implementar un buscador de mascotes i ordenació.

3.	Interfície d’Usuari:
o	Crear una pàgina web senzilla amb els següents elements:
	Un formulari per afegir mascotes.
	Una secció per mostrar la llista de mascotes registrades.
	Botons per modificar i eliminar mascotes de la llista.

4.	Persistència de dades:
o	Les dades han d’estar sempre disponibles, per aquest motiu utilitzarem el LocalStorage.
