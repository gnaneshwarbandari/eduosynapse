const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzVMemU0BAwcNV3RMjdP-ZKIGatxf6o-P0HxFPl_DgLyRqhHAKz30oleO7MxxJ6Y1IN3Q/exec';
const RECAPTCHA_SITE_KEY = '6Ld06fwtAAAAAJJDHGiHchpYG-lL-2EME-gZYIwO';

const form = document.getElementById('contactForm');
const statusText = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.querySelector('span').innerText = 'Verifying...';

    grecaptcha.ready(function() {
        grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'submit_proposal' }).then(async function(token) {
            
            const payload = {
                name: document.getElementById('name').value,
                school_name: document.getElementById('school_name').value,
                designation: document.getElementById('designation').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                b_website: document.getElementById('b_website').value, // Honeypot trap
                recaptcha_token: token
            };

            try {
                await fetch(SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                statusText.innerText = "Thank you! Your request has been submitted.";
                statusText.className = "text-xs text-center mt-2 text-emerald-600 font-semibold";
                statusText.classList.remove('hidden');
                form.reset();
            } catch (error) {
                statusText.innerText = "Submission failed. Please try again.";
                statusText.className = "text-xs text-center mt-2 text-rose-600 font-semibold";
                statusText.classList.remove('hidden');
            } finally {
                submitBtn.disabled = false;
                submitBtn.querySelector('span').innerText = 'Submit Request';
            }
        });
    });
});
