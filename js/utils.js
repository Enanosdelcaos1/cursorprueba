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
    const re = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i;
    return re.test(email);
}

/**
 * Sanitiza un email
 * @param {string} email - Email a sanitizar
 * @returns {string} Email sanitizado
 */
function sanitizeEmail(email) {
    return email.trim().toLowerCase();
}

/**
 * Valida un nombre de usuario
 * @param {string} username - Nombre de usuario a validar
 * @returns {boolean} true si es válido
 */
function validateUsername(username) {
    const re = /^[a-zA-Z0-9_]{3,20}$/;
    return re.test(username);
}

/**
 * Sanitiza un nombre de usuario
 * @param {string} username - Nombre de usuario a sanitizar
 * @returns {string} Nombre de usuario sanitizado
 */
function sanitizeUsername(username) {
    return username.trim().replace(/[^a-zA-Z0-9_]/g, '');
}

/**
 * Valida una contraseña
 * @param {string} password - Contraseña a validar
 * @returns {object} { valid: boolean, errors: string[] }
 */
function validatePassword(password) {
    const errors = [];
    
    if (password.length < 8) {
        errors.push('La contraseña debe tener al menos 8 caracteres');
    }
    if (password.length > 128) {
        errors.push('La contraseña no puede tener más de 128 caracteres');
    }
    if (!/[a-z]/.test(password)) {
        errors.push('La contraseña debe contener al menos una letra minúscula');
    }
    if (!/[A-Z]/.test(password)) {
        errors.push('La contraseña debe contener al menos una letra mayúscula');
    }
    if (!/[0-9]/.test(password)) {
        errors.push('La contraseña debe contener al menos un número');
    }
    if (!/[^a-zA-Z0-9]/.test(password)) {
        errors.push('La contraseña debe contener al menos un símbolo especial');
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

/**
 * Sanitiza una cadena de texto
 * @param {string} str - Cadena a sanitizar
 * @returns {string} Cadena sanitizada
 */
function sanitizeString(str) {
    if (typeof str !== 'string') return '';
    return str.trim().replace(/[<>]/g, '');
}

/**
 * Verifica el token de Cloudflare Turnstile
 * @param {string} token - Token de Turnstile
 * @returns {Promise<boolean>} true si el token es válido
 */
async function verifyTurnstileToken(token) {
    if (!token) {
        return false;
    }
    
    try {
        // En producción, esto debería hacer una petición a tu servidor
        // que verifique el token con Cloudflare
        // Por ahora, solo verificamos que el token existe
        return token.length > 0;
    } catch (error) {
        console.error('Error verificando Turnstile:', error);
        return false;
    }
}

/**
 * Valida las credenciales de login (simulación)
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise<{valid: boolean, message: string}>} Resultado de la validación
 */
async function validateLoginCredentials(email, password) {
    // Credenciales hardcodeadas (simulación hasta conectar con API)
    const VALID_EMAIL = 'paugoblin@gmail.com';
    const VALID_PASSWORD = 'Nosferatu1@';
    
    // Sanitizar y normalizar
    const sanitizedEmail = sanitizeEmail(email);
    const sanitizedPassword = password.trim();
    
    // Validar formato de email
    if (!validateEmail(sanitizedEmail)) {
        return {
            valid: false,
            message: 'El formato del email no es válido'
        };
    }
    
    // Validar credenciales
    if (sanitizedEmail === VALID_EMAIL && sanitizedPassword === VALID_PASSWORD) {
        return {
            valid: true,
            message: 'Credenciales correctas'
        };
    } else {
        return {
            valid: false,
            message: 'Email o contraseña incorrectos'
        };
    }
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
