    //Queried globals
	var custObj;
	var pInfoObj;
	var pTaskObj;
	
	
    //Firebase web credentials
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
	
	
	//Check user is verified for this session page
	firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		// User is signed in, see docs for a list of available properties
		// https://firebase.google.com/docs/reference/js/firebase.User
		var uid = user.uid;
		console.log(uid + "Activtely logged in");
		
		var docUID = "";
		var db = firebase.firestore();
		var finder = sessionStorage.getItem("finder");
		console.log(finder);
		var docRef = db.collection("users").doc(uid).collection("quotes").doc(finder);
		
		//fetch doc with passed id
		docRef.get().then((doc) => {
			if(doc.exists){
				console.log("Doc data: ", doc.data());
				//Parse and seperate object data
				const userType = JSON.stringify(doc.data());
				const obj = JSON.parse(userType);
				custObj = obj.CustomerInformation;
				pInfoObj = obj.PropertyInformation;
				pTaskObj = obj.PropertyTasks;
				
				presData(doc);
			} else {
				console.log("Document has not been pulled!");
			}
		});
		
	  } else {
		// User is signed out
		console.log(uid + "Has logged out somewhere");
		window.location.replace("http://rqcquotes.jaysmythweb.co.uk/login.html");
    }

});

function presData(doc){
	//Parse and seperate object data
	const userType = JSON.stringify(doc.data());
	const obj = JSON.parse(userType);
	var custObj = obj.CustomerInformation;
	var pInfoObj = obj.PropertyInformation;
	var pTaskObj = obj.PropertyTasks;
	var count = 0;
	var price = 0;
	

	
	//Present header data 
	document.getElementById("custData").innerHTML = custObj.Name + "<br/>" + pInfoObj.AddrLine1 
	+ "<br/>" + pInfoObj.AddrLine2 + "<br/>" + pInfoObj.Town + "<br/>" + pInfoObj.Postcode;
	
	
	
	//Separate each room and its tasks
	for(var key in pTaskObj){
	
	//Create parent row for dynamic table
	var tRow = document.createElement('tr');
	tRow.setAttribute('id', key);
	document.getElementById("secondTable").appendChild(tRow);
	//Create parent cell
	var tCell = document.createElement('td');
	tCell.setAttribute('id', "ParentCell"+String(count));
	tCell.style.cssText = "width:99%";
	document.getElementById(key).appendChild(tCell);
	document.getElementById("ParentCell"+String(count)).innerText = key;
	//Create sibling cell
	for(var x = 0; x <=2; x++){
		var cCell = document.createElement('td');
		cCell.setAttribute('id', "spare");
		cCell.style.cssText = "width:1%;white-space: nowrap";
		document.getElementById(key).appendChild(cCell);
		document.getElementById("ParentCell"+String(count)).innerText = key;
	}
	//create child table
	var tableChild = document.createElement('table');
	tableChild.setAttribute('id', "childTable"+key);
	tableChild.setAttribute('class', "table");
	tableChild.style.cssText = "width:100%";
	
	document.getElementById("ParentCell"+String(count)).appendChild(tableChild);
	
		const taskObj = JSON.stringify(pTaskObj[key]);
		
		const taskList = JSON.parse(taskObj);
		
		for(var taskKey in taskList){
			//Create child row
			var tableChildRow = document.createElement('tr');
			tableChildRow.setAttribute('id', "tableChildRow"+String(count));
			tableChildRow.style.cssText = "width:100%";
			document.getElementById("childTable"+key).appendChild(tableChildRow);
			
			for(i = 0; i <= 3; i++){
				if(i == 0){
					//Create child cell and populate
					var tableChildCell = document.createElement('td');
					tableChildCell.setAttribute('id', taskKey+i);
					tableChildCell.style.cssText = "width: 70%; text-align: left";
					document.getElementById("tableChildRow"+String(count)).appendChild(tableChildCell);
					
					document.getElementById(taskKey+i).innerText = taskKey;
				} else if(i == 1){
				//Create child cell and populate
					var tableChildCell = document.createElement('td');
					tableChildCell.setAttribute('id', taskKey+i);
					tableChildCell.style.cssText = "width: 1%; text-align: left";
					document.getElementById("tableChildRow"+String(count)).appendChild(tableChildCell);
				
				} else if (i == 2){
				//Create child cell and populate
					var tableChildCell = document.createElement('td');
					tableChildCell.setAttribute('id', taskKey+i);
					tableChildCell.style.cssText = "width: 1%; text-align: left";
					document.getElementById("tableChildRow"+String(count)).appendChild(tableChildCell);
				
				} else {
					//Create child cell and populate
					var tableChildCell = document.createElement('td');
					tableChildCell.setAttribute('id', taskKey+i);
					tableChildCell.style.cssText = "width: 28%; text-align: right";
					document.getElementById("tableChildRow"+String(count)).appendChild(tableChildCell);
					
					document.getElementById(taskKey+i).innerText = "£"+taskList[taskKey];
					price += parseFloat(taskList[taskKey]);
				}
			}
			count++;
		}
		
	}
		
		
		document.getElementById("totalCost").innerText = "£"+price;
	
  } //End of presData function
  
  
//Global final output
var finOutPut ="";
function createPDF(){
var createDoc = new jsPDF('p', 'pt', 'letter');

createDoc.html(document.getElementById('section-to-print'), {
			html2canvas: {
				scale: 0.5
			},
			callback: function (createDoc) {
				finOutPut = createDoc.output('datauristring');
				createDoc.output("save",pInfoObj.AddrLine1 + " "+pInfoObj.AddrLine2);
			}
		});
}
  

function sendWithEmail(){
var email = document.getElementById("emailFromModal").value;
createPDF();
	if(ValidateEmail(email) == true){
		/*Email.send({
        SecureToken : "694f5381-40c7-4473-8fb7-c5ebe556b7e6",
        To: email,
        From: "sam@blclandlordservices.co.uk",
        Subject: "Sending Quote for property" + pInfoObj.AddrLine1 + pInfoObj.AddrLine2,
        Body: "Please find attached a pdf for " + pInfoObj.AddrLine1 + pInfoObj.AddrLine2,
		Attachments : [
		  {
				name: "Test",
				data: finOutPut
		  }]
		})		
        .then(function (message) {
          alert(message);
        });*/
	} else {
		document.getElementById("emailFromModal").style.cssText = "border:red solid 1px;";
		document.getElementById("emailWarning").innerText= "Invalid email address";
	}
}

function ValidateEmail(email) 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}
function sendToPrint(){
window.print()
}


