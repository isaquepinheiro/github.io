/**
 * Promo Countdown & Price Update
 * Deadline: March 31, 2026, 23:59:00
 */

function updateCountdown() {
    // Target date in local time
    const deadline = new Date("2026-03-22T23:59:00").getTime();

    // Timer interval
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = deadline - now;

        if (distance < 0) {
            clearInterval(timer);
            expirePromo();
            return;
        }

        // Calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update DOM
        updateDisplay("days", days);
        updateDisplay("hours", hours);
        updateDisplay("minutes", minutes);
        updateDisplay("seconds", seconds);
    }, 1000);
}

function updateDisplay(id, value) {
    const el = document.getElementById(id);
    if (el) {
        el.innerText = value.toString().padStart(2, '0');
    }
}

function expirePromo() {
    const priceEl = document.getElementById("promo-price");
    const containerEl = document.getElementById("countdown-container");
    const badgeEl = document.querySelector(".card.promotional .badge-temp");
    const cardEl = document.querySelector(".card.promotional");

    if (priceEl) {
        priceEl.innerHTML = 'R$ 990,00 <span>/ ano</span>';
    }

    if (containerEl) {
        containerEl.style.display = "none";
    }

    if (badgeEl) {
        badgeEl.innerText = "oferta encerrada";
        badgeEl.style.background = "#64748b"; // muted
    }

    if (cardEl) {
        cardEl.style.borderStyle = "solid";
        cardEl.style.backgroundColor = "white";
    }
}

document.addEventListener("DOMContentLoaded", updateCountdown);
