# Lista de Tareas

Aplicación web simple para gestionar tareas diarias.

## Características

- Agregar nuevas tareas
- Marcar tareas como completadas
- Eliminar tareas
- Filtrar por estado (todas, pendientes, completadas)
- Contador de tareas pendientes

## Tecnologías

- AdonisJS 6 (Backend)
- React 19 (Frontend)
- PostgreSQL (Base de datos)
- Tailwind CSS (Estilos)
- Docker (Base de datos)

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
```bash
cp env.example .env
```

3. Generar clave de aplicación:
```bash
node ace generate:key
```

4. Iniciar base de datos:
```bash
docker-compose up -d
```

5. Ejecutar migraciones:
```bash
node ace migration:run
```

6. Iniciar servidor:
```bash
npm run dev
```

La aplicación estará en `http://localhost:3333`

## Uso

1. Agregar tarea: Escribe en el campo de texto y presiona "Agregar"
2. Completar tarea: Haz clic en el checkbox
3. Eliminar tarea: Haz clic en el ícono de basura
4. Filtrar: Usa los botones "Todas", "Pendientes", "Completadas"

## Comandos útiles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Construir para producción
node ace migration:run     # Ejecutar migraciones
docker-compose up -d # Iniciar base de datos
```
