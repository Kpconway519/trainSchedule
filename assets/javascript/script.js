  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDpo1Ba6gDAxGUWy__ZPS8ia50YU_fXLpg",
    authDomain: "trainschedule-8743f.firebaseapp.com",
    databaseURL: "https://trainschedule-8743f.firebaseio.com",
    projectId: "trainschedule-8743f",
    storageBucket: "trainschedule-8743f.appspot.com",
    messagingSenderId: "4374911877"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();

//need to get the number of the last one added to the database so i can increment the counter. cannot put this in the js or the localStorage because that might mess up the number. must be in the database.
// var trainNum = 0;
var trainNum = 0;

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
  trainNum = snapshot.val().number;
});
  

//make function to add the things in the blanks into firebase
$("#submit-train").on("click", function(event) {
    event.preventDefault();
    // var trainNum = 0;
    trainNum++


    var trainName = $("#train-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    //=======I'm replacing the next two lines. don't forget to delete after i'm done with the calculated time functions††††††††††††††††††††††††††††
    var initTime = $("#initial-time-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    var trainInfo = {
        number: trainNum,
        name: trainName,
        destination: trainDestination,
        start: initTime,
        frequency: trainFrequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    }


database.ref().push(trainInfo)


console.log(trainNum)
})

database.ref().on("child_added", function(snapshot) {

console.log(snapshot.val().name);
console.log(snapshot.val().destination);


//within this function I need to take initTime and trainFrequency from the database.

var startOfTrain = snapshot.val().start;
var frequencyOfTrain = snapshot.val().frequency;
var timeOneYearBack = moment(startOfTrain, "HH:mm").subtract(1, "years");

var currentTime = moment();

//this takes the difference between the times current and initial time and takes the remainder
var diffTime = moment().diff(moment(timeOneYearBack), "minutes");

var trainModulus = diffTime % frequencyOfTrain;

//minutes until the next train
var tillNextTrain = frequencyOfTrain - trainModulus;

//this gives the arrival time for the next train.
//===========need to modify this so it is not in Unix time
var nextTrainUnix = moment().add(tillNextTrain, "minutes");

var nextTrain = nextTrainUnix.format("HH:mm");

//non-calculated values

//calculated values and fuctions.

$("#train-table").append(
  "<tbody>" + 
  "<th scope='row'>" + snapshot.val().number + "</th>" +
  "<td>" + snapshot.val().name + "</td>" +
  "<td>" + snapshot.val().destination + "</td>" +
  "<td>" + snapshot.val().frequency + "</td>" +
  //=====Below is the place for the calculated values=====
  "<td>" + nextTrain + "</td>" +
  "<td>" + tillNextTrain + "</td>" +
  "</tbody>"
);
});


//this part sets the initial value
// var trainFrequency = $("#frequency-input").val().trim();

// var initTime = $("#initial-time-input").val().trim();

// //this part converts time so it doesn't interfere and grabs the current time
// var timeOneYearBack = moment(initTime, "HH:mm").subtract(1, "years");

// var currentTime = moment();

// //this takes the difference between the times current and initial time and takes the remainder
// var diffTime = moment().diff(moment(timeOneYearBack), "minutes");

// var trainModulus = diffTime % trainFrequency;

// //minutes until the next train
// var tillNextTrain = trainFrequency - trainModulus;

// //this gives the arrival time for the next train.
// var nextTrain = moment().add(tillNextTrain, "minutes");




console.log(moment());
//make some math to calculate the next arrival based on initial data

//load in moment.js to do the timing accurately.

























