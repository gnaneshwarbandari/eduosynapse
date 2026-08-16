// Initialization and UI Logic
document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Handle Contact Form Submission Simulation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real scenario, this connects to a backend or webhook
            alert('Thank you! Your inquiry has been submitted successfully. A representative from EDUOSYNAPSE will contact you shortly.');
            contactForm.reset();
        });
    }

    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });

        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('toggle');
            });
        });
    }

    const slider = document.getElementById('testimonialSlider');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    const dot0 = document.getElementById('dot0');
    const dot1 = document.getElementById('dot1');

    if (!slider) return;

    // Helper function to update active dot states
    function updateDots(slideIndex) {
        if (!dot0 || !dot1) return;
        if (slideIndex === 0) {
            dot0.className = 'w-2.5 h-2.5 rounded-full bg-brand-blue transition-all';
            dot1.className = 'w-2.5 h-2.5 rounded-full bg-slate-300 transition-all';
        } else {
            dot0.className = 'w-2.5 h-2.5 rounded-full bg-slate-300 transition-all';
            dot1.className = 'w-2.5 h-2.5 rounded-full bg-brand-blue transition-all';
        }
    }

    // Manual controls with 1-2-3 (looping) sequence support
    nextBtn?.addEventListener('click', () => {
        const slideWidth = slider.clientWidth;
        const maxScrollLeft = slider.scrollWidth - slideWidth;
        if (slider.scrollLeft >= maxScrollLeft - 10) {
            slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            slider.scrollBy({ left: slideWidth, behavior: 'smooth' });
        }
    });

    prevBtn?.addEventListener('click', () => {
        const slideWidth = slider.clientWidth;
        const maxScrollLeft = slider.scrollWidth - slideWidth;
        if (slider.scrollLeft <= 10) {
            slider.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
        } else {
            slider.scrollBy({ left: -slideWidth, behavior: 'smooth' });
        }
    });

    // Scroll listener for dot indicators
    slider.addEventListener('scroll', () => {
        const slideIndex = Math.round(slider.scrollLeft / slider.clientWidth);
        updateDots(slideIndex);
    });

    // Auto-sliding implementation (Delay: 4000ms / 4 seconds, repeating 1-2-3 sequence)
    let autoSlideInterval = setInterval(() => {
        const slideWidth = slider.clientWidth;
        const maxScrollLeft = slider.scrollWidth - slideWidth;

        if (slider.scrollLeft >= maxScrollLeft - 10) {
            slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            slider.scrollBy({ left: slideWidth, behavior: 'smooth' });
        }
    }, 2000);

    // Pause auto-slide on hover, resume on leave
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    slider.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            const slideWidth = slider.clientWidth;
            const maxScrollLeft = slider.scrollWidth - slideWidth;

            if (slider.scrollLeft >= maxScrollLeft - 10) {
                slider.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                slider.scrollBy({ left: slideWidth, behavior: 'smooth' });
            }
        }, 2000);
    });
});