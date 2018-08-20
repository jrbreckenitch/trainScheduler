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

var database = firebase.database();

var trainName = "";
var destination = "";
var firstTime = "";
var frequency = 0;
var minutesAway = 0;

var currentTime = moment();
var format = "hh:mm";

// First Time (pushed back 1 year to make sure it comes before current time)
// var firstTimeConverted = moment(firstTime, "HH:mm");
var firstTimeConverted = moment(firstTime, format);
console.log(firstTimeConverted.format("hh:mm"));
console.log(currentTime.format("hh:mm"));

  $("#addTrain").on("click", function(){
    event.preventDefault();

      trainName = $("#trainInput").val().trim();
      destination = $("#destinationInput").val().trim();
      firstTime = $("#firstTimeInput").val().trim();
      frequency = $("#frequencyInput").val().trim();

      console.log($("#trainInput").val().trim());

      database.ref().push({
          trainLog: trainName,
          destinationLog: destination,
          firstTimeLog: firstTime,
          frequencyLog: frequency
      })
      console.log(firstTimeConverted.format("hh:mm"));

  })

database.ref().on("child_added",function(snapshot){
        var newRow = $("<tr>").append(
            $("<td>").text(snapshot.val().trainLog),
            $("<td>").text(snapshot.val().destinationLog),
            $("<td>").text(snapshot.val().firstTimeLog),
            $("<td>").text(snapshot.val().frequencyLog),
            // $("<td>").text(minutesAway),
    );
    $("#tableID > tbody").prepend(newRow);

    // add moment js code here
})
