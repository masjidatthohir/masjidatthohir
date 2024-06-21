document.addEventListener('DOMContentLoaded', function() {
    const galleryDiv = document.getElementById('gallery');
    const fileButton = document.getElementById('fileButton');
    const uploadButton = document.getElementById('uploadButton');
    const uploadStatus = document.getElementById('uploadStatus');

    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');
    const closeModal = document.getElementsByClassName('close')[0];

    if (uploadButton) {
        uploadButton.addEventListener('click', function() {
            const files = fileButton.files;
            if (files.length > 0) {
                const promises = [];
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const storageRef = storage.ref('akad/' + file.name);
                    const uploadTask = storageRef.put(file);

                    const promise = new Promise((resolve, reject) => {
                        uploadTask.on('state_changed',
                            function(snapshot) {
                                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                uploadStatus.textContent = `Uploading ${file.name}: ${progress}% done`;
                            },
                            function(error) {
                                reject(error);
                            },
                            function() {
                                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                                    const photoData = {
                                        url: downloadURL,
                                        name: file.name
                                    };
                                    database.ref('akad').push(photoData).then(resolve).catch(reject);
                                });
                            }
                        );
                    });
                    promises.push(promise);
                }

                Promise.all(promises)
                    .then(() => {
                        uploadStatus.textContent = 'All uploads successful!';
                        fileButton.value = '';
                    })
                    .catch((error) => {
                        uploadStatus.textContent = 'Error: ' + error.message;
                    });
            } else {
                uploadStatus.textContent = 'No files selected!';
            }
        });
    }

    if (galleryDiv) {
        loadGallery();
    }

    function loadGallery() {
        database.ref('akad').once('value').then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                const photo = childSnapshot.val();
                const img = document.createElement('img');
                img.src = photo.url;
                img.dataset.key = childSnapshot.key; // Menyimpan key di data attribute
                img.addEventListener('click', function() {
                    openPhotoDetails(photo);
                });
                galleryDiv.appendChild(img);
            });
        });
    }

    function openPhotoDetails(photo) {
        modal.style.display = "block";
        modalImg.src = photo.url;
        
    }

    // Tutup modal
    closeModal.onclick = function() {
        modal.style.display = "none";
    }

    // Tutup modal jika pengguna mengklik di luar modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});
