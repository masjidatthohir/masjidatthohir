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
  
  var maxKegiatan = 4;
  var kegiatanCount = 0;
  
  function addKegiatanCard(kegiatanId, kegiatan, imageUrl) {
    if (kegiatanCount >= maxKegiatan) {
      return;
    }
  
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
    date.innerHTML = '<i class="fa fa-calendar"></i> ' + kegiatan.tanggal + '&nbsp;&nbsp; <i class="fa fa-clock">&nbsp;</i>' + kegiatan.waktu;
  
    var desc = document.createElement('p');
    desc.className = 'card-text';
    desc.innerText = kegiatan.deskripsi;
  
    var readMore = document.createElement('a');
    readMore.className = 'read-more';
    readMore.innerText = 'Lihat Kegiatan';
    readMore.href = '#';
    readMore.addEventListener('click', function(event) {
      event.preventDefault();
      showDetailBottomSheet(kegiatan);
    });
  
    cardBody.appendChild(title);
    cardBody.appendChild(date);
    cardBody.appendChild(desc);
    cardBody.appendChild(readMore);
  
    card.appendChild(cardImg);
    card.appendChild(cardBody);
  
    col.appendChild(card);
    container.appendChild(col);
  
    kegiatanCount++;
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
      if (kegiatanCount >= maxKegiatan) {
        return;
      }
  
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
  