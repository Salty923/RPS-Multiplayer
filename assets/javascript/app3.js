//alert("connected");

(function () {
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

    var player1 = null;
    var p1Choice;
    var p1Wins = 0;
    var P2Losses = 0;
    var player2 = null;
    var p2Choice;
    var p2Wins = 0;
    var P2Losses = 0;




    //match with html lgoin elements
    const btnLogin = $("#btnLogin");
    const btnRock = $("#btnRock");
    const btnPaper = $("#btnPaper");
    const btnScissors = $("#btnScissors");

    //assign user


});