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

  

//make function to add the things in the blanks into firebase
$("#submit-train").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#train-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var initTime = $("#initial-time-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    var trainInfo = {
        name: trainName,
        destination: trainDestination,
        start: initTime,
        frequency: trainFrequency
    }


database.ref().push(trainInfo)




})
//sister function to pull from firebase and put it in the table

//make some math to calculate the next arrival based on initial data

//load in moment.js to do the timing accurately.

























