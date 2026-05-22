// INFORMACIÓN DEL APP 
export let id = 'dashwii'
export let app = 'Dashwii'
export let icon = 'fa-cake-candles'
export let titulo = 'Dashwii - Mejor aplicativo de analista de datos';
export let keywii = 'Mejor aplicativo de analista de datos, Mejor aplicativo, analista de datos, analistas';
export let descri = 'Excelente herramienta para los analista de datos muy bueno';
export let linkweb = 'https://dashwii.web.app'; // Sin slash (/), al final
export let lanzamiento = 2026;
export let by = '@wilder.taype';
export let linkme = 'https://wtaype.github.io/';
export let ipdev = import.meta.env.VITE_DEV;
export let version = 'v10'; // Siempre va "v" para estructura

/** ACTUALIZAR AL TAG POR SEGURIDAD [TAG NUEVO] (1)
git tag v10 -m "Version v10" ; git push origin v10

ACTUALIZACIÓN AL MAIN PRINCIPAL DEL PROYECTO [MAIN] (2)
git add . ; git commit -m "Actualizacion Principal v10.10.10" ; git push origin main

// REEMPLAZAR TAG DE SEGURIDAD EXISTENTE [TAG REMPLAZO] (3)
git tag -d v10 ; git tag v10 -m "Version v10 actualizada" ; git push origin v10 --force

// Actualizar versiones de seguridad [ELIMINAR CARPETA - ARCHIVO ONLINE] (4)
git rm --cached skills-lock.json ; git commit -m "Archivo Eliminado" ; git push origin main
git rm -r --cached .claude/ ; git commit -m "Carpeta Eliminada" ; git push origin main 
git tag -d 10 ; git push origin --delete 10 // Eliminar tag del local y remoto.
 ACTUALIZACION TAG[END] */
