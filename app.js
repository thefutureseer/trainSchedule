// * Make sure that your app suits this basic spec:
//   * When adding trains, administrators should be able to submit the following:
//     * Train Name
//     * Destination 
//     * First Train Time -- in military time
//     * Frequency -- in minutes
//   * Code this app to calculate when the next train will arrive; this should be relative to the current time.
//   * Users from many different machines must be able to view same train times.
//   * Styling and theme are completely up to you. Get Creative!


// Initialize Firebase
var config = {
      apiKey: "AIzaSyCj247956UQ6ZHJm9HhN5jOPrO5R2WPB4M",
    authDomain: "mydemo1-c4ff8.firebaseapp.com",
    databaseURL: "https://mydemo1-c4ff8.firebaseio.com",
    projectId: "mydemo1-c4ff8",
    storageBucket: "mydemo1-c4ff8.appspot.com",
    messagingSenderId: "273016302373"
};

firebase.initializeApp(config);

var database = firebase.database();

//Jquery to grab Document =(_:____) on click and running a function grab user input also preventing default (which refreshes the page every time.)
$(document).on("click", "#add-train-btn", function(e) {
	e.preventDefault();

	console.log("hi");

	// grab user input using Jquery by value and trim =(_:___)
	var addTrain = $("#train-name-input").val().trim();
	var addDestination = $("#destination-input").val().trim();
	var addTime = $("#start-input").val().trim();
	var addFrequency = $("#frequency-input").val().trim();

	// create local "temporary" object =(__:______) for holding employee data
	var newTrain = {
		name: addTrain,
		destination: addDestination,
		time: addTime,
		frequency: addFrequency,
	};
	// .ref= (_:___)
	database.ref().push(newTrain);

	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.time);
	console.log(newTrain.frequency);

	//Alert
	alert("Train successfully added");

	//Clear all values in form
	$("#train-name").val("");
	$("#train-destination").val("");
	$("#train-starttime").val("");
	$("#train-frequency").val("");
});
	
	//**I want to add a function so the same info can not be added twice.****
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
	console.log(childSnapshot.val());

	// store everything into variables
	var trainName = childSnapshot.val().name;
	var trainDestination = childSnapshot.val().destination;
	var trainTime = childSnapshot.val().time;
	var trainFrequency = childSnapshot.val().frequency;

	console.log(trainName);
	console.log(trainDestination);
	console.log(trainTime);
	console.log(trainFrequency);

// Code this app to calculate when the next train will arrive; this should be relative to the current time.
// Users from many different machines must be able to view same train times.
	var firstTrainCoverted = moment(trainTime, "hh:mm").subtract(1, "years");
	var currentTime = moment();
	var timeDifference = moment().diff(moment(firstTrainCoverted), "minutes");
	var remainingTime = timeDifference % trainFrequency;
	var minutesNextTrain = trainFrequency - remainingTime;
	var nextTrain = moment().add(minutesNextTrain, "minutes");
	var nextTrainArrival = moment(nextTrain).format("hh:mm a")

	//adding the table for the info the user input
	$("#train-table > tbody").append("<tr><td>" + trainName
		+"</td><td>" + trainDestination 
		+ "</td><td>" + trainFrequency
		+ "</td><td>" + nextTrainArrival
		+ "</td><td>" + minutesNextTrain + "</td><td>");

})


