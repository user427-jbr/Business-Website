// Disable automatic scroll restoration to prevent page jump on load
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Slow down hero video and create a "ping-pong" (forward-backward) loop
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
    heroVideo.playbackRate = 0.9; // Plays forward at 70% speed
    
    let isReversing = false;
    let lastTime = 0;

    heroVideo.addEventListener('ended', () => {
        isReversing = true;
        lastTime = performance.now();
        requestAnimationFrame(reverseVideo);
    });

    function reverseVideo(now) {
        if (!isReversing) return;

        const delta = (now - lastTime) / 1000; // Time elapsed in seconds
        lastTime = now;

        // Limit max delta to prevent huge jumps if user switches tabs, while still making progress
        const safeDelta = Math.min(delta, 0.1);
        heroVideo.currentTime -= safeDelta * 0.7;

        if (heroVideo.currentTime <= 0.05) {
            isReversing = false;
            heroVideo.currentTime = 0;
            heroVideo.play(); // Play forward again
        } else {
            requestAnimationFrame(reverseVideo);
        }
    }
}

// Theme Management
const body = document.body;

const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

if (initialTheme === 'dark') {
    body.classList.add('dark-mode');
}
updateThemeIcons(initialTheme);

function toggleTheme(e) {
    if (e && e.preventDefault) e.preventDefault();
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
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const sw = langSwitches[index];
        if (sw) sw.style.display = sw.style.display === 'none' ? 'inline-block' : 'none';
    });
});

// Handle language change
langSwitches.forEach(langSwitch => {
    // Prevent the click from bubbling up to parent links or document listeners
    ['click', 'mousedown', 'touchstart'].forEach(eventType => {
        langSwitch.addEventListener(eventType, (e) => e.stopPropagation());
    });

    langSwitch.addEventListener('change', (e) => {
        const selectedLang = e.target.value;
        
        // Remove focus before hiding to prevent browser from snapping scroll to top
        e.target.blur();
        
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
        e.preventDefault();
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
        const targetId = this.getAttribute('href');
        if (targetId === '#') {
            e.preventDefault(); // Prevent default top jump
            return; 
        }
        
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
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

// Back to Top Footer Link
const scrollToTopFooterLinks = document.querySelectorAll('.back-to-top-footer');
scrollToTopFooterLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent standard anchor jump
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

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
    if ((window.innerHeight + Math.ceil(window.scrollY)) >= document.documentElement.scrollHeight - 10) {
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

let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            updateActiveLink();
            scrollTimeout = null;
        }, 50);
    }
}, { passive: true });

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

// Helper function for Confetti animation
function triggerConfetti() {
    // Respect user accessibility preference for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    function fire() {
        confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#01a9a4', '#018b87', '#f4f4f4', '#333333'],
            disableForReducedMotion: true
        });
    }

    if (window.confetti) {
        fire();
        return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js';
    script.onload = fire;
    document.body.appendChild(script);
}

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
        .then(async response => {
            if (response.ok) {
                const lang = localStorage.getItem('language') || 'en';
                const sendConfirmation = document.getElementById('send-confirmation');
                const successHeading = successMessage.querySelector('h3');
                
                let enText = 'Message sent successfully!';
                let deText = 'Nachricht erfolgreich gesendet!';

                // Send confirmation email only if the user checked the option
                if (sendConfirmation && sendConfirmation.checked) {
                    try {
                        const emailResponse = await fetch('/.netlify/functions/send-email', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                name: formData.get('name'),
                                email: formData.get('email'),
                                message: formData.get('message'),
                                lang: lang
                            })
                        });

                        if (emailResponse.ok) {
                            enText = 'Message sent successfully! A confirmation email has been sent to your inbox.';
                            deText = 'Nachricht erfolgreich gesendet! Eine Bestätigungs-E-Mail wurde an Ihren Posteingang gesendet.';
                        } else {
                            console.error('Email function returned an error status:', emailResponse.status);
                            enText = 'Message sent successfully, but we could not send the confirmation email.';
                            deText = 'Nachricht erfolgreich gesendet, aber die Bestätigungs-E-Mail konnte nicht gesendet werden.';
                        }
                    } catch (err) {
                        console.error('Failed to trigger email function:', err);
                        enText = 'Message sent successfully, but we could not send the confirmation email.';
                        deText = 'Nachricht erfolgreich gesendet, aber die Bestätigungs-E-Mail konnte nicht gesendet werden.';
                    }
                }

                successHeading.setAttribute('data-en', enText);
                successHeading.setAttribute('data-de', deText);
                successHeading.textContent = lang === 'en' ? enText : deText;

                // Trigger confetti animation!
                triggerConfetti();

                // Show success message with animation
                successMessage.style.display = 'flex'; // Make it visible for animation
                // Use a small timeout to ensure the display change is rendered before applying the transition
                setTimeout(() => {
                    successMessage.classList.add('is-visible');
                }, 10); // A very small delay

                contactForm.style.display = 'none'; // Hide the form
                contactForm.reset();
                
                // Auto-hide the success message and show the form again after 7 seconds
                setTimeout(() => {
                    successMessage.classList.remove('is-visible'); // Start fade-out animation
                    // After the fade-out transition completes (0.5s), hide the element completely
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                        contactForm.style.display = 'block'; // Show the form again
                    }, 500); // Match this with the CSS transition duration
                }, 7000); // 7 seconds before starting to hide
            } else {
                throw new Error(`Form submission failed with status: ${response.status}`);
            }
        })
        .catch(error => {
            console.error('Form submission error:', error);
            alert('There was a problem sending your message. Please try again later.');
        });
    });
}
