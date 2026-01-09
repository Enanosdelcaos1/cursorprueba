// Utilidades generales

/**
 * Formatea una fecha a formato legible
 * @param {Date} date - Fecha a formatear
 * @returns {string} Fecha formateada
 */
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

/**
 * Valida un email
 * @param {string} email - Email a validar
 * @returns {boolean} true si es válido
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Muestra un mensaje al usuario
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de mensaje (success, error, info)
 */
function showMessage(message, type = 'info') {
    // Implementación básica de mensajes
    console.log(`[${type.toUpperCase()}] ${message}`);
    // Aquí puedes agregar lógica para mostrar mensajes en la UI
}

/**
 * Obtiene un elemento del DOM de forma segura
 * @param {string} selector - Selector CSS
 * @returns {HTMLElement|null} Elemento encontrado o null
 */
function $(selector) {
    return document.querySelector(selector);
}

/**
 * Obtiene múltiples elementos del DOM
 * @param {string} selector - Selector CSS
 * @returns {NodeList} Lista de elementos
 */
function $$(selector) {
    return document.querySelectorAll(selector);
}

/**
 * Debounce para funciones
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function} Función con debounce
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
