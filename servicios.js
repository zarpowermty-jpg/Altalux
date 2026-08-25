document.addEventListener('DOMContentLoaded', function () {

    // Guarda el estado de inicialización de los carruseles
    const carruselesInicializados = {
        catalogo: false,
        personalizado: false
    };

    // ===== TABS DE SERVICIOS =====
    function switchTab(tab) {
        document.querySelectorAll('.tab_card').forEach(t => t.classList.remove('activo'));
        document.querySelectorAll('.panel').forEach(p => p.classList.add('oculto'));

        document.getElementById('tab_' + tab).classList.add('activo');
        document.getElementById('panel_' + tab).classList.remove('oculto');

        // Inicializa el carrusel de la pestaña activa solo cuando se muestra por primera vez
        if (tab === 'catalogo' && !carruselesInicializados.catalogo) {
            iniciarCarrusel('miniTrackCatalogo', '.mini_prev', '.mini_next');
            carruselesInicializados.catalogo = true;
        } else if (tab === 'personalizado' && !carruselesInicializados.personalizado) {
            iniciarCarrusel('miniTrackPersonalizado', '.mini_prev2', '.mini_next2');
            carruselesInicializados.personalizado = true;
        }
    }
    window.switchTab = switchTab;

    // Carga inicial para la pestaña por defecto (Catálogo)
    if (document.getElementById('panel_catalogo') && !document.getElementById('panel_catalogo').classList.contains('oculto')) {
        iniciarCarrusel('miniTrackCatalogo', '.mini_prev', '.mini_next');
        carruselesInicializados.catalogo = true;
    }

    function iniciarCarrusel(trackId, prevBtnSel, nextBtnSel) {
        const track = document.getElementById(trackId);
        if (!track) return;

        const slides = Array.from(track.querySelectorAll('.slide'));
        const prevBtn = document.querySelector(prevBtnSel);
        const nextBtn = document.querySelector(nextBtnSel);
        let indice = 0;

        function renderizar() {
            const total = slides.length;
            if (total === 0) return;

            slides.forEach(s => {
                s.classList.remove('activo', 'lateral');
                s.style.display = 'none';
            });

            const prevIdx = (indice - 1 + total) % total;
            const currIdx = indice;
            const nextIdx = (indice + 1) % total;

            slides[prevIdx].style.order = 1;
            slides[currIdx].style.order = 2;
            slides[nextIdx].style.order = 3;

            slides[prevIdx].style.display = 'block';
            slides[currIdx].style.display = 'block';
            slides[nextIdx].style.display = 'block';

            requestAnimationFrame(() => {
                slides[prevIdx].classList.add('lateral');
                slides[currIdx].classList.add('activo');
                slides[nextIdx].classList.add('lateral');
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                indice = (indice - 1 + slides.length) % slides.length;
                renderizar();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                indice = (indice + 1) % slides.length;
                renderizar();
            });
        }

        // Swipe táctil
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

        renderizar();
    }
});