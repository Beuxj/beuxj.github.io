// ================= SMOOTH SCROLL =================
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}

// ================= SCROLL REVEAL =================
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
        if (el.classList.contains("active")) return;

        const top = el.getBoundingClientRect().top;

        if (top < windowHeight - 100) {
            el.classList.add("active");
        }
    });
}

// ================= SKILL BAR ANIMATION =================
const skillBars = document.querySelectorAll(".skill-fill");

function animateSkillCards() {
    skillBars.forEach(bar => {
        const top = bar.getBoundingClientRect().top;

        if (top < window.innerHeight - 50) {
            bar.style.width = bar.dataset.width;
        }
    });
}

// ================= EASTER EGG / LOGO BIO =================
document.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('logo');        // large hero logo
    const popup = document.getElementById('bio-popup');  // popup div
    const closeBtn = document.getElementById('close-popup');
    const bioText = document.getElementById('bio-text');

    const bioMessage = "Hi, I’m Ritvik Paul. Beuxj is my identity as an indie game developer and 3D environment artist, crafting immersive worlds in Blender and UE5.";
    let index = 0;

    // Typing effect
    function typeText() {
        if (index < bioMessage.length) {
            bioText.innerHTML += bioMessage.charAt(index);
            index++;
            setTimeout(typeText, 40); // typing speed
        }
    }

    // Click logo to open bio popup
    logo.addEventListener('click', () => {
        popup.classList.add('show');
        bioText.innerHTML = '';
        index = 0;
        typeText();
    });

    // Close button
    closeBtn.addEventListener('click', () => {
        popup.classList.remove('show');
    });

    // Click outside popup to close
    window.addEventListener('click', (e) => {
        if (e.target === popup) popup.classList.remove('show');
    });
});

// Redirect to a new page
function redirectTo(url) {
    window.location.href = url;
}

// ================= EVENT LISTENERS =================
window.addEventListener("scroll", animateSkillCards);
window.addEventListener("load", animateSkillCards);

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
