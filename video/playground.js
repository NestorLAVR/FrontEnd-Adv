const startButton = document.getElementById('start');
const recordButton = document.getElementById('record');
const playButton = document.getElementById('play');
const downloadButton = document.getElementById('download');
const snapshotButton = document.getElementById('snapshot');
const shareButton = document.getElementById('share');

const gumVideo = document.querySelector('video#gum');
const recordedVideo = document.querySelector('video#recorded');
const canvas = document.querySelector('canvas');
const filterSelect = document.querySelector('select#filter');
const screenShot = document.getElementById('screenshot');
const close = document.getElementById('close');

let mediaRecorder;
let recordedBlobs;

snapshotButton.addEventListener('click', () => {
    canvas.getContext('2d').drawImage(gumVideo, 0, 0, canvas.width, canvas.height);
    screenShot.style.display = "block";
})

close.addEventListener('click', () => {
    screenShot.style.display = 'none';
})
// Start share
shareButton.addEventListener('click', () => {
    if(shareButton.innerText === 'Start share') {
        shareButton.innerText = 'Stop share';
        init('share');
    } else {
        shareButton.innerText = 'Start share';
        recordButton.disabled = true;
        startButton.disabled = false;
        snapshotButton.disabled = true;
        playButton.disabled = true;
        downloadButton.disabled = true;
        gumVideo.srcObject = null;
        window.stream = null;
        recordedVideo.style.display = 'none';
        recordedVideo.src = null;
        recordedVideo.style.display = 'none';
        gumVideo.style.opacity = '0';
    }
})

// Download recorded video
downloadButton.addEventListener('click', () => {
    let link = document.createElement('a');
    link.download = 'record.mp4';
    const buffer = new Blob(recordedBlobs, {type: 'video/webm'});
    link.href = window.URL.createObjectURL(buffer);
    link.click();
    URL.revokeObjectURL(link.href);
})
// Play recorded stream
playButton.addEventListener('click', () => {
    const buffer = new Blob(recordedBlobs, {type: 'video/webm'});
    recordedVideo.src = window.URL.createObjectURL(buffer);
    recordedVideo.controls = true;
    recordedVideo.play();
    recordedVideo.style.display = 'block';
})
document.addEventListener('keydown', ev => {
    if (ev.key === "Escape") {
        screenShot.style.display = "none";
    }
})
const handleDataAvailable = (event) => {
    if(event.data) {
        recordedBlobs.push(event.data);
    }
}

const startRecording = () => {
    recordedBlobs = [];
    let options = {
        mimeType: 'video/webm; codecs=vp9, opus'
    }

    try {
        mediaRecorder = new MediaRecorder(window.stream, options);
    } catch (error) {
        console.error(error);
    }

    recordButton.textContent = 'Stop Recording';
    playButton.disabled = true;
    downloadButton.disabled = true;
    snapshotButton.disabled = false;

    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start();
}

const stopRecording = () => {
    recordButton.textContent = 'Record';
    playButton.disabled = false;
    downloadButton.disabled = false;
    mediaRecorder.stop();
}

// Record stream
recordButton.addEventListener('click', () => {
    if(recordButton.textContent === 'Record') {
        startRecording();
    } else {
        stopRecording();
    }
})

// Start stream
const handleSuccess = (stream, type) => {
    console.log(type);
    type === 'share'
        ?startButton.disabled = true
        :shareButton.disabled = true;
    recordButton.disabled = false;
    snapshotButton.disabled = false;
    window.stream = stream;
    gumVideo.srcObject = stream;
    gumVideo.style.opacity = '1';
}

const init = (type) => {
    const constraints = {
        video: {
            width: 1280,
            height: 720
        },
        audio: true
    }
    console.log(type)
    if (type == 'camera') {
        navigator.mediaDevices.getUserMedia(constraints)
            .then(stream => handleSuccess(stream, type))
            .catch(error => console.error(error));
    } else {
        navigator.mediaDevices.getDisplayMedia(constraints)
            .then(stream => handleSuccess(stream, type))
            .catch(error => console.error(error));
    }
}

startButton.addEventListener('click', () => {
    if(startButton.innerText === 'Start camera') {
        startButton.innerText = 'Stop camera';
        init('camera');
    } else {
        startButton.innerText = 'Start camera';
        recordButton.disabled = true;
        shareButton.disabled = false;
        snapshotButton.disabled = true;
        playButton.disabled = true;
        downloadButton.disabled = true;
        gumVideo.srcObject = null;
        window.stream = null;
        recordedVideo.style.display = 'none';
        recordedVideo.src = null;
        recordedVideo.style.display = 'none';
        gumVideo.style.opacity = '0';
    }
})