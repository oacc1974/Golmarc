/**
 * GolmarC - POS & Facturación Electrónica para Pymes
 * JavaScript principal
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todos los componentes
    initNavbar();
    initMobileMenu();
    initAccordions();
    initTabs();
    initFormValidation();
    initToasts();
    initAnimations();
});

/**
 * Navbar con cambio al hacer scroll
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/**
 * Menú móvil
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.navbar-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeButton = document.querySelector('.mobile-menu-close');
    const menuLinks = document.querySelectorAll('.mobile-menu-item');
    
    if (!menuToggle || !mobileMenu) return;
    
    // Función para abrir/cerrar el menú
    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('overflow-hidden');
        
        // Actualizar atributo aria-expanded
        const isExpanded = mobileMenu.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
    }
    
    // Event listeners
    menuToggle.addEventListener('click', toggleMenu);
    
    if (closeButton) {
        closeButton.addEventListener('click', toggleMenu);
    }
    
    // Cerrar menú al hacer clic en un enlace
    menuLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
    
    // Cerrar menú al presionar Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
}

/**
 * Acordeones para FAQs
 */
function initAccordions() {
    const accordions = document.querySelectorAll('.accordion');
    
    accordions.forEach(accordion => {
        const header = accordion.querySelector('.accordion-header');
        if (!header) return;
        
        header.addEventListener('click', () => {
            // Cerrar otros acordeones si es necesario
            // const parent = accordion.closest('.accordion-group');
            // if (parent && parent.dataset.behavior === 'close-others') {
            //     parent.querySelectorAll('.accordion').forEach(item => {
            //         if (item !== accordion) {
            //             item.classList.remove('active');
            //         }
            //     });
            // }
            
            // Alternar estado actual
            accordion.classList.toggle('active');
            
            // Actualizar atributo aria-expanded
            const isExpanded = accordion.classList.contains('active');
            header.setAttribute('aria-expanded', isExpanded);
        });
        
        // Configurar atributos ARIA
        const content = accordion.querySelector('.accordion-content');
        const headerId = `accordion-header-${Math.random().toString(36).substring(2, 9)}`;
        const contentId = `accordion-content-${Math.random().toString(36).substring(2, 9)}`;
        
        header.setAttribute('id', headerId);
        header.setAttribute('aria-controls', contentId);
        header.setAttribute('aria-expanded', 'false');
        header.setAttribute('role', 'button');
        
        if (content) {
            content.setAttribute('id', contentId);
            content.setAttribute('aria-labelledby', headerId);
            content.setAttribute('role', 'region');
        }
    });
}

/**
 * Tabs para cambiar entre contenidos
 */
function initTabs() {
    const tabGroups = document.querySelectorAll('.tabs');
    
    tabGroups.forEach(tabGroup => {
        const tabHeaders = tabGroup.querySelectorAll('.tab-header');
        const tabContents = tabGroup.querySelectorAll('.tab-content');
        
        tabHeaders.forEach((header, index) => {
            header.addEventListener('click', () => {
                // Remover clase active de todos los headers y contents
                tabHeaders.forEach(h => h.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Agregar clase active al header y content actual
                header.classList.add('active');
                if (tabContents[index]) {
                    tabContents[index].classList.add('active');
                }
            });
            
            // Configurar atributos ARIA
            const tabId = `tab-${Math.random().toString(36).substring(2, 9)}`;
            const panelId = `panel-${Math.random().toString(36).substring(2, 9)}`;
            
            header.setAttribute('id', tabId);
            header.setAttribute('role', 'tab');
            header.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
            header.setAttribute('aria-controls', panelId);
            header.setAttribute('tabindex', index === 0 ? '0' : '-1');
            
            if (tabContents[index]) {
                tabContents[index].setAttribute('id', panelId);
                tabContents[index].setAttribute('role', 'tabpanel');
                tabContents[index].setAttribute('aria-labelledby', tabId);
                tabContents[index].setAttribute('tabindex', '0');
            }
        });
        
        // Activar el primer tab por defecto
        if (tabHeaders.length > 0 && tabContents.length > 0) {
            tabHeaders[0].classList.add('active');
            tabContents[0].classList.add('active');
        }
    });
}

/**
 * Validación de formularios
 */
function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate="true"]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            // Limpiar mensajes de error previos
            form.querySelectorAll('.error-message').forEach(msg => msg.remove());
            
            // Validar campos requeridos
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    showFieldError(field, 'Este campo es obligatorio');
                } else if (field.type === 'email' && !validateEmail(field.value)) {
                    isValid = false;
                    showFieldError(field, 'Ingresa un email válido');
                } else if (field.type === 'tel' && !validatePhone(field.value)) {
                    isValid = false;
                    showFieldError(field, 'Ingresa un número de teléfono válido');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                // Mostrar mensaje general de error
                showToast('error', 'Error en el formulario', 'Por favor, revisa los campos marcados en rojo.');
            } else {
                // En un caso real, aquí se enviaría el formulario por AJAX
                // Para esta demo, prevenimos el envío y mostramos un mensaje de éxito
                e.preventDefault();
                form.reset();
                showToast('success', '¡Formulario enviado!', 'Nos pondremos en contacto contigo pronto.');
            }
        });
    });
}

/**
 * Mostrar error en un campo de formulario
 */
