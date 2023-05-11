Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});
camera = document.getElementById("camera");
Webcam.attach('#camera')

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>'; 
    });
}
console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/KeQPaQI1a/model.json',modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!');
}

function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    } else {
console.log(results);
document.getElementById("result_gesture_name").innerHTML = results[0].label;
prediction_1 = results[0].label;
meaning = "";
if(results[0].label == "Thumbs up")
{
    document.getElementById("update_emoji").innerHTML = "&#128077;";
    meaning="all the best";
}
if(results[0].label == "Thumbs down")
{
    document.getElementById("update_emoji").innerHTML = "&#128078;";
    meaning="to show disapproval";
}
if(results[0].label == "Vulcan Salute"){
    document.getElementById("update_emoji").innerHTML = "&#128406;";
    meaning="live long and prosper";
}
if(results[0].label == "Victory"){
document.getElementById("update_emoji").innerHTML = "&#9996;";
meaning="peace or victory";
}
if(results[0].label == "Ok"){
    document.getElementById("update_emoji").innerHTML = "&#128076;";
    meaning="to show approval";
    }
    function speak(){
        var synth = window.speechSynthesis;
        speak_data_1 = "This is a " + prediction_1;
        speak_data_2 = "it means" + meaning;
        var utterThis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
        synth.speak(utterThis);
    }
speak();
    }
}