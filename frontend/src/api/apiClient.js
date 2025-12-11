// frontend/src/api/apiClient.js

// Leemos la URL desde el archivo .env que acabamos de configurar
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = async (endpoint, options = {}) => {
  // 1. Verificación de seguridad
  if (!API_BASE_URL) {
    console.error("❌ Error Crítico: VITE_API_BASE_URL no está definida en el .env");
    throw new Error("La URL de la API no está configurada.");
  }

  // 2. Recuperar el token de sesión (si el usuario ya se logueó)
  const token = localStorage.getItem('token');

  // 3. Configuración de cabeceras (Headers)
  const defaultHeaders = {
    'Content-Type': 'application/json',
    // Si existe el token, inyectamos la cabecera Authorization automáticamente
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };

  const config = {
    method: options.method || 'GET',
    headers: {
      ...defaultHeaders,
      ...options.headers, // Permite sobrescribir headers específicos si es necesario
    },
    ...options,
  };

  // 4. Si hay cuerpo (body), lo convertimos a JSON automáticamente
  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  try {
    // 5. Realizar la petición (Fetch)
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    // 6. Manejo de Errores HTTP (400, 401, 500, etc.)
    if (!response.ok) {
      let errorMessage;
      try {
        // Intentamos leer el mensaje de error JSON que envía el backend
        const errorData = await response.json();
        errorMessage = errorData.message || `Error ${response.status}`;
      } catch (parseError) {
        // Si el backend no devolvió JSON, usamos el texto de estado genérico
        errorMessage = `Error HTTP: ${response.status} ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    // 7. Si todo sale bien, retornamos la respuesta parseada
    // (Verificamos si hay contenido para evitar error al parsear un 204 No Content)
    if (response.status === 204) return null;
    
    return await response.json();

  } catch (error) {
    console.error("⚠️ Error en apiClient:", error.message);
    throw error; // Re-lanzamos el error para que el componente (Login/Register) pueda mostrarlo al usuario
  }
};