function showFieldError(field, message) {
    // Agregar clase de error al campo
    field.classList.add('error');
    
    // Crear mensaje de error
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message text-sm';
    errorMessage.style.color = '#ef4444';
    errorMessage.textContent = message;
    
    // Insertar después del campo
    field.parentNode.insertBefore(errorMessage, field.nextSibling);
    
    // Remover clase de error cuando el usuario comience a escribir
    field.addEventListener('input', function() {
        field.classList.remove('error');
        const errorMsg = field.parentNode.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    }, { once: true });
}

/**
 * Validar formato de email
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Validar formato de teléfono
 */
function validatePhone(phone) {
    // Validación simple: al menos 7 dígitos
    const re = /^\+?[\d\s()-]{7,}$/;
    return re.test(phone);
}

/**
 * Sistema de notificaciones toast
 */
function initToasts() {
    // Crear contenedor de toasts si no existe
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        toastContainer.style.position = 'fixed';
        toastContainer.style.bottom = '1rem';
        toastContainer.style.right = '1rem';
        toastContainer.style.zIndex = '1000';
        document.body.appendChild(toastContainer);
    }
}

/**
 * Mostrar notificación toast
 */
function showToast(type, title, message, duration = 5000) {
    const toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) return;
    
    // Crear elemento toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    // Iconos según tipo
    let icon = '';
    if (type === 'success') {
        icon = '<svg xmlns="http://www.w3.org/2000/svg" class="toast-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';
    } else if (type === 'error') {
        icon = '<svg xmlns="http://www.w3.org/2000/svg" class="toast-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
    }
    
    // Estructura del toast
    toast.innerHTML = `
        <div class="toast-icon">${icon}</div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" aria-label="Cerrar">&times;</button>
    `;
    
    // Agregar al contenedor
    toastContainer.appendChild(toast);
    
    // Mostrar con animación
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Configurar botón de cierre
    const closeBtn = toast.querySelector('.toast-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            removeToast(toast);
        });
    }
    
    // Auto-cerrar después de la duración especificada
    setTimeout(() => {
        removeToast(toast);
    }, duration);
}

/**
 * Remover notificación toast
 */
function removeToast(toast) {
    toast.classList.remove('show');
    
    // Esperar a que termine la animación antes de remover
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 300);
}

/**
 * Animaciones al hacer scroll
 */
function initAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    if (animatedElements.length === 0) return;
    
    // Comprobar si el navegador soporta Intersection Observer
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    // Opcionalmente, dejar de observar después de animar
                    // observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback para navegadores que no soportan Intersection Observer
        animatedElements.forEach(element => {
            element.classList.add('animated');
        });
    }
}

/**
 * Scroll suave para enlaces internos
 */
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="#"]');
    
    if (link) {
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            e.preventDefault();
            
            window.scrollTo({
                top: targetElement.offsetTop - 100, // Ajustar según altura del navbar
                behavior: 'smooth'
            });
        }
    }
});

/**
 * Slider/Carrusel simple
 */
function initSlider(sliderId) {
    const slider = document.getElementById(sliderId);
    if (!slider) return;
    
    const sliderTrack = slider.querySelector('.slider-track');
    const slides = slider.querySelectorAll('.slider-slide');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    const dots = slider.querySelectorAll('.slider-dot');
    
    if (!sliderTrack || slides.length === 0) return;
    
    let currentIndex = 0;
    const slideWidth = 100; // Porcentaje
    
    // Configurar ancho del track y slides
    sliderTrack.style.width = `${slides.length * 100}%`;
    slides.forEach(slide => {
        slide.style.width = `${slideWidth / slides.length}%`;
    });
    
    // Función para ir a un slide específico
    function goToSlide(index) {
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }
        
        currentIndex = index;
        sliderTrack.style.transform = `translateX(-${currentIndex * (slideWidth / slides.length)}%)`;
        
        // Actualizar dots
        if (dots.length > 0) {
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }
    }
    
    // Event listeners para botones
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });
    }
    
    // Event listeners para dots
    if (dots.length > 0) {
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
        });
    }
    
    // Soporte para swipe en móviles
    let touchStartX = 0;
    let touchEndX = 0;
    
    sliderTrack.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    sliderTrack.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchStartX - touchEndX > swipeThreshold) {
            // Swipe izquierda -> siguiente slide
            goToSlide(currentIndex + 1);
        } else if (touchEndX - touchStartX > swipeThreshold) {
            // Swipe derecha -> slide anterior
            goToSlide(currentIndex - 1);
        }
    }
    
    // Inicializar en el primer slide
    goToSlide(0);
    
    // Opcionalmente, autoplay
    // setInterval(() => {
    //     goToSlide(currentIndex + 1);
    // }, 5000);
    
    return {
        goToSlide,
        getCurrentIndex: () => currentIndex,
        getSlideCount: () => slides.length
    };
}

// Contador simple para métricas/estadísticas
function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    
    if (counters.length === 0) return;
    
    // Comprobar si el navegador soporta Intersection Observer
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.counterTarget, 10) || 0;
                    const duration = parseInt(counter.dataset.counterDuration, 10) || 2000;
                    let current = 0;
                    const step = Math.ceil(target / (duration / 16));
                    
                    const updateCounter = () => {
                        current += step;
                        if (current >= target) {
                            counter.textContent = target.toLocaleString();
                            observer.unobserve(counter);
                        } else {
                            counter.textContent = current.toLocaleString();
                            requestAnimationFrame(updateCounter);
                        }
                    };
                    
                    updateCounter();
                }
            });
        }, {
            threshold: 0.5
        });
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    } else {
        // Fallback para navegadores que no soportan Intersection Observer
        counters.forEach(counter => {
            counter.textContent = counter.dataset.counterTarget || '0';
        });
    }
}
