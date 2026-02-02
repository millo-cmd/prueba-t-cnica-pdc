# Stack Tecnológico

React.js: Elegido por su arquitectura basada en componentes y su ecosistema robusto. A diferencia de Angular, React ofrece una curva de aprendizaje más ágil y mayor flexibilidad para esta prueba técnica, permitiendo una entrega rápida sin sacrificar potencia.

React Router Dom: Utilizado para la gestión de navegación SPA (Single Page Application) y la implementación de rutas protegidas.

Axios: Cliente HTTP para el consumo de la API REST.

CSS3: Estilos modulares centralizados para garantizar coherencia visual.

## Arquitectura del Proyecto

El proyecto se divide en dos partes principales:

1. **Componentes reutilizables**:
   - Se diseñaron componentes atómicos (Inputs, Botones, Modales) bajo el principio DRY (Don't Repeat Yourself). Esto permite que un solo componente modal se adapte para funciones de "Crear" o "Editar" mediante el paso de props, optimizando el mantenimiento del código.

2. **Estructura de Páginas**:
   - Las vistas principales (Landing Page, Listados, Asignaciones) se ensamblan en la carpeta pages. Este desacoplamiento permite que la lógica de la vista sea independiente de la lógica de los componentes individuales.

3. **Sistema de Rutas y Seguridad**:
   - Navegación: Implementación de un Header dinámico que facilita el flujo entre vistas.
   - Protección: Las rutas están resguardadas mediante validación de tokens JWT. Si un usuario no está autenticado, el sistema restringe el acceso a las vistas de gestión.

4. **Lógica de Negocio y Estado**:
   - La lógica del Frontend es un reflejo fiel de la arquitectura del Backend.
   - Modularidad: Se mantienen controladores CRUD independientes para cada entidad (Colaboradores, Empresas, Geografía).
   - Relaciones Muchos a Muchos: Se implementó una lógica específica para la tabla de unión, permitiendo vincular colaboradores con múltiples empresas de forma limpia y organizada.

