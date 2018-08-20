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
var minutesAway = 0;

// var newRow = $("<tr>").append(
//     $("<td>").text(trainName),
//     $("<td>").text(destination),
//     $("<td>").text(firstTime),
//     $("<td>").text(frequency),
//     $("<td>").text(minutesAway),
// );


  $("#addTrain").on("click", function(){
      
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
  })

database.ref().on("child_added",function(snapshot){
        var newRow = $("<tr>").append(
            $("<td>").text(snapshot.val().trainLog),
            $("<td>").text(snapshot.val().destinationLog),
            $("<td>").text(snapshot.val().firstTimeLog),
            $("<td>").text(snapshot.val().frequencyLog),
            // $("<td>").text(minutesAway),
    );
    $("#tableID > tbody").append(newRow);
})

//   database.ref().on("value", function(snapshot){
//       $("#trainResults").append(newRow);
//       $("#trainResults").append(snapshot.val().trainLog);
//       $("#trainResults").append(snapshot.val().destinationLog);
//       $("#trainResults").append(snapshot.val().firstTimeLog);
//       $("#trainResults").append(snapshot.val().frequencyLog);
//   })