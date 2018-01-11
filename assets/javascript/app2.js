//alert("connected");

(function(){
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

    var database = firebase.database();
    var choices =["r","p","s"];
    var guess;
    var wins;
    var losses;
    var player1;
    var player2;
    var currentPlayers =["CPU"];

    //match with html lgoin elements
    const txtEmail = $("#txtEmail");
    const txtPassword = $("#txtPassword");
    const btnLogin = $("#btnLogin");
    const btnSignUp = $("#btnSignUp");
    const btnLogout = $("#btnLogout");
    const btnRock = $("#btnRock");
    const btnPaper =$("#btnPaper");
    const btnScissors = $("#btnScissors");
    const btnRock2 = $("#btnRock2");
    const btnPaper2 = $("#btnPaper2");
    const btnScissors2 = $("#btnScissors2");



    //add login onclick event
    btnLogin.on("click", e => {
        event.preventDefault();
        //get email and password
        const email = txtEmail.val().trim();
        const pass = txtPassword.val().trim();
        const auth = firebase.auth();
        //sign in
        firebase.auth().signInWithEmailAndPassword(email, pass).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            if (errorCode == 'auth/invalid-email') {
                alert(errorMessage);
            } else if (errorCode == 'auth/user-not-found') {
                alert(errorMessage);
            }
        });
    });

    //sign up with onclick event
    btnSignUp.on("click", e => {
        event.preventDefault();
        //get email and password
        const email = txtEmail.val().trim();
        const pass = txtPassword.val().trim();
        const auth = firebase.auth();
        //sign up
        firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;  
        });
        //store user to database
        database.ref("users").push({
            user: email,
            wins : 0,
            loses: 0,
        });
            
    });
    

    //add logout function
    btnLogout.on("click", e =>{
        firebase.auth().signOut();
    })

    //add signin sign out event listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            $(".playersList").append("<button class='btn btn-info player'>");
            $(".player").html(firebaseUser.email);
            $("#listWell").removeClass("hide");
            txtEmail.addClass("hide");
            txtPassword.addClass("hide");
            btnLogin.addClass("hide");
            btnSignUp.addClass("hide");
            currentPlayers.push(firebaseUser.email);
            console.log(currentPlayers);
            gameStart();
        } else {
            console.log("not logged in");
            $("#listWell").addClass("hide");
            btnLogout.addClass("hide");
            btnLogout.addClass("hide");
            txtEmail.removeClass("hide");
            txtPassword.removeClass("hide");
            btnLogin.removeClass("hide"); 
            btnSignUp.removeClass("hide");
        }
    });

    function gameStart(){
        if (currentPlayers.length === 3) {
            btnLogout.removeClass("hide");
            btnRock.removeClass("hide");
            btnPaper.removeClass("hide");
            btnScissors.removeClass("hide");
            btnRock2.removeClass("hide");
            btnPaper2.removeClass("hide");
            btnScissors2.removeClass("hide");  
        }else if (currentPlayers.length === 2){
            btnRock.removeClass("hide");
            btnPaper.removeClass("hide");
            btnScissors.removeClass("hide");
            btnRock2.addClass("hide");
            btnPaper2.addClass("hide");
            btnScissors2.addClass("hide");
            $("#p2").html("CPU");
        }else if (currentPlayers.length === 1){
            btnRock.addClass("hide");
            btnPaper.addClass("hide");
            btnScissors.addClass("hide");
            btnRock2.addClass("hide");
            btnPaper2.addClass("hide");
            btnScissors2.addClass("hide");
        }  
    };


}());







