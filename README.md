# 🌱 Huerta Agroecológica Siglo XXI

Aplicaciones web (PWA) para la **Huerta Agroecológica Siglo XXI** de Pigüé, provincia de Buenos Aires.

Dos apps independientes que comparten marca y se instalan por separado en el celular:

- **🎨 Estudio** (`diseno.html`) — Editor de diseño visual para redes sociales
- **📋 Asistente** (`asistente.html`) — Gestión integral del emprendimiento + chats con IA

## Cómo usar

1. Entrar a la portada → `index.html`
2. Elegir una de las dos apps
3. Desde el celular: usar el botón "Agregar a pantalla de inicio" para instalarla como aplicación

Cada app funciona offline una vez instalada, y guarda los datos en el dispositivo del usuario.

## Estructura del repositorio

```
.
├── index.html                  # Portada con acceso a las dos apps
├── diseno.html                 # App 1 — Estudio de diseño
├── asistente.html              # App 2 — Asistente integral
├── manifest-diseno.json        # PWA config — Estudio
├── manifest-asistente.json     # PWA config — Asistente
├── sw-diseno.js                # Service worker — Estudio
├── sw-asistente.js             # Service worker — Asistente
├── icon-192.png                # Icono PWA 192×192
├── icon-512.png                # Icono PWA 512×512
├── icon-512-maskable.png       # Icono adaptativo Android
└── favicon-32.png              # Favicon
```

## Estudio (App 1)

Herramientas para producir contenido visual a partir de fotos propias:

- **Editor**: filtros, texto sobre la imagen (con ajuste automático en líneas), formatos para cada red
- **Modelos IA**: la IA genera 4 variantes de diseño automáticas (Minimal, Editorial, Póster, Marco)
- **Plantillas Stories**: 8 plantillas prediseñadas (Cosecha, Taller, Producto, Oferta, Tip, Sintropia, Receta, Cita)
- **Collage**: combinar varias fotos en una sola pieza
- **Redimensionar**: adaptar imágenes a Feed, Story, Portrait, Portada, Facebook, YouTube
- **Marca de agua**: firmar las imágenes con la marca de la huerta

## Asistente (App 2)

11 módulos para la gestión diaria:

- **📋 Pedidos** — carga manual + extracción automática desde mensajes de WhatsApp
- **🌳 Chat Técnico** — IA especializada en sintropia, agrofloresta y agroecología
- **💬 Chat General** — IA para todo lo demás del emprendimiento
- **🌱 Productos** — catálogo con categorías, precios y stock
- **👥 Clientes** — base de contactos con historial de pedidos
- **📅 Calendario** — eventos del mes (publicaciones, talleres, entregas, ferias)
- **🥬 Cosechas** — registro de producción
- **🥗 Recetas** — recetario con generador IA
- **💡 Ideas** — banco de ideas de contenido generado por IA
- **📚 Historial** — lo ya publicado, con notas de resultados
- **📊 Estadísticas** — resumen del mes

## Tecnología

- **React 18** (UMD, sin build step)
- **Babel Standalone** para compilar JSX en el navegador
- **Gemini 2.5 Flash** para todas las funciones de IA
- **PWA**: cada app tiene su manifest y service worker para funcionar offline e instalarse
- **localStorage** para persistencia de datos en el dispositivo

## Despliegue

Funciona como sitio estático en cualquier hosting. Probado en GitHub Pages, Netlify y Vercel.

Para GitHub Pages: subí todos los archivos al repositorio, activá Pages desde la configuración (Settings → Pages → Source: main / root) y la app queda disponible en `https://tu-usuario.github.io/huerta-sxxi/`.

## Licencia

Hecho a medida para la **Huerta Agroecológica Siglo XXI**. No reutilizar el logo ni la marca sin permiso.

---

> _"Sembrar es creer en el futuro."_

· Agroecología · Sintropia · Agrofloresta ·
