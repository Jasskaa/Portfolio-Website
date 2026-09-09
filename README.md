# Jaskaran Singh — Portfolio

Portfolio personal de Jaskaran Singh (diseño técnico 3D + desarrollo full stack).

## Stack

- **React 18 + Vite** — SPA de una sola página, sin backend.
- **Tailwind CSS** — sistema de diseño (colores, tipografía, espaciados) en `tailwind.config.js`.
- **Framer Motion** — animaciones de componentes: entrada, hover, reveals al hacer scroll (`whileInView`).
- **GSAP + ScrollTrigger** — animación de la línea de tiempo en Experiencia (`src/hooks/useScrollReveal.js`).
- i18n propio, ligero, sin librería externa: `src/i18n/`.

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo (http://localhost:5180 en este entorno)
npm run build    # build de producción en dist/
npm run preview  # sirve el build de producción
```

## Estructura

```
src/
  components/   # Header, Hero, About, Experience, Projects, Contact, Footer
  i18n/         # traducciones ES/EN + contexto de idioma
  hooks/        # useScrollReveal (GSAP ScrollTrigger reutilizable)
  assets/       # imágenes
public/cv/      # CV descargable
legacy-static/  # sitio HTML/CSS/JS original, archivado como referencia
```

## Pendiente de contenido real

- **Foto**: el Hero/About no usan foto todavía — las imágenes originales eran avatares Bitmoji, no fotos reales.
- **CV**: `public/cv/CV-Jaskaran-Singh.pdf` es un placeholder (copia de `legacy-static/assets/MyCurriclum.pdf`).
- **Proyectos**: `src/i18n/translations.js` → `projects.items` tiene 4 proyectos de ejemplo marcados como "Placeholder". Sustituir por proyectos reales (título, descripción, tags, categoría `design3d` o `web`).
- **Redes sociales**: no hay enlaces de LinkedIn/GitHub reales todavía.
