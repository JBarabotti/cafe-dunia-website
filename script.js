function initCarousel(carouselContainer) {
    const track = carouselContainer.querySelector('ul');
    const prevBtn = carouselContainer.querySelector('.prev-btn');
    const nextBtn = carouselContainer.querySelector('.next-btn');

    if (!track || !prevBtn || !nextBtn) return;

    let autoSlideInterval;
    let isAnimating = false;
    let direction = 0;

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 3000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    function nextSlide() {
        if (isAnimating) return;
        isAnimating = true;
        direction = 1;

        track.style.transition = 'transform 0.7s ease-in-out';
        track.style.transform = 'translateX(-100%)';
    }

    function prevSlide() {
        if (isAnimating) return;
        isAnimating = true;
        direction = -1;

        track.style.transition = 'none';
        track.prepend(track.lastElementChild);
        track.style.transform = 'translateX(-100%)';

        void track.offsetWidth;

        track.style.transition = 'transform 0.7s ease-in-out';
        track.style.transform = 'translateX(0)';
    }

    track.addEventListener('transitionend', (e) => {
        if (e.propertyName !== 'transform' || e.target !== track) return;

        if (direction === 1) {
            track.style.transition = 'none';
            track.appendChild(track.firstElementChild);
            track.style.transform = 'translateX(0)';
            void track.offsetWidth;
        }

        isAnimating = false;
        direction = 0;
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    void track.offsetWidth;

    startAutoSlide();
}

document.querySelectorAll('.big-container > div').forEach(initCarousel);