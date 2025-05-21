const button = document.querySelector('.box1');
const image = document.querySelector('#profile-image');

// Hover effect for profile image
button.addEventListener('mouseover', () => {
    image.classList.add('fade');
    setTimeout(() => {
        image.src = 'after.png';
        image.classList.remove('fade');
    }, 250);
});

button.addEventListener('mouseout', () => {
    image.classList.add('fade');
    setTimeout(() => {
        image.src = 'before.png';
        image.classList.remove('fade');
    }, 250);
});

// Carousel functionality
const carouselInner = document.querySelector('.carousel-inner');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.carousel-control.prev');
const nextBtn = document.querySelector('.carousel-control.next');
let currentIndex = 0;
let isTransitioning = false;

function showSlide(index) {
    if (isTransitioning) return;

    isTransitioning = true;
    // Pastikan index selalu valid
    if (index >= carouselItems.length) index = 0;
    if (index < 0) index = carouselItems.length - 1;

    // Hapus kelas active dari semua item
    carouselItems.forEach(item => item.classList.remove('active'));
    // Tambahkan kelas active ke item yang sesuai
    carouselItems[index].classList.add('active');

    // Jika reset (dari ujung ke ujung), percepat transisi
    if (index === 0 && currentIndex === carouselItems.length - 1) {
        carouselInner.style.transition = 'none';
        carouselInner.offsetHeight; // Trigger reflow
        carouselInner.style.transform = `translateX(-${index * 100}%)`;
        carouselInner.style.transition = 'transform 0.5s ease';
    } else if (index === carouselItems.length - 1 && currentIndex === 0) {
        carouselInner.style.transition = 'none';
        carouselInner.offsetHeight; // Trigger reflow
        carouselInner.style.transform = `translateX(-${index * 100}%)`;
        carouselInner.style.transition = 'transform 0.5s ease';
    } else {
        carouselInner.style.transform = `translateX(-${index * 100}%)`;
    }

    currentIndex = index;
    setTimeout(() => { isTransitioning = false; }, 500); // Sinkronkan dengan durasi transisi
}

prevBtn.addEventListener('click', () => {
    showSlide(currentIndex - 1);
});

nextBtn.addEventListener('click', () => {
    showSlide(currentIndex + 1);
});

// Initialize carousel
showSlide(currentIndex);

// Smooth scroll for navbar links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
