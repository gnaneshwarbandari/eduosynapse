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

        nextBtn?.addEventListener('click', () => {
            slider.scrollBy({ left: slider.clientWidth, behavior: 'smooth' });
        });

        prevBtn?.addEventListener('click', () => {
            slider.scrollBy({ left: -slider.clientWidth, behavior: 'smooth' });
        });

        slider.addEventListener('scroll', () => {
            const slideIndex = Math.round(slider.scrollLeft / slider.clientWidth);
            if (slideIndex === 0) {
                dot0.className = 'w-2.5 h-2.5 rounded-full bg-brand-blue transition-all';
                dot1.className = 'w-2.5 h-2.5 rounded-full bg-slate-300 transition-all';
            } else {
                dot0.className = 'w-2.5 h-2.5 rounded-full bg-slate-300 transition-all';
                dot1.className = 'w-2.5 h-2.5 rounded-full bg-brand-blue transition-all';
            }
        });
});