let img = document.getElementById('profilepic');

img.addEventListener('click', () => {
    img.classList.remove('spin-once');
    void img.offsetWidth; // forces browser to reflow — restarts the animation
    img.classList.add('spin-once');
});
