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

    //match with html lgoin elements
    const txtEmail = $("#txtEmail");
    const txtPassword = $("#txtPassword");
    const btnLogin = $("#btnLogin");
    const btnSignUp = $("#btnSignUp");
    const btnLogout = $("#btnLogout");


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
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
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
        database.ref().push({
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
        } else {
            console.log("not logged in");
            btnLogout.addClass("hide");
        }
    });

}());







