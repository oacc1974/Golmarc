# GolmarC — Cambios preparados (20/10/2026)

## Qué se corrigió
- `index.html`: title, description, canonical y etiquetas Open Graph/Twitter coherentes con **www.golmarc.com**.
- Datos estructurados: Organization sin dirección física no confirmada ni redes sociales no verificadas.
- Enlaces de las tarjetas de servicios a cinco páginas HTML propias (`servicios/`).
- Se corrigieron los contadores: los valores no dependen de que JavaScript se ejecute.
- `js/main.js`: validación que permite el envío real a Formspree y no muestra un éxito ficticio.
- `sitemap.xml` con solo seis URLs públicas e indexables y `robots.txt` con sitemap en **www**.
- Nuevas páginas de `privacidad.html`, `terminos.html` y `gracias.html` para evitar rutas inexistentes.
- Página 404: ruta del logo absoluta para errores en directorios anidados.
- Se retiraron enlaces de redes sociales con href="#" hasta confirmar las URL.

## IMPORTANTE: confirmar antes de poner en producción
1. **Páginas legales:** privacidad y términos son **borradores** con `noindex`. Contienen marcadores [PENDIENTE] sobre razón social, dirección, retención y derechos. Es necesario revisar con el responsable del negocio, sus proveedores y asesoría legal. Eliminar el aviso de borrador y decidir si indexar cuando estén finalizados.
2. **Formspree:** comprobar que `https://formspree.io/f/xjkarggr` esté activo, que lleguen correos y que se configure la redirección a `https://www.golmarc.com/gracias.html` en Formspree si el proveedor lo requiere. No probar con datos de clientes reales sin consentimiento.
3. **Afirmaciones comerciales existentes:** confirmar casos/testimonios, uso de marca KFC, `64 puntos`, `100 negocios`, `50+ clientes en Colombia`, `95%`, `30%`, oferta de implementación `48h`, soporte `24/7`, integración DIAN y referencias a certificación del SRI. Se conservaron sin inventar nuevas evidencias. Si no se documentan, deben corregirse o retirarse.
4. **Contacto:** verificar que `ventas@golmarc.com`, `+1 (939) 306-6175` y la cobertura geográfica sean los datos oficiales. No se cambió el número de WhatsApp ni el correo.
5. **DNS y hosting:** las URL de sitemap/canonical usan `https://www.golmarc.com/`, porque el dominio sin www redirige a esa versión. Verificar que DreamHost sirva todos los archivos; los cambios de GitHub no publican por sí solos.
6. **Performance:** se conservó Tailwind por CDN para no romper el diseño. Es preferible compilarlo para producción en una fase separada. No se certificó resultado de Core Web Vitals.

## Pruebas locales (Windows)
1. Haz una copia de tu carpeta `C:\Users\GolmarC\Desktop\Proyectos\Golmarc-main`.
2. Copia el contenido de esta carpeta corregida a la carpeta local, o ábrela por separado para compararla.
3. Abre `index.html` o inicia un servidor local: `py -m http.server 8000` en la carpeta del sitio. Luego visita `http://localhost:8000`.
4. Prueba los enlaces de servicios, formulario, versiones móviles y enlaces del pie. No confundir la página `gracias.html` con confirmación real de Formspree: la confirmación debe proceder del servicio de formularios.
5. Publica manualmente en DreamHost/GitHub **después** de revisar esta lista.
6. En Search Console: envía `https://www.golmarc.com/sitemap.xml`, inspecciona la URL de inicio y solicita indexación cuando los archivos estén publicados.

## Archivos añadidos
- `servicios/pos-restaurantes.html`
- `servicios/loyverse-facturacion-electronica.html`
- `servicios/menu-digital.html`
- `servicios/video-wall.html`
- `servicios/pixelpoint-pos.html`
- `privacidad.html` (borrador noindex)
- `terminos.html` (borrador noindex)
- `gracias.html` (noindex)

## No se modificó
- GitHub ni la rama principal.
- DreamHost ni configuración de DNS.
- Los precios y cifras comerciales de la página principal.
