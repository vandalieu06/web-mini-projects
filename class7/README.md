# Realitzar la simulació́ d’una botiga de llaminadures.

## Característiques:

- Treballarem amb LocalStorage.
- S’ha de tenir uns mínims de CSS.
- S’ha de validar l’usuari, abans o quan finalitzi la compra.
- Els productes de la botiga seran llaminadures amb un mínim de 7 productes, hi haurà mínim dues categories.
- Es guardarà un historial de compres que es podran mostrar en la web de llistat de compres.

## Ejecución

- Docker
```bash
docker build -t class7 .
docker run --rm -p 8080:8080 -v ${PWD}:/app class7
```
