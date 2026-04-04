let img = document.getElementById('profilepic');

img.addEventListener('click', () => {
    img.classList.remove('spin-once');
    void img.offsetWidth; // forces browser to reflow — restarts the animation
    img.classList.add('spin-once');
});

const input = document.getElementById('contact');
const errorMsg = document.getElementById('contact-error');
const nameInput = document.getElementById('name');
const messageInput = document.getElementById('message');
const submitBtn = document.getElementById('submit');
const contactForm = document.getElementById('contactForm');

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
