// Archivo principal de JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Inicialización de la aplicación
    init();
});

function init() {
    // Configuración inicial
    setupNavigation();
    setupForms();
}

function setupNavigation() {
    // Lógica de navegación
    const currentPage = window.location.pathname;
    console.log('Página actual:', currentPage);
}

function setupForms() {
    // Configuración de formularios
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        setupRegisterForm(registerForm);
    }
}

function setupRegisterForm(form) {
    // Validación en tiempo real
    const emailInput = form.querySelector('#email');
    const usernameInput = form.querySelector('#username');
    const passwordInput = form.querySelector('#password');
    const confirmPasswordInput = form.querySelector('#confirmPassword');

    // Validación de email
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            validateEmailField(emailInput);
        });
        emailInput.addEventListener('input', debounce(function() {
            if (emailInput.value.length > 0) {
                validateEmailField(emailInput);
            }
        }, 300));
    }

    // Validación de username
    if (usernameInput) {
        usernameInput.addEventListener('blur', function() {
            validateUsernameField(usernameInput);
        });
        usernameInput.addEventListener('input', debounce(function() {
            if (usernameInput.value.length > 0) {
                validateUsernameField(usernameInput);
            }
        }, 300));
    }

    // Validación de contraseña
    if (passwordInput) {
        passwordInput.addEventListener('blur', function() {
            validatePasswordField(passwordInput);
        });
        passwordInput.addEventListener('input', debounce(function() {
            if (passwordInput.value.length > 0) {
                validatePasswordField(passwordInput);
            }
        }, 300));
    }

    // Validación de confirmación de contraseña
    if (confirmPasswordInput && passwordInput) {
        confirmPasswordInput.addEventListener('blur', function() {
            validateConfirmPasswordField(confirmPasswordInput, passwordInput);
        });
        confirmPasswordInput.addEventListener('input', debounce(function() {
            if (confirmPasswordInput.value.length > 0) {
                validateConfirmPasswordField(confirmPasswordInput, passwordInput);
            }
        }, 300));
    }

    // Manejo del envío del formulario
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        await handleRegisterSubmit(form);
    });
}

// Validación de campos individuales
function validateEmailField(input) {
    const errorElement = document.getElementById('emailError');
    const email = sanitizeEmail(input.value);
    
    if (!email) {
        showFieldError(input, errorElement, 'El email es requerido');
        return false;
    }
    
    if (!validateEmail(email)) {
        showFieldError(input, errorElement, 'El formato del email no es válido');
        return false;
    }
    
    if (email.length < 5 || email.length > 100) {
        showFieldError(input, errorElement, 'El email debe tener entre 5 y 100 caracteres');
        return false;
    }
    
    clearFieldError(input, errorElement);
    return true;
}

function validateUsernameField(input) {
    const errorElement = document.getElementById('usernameError');
    const username = sanitizeUsername(input.value);
    
    if (!username) {
        showFieldError(input, errorElement, 'El nombre de usuario es requerido');
        return false;
    }
    
    if (!validateUsername(username)) {
        showFieldError(input, errorElement, 'Solo letras, números y guiones bajos. Entre 3 y 20 caracteres.');
        return false;
    }
    
    clearFieldError(input, errorElement);
    return true;
}

function validatePasswordField(input) {
    const errorElement = document.getElementById('passwordError');
    const password = input.value;
    
    if (!password) {
        showFieldError(input, errorElement, 'La contraseña es requerida');
        return false;
    }
    
    const validation = validatePassword(password);
    if (!validation.valid) {
        showFieldError(input, errorElement, validation.errors[0]);
        return false;
    }
    
    clearFieldError(input, errorElement);
    return true;
}

function validateConfirmPasswordField(input, passwordInput) {
    const errorElement = document.getElementById('confirmPasswordError');
    const password = passwordInput.value;
    const confirmPassword = input.value;
    
    if (!confirmPassword) {
        showFieldError(input, errorElement, 'Por favor confirma tu contraseña');
        return false;
    }
    
    if (password !== confirmPassword) {
        showFieldError(input, errorElement, 'Las contraseñas no coinciden');
        return false;
    }
    
    clearFieldError(input, errorElement);
    return true;
}

// Funciones de ayuda para mostrar/ocultar errores
function showFieldError(input, errorElement, message) {
    if (input) {
        input.classList.add('error');
        input.setAttribute('aria-invalid', 'true');
    }
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearFieldError(input, errorElement) {
    if (input) {
        input.classList.remove('error');
        input.setAttribute('aria-invalid', 'false');
    }
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

// Manejo del envío del formulario
async function handleRegisterSubmit(form) {
    const submitBtn = document.getElementById('submitBtn');
    const turnstileError = document.getElementById('turnstileError');
    
    // Deshabilitar el botón de envío
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Registrando...';
    }

    // Obtener valores y sanitizar
    const email = sanitizeEmail(form.email.value);
    const username = sanitizeUsername(form.username.value);
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    // Validación HTML (primera capa) - verificar que los campos requeridos estén llenos
    if (!form.checkValidity()) {
        form.reportValidity();
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Registrarse';
        }
        return;
    }

    // Validación JavaScript (segunda capa)
    let isValid = true;
    
    if (!validateEmailField(form.email)) isValid = false;
    if (!validateUsernameField(form.username)) isValid = false;
    if (!validatePasswordField(form.password)) isValid = false;
    if (!validateConfirmPasswordField(form.confirmPassword, form.password)) isValid = false;

    if (!isValid) {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Registrarse';
        }
        return;
    }

    // Verificar Cloudflare Turnstile
    const turnstileResponse = window.turnstile?.getResponse();
    if (!turnstileResponse) {
        showFieldError(null, turnstileError, 'Por favor completa la verificación de seguridad');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Registrarse';
        }
        return;
    }

    // Verificar el token de Turnstile
    const isTurnstileValid = await verifyTurnstileToken(turnstileResponse);
    if (!isTurnstileValid) {
        showFieldError(null, turnstileError, 'La verificación de seguridad falló. Por favor intenta de nuevo.');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Registrarse';
        }
        return;
    }

    clearFieldError(null, turnstileError);

    // Datos sanitizados para enviar
    const formData = {
        email: email,
        username: username,
        password: password // En producción, esto nunca debería enviarse en texto plano
    };

    try {
        // Aquí harías la petición al servidor
        console.log('Datos del formulario (sanitizados):', {
            email: formData.email,
            username: formData.username
            // password no se muestra en consola por seguridad
        });

        // Simular envío
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mostrar mensaje de éxito
        showMessage('Registro exitoso. Redirigiendo...', 'success');
        
        // En producción, redirigir a la página de login o dashboard
        // window.location.href = 'logearse.html';
        
    } catch (error) {
        console.error('Error en el registro:', error);
        showMessage('Error al registrar. Por favor intenta de nuevo.', 'error');
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Registrarse';
        }
    }
}
