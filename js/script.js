// Language Management
const html = document.documentElement;
const body = document.body;
const langSwitch = document.getElementById('langSwitch');
const langToggle = document.getElementById('langToggle');
const savedLanguage = localStorage.getItem('language') || 'en';

// Set initial language
langSwitch.value = savedLanguage;
setLanguage(savedLanguage);

// Language toggle functionality
langToggle.addEventListener('click', () => {
    langSwitch.style.display = langSwitch.style.display === 'none' || langSwitch.style.display === '' ? 'block' : 'none';
});

// Language change event
langSwitch.addEventListener('change', (e) => {
    const selectedLang = e.target.value;
    localStorage.setItem('language', selectedLang);
    setLanguage(selectedLang);
    // Hide the dropdown after selection
    langSwitch.style.display = 'none';
});

function setLanguage(lang) {
    // Update all elements with data-en and data-de attributes
    document.querySelectorAll('[data-en][data-de]').forEach(element => {
        if (lang === 'en') {
            element.textContent = element.getAttribute('data-en');
        } else if (lang === 'de') {
            element.textContent = element.getAttribute('data-de');
        }
    });
    
    // Update language attribute on html
    html.lang = lang;
}

// Hamburger Menu Management
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
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

// Page load animation
// Back to Top Button
const backToTop = document.getElementById("backToTop");

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

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
