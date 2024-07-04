// Url general del servidor
const API_URL = 'http://localhost:3000/api';


// URL de los endpoints
const urlResourceAnimes = `${API_URL}/animes`;  // ANIMES
const urlResourceContenidos = `${API_URL}/contenidos`;  // CONTENIDOS

const urlResourceEtiquetas = `${API_URL}/etiquetas`;  // ETIQUETAS
const urlResourceCalificaciones = `${API_URL}/calificaciones`;  // CALIFICACIONES
const urlResourceSitios = `${API_URL}/sitios`;  // SITIOS WEB

const urlResourceStats = `${API_URL}/stats`;  // STATS




// Exportar las URL
export const config = {
    API_URL,
    urlResourceAnimes,
    urlResourceContenidos,
    urlResourceEtiquetas,
    urlResourceCalificaciones,
    urlResourceSitios,
    urlResourceStats
}
