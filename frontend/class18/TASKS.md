# Proyectos: Gestor de Tareas Dinámico (Nivel Junior)

Actúa como un desarrollador Frontend Junior. Tu objetivo es construir una aplicación de gestión de tareas (To-Do List) utilizando **HTML, CSS y JavaScript puro**. 
El código debe ser fácil de leer, sin librerías externas y con explicaciones claras.

## Fase 1: Análisis y Estructura de Datos

Antes de escribir código, define cómo se guardará la información.

1. **Revisión de Lógica:**
    
    - Crea un objeto `currentUser` para simular quién está logueado (Admin o Usuario).     
    - Define un array de objetos llamado `tasks` para almacenar cada tarea.
    - Cada objeto tarea debe tener: `id`, `titulo`, `descripcion`, `asignadoA`, y `estado` (`pendent`, `en-curs`, `finalitzada`).
        
2. **Modelo de Datos (LocalStorage):**
    
    - Escribe una función simple para guardar el array en `localStorage` y otra para cargarlo al iniciar.

## Fase 2: Estructura HTML (Skeletal)

Crea un archivo `index.html` y `login.html` con una estructura semántica básica:

1. **Registro/Login Simple:** Un formulario con `input` para nombre y un `select` para elegir el rol (Admin/Normal).
2. **Formulario de Tareas (Solo visible para Admin):** Inputs para título, descripción y un select de usuarios.
3. **El Tablero (Board):**
    
    - Un contenedor principal con tres columnas (`<section>` o `<div>`).
    - Cada columna debe tener un ID único: `pendents`, `en-curs`, `finalitzades`.
        
## Fase 3: Estilo Visual (CSS Principiante)

Aplica estilos claros en un archivo `style.css`:

1. **Layout:** Usa `display: flex` para poner las tres columnas de lado a lado.
2. **Colores de Estado:**
    
    - `.columna-pendent`: Fondo amarillo claro.
    - `.columna-curs`: Fondo azul claro.
    - `.columna-finalitzada`: Fondo verde claro.
        
3. **Tarjetas (Cards):** Dale a cada tarea un borde, un color de fondo blanco y un poco de margen.

## Fase 4: Lógica de JavaScript (Manipulación del DOM)

En `script.js`, implementa las funciones siguiendo esta guía:

1. **Renderizado:** * Crea una función `dibujarTareas()` que limpie las columnas y recorra el array `tasks`.
    
    - **Importante:** Si el usuario es "Normal", solo dibuja las tareas donde `asignadoA` coincida con su nombre. El "Admin" lo ve todo.
        
2. **Crear Tareas:** Función que capture los datos del formulario, los añada al array y ejecute `dibujarTareas()`.
3. **Eliminar/Editar:** Añade botones simples dentro de cada tarjeta (solo si el rol es Admin).

## Fase 5: Interactividad (Drag & Drop Simple)

Utiliza el API nativo de HTML5 para mover tareas:

1. **Atributo:** Haz que cada tarjeta de tarea tenga `draggable="true"`.
2. **Eventos:**
    
    - `dragstart`: Guarda el ID de la tarea que se está moviendo.
    - `dragover`: Permite que las columnas reciban elementos (`event.preventDefault()`).
    - `drop`: Cambia la propiedad `estado` de la tarea en el array según la columna donde cayó y vuelve a llamar a `dibujarTareas()`.

## Fase 6: Cierre y Persistencia

1. Asegúrate de que cada vez que el array `tasks` cambie, se llame a `localStorage.setItem()`.
2. Añade un botón de "Cerrar Sesión" que limpie el usuario actual y regrese al formulario de registro.
