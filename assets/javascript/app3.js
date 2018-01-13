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
    


    //assign user
    $("#btnLogin").on("click",function () {
        //stop browser refresh
        event.preventDefault();
        //hide signin info and add game ui
        $(".row_hide").removeClass("hide");
        //create variable for username
        var name = $("#username").val().trim();
        //create variable for database users
        var dbUsers = database.ref("users");
        //find total number of current users
        dbUsers.on("value", function (snpashot) { 
            var totalPlayers = snpashot.numChildren();
            //Set players to database if room
            if (totalPlayers === 0) {
                 database.ref("users/player1").set({
                     username: name,
                     wins: 0,
                     losses: 0,
                     pick: 0,
                })
             } else if (totalPlayers === 1) {
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
 
