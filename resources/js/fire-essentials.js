var firebaseConfig = {
      apiKey: "AIzaSyAAoXBVJ4NRn_9L_jhIBgpB1q9Ie1w3-GM",
  authDomain: "rqc-quotes.firebaseapp.com",
  databaseURL: "https://rqc-quotes.firebaseio.com",
  projectId: "rqc-quotes",
  storageBucket: "rqc-quotes.appspot.com",
  messagingSenderId: "863689943444",
  appId: "1:863689943444:android:afded368af6d0dca1ec781"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
	
	firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
	console.log(uid + "Activtely logged in");
	
	var db = firebase.firestore();

	var docRef = db.collection("users").doc(uid).collection("quotes");
	var count = 0;

	docRef.get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			
			testFunction(doc);
		});
	});
	    // ...
  } else {
    // User is signed out
	console.log(uid + "Has logged out somewhere");
	window.location.replace("http://rqcquotes.jaysmythweb.co.uk/login.html");
    // ...
  }
});