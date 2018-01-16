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
//create db ref player1
var dbplayer1 = database.ref("users/player1");
// dbplayer1 choice
var db1C = dbplayer1.child("pick");
// dbplayer1 wins
var db1W = dbplayer1.child("wins");
// dbplayer1 losses
var db1L = dbplayer1.child("losses");
// dbplayer1 ties
var db1T = dbplayer1.child("ties");
//create db ref player1
var dbplayer2 = database.ref("users/player2");
// dbplayer1 choice
var db2C = dbplayer2.child("pick");
// dbplayer2 wins
var db2W = dbplayer2.child("wins");
// dbplayer2 losses
var db2L = dbplayer2.child("losses");
// dbplayer2 ties
var db2T = dbplayer2.child("ties");
//set this player
var dbcurrent = 0;
var p1C;
var p2C;
var p1L = 0;
var p2L = 0;
var p1W = 0;
var p2W = 0;
var p1T = 0;
var p2T = 0;

//message board




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
    //changed the on value to once!  Thanks Megan!!
    dbUsers.on("value",function (snpashot) {
        if (totalPlayers >0) {
            firstPlayer = false;
        }
    })

    //find total number of current users
    dbUsers.once("value", function (snpashot) { 
        totalPlayers = snpashot.numChildren();
        //Set players to database if room
        if (totalPlayers === 0) {
                dbplayer1.set({
                    username: name,
                    wins: 0,
                    losses: 0,
                    ties:0,
                    pick: "",
                    message:"",
            })
            dbcurrent = 1;
        } else if (totalPlayers === 1) {
            firstPlayer = false;
            dbplayer2.set({
                username: name,
                wins: 0,
                losses: 0,
                ties:0,
                pick: "",
                message:"",
            })
            dbcurrent = 2;
        } else {
            alert("please wait for game");
        }
    })
});

//send message
$("#messageSub").on("click", function () {
    //stop browser refresh
    event.preventDefault();
    if(dbcurrent === 1){
        var mes = $("#troll").val();
        dbplayer1.child("message").set("Player-1:" + mes);

    } else if (dbcurrent === 2) {
        var mes = $("#troll").val();
        dbplayer2.child("message").set("Player-2:" + mes);
    }
});



//Player One or two pick rock-set pick to r
$("#r").on("click", function () {
    if (dbcurrent === 1) {
        db1C.set("r");
        
    } else if (dbcurrent === 2) {
        db2C.set("r");
    }
    gameLogic();
});

//Player One or two pick paper-set pick to p
$("#p").on("click", function () {
    if (dbcurrent === 1) {
        db1C.set("p");
    } else if (dbcurrent === 2) {
        db2C.set("p");
    }
    gameLogic();
});

//Player One or two pick scissors-set pick to s
$("#s").on("click", function () {
    if (dbcurrent === 1) {
        db1C.set("s");
    } else if (dbcurrent === 2) {
        db2C.set("s");
    }
    gameLogic();
});


function gameLogic() {
    //get user choices
    db1C.on("value",function (snapshot) {
         p1C = snapshot.val();
      })
    db2C.on("value",function (snap) {
         p2C = snap.val();
    })
    if (((p1C === "r") && (p2C === "p")) || ((p1C === "p") && (p2C === "s")) || ((p1C === "s") && (p2C === "r"))) {
        p1W++;
        p2L++;
        db1W.set(p1W);
        db2L.set(p2L);
    } else if (((p1C === "r") && (p2C === "s")) || ((p1C === "p") && (p2C === "r")) || ((p1C === "s") && (p2C === "p"))) {
        p2W++;
        p1L++;
        db1L.set(p1W);
        db2W.set(p2L);
    }else if (p1C === p2C) {
        p1T++;
        p2T++;
        db1T.set(p1W);
        db2T.set(p2L);
    }
    
};


//add presence for removing users on browser close
var presenceRef1 = firebase.database().ref("users").child("player1");
// Write a string when this client loses connection
presenceRef1.onDisconnect().remove();
//
//add presence for removing users on browser close
var presenceRef2 = firebase.database().ref("users/player2");
// Write a string when this client loses connection
presenceRef2.onDisconnect().remove();
 
