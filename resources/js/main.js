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

	//Iterate through each quote return and call function displayQuote
	docRef.get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			
			displayQuote(doc);
		});
	});
	
	
	function displayQuote(doc){
		console.log("Doc data: " + doc.id);
		
		//Parse and seperate object data
		const userType = JSON.stringify(doc.data());
		const obj = JSON.parse(userType);
		var custObj = obj.CustomerInformation;
		var pInfoObj = obj.PropertyInformation;
		var pTaskObj = obj.PropertyTasks;
		
		var tRow = document.createElement('tr');
		var id = String(count);
		tRow.setAttribute('id', doc.id);
		console.log(count);
		
		//Find table and append a row
		document.getElementById("table").appendChild(tRow);
		
		//Each row to have 4 cells
		for(i = 0; i <= 3; i++){
			//First iteration, get property information HashMap and find quote reference
			if(i == 0){
			console.log(custObj.Name);
			var tCell = document.createElement('td');
			tCell.setAttribute('id', 'tabCell'+i+id);
			document.getElementById(doc.id).appendChild(tCell);
			document.getElementById('tabCell'+i+id).innerText = pInfoObj.quoteRef;
			} else if(i == 1){
			//Test for second iteration, create empty cell
			console.log(i);
			var tCell = document.createElement('td');
			tCell.setAttribute('id', 'tabCell'+i+id);
			document.getElementById(doc.id).appendChild(tCell);
			} else if (i == 2){
			//third iteration, get customer HashMap and customer name
			console.log(i);
			var tCell = document.createElement('td');
			tCell.setAttribute('id', 'tabCell'+i+id);
			document.getElementById(doc.id).appendChild(tCell);
			document.getElementById('tabCell'+i+id).innerText = custObj.Name;
			} else {
			//final iteration, get property information HashMap and display address lines 1 and 2
			console.log(i);
			var tCell = document.createElement('td');
			tCell.setAttribute('id', 'tabCell'+i+id);
			document.getElementById(doc.id).appendChild(tCell);
			document.getElementById('tabCell'+i+id).innerText = pInfoObj.AddrLine1 + pInfoObj.AddrLine2;
			}
		}
		//Counter variable
		count++;
		
	}
	
	
	
	console.log(myDocs + myMap);
	 
	docRef.doc(myDocs[0]).get().then(snap => {
		console.log(snap.data());
	})
	
    // ...
  } else {
    // User is signed out
	console.log(uid + "Has logged out somewhere");
	window.location.replace("http://rqcquotes.jaysmythweb.co.uk/login.html");
    // ...
  }
});