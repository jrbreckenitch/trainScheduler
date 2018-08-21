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

function clearForm() {
  trainName = $("#trainInput").val("");
  destination = $("#destinationInput").val("");
  firstTime = $("#firstTimeInput").val("");
  frequency = $("#frequencyInput").val("");
}

  $("#addTrain").on("click", function(){
    event.preventDefault();

      trainName = $("#trainInput").val().trim();
      destination = $("#destinationInput").val().trim();
      firstTime = moment($("#firstTimeInput").val().trim(), "HH:mm").format("HH:mm");
      frequency = $("#frequencyInput").val().trim();

      database.ref().push({
          trainLog: trainName,
          destinationLog: destination,
          firstTimeLog: firstTime,
          frequencyLog: frequency
      })
      clearForm();
  })

database.ref().on("child_added",function(snapshot){
    
    var firstTimeConverted = moment(snapshot.val().firstTimeLog, "HH:mm").subtract(1, "years");

    var timeDifference = moment().diff(moment(firstTimeConverted), "minutes");

    var remainder = timeDifference % snapshot.val().frequencyLog;

    var minutesAway = snapshot.val().frequencyLog - remainder;

    var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");

    var newRow = $("<tr>").append(
      $("<td>").text(snapshot.val().trainLog),
      $("<td>").text(snapshot.val().destinationLog),
      $("<td>").text(snapshot.val().frequencyLog),
      $("<td>").text(nextArrival),
      $("<td>").text(minutesAway),
);

    $("#tableID > tbody").prepend(newRow);

    console.log(currentTime);
    console.log(timeDifference);
    console.log(firstTimeConverted);
    console.log(remainder);
    console.log(minutesAway);
    console.log(nextArrival);
})

