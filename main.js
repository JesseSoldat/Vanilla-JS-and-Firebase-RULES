let started = false; 


function login() {

	let email = document.getElementById("email").value;
	let pass = document.getElementById("pass").value;

	firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  console.log(errorMessage);
	});
}

	function checkUser() {
		firebase.auth().onAuthStateChanged(function(user) {
			let checkUserName = document.getElementById('checkUserName');
			let checkUserId = document.getElementById('checkUserId');
		  if (user) {
		  	if (user.uid === 'HBTaJt057Bf63oS771gah1allYe2') {
		  		console.log('Welcome Jesse');
		  		checkUserName.innerText = 'Welcome Jesse your ID is:';
		  	} else if(user.uid === '5GZF8I5L0WSDShiKnOWxoQ1JjSg2') {
		  		console.log('Welcome Mark');
		  		checkUserName.innerText = 'Welcome Mark your ID is:';
		  	} else {
		  		console.log('Welcome User');
		  		checkUserName.innerText = 'Welcome User your ID is:';
		  	}
		    console.log(user.uid);
		  	checkUserId.innerText = user.uid;
		  } else {
		    console.log('no user');
		  	checkUserName.innerText = 'No User Could Be Found';

		  }
		});
	}

	function jesseSaveData(name, email) {
		//Using set() overwrites data at the specified location, including any child nodes.
		//ONLY JESSE CAN SAVE DATA 	
		
		firebase.database().ref('temp/HBTaJt057Bf63oS771gah1allYe2').set({
	    username: name,
	    email: email,
	    number: Math.floor(Math.random() * 100)
	  }).then(() => {
	  	getJesseData()
	  }).catch(err => {
	  	console.log('Sorry only Jesse can save data here');
	  	console.log(err);
	  	let JesseSaveData = document.getElementById('jesseSaveData');
			 JesseSaveData.innerText = '\u00a0 PERMISSION_DENIED only Jesse can write data here';
	  });
	}

	function markSaveData(name, email) {
		//Using set() overwrites data at the specified location, including any child nodes.
		//ONLY MARK CAN SAVE DATA 	
		firebase.database().ref('temp/5GZF8I5L0WSDShiKnOWxoQ1JjSg2').set({
	    username: name,
	    email: email,
	    number: Math.floor(Math.random() * 100)
	  }).then(() => {
	  	getMarkData()
	  }).catch(err => {
	  	console.log('Sorry only Mark can save data here');
	  	console.log(err)
	  	let MarkSaveData = document.getElementById('markSaveData');
			MarkSaveData.innerText = '\u00a0 PERMISSION_DENIED only Mark can write data here';
	  });
	}
	
	function getJesseData() {
		//on
		if (started === false) {
			var temp = firebase.database().ref('temp/HBTaJt057Bf63oS771gah1allYe2');
			temp.on('value', function(snapshot) {
				console.log('This is Jesse\'s public data');
			  console.log(snapshot.val());
			  let jesseSaveData = document.getElementById('jesseSaveData');
			  jesseSaveData.innerText = '\u00a0 SAVED \u00a0 \u00a0';
			  jesseSaveData.innerText += snapshot.val().email + '\u00a0' + '|' + '\u00a0';
			  jesseSaveData.innerText += snapshot.val().username + '\u00a0' + '|' + '\u00a0';
			  jesseSaveData.innerText += snapshot.val().number;
			});
		}
		started = true;	
	}

		function getMarkData() {
		//on
		if (started === false) {
			var temp = firebase.database().ref('temp/5GZF8I5L0WSDShiKnOWxoQ1JjSg2');
			temp.once('value', function(snapshot) {
				console.log('This is Mark\'s public data');
			  console.log(snapshot.val());
			  let MarkSaveData = document.getElementById('markSaveData');
			  MarkSaveData.innerText = '\u00a0 SAVED \u00a0 \u00a0';
			  MarkSaveData.innerText += snapshot.val().email + '\u00a0' + '|' + '\u00a0';
			  MarkSaveData.innerText += snapshot.val().username + '\u00a0' + '|' + '\u00a0';
			  MarkSaveData.innerText += snapshot.val().number;
			});
		}	
	}

	function noAuthReadJesseData() {
		//HBTaJt057Bf63oS771gah1allYe2' = jesse@jesse.com
		//sign out and log in with a different UID
		//5GZF8I5L0WSDShiKnOWxoQ1JjSg2 = mark@mark.com
		var temp = firebase.database().ref('temp/HBTaJt057Bf63oS771gah1allYe2');
		temp.once('value', function(snapshot) {
			console.log('No Auth User can Read Data');
		  console.log(snapshot.val().email);

		  let jesseReadData = document.getElementById('jesseReadData');
		  jesseReadData.innerText = '\u00a0 READ \u00a0 \u00a0';
		  jesseReadData.innerText += snapshot.val().email + '\u00a0' + '|' + '\u00a0';
		  jesseReadData.innerText += snapshot.val().username + '\u00a0' + '|' + '\u00a0';
		  jesseReadData.innerText += snapshot.val().number;
		});	
	}

	function noAuthReadMarkData() {
		//5GZF8I5L0WSDShiKnOWxoQ1JjSg2 = mark@mark.com
		//sign out and log in with a different UID
		//HBTaJt057Bf63oS771gah1allYe2' = jesse@jesse.com
		var temp = firebase.database().ref('temp/5GZF8I5L0WSDShiKnOWxoQ1JjSg2');
		temp.once('value', function(snapshot) {
			console.log('No Auth User can Read Data');
		  console.log(snapshot.val());

		  let markReadData = document.getElementById('markReadData');
		  markReadData.innerText = '\u00a0 READ \u00a0 \u00a0';
		  markReadData.innerText += snapshot.val().email + '\u00a0' + '|' + '\u00a0';
		  markReadData.innerText += snapshot.val().username + '\u00a0' + '|' + '\u00a0';
		  markReadData.innerText += snapshot.val().number;

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

//-----------------------------Location
//-KkmFBKDZG0aNfgPZ_NP

function getLocation(loc = '-KkbkuYpF-0Y4d8_huN2') {
	let location;
	let locationRef = document.getElementById('location').value;

	if(locationRef.trim() === '') {
		location = loc;
	} else {
		location = locationRef;
	}
	console.log(location);
	reqLocation = firebase.database().ref('locations/' + location);
	reqLocation.once('value', (snapshot) => {
		console.log(snapshot.val());
		let data = snapshot.val();

		let locationData = document.getElementById('locationData');

		Object.keys(data).forEach(function(key) {
  		// console.log(key, data[key]);
  		var li = document.createElement("li");
			locationData.appendChild(li);
		 	li.appendChild(document.createTextNode(key+': \u00a0\u00a0'));
		 	li.appendChild(document.createTextNode(data[key]));
		});
	});
}

function getLocations() {
	reqLocations = firebase.database().ref('locations');
	
	reqLocations.on('value', function(snapshot) {

  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    console.log(childData);
    let allLocations = document.getElementById('allLocations');

   	Object.keys(childData).forEach(function(key) {
  		// console.log(key, data[key]);
  		var li = document.createElement("li");
			allLocations.appendChild(li);
		 	li.appendChild(document.createTextNode(key+': \u00a0\u00a0'));
		 	li.appendChild(document.createTextNode(childData[key]));
		});

  });
});
}


// {
//   "rules": {
//     "temp": {
//       "$uid": {
//         ".write": "$uid === auth.uid",
//         ".read": "true",
//       }  
//     },
//       "locations": {
//       ".read": "true",
//       "$uid": {
//         ".write": "$uid === auth.uid",
        
//       }  
//     }
//   }
// }

