// Language Management
const html = document.documentElement;

// Get language elements
const langSwitchDesktop = document.getElementById('langSwitch');
const langToggleDesktop = document.getElementById('langToggle');
const langSwitchMobile = document.getElementById('langSwitchMobile');
const langToggleMobile = document.getElementById('langToggleMobile');

const savedLanguage = localStorage.getItem('language') || 'en';

// Initialize language
if (langSwitchDesktop) langSwitchDesktop.value = savedLanguage;
if (langSwitchMobile) langSwitchMobile.value = savedLanguage;
setLanguage(savedLanguage);

// Desktop language toggle
if (langToggleDesktop) {
    langToggleDesktop.addEventListener('click', () => {
        if (langSwitchDesktop) {
            langSwitchDesktop.style.display = langSwitchDesktop.style.display === 'none' ? 'inline-block' : 'none';
        }
    });
}

// Mobile language toggle
if (langToggleMobile) {
    langToggleMobile.addEventListener('click', () => {
        if (langSwitchMobile) {
            langSwitchMobile.style.display = langSwitchMobile.style.display === 'none' ? 'inline-block' : 'none';
        }
    });
}

// Desktop language change
if (langSwitchDesktop) {
    langSwitchDesktop.addEventListener('change', (e) => {
        const selectedLang = e.target.value;
        localStorage.setItem('language', selectedLang);
        setLanguage(selectedLang);
        langSwitchDesktop.style.display = 'none';
        if (langSwitchMobile) langSwitchMobile.value = selectedLang;
    });
}

// Mobile language change
if (langSwitchMobile) {
    langSwitchMobile.addEventListener('change', (e) => {
        const selectedLang = e.target.value;
        localStorage.setItem('language', selectedLang);
        setLanguage(selectedLang);
        langSwitchMobile.style.display = 'none';
        if (langSwitchDesktop) langSwitchDesktop.value = selectedLang;
    });
}

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
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
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
        if (window.pageYOffset > 300) {
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
    let minTop = Infinity;
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < minTop) {
            minTop = rect.top;
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

window.addEventListener('load', function () {
    console.log('Website loaded successfully');
});
