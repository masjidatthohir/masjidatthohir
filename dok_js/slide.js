document.addEventListener('DOMContentLoaded', function() {
    const swiperWrapper = document.getElementById('carousel-inner');

    function loadGallery() {
        database.ref('img_slide').once('value').then(function(snapshot) {
            const swiperSlides = [];
            snapshot.forEach(function(childSnapshot) {
                const photo = childSnapshot.val();
                const swiperSlide = `
                    <div class="swiper-slide">
                        <img src="${photo.url}" data-img_slide="${childSnapshot.key}" class="d-block w-100">
                    </div>
                `;
                swiperSlides.push(swiperSlide);
            });

            swiperWrapper.innerHTML = swiperSlides.join('');

            // Initialize Swiper after images are loaded
            new Swiper('.swiper-container', {
                loop: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            });
        });
    }

    loadGallery();
});