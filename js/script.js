// Disable automatic scroll restoration to prevent page jump on load
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Theme Management
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
}
updateThemeIcons(savedTheme);

function toggleTheme() {
    body.classList.toggle('dark-mode');
    const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
    updateThemeIcons(currentTheme);
}

function updateThemeIcons(theme) {
    const iconClass = theme === 'dark' ? 'fa-sun' : 'fa-moon';
    const removeClass = theme === 'dark' ? 'fa-moon' : 'fa-sun';
    
    document.querySelectorAll('.theme-toggle i').forEach(icon => {
        icon.classList.remove(removeClass);
        icon.classList.add(iconClass);
    });
}

document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
});

// Language Management
const html = document.documentElement;

const langSwitches = document.querySelectorAll('.lang-switch');
const langToggles = document.querySelectorAll('.lang-toggle');

const savedLanguage = localStorage.getItem('language') || 'en';

// Initialize language
langSwitches.forEach(sw => sw.value = savedLanguage);
setLanguage(savedLanguage);

// Toggle language switch visibility
langToggles.forEach((toggle, index) => {
    toggle.addEventListener('click', () => {
        const sw = langSwitches[index];
        if (sw) sw.style.display = sw.style.display === 'none' ? 'inline-block' : 'none';
    });
});

// Handle language change
langSwitches.forEach(langSwitch => {
    langSwitch.addEventListener('change', (e) => {
        const selectedLang = e.target.value;
        localStorage.setItem('language', selectedLang);
        setLanguage(selectedLang);
        
        langSwitches.forEach(sw => {
            sw.value = selectedLang;
            sw.style.display = 'none';
        });
    });
});

function setLanguage(lang) {
    document.querySelectorAll('[data-en][data-de]').forEach(element => {
        element.textContent = lang === 'en' ? element.getAttribute('data-en') : element.getAttribute('data-de');
    });
    html.lang = lang;
}

// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking nav link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Smooth scrolling for navigation links with navbar offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add animation on scroll for project cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe service and project cards for animation
document.querySelectorAll('.service-card, .project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe sections for fade-in effect
const sectionObserverOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            sectionObserver.unobserve(entry.target);
        }
    });
}, sectionObserverOptions);

document.querySelectorAll('section:not(.hero) > .container').forEach(container => {
    container.classList.add('section-fade-in');
    sectionObserver.observe(container);
});

// Back to Top Button
const scrollToTop = document.getElementById('scrollToTop');

if (scrollToTop) {
    scrollToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTop.classList.add('show');
        } else {
            scrollToTop.classList.remove('show');
        }
    });
}

// Active navigation link highlighting
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    let current = '';
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    
    // Calculate the position roughly 1/3 down the viewport to determine what the user is looking at
    const scrollPosition = window.scrollY + navbarHeight + (window.innerHeight / 3);
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
            current = section.getAttribute('id');
        }
    });
    
    // Check if we've scrolled to the very bottom of the page
    if ((window.innerHeight + Math.ceil(window.scrollY)) >= document.body.offsetHeight - 10) {
        if (sections.length > 0) {
            current = sections[sections.length - 1].getAttribute('id');
        }
    }
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (current && link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    }
});

// Handle Contact Form Submission via AJAX
const contactForm = document.getElementById('netlify-contact-form');
const successMessage = document.getElementById('form-success-message');

if (contactForm && successMessage) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const urlEncodedData = new URLSearchParams(formData).toString();
        
        fetch(contactForm.getAttribute('action') || '/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: urlEncodedData
        })
        .then(response => {
            if (response.ok) {
                // Trigger the Resend email via our secure Netlify function
                fetch('/.netlify/functions/send-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: formData.get('name'),
                        email: formData.get('email'),
                        message: formData.get('message'),
                        lang: localStorage.getItem('language') || 'en'
                    })
                }).catch(err => console.error('Failed to trigger email function:', err));

                successMessage.style.display = 'block';
                contactForm.reset();
                
                // Auto-hide the success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            console.error('Form submission error:', error);
            alert('There was a problem sending your message. Please try again later.');
        });
    });
}
