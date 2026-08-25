document.addEventListener('DOMContentLoaded', function () {

    const track = document.getElementById('carruselTrack');
    const dotsContainer = document.getElementById('carruselDots');
    const slides = Array.from(track.querySelectorAll('.slide'));
    let indice = 0;

    function renderizar() {
        const total = slides.length;

        // Limpia clases
        slides.forEach(s => {
            s.classList.remove('activo', 'lateral');
            s.style.display = 'none';
        });

        // Índices cíclicos
        const prevIdx = (indice - 1 + total) % total;
        const currIdx = indice;
        const nextIdx = (indice + 1) % total;

        // Asigna el orden visual mediante CSS 'order' (mantiene animaciones fluídas)
        slides[prevIdx].style.order = 1;
        slides[currIdx].style.order = 2;
        slides[nextIdx].style.order = 3;

        // Activa solo las 3 tarjetas visibles
        slides[prevIdx].style.display = 'block';
        slides[currIdx].style.display = 'block';
        slides[nextIdx].style.display = 'block';

        // Fuerza un pequeño delay para que el navegador registre el cambio y anime
        requestAnimationFrame(() => {
            slides[prevIdx].classList.add('lateral');
            slides[currIdx].classList.add('activo');
            slides[nextIdx].classList.add('lateral');
        });

        // Actualiza dots
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === indice);
        });
    }

    function crearDots() {
        dotsContainer.innerHTML = '';
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.setAttribute('aria-label', `Ir a slide ${i + 1}`);
            dot.addEventListener('click', () => { indice = i; renderizar(); });
            dotsContainer.appendChild(dot);
        });
    }

    document.querySelector('.carrusel_prev').addEventListener('click', () => {
        indice = (indice - 1 + slides.length) % slides.length;
        renderizar();
    });

    document.querySelector('.carrusel_next').addEventListener('click', () => {
        indice = (indice + 1) % slides.length;
        renderizar();
    });

    // Swipe en móviles
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
    track.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            indice = diff > 0
                ? (indice + 1) % slides.length
                : (indice - 1 + slides.length) % slides.length;
            renderizar();
        }
    });

    crearDots();
    renderizar();
});


// ===== FAQ ACORDEÓN =====
document.querySelectorAll('.faq_pregunta').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const estaActivo = item.classList.contains('activo');

        // Cierra todos
        document.querySelectorAll('.faq_item').forEach(i => {
            i.classList.remove('activo');
            i.querySelector('.faq_icono').textContent = '+';
        });

        // Abre el clickeado si estaba cerrado
        if (!estaActivo) {
            item.classList.add('activo');
            btn.querySelector('.faq_icono').textContent = '−';
        }
    });
});