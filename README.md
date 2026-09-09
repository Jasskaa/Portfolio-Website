# Jaskaran Singh — Portfolio

Portfolio personal de Jaskaran Singh (diseño técnico 3D + desarrollo full stack).

## Stack

- **React 18 + Vite** — SPA de una sola página, sin backend.
- **Tailwind CSS** — sistema de diseño (colores, tipografía, espaciados) en `tailwind.config.js`. Colores en variables CSS (`src/index.css`) para soportar dark mode sin tocar componentes.
- **Framer Motion** — animaciones de componentes: entrada, hover, reveals al hacer scroll (`whileInView`), y el cursor personalizado.
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
  components/   # Header, Hero, About, Experience, Projects, Contact, Footer, CustomCursor, ThemeToggle
  i18n/         # traducciones ES/EN + contexto de idioma
  theme/        # ThemeContext (dark/light, persistido en localStorage + system preference)
  hooks/        # useScrollReveal (GSAP ScrollTrigger reutilizable)
  assets/       # imágenes
public/cv/      # CV descargable
legacy-static/  # sitio HTML/CSS/JS original, archivado como referencia
```

## Formulario de contacto → tu correo

El formulario de "Hablemos" envía los mensajes directo a tu email vía [Web3Forms](https://web3forms.com) (gratis, sin backend). Para activarlo:

1. Ve a https://web3forms.com
2. Introduce el email donde quieres recibir los mensajes (`jaskaranmr18@gmail.com`)
3. Te mandan una **access key** al instante — no hace falta cuenta ni contraseña
4. Copia `.env.example` a `.env` y pega la key:
   ```
   VITE_WEB3FORMS_KEY=tu-key-aqui
   ```
5. Reinicia `npm run dev` (o vuelve a hacer build) para que Vite recoja la variable

Sin esa key configurada, el formulario simplemente abre el cliente de correo del visitante con el mensaje precompletado (funciona, pero peor experiencia). El `.env` real nunca se sube a git (está en `.gitignore`).

## Modo oscuro

Toggle sol/luna en el header (visible en todas las resoluciones). Por defecto sigue la preferencia del sistema (`prefers-color-scheme`); en cuanto el visitante lo toca manualmente, la elección se guarda en `localStorage` y ya no cambia sola. El footer y el menú móvil a pantalla completa se mantienen siempre oscuros a propósito (son los tokens `void`/`snow`, no reactivos al tema) — es una decisión de diseño, no un bug.

## Cursor personalizado

Solo se activa en dispositivos con ratón real (`pointer: fine`) y respeta `prefers-reduced-motion` — en móvil/tablet o con esa preferencia activada, se usa el cursor nativo sin más. Estados:
- **Idle**: puntito azul + anillo fino siguiéndote con un pequeño retraso.
- **Sobre botones/enlaces**: el anillo crece y se rellena de blanco con `mix-blend-mode: difference`, invirtiendo el color de lo que hay debajo — se queda centrado en el puntero en todo momento, sin acoplarse a la forma del elemento.

## Pendiente de contenido real

- **Foto**: el Hero/About no usan foto todavía — las imágenes originales eran avatares Bitmoji, no fotos reales.
- **Diseño 3D en Proyectos**: solo hay proyectos web reales (Vitalis, Gmail Swipe, Joc del Virus) — falta añadir trabajo de SolidWorks/AutoCAD.
- **Redes sociales**: no hay enlaces de LinkedIn/GitHub reales todavía.

## CV

`public/cv/CV-Jaskaran-Singh.pdf` — generado a partir de `src/i18n/translations.js` (mismo contenido que Experiencia/Skills/Idiomas de la web) con el mismo sistema visual del portfolio (Space Grotesk, JetBrains Mono, paleta ink/paper/blueprint, grid de fondo). Es un PDF real con texto vectorial, no una captura de pantalla. Si cambias tu experiencia en `translations.js`, recuerda regenerar también el PDF a mano (no se genera automáticamente en el build).
