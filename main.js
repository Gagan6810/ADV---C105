Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:100
});

Webcam.attach("#camera");

function take_snapshot(){

    Webcam.snap(function(data_uri){
        document.getElementById('captured_image').innerHTML = "<img id='snapshot' src='" + data_uri + "'/>";
    });
}

console.log('ml5 version is' + ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/nTEDSnrn2/model.json", modelLoaded);

function modelLoaded(){
    console.log('Model is Loaded');
}

function identify_snapshot(){
    img = document.getElementById('snapshot');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById('object_name').innerHTML = "Object : " + results[0].label;
        document.getElementById('object_accuracy').innerHTML = "Accuracy : " + (results[0].confidence*100).toFixed(2) + " %";
    }
}