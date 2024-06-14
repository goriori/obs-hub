$(document).ready(function() {

    var ws;
    
    function setupWebSocket() {
        ws = new WebSocket('ws://' + window.location.host + '/config');
    
        ws.onopen = function() {
            console.log("WebSocket connection established.");
        };
    
        ws.onmessage = function(event) {
            print(event.data);
        };
    
        ws.onclose = function() {
            console.log("WebSocket connection closed");
            setTimeout(setupWebSocket, 1000);
        };
    
        ws.onerror = function(err) {
            console.error("WebSocket error observed:", err);
            if (ws.readyState !== WebSocket.CLOSED) {
                ws.close();
            }
        };
    }

    setupWebSocket();    


    const textarea = document.getElementById('configData');
    const sendButton = document.getElementById('sendButton');
    const videoElement = document.querySelector('video');
    const uploadForm = document.getElementById('uploadForm');


    uploadForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(uploadForm);
        fetch('/script', {
            method: 'POST',
            body: formData
        }).then(response => response.json())
          .then(result => {
              console.log('Success:', result);
          }).catch(error => {
              console.error('Error:', error);
          });
    });

    fetch('/config')
        .then(response => response.json())
        .then(data => {
            const configData = {
                "update_aspects": [],
                "update_type": "full",
                "config": data
            };
            textarea.value = JSON.stringify(configData, null, 4);
        });

    sendButton.addEventListener('click', function() {
        const data = textarea.value;
        ws.send(data); // Ensure 'ws' is defined or initialized appropriately elsewhere in your script.
    });

    navigator.mediaDevices.enumerateDevices()
        .then(gotDevices)
        .catch(handleError);

    function gotDevices(deviceInfos) {
        const streamerDeviceInfo = deviceInfos.find(deviceInfo => deviceInfo.kind === 'videoinput' && deviceInfo.label === "Streamer");
        if (streamerDeviceInfo) {
            getStream(streamerDeviceInfo.deviceId);
        } else {
            console.error('Streamer camera not found.');
        }
    }

    function getStream(deviceId) {
        const constraints = {
            video: {
                deviceId: { exact: deviceId }
            }
        };

        navigator.mediaDevices.getUserMedia(constraints)
            .then(stream => {
                window.stream = stream; // make stream available to console
                videoElement.srcObject = stream;
            })
            .catch(handleError);
    }

    function handleError(error) {
        console.error('Error: ', error);
    }
    
})


var data = {
    "update_aspects": [],
    "update_type": "full",
    "config": {
        "virtual_camera": {
            "external_scripts": [],
            "width": 1920,
            "height": 1080,
            "fps": 30,
            "backend": "unitycapture",
            "device": "Unity Video Capture"
        },
        "video_sources": {
            "webcam": {
                "show": true,
                "external_scripts": [
                    {
                        "name": "Mask",
                        "path": "external_scripts/mask.py",
                        "enabled": false,
                        "args": {}
                    }
                ],
                "device_index": 0,
                "resolution": {
                    "width": 1280,
                    "height": 720
                },
                "position": {
                    "x": 0,
                    "y": 0,
                    "width": 640,
                    "height": 360
                },
                "z-index": 1,
                "dshow_settings": true
            },
            "screen": {
                "show": true,
                "external_scripts": {},
                "monitor_index": 1,
                "region": {
                    "x": 0,
                    "y": 0,
                    "width": 1920,
                    "height": 1080
                },
                "position": {
                    "x": 0,
                    "y": 0,
                    "width": 1920,
                    "height": 1080
                },
                "z-index": 0
            }
        }
    }
}


