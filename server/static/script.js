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


    var textarea = document.createElement("textarea");
    textarea.rows = 60;
    textarea.cols = 100;
    // fetches data from /config endpoint and sets it to textarea
    fetch('/config')
        .then(response => response.json())
        .then(data => {
            data = {
                "update_aspects": [],
                "update_type": "full",
                "config": data
            }
            textarea.value = JSON.stringify(data, null, 4);
            document.body.appendChild(textarea);
        });

    // creates a button that sends message to websocket with data
    var button = document.createElement("button");
    button.innerHTML = "Send";
    button.onclick = function() {
        var data = textarea.value;
        ws.send(data);
    }
    document.body.appendChild(button);


    // Create and add video element to the body
    var $videoElement = $('<video autoplay playsinline></video>');
    $('body').append($videoElement);

    // Create and add select element for camera selection
    var $videoSelect = $('<select id="videoSource"></select>');
    $('body').append($('<label for="videoSource">Select camera: </label>').append($videoSelect));

    // Access webcam sources and handle media stream
    navigator.mediaDevices.enumerateDevices()
        .then(gotDevices)
        .then(getStream)
        .catch(handleError);

    $videoSelect.on('change', getStream);

    function gotDevices(deviceInfos) {
        $videoSelect.empty(); // Clear any old options
        deviceInfos.forEach(function(deviceInfo) {
            if (deviceInfo.kind === 'videoinput') {
                var $option = $('<option>').val(deviceInfo.deviceId).text(deviceInfo.label || `Camera ${$videoSelect.children().length + 1}`);
                $videoSelect.append($option);
            }
        });
    }

    function getStream() {
        if (window.stream) {
            window.stream.getTracks().forEach(function(track) {
                track.stop();
            });
        }

        var constraints = {
            video: {
                deviceId: { exact: $videoSelect.val() }
            }
        };

        navigator.mediaDevices.getUserMedia(constraints)
            .then(function(stream) {
                window.stream = stream; // make stream available to console
                $videoElement[0].srcObject = stream;
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


