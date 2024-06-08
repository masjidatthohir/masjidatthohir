//KEGIATAN
var firebaseConfig = {
    apiKey: "AIzaSyB6qerNsyshgEjQlpTn5QOW_tCfpah7fIo",
    authDomain: "itikaf-63482.firebaseapp.com",
    databaseURL: "https://itikaf-63482-default-rtdb.firebaseio.com",
    projectId: "itikaf-63482",
    storageBucket: "itikaf-63482.appspot.com",
    messagingSenderId: "452451341170"
  };
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();

  function addKegiatanCard(kegiatanId, kegiatan, imageUrl) {
    var container = document.getElementById('kegiatanContainer');
    var col = document.createElement('div');
    col.className = 'col-lg-3 col-md-4 col-sm-6 col-12 mb-4';

    var card = document.createElement('div');
    card.className = 'card h-100';

    var cardImg = document.createElement('img');
    cardImg.className = 'card-img-top';
    cardImg.src = imageUrl;
    cardImg.alt = 'Kegiatan Image';

    var cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    var title = document.createElement('h5');
    title.className = 'card-title';
    title.innerText = kegiatan.nama;

    var date = document.createElement('p');
    date.className = 'card-text';
    date.innerHTML = '<i class="fa fa-calendar"></i> ' + kegiatan.tanggal + ' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-clock-o"></i> ' + kegiatan.waktu;

    var desc = document.createElement('p');
    desc.className = 'card-text';
    desc.innerText = kegiatan.deskripsi;

    var readMore = document.createElement('a');
    readMore.className = 'read-more';
    readMore.innerText = 'Read More';
    readMore.href = '#';

    cardBody.appendChild(title);
    cardBody.appendChild(date);
    cardBody.appendChild(desc);
    cardBody.appendChild(readMore);

    card.appendChild(cardImg);
    card.appendChild(cardBody);

    col.appendChild(card);
    container.appendChild(col);

    col.addEventListener('click', function() {
      showDetailBottomSheet(kegiatan);
    });
  }

  function showDetailBottomSheet(kegiatan) {
    var bottomSheetContent = document.getElementById('bottomSheetContent');
    bottomSheetContent.innerHTML = '<img src="' + kegiatan.imageUrl + '" class="img-fluid rounded mb-3" alt="Kegiatan Image">' +
      '<p><strong>Nama Kegiatan:</strong> ' + kegiatan.nama + '</p>' +
      '<p><strong>Tanggal Kegiatan:</strong> ' + kegiatan.tanggal + '</p>' +
      '<p><strong>Waktu Kegiatan:</strong> ' + kegiatan.waktu + '</p>' +
      '<p><strong>Tempat Kegiatan:</strong> ' + kegiatan.tempat + '</p>' +
      '<p><strong>Deskripsi:</strong> ' + kegiatan.deskripsi + '</p>';

    document.getElementById('bottomSheet').classList.add('open');
  }

  document.getElementById('closeSheet').addEventListener('click', function() {
    document.getElementById('bottomSheet').classList.remove('open');
  });

  function readKegiatan() {
    database.ref('kegiatan').on('child_added', function(snapshot) {
      var kegiatan = snapshot.val();
      var kegiatanId = snapshot.key;
      firebase.storage().ref("kegiatan").child(kegiatanId + "/image.png").getDownloadURL().then(function(imageUrl) {
        kegiatan.imageUrl = imageUrl;
        addKegiatanCard(kegiatanId, kegiatan, imageUrl);
      }).catch(function(error) {
        console.log("Error getting image URL:", error);
      });
    });
  }

  readKegiatan();

(function ($) {
    "use strict";

       
    
    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });


    // Hero Header carousel
    $(".header-carousel").owlCarousel({
        animateOut: 'slideOutLeft',
        items: 1,
        autoplay: true,
        smartSpeed: 1000,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
    });


    // International carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        items: 1,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ]
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: true,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:1
            },
            992:{
                items:1
            },
            1200:{
                items:1
            }
        }
    });

    
    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


})(jQuery);

