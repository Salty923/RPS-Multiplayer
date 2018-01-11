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
    var currentPlayers =[];

    //match with html lgoin elements
    const txtEmail = $("#txtEmail");
    const txtPassword = $("#txtPassword");
    const btnLogin = $("#btnLogin");
    const btnSignUp = $("#btnSignUp");
    const btnLogout = $("#btnLogout");
    const btnRock = $("#btnRock");
    const btnPaper =$("#btnPaper");
    const btnScissors = $("#btnScissors");



    //add login onclick event
    btnLogin.on("click", e => {
        //get email and password
        const email = txtEmail.val();
        const pass = txtPassword.val();
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
        //get email and password
        const email = txtEmail.val();
        const pass = txtPassword.val();
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
            loses: 0
        });
            
    });
    

    //add logout function
    btnLogout.on("click", e =>{
        firebase.auth().signOut();
    })

    //add signin sign out event listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
            btnLogout.removeClass("hide");
            btnRock.removeClass("hide");
            btnPaper.removeClass("hide");
            btnScissors.removeClass("hide");
            txtEmail.addClass("hide");
            txtPassword.addClass("hide");
            btnLogin.addClass("hide");
            btnSignUp.addClass("hide");
            currentPlayers.push(firebaseUser.email);
            console.log(currentPlayers);
        } else {
            console.log("not logged in");
            btnLogout.addClass("hide");
            btnLogout.addClass("hide");
            btnRock.addClass("hide");
            btnPaper.addClass("hide");
            btnScissors.addClass("hide");
            txtEmail.removeClass("hide");
            txtPassword.removeClass("hide");
            btnLogin.removeClass("hide"); 
            btnSignUp.removeClass("hide");
        }
    });

    btnRock.on("click", function () {
        guess = "r";
        console.log("rock");
    })

    btnPaper.on("click", function () {
        guess = "p";
        console.log("paper");
    })

    btnScissors.on("click", function () {
        guess = "s";
        console.log("scissors");
    })

}());







