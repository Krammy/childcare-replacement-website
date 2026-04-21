let img = document.getElementById('profilepic');

let isSpinning = false;
img.addEventListener('click', () => {
    // reset URL
    const new_url = window.location.protocol + "//" + window.location.host;
    window.history.replaceState({}, "home", new_url);

    if (isSpinning) {
        return;
    }
    img.classList.remove('spin-once');
    void img.offsetWidth; // forces browser to reflow — restarts the animation
    img.classList.add('spin-once');
    isSpinning = true;
    // turns off spin in 4 seconds, matching CSS
    setTimeout(() => {
        isSpinning = false;
    }, 4000);
});

const input = document.getElementById('contact');
const errorMsg = document.getElementById('contact-error');
const nameInput = document.getElementById('name');
const messageInput = document.getElementById('message');
const submitBtn = document.getElementById('submit');
const contactForm = document.getElementById('contactForm');

let isSubmitting = false;

contactForm.addEventListener('submit', function() {
    isSubmitting = true;
});

function validateForm() {
    const nameValid = nameInput.value.trim() !== '';
    const messageValid = messageInput.value.trim() !== '';
    const contactValid = validateContactField(input.value);
    return nameValid && messageValid && contactValid;
}

function updateSubmitButton() {
    submitBtn.disabled = !validateForm();
}

input.addEventListener('blur', function(e) {
    const contactValid = validateContactField(input.value);
    
    if (!contactValid) {
        errorMsg.style = "display: block;"
    } else {
        errorMsg.style = "display: none;"
    }
});

input.addEventListener('input', updateSubmitButton);
nameInput.addEventListener('input', updateSubmitButton);
messageInput.addEventListener('input', updateSubmitButton);

// Initial check
updateSubmitButton();

function validateContactField(value) {
    const cleaned = value.trim();

    // strip all spaces for digit counting
    const digits = cleaned.replace(/\s/g, '');

    let prefixes = ["+44", "0"];
    for (const prefix of prefixes) {
        if (digits.startsWith(prefix)) {
            const restOfIt = digits.slice(prefix.length);
            if (/^\d{10}$/.test(restOfIt)) {
                return true;
            }
        }
    }

    const email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (email.test(cleaned)) return true;

    return false;
}

const buttons = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');
let current = null;

function showPage(targetId) {
    // change URL
    let new_url = window.location.protocol + "//" + window.location.host + "/" + targetId;
    window.history.replaceState( {} , targetId, new_url);

    const next = document.getElementById(targetId);
    if (next === current) return;

    const fadeIn = () => {
        if (current) {
            current.classList.remove('visible', 'active');
        }
        current = next;
        next.classList.add('visible');
        // Small delay so display:block has taken effect before opacity transitions
        requestAnimationFrame(() => requestAnimationFrame(() => next.classList.add('active')));
    };

    if (current) {
        current.classList.remove('active');
        current.addEventListener('transitionend', fadeIn, { once: true });
    } else {
        fadeIn();
    }
}

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('nav-btn-selected'));
        btn.classList.add('nav-btn-selected');
        showPage(btn.dataset.target);
    });
});

function formHasInput() {
    return nameInput.value.trim() !== '' || input.value.trim() !== '' || messageInput.value.trim() !== '';
}

window.addEventListener('beforeunload', function(e) {
    if (formHasInput() && !isSubmitting) {
        e.preventDefault();
    }
});

const params = new URLSearchParams(window.location.search);
const page = params.get('page');

// get page end bit after slash
let end_bit = window.location.pathname;
if (end_bit == "/" && page != null) {
    end_bit = "/" + page;
}

if (end_bit != "/") {
    const el = document.querySelector(`[data-target="${end_bit.substring(1)}"]`);
    if (el != null) {
        el.click();
    } else {
        document.querySelector('[data-target="pricing"]').click();
    }
} else {
    document.querySelector('[data-target="pricing"]').click();
}
