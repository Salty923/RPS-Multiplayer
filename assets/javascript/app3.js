//alert("connected");


// Initialize Firebase
var config = {
    apiKey: "AIzaSyCxKfUusMy2RIgkn1PpmQFa1TbKHeU4NQ8",
    authDomain: "rpsmulitplayer.firebaseapp.com",
    databaseURL: "https://rpsmulitplayer.firebaseio.com",
    projectId: "rpsmulitplayer",
    storageBucket: "rpsmulitplayer.appspot.com",
    messagingSenderId: "710777641003"
};
firebase.initializeApp(config);

//create needed variables
var database = firebase.database();
//connection ref
var connectedRef = database.ref(".info/connected");
//set player depth
var firstPlayer = true;
//total players
var totalPlayers;
//create variable for database users
var dbUsers = database.ref("users");



//assign user
$("#btnLogin").on("click",function () {
    //stop browser refresh
    event.preventDefault();
    //remove signin
    $("#signRow").addClass("hide");
    //hide signin info and add game ui
    $(".row_hide").removeClass("hide");
    //create variable for username
    var name = $("#username").val().trim();
    //add player name to UI
    $("#playerName").html(name);
    //change the on value to once!  Thanks Megan!!
    //find total number of current users
    dbUsers.once("value", function (snpashot) { 
        totalPlayers = snpashot.numChildren();
        //Set players to database if room
        if (totalPlayers === 0) {
                database.ref("users/player1").set({
                    username: name,
                    wins: 0,
                    losses: 0,
                    pick: 0,
            })
        } else if (totalPlayers === 1) {
            firstPlayer = false;
            database.ref("users/player2").set({
                username: name,
                wins: 0,
                losses: 0,
                pick: 0,
            })
        } else {
            alert("please wait for game");
        }
    })
});

$("#r").on("click",function () {
    alert("Rock");
});

$("#p").on("click", function () {
    alert("paper");
});

$("#s").on("click", function () {
    alert("Scis");
});



//add presence for removing users on browser close
var presenceRef1 = firebase.database().ref("users/player1");
// Write a string when this client loses connection
presenceRef1.onDisconnect().remove();
//
//add presence for removing users on browser close
var presenceRef2 = firebase.database().ref("users/player2");
// Write a string when this client loses connection
presenceRef2.onDisconnect().remove();
 
