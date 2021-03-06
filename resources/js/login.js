 window.addEventListener("load", function () {
            // Access the form element...
            var form = document.getElementById("myForm");

            // ...and take over its submit event.
            form.addEventListener("submit", function (event) {
                event.preventDefault(); // prevent form submission and reloading the page.

                //your code to validate or do what you need with the form.
            });
});

function signInWithEmailPassword() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  // [START auth_signin_password]
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
	  console.log("Success! I think!?" + user);
	  window.location.replace("http://rqcquotes.jaysmythweb.co.uk/quotes/main.html");
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
	  console.log("Failed! I think!? " + errorCode + ", message"+ errorMessage);
	  if(errorCode == "auth/invalid-email"){
		  document.getElementById('email').style.cssText = "border: solid 1px red;";
		  document.getElementById('email').placeholder = "Invalid Email";
	  } else if(errorCode == "auth/wrong-password"){
		  document.getElementById('password').style.cssText = "border: solid 1px red;";
		  document.getElementById('password').placeholder = "Invalid Password";
	  } else if(errorCode == "auth/user-not-found"){
		  document.getElementById('email').style.cssText = "border: solid 1px red;";
		  document.getElementById('email').placeholder = "User doesn't exist";
	  }
    });
  // [END auth_signin_password]
}