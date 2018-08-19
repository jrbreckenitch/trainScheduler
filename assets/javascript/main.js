// Initialize Firebase
var config = {
    apiKey: "AIzaSyD3Zvd0xsZ1SrJ_dfUWJkVSuid--ZM9wRE",
    authDomain: "jrb-train-scheduler.firebaseapp.com",
    databaseURL: "https://jrb-train-scheduler.firebaseio.com",
    projectId: "jrb-train-scheduler",
    storageBucket: "jrb-train-scheduler.appspot.com",
    messagingSenderId: "213954928776"
  };

firebase.initializeApp(config);

//   var database = firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var firstTime = 0;
var frequency = 0;

  $("#addTrain").on("click", function(){
      
      trainName = $("#trainInput").val().trim();
      destination = $("#destinationInput").val().trim();
      firstTime = $("#firstTimeInput").val().trim();
      frequency = $("#frequencyInput").val().trim();

      console.log($("#trainInput").val().trim());

      database.ref().set({
          trainLog: trainName,
          destinationLog: destination,
          firstTimeLog: firstTime,
          frequencyLog: frequency
      })
  })