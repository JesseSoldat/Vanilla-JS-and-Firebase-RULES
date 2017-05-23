let started = false; 

function sendData() {

	let email = document.getElementById("email").value;
	let pass = document.getElementById("pass").value;

	firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // ...
	});
}

	function checkUser() {
		firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
		    console.log(user.uid);
		  } else {
		    console.log('no user');
		  }
		});

	}

	function saveData(name, email) {
		//Using set() overwrites data at the specified location, including any child nodes.
			firebase.database().ref('temp/HBTaJt057Bf63oS771gah1allYe2').set({
	    username: name,
	    email: email,
	    number: Math.floor(Math.random() * 100)
	  }).then(() => {
	  	getData()
	  }).catch(err => console.log(err));
	}

		function noAuthSaveData(name, email) {
			firebase.database().ref('temp/HBTaJt057Bf63oS771gah1allY').set({
	    username: name,
	    email: email,
	    number: Math.floor(Math.random() * 100)
	  }).then(() => {
	  }).catch(err => console.log(err));
	}


	function getData() {
		//on
		if (started === false) {
			var temp = firebase.database().ref('temp/HBTaJt057Bf63oS771gah1allYe2');
			temp.on('value', function(snapshot) {
			  console.log(snapshot.val());
			});
		}
		started = true;	
	}

	function noAuthReadData() {
		//on
		//HBTaJt057Bf63oS771gah1allYe2' = jesse@jesse.com
		//sign out and log in with a different UID
		//5GZF8I5L0WSDShiKnOWxoQ1JjSg2 = mark@mark.com
		var temp = firebase.database().ref('temp/HBTaJt057Bf63oS771gah1allYe2');
		temp.once('value', function(snapshot) {
			console.log('Different User');
		  console.log(snapshot.val());
		});	
	}


/* RULES 
READ: all users 
WRITE: HBTaJt057Bf63oS771gah1allYe2' = jesse@jesse.com
{
  "rules": {
    "temp": {
      "$uid": {
        ".write": "$uid === auth.uid",
        ".read": "true",
      }  
    }
  }
}
*/


