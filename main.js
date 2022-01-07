status0 = "";
objects = [];
item = "";
synth = window.speechSynthesis;

function preload() {

}

function setup() {
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380,380);
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Model Status: Detecting Objects"; 
    item = document.getElementById("objectinput").value;
}

function modelLoaded() {
    console.log("CocoSSD model has been loaded!");
    status0 = true;
}

function draw() {
    image(video,0,0,380,380);
    if(status0 != "") {
        objectDetector.detect(video, gotResults);
        console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF OUTSIDE FOR LOOP");
        document.getElementById("status").innerHTML = "Model Status: Camera Detected";
        document.getElementById("object").innerHTML = "The number of objects detected are: " + objects.length;

        for(i=0;i<=objects.length;i++) {
        console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
        fill("#FF0000");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill()
        stroke()
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
           if(objects[i] == item) {
               video.stop();
               objectDetector.detect(gotResults);
               document.getElementById("status").innerHTML = "Model Status: " + item + " Detected";
               utterThis = new SpeechSynthesisUtterance(item + "found");
               synth.speak(utterThis);
           }
           else {
            document.getElementById("status").innerHTML = "Model Status: " + item + " Not Detected"; 
           }
        }
    }
}

function gotResults(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    results = objects;
}
 