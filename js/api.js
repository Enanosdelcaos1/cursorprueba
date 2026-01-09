// Funciones para manejo de API

const API_BASE_URL = 'https://api.example.com';

/**
 * Realiza una petición GET
 * @param {string} endpoint - Endpoint de la API
 * @returns {Promise} Promesa con la respuesta
 */
async function get(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en GET:', error);
        throw error;
    }
}

/**
 * Realiza una petición POST
 * @param {string} endpoint - Endpoint de la API
 * @param {Object} data - Datos a enviar
 * @returns {Promise} Promesa con la respuesta
 */
async function post(endpoint, data) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error en POST:', error);
        throw error;
    }
}

/**
 * Realiza una petición PUT
 * @param {string} endpoint - Endpoint de la API
 * @param {Object} data - Datos a enviar
 * @returns {Promise} Promesa con la respuesta
 */
async function put(endpoint, data) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error en PUT:', error);
        throw error;
    }
}

/**
 * Realiza una petición DELETE
 * @param {string} endpoint - Endpoint de la API
 * @returns {Promise} Promesa con la respuesta
 */
async function del(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error en DELETE:', error);
        throw error;
    }
}

// Exportar funciones (si se usa módulos ES6)
// export { get, post, put, del };
