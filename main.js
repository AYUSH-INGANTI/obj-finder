stats = "";
obj = [];

function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

}

function draw() {
    image(video, 299, 299);

    if (stats != null) {
        let r = random(255);
        let g = random(255);
        let b = random(255);

        for (var i = 0; i < obj.length; i++) {
            percent = floor(object[i].confidence * 100);
            label = obj[i].label;
            let x = obj[i].x;
            let y = obj[i].y;

            fill(r, g, b);
            text(object[i].label + " " + percent + "%", x, y);
            noFill();
            stroke(r, g, b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);

            obj_name = document.getElementById("input").value;

            if (obj[i].label == obj_name) {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_status").innerHTML = object_name + " Found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name + "Found");
                synth.speak(utterThis);
            } else {
                document.getElementById("object_status").innerHTML = object_name + " Not Found";
            }
        }
    }

}

function start() {
    document.getElementById("status") = "Detecting objects";
}

function modelLoaded() {
    console.log("Model Loaded");
    stats = true;
}

function gotResults(error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
        obj = result;
    }
}