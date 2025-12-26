// Initialize data storage
let photos = [];
let videos = [];

// DOM Elements
const customizeToggle = document.getElementById('customizeToggle');
const customizePanel = document.getElementById('customizePanel');
const nameInput = document.getElementById('nameInput');
const messageInput = document.getElementById('messageInput');
const themeColor = document.getElementById('themeColor');
const saveBtn = document.getElementById('saveCustomization');
const resetBtn = document.getElementById('resetCustomization');
const photoUpload = document.getElementById('photoUpload');
const videoUpload = document.getElementById('videoUpload');
const photoGallery = document.getElementById('photoGallery');
const videoGallery = document.getElementById('videoGallery');
const recipientName = document.getElementById('recipientName');
const birthdayMessage = document.getElementById('birthdayMessage');
const balloonsContainer = document.getElementById('balloons');

// Load saved data from localStorage
window.addEventListener('DOMContentLoaded', () => {
    loadSavedData();
    createBalloons();
    loadPhotos();
    loadVideos();
});

// Toggle customize panel
customizeToggle.addEventListener('click', () => {
    customizePanel.classList.toggle('active');
});

// Save customization
saveBtn.addEventListener('click', () => {
    const name = nameInput.value || 'Dear Friend';
    const message = messageInput.value || birthdayMessage.textContent;
    const color = themeColor.value;

    // Update display
    recipientName.textContent = name;
    birthdayMessage.textContent = message;
    document.documentElement.style.setProperty('--primary-color', color);

    // Save to localStorage
    localStorage.setItem('birthdayName', name);
    localStorage.setItem('birthdayMessage', message);
    localStorage.setItem('themeColor', color);

    // Show success message
    alert('✅ Customization saved successfully!');
    customizePanel.classList.remove('active');
});

// Reset customization
resetBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all customizations?')) {
        localStorage.clear();
        location.reload();
    }
});

// Load saved data
function loadSavedData() {
    const savedName = localStorage.getItem('birthdayName');
    const savedMessage = localStorage.getItem('birthdayMessage');
    const savedColor = localStorage.getItem('themeColor');

    if (savedName) {
        recipientName.textContent = savedName;
        nameInput.value = savedName;
    }

    if (savedMessage) {
        birthdayMessage.textContent = savedMessage;
        messageInput.value = savedMessage;
    }

    if (savedColor) {
        document.documentElement.style.setProperty('--primary-color', savedColor);
        themeColor.value = savedColor;
    }
}

// Photo upload handling
photoUpload.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            
            reader.onload = (event) => {
                const photoData = {
                    id: Date.now() + Math.random(),
                    src: event.target.result
                };
                
                photos.push(photoData);
                savePhotos();
                displayPhotos();
            };
            
            reader.readAsDataURL(file);
        }
    });
    
    e.target.value = ''; // Reset input
});

// Video upload handling
videoUpload.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
        if (file.type.startsWith('video/')) {
            const reader = new FileReader();
            
            reader.onload = (event) => {
                const videoData = {
                    id: Date.now() + Math.random(),
                    src: event.target.result
                };
                
                videos.push(videoData);
                saveVideos();
                displayVideos();
            };
            
            reader.readAsDataURL(file);
        }
    });
    
    e.target.value = ''; // Reset input
});

// Display photos
function displayPhotos() {
    // Check if there are static images already in the gallery
    const staticImages = photoGallery.querySelectorAll('img');
    
    // Only clear if we have photos to display from localStorage
    if (photos.length > 0) {
        photoGallery.innerHTML = '';
        photos.forEach(photo => {
            const photoDiv = document.createElement('div');
            photoDiv.className = 'photo-item';
            photoDiv.innerHTML = `
                <img src="${photo.src}" alt="Birthday memory">
                <button class="delete-btn" onclick="deletePhoto(${photo.id})">×</button>
            `;
            photoGallery.appendChild(photoDiv);
        });
    } else if (staticImages.length === 0) {
        // Only show "no photos" message if there are no static images either
        photoGallery.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: #999;">No photos yet.  Upload some memories!</p>';
    }
}

// Display videos
function displayVideos() {
    videoGallery.innerHTML = '';
    
    if (videos.length === 0) {
        videoGallery.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: #999;">No videos yet. Upload birthday messages!</p>';
        return;
    }
    
    videos.forEach(video => {
        const videoDiv = document.createElement('div');
        videoDiv.className = 'video-item';
        videoDiv.innerHTML = `
            <video src="${video.src}" controls></video>
            <button class="delete-btn" onclick="deleteVideo(${video.id})">×</button>
        `;
        videoGallery.appendChild(videoDiv);
    });
}

// Delete photo
function deletePhoto(id) {
    if (confirm('Delete this photo?')) {
        photos = photos.filter(photo => photo.id !== id);
        savePhotos();
        displayPhotos();
    }
}

// Delete video
function deleteVideo(id) {
    if (confirm('Delete this video?')) {
        videos = videos.filter(video => video.id !== id);
        saveVideos();
        displayVideos();
    }
}

// Save photos to localStorage
function savePhotos() {
    localStorage.setItem('birthdayPhotos', JSON.stringify(photos));
}

// Save videos to localStorage
function saveVideos() {
    localStorage.setItem('birthdayVideos', JSON.stringify(videos));
}

// Load photos from localStorage
function loadPhotos() {
    const savedPhotos = localStorage.getItem('birthdayPhotos');
    if (savedPhotos) {
        photos = JSON.parse(savedPhotos);
        displayPhotos();
    } else {
        displayPhotos();
    }
}

// Load videos from localStorage
function loadVideos() {
    const savedVideos = localStorage.getItem('birthdayVideos');
    if (savedVideos) {
        videos = JSON.parse(savedVideos);
        displayVideos();
    } else {
        displayVideos();
    }
}

// Create floating balloons
function createBalloons() {
    const colors = ['#ff6b9d', '#ffd93d', '#6bcf7f', '#4d96ff', '#9d4edd'];
    
    for (let i = 0; i < 15; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = Math.random() * 100 + '%';
        balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.animationDelay = Math.random() * 5 + 's';
        balloon.style.animationDuration = (Math.random() * 5 + 8) + 's';
        balloonsContainer.appendChild(balloon);
    }
}