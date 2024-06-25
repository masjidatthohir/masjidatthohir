// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6qerNsyshgEjQlpTn5QOW_tCfpah7fIo",
  authDomain: "itikaf-63482.firebaseapp.com",
  databaseURL: "https://itikaf-63482-default-rtdb.firebaseio.com",
  projectId: "itikaf-63482",
  storageBucket: "itikaf-63482.appspot.com",
  messagingSenderId: "452451341170",
  appId: "1:452451341170:web:885f58e689b16bf03b43eb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to your database
const dbRef = firebase.database().ref('img_slide');

// Function to load images from Firebase
function loadImages() {
  dbRef.on('value', (snapshot) => {
    const data = snapshot.val();
    const carouselInner = document.getElementById('carouselInner');
    carouselInner.innerHTML = ''; // Clear existing images

    let isActive = true;
    for (let key in data) {
      let imgUrl = data[key].url;
      let div = document.createElement('div');
      div.className = `carousel-item${isActive ? ' active' : ''}`;
      isActive = false;

      let imgElement = document.createElement('img');
      imgElement.src = imgUrl;
      imgElement.alt = 'Slide';

      div.appendChild(imgElement);
      carouselInner.appendChild(div);
    }
  });
}

let currentSlide = 0;
let slideInterval;

// Function to show the next slide
function nextSlide() {
  const carouselInner = document.getElementById('carouselInner');
  const totalSlides = carouselInner.children.length;
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlide();
}

// Function to show the previous slide
function prevSlide() {
  const carouselInner = document.getElementById('carouselInner');
  const totalSlides = carouselInner.children.length;
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlide();
}

// Function to update the slide position
function updateSlide() {
  const carouselInner = document.getElementById('carouselInner');
  const slideWidth = carouselInner.clientWidth;
  carouselInner.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

// Function to start automatic sliding
function startAutoSlide() {
  slideInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
}

// Function to stop automatic sliding
function stopAutoSlide() {
  clearInterval(slideInterval);
}

// Load images from Firebase when the page loads
window.onload = function() {
  loadImages();
  startAutoSlide();
};

// Stop automatic sliding when the user clicks the controls
document.querySelector('.carousel-control-prev').addEventListener('click', stopAutoSlide);
document.querySelector('.carousel-control-next').addEventListener('click', stopAutoSlide);
