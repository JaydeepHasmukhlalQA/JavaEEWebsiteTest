function getAccount(name) { //try-catch.
	return new Promise(function(resolve, reject) {
		let getUrl = "http://127.0.0.1:8080/JavaEEServer-1.0/api/accounts/"+name;
		const XHR = new XMLHttpRequest();

		XHR.onreadystatechange = function() {
			if (XHR.readyState === 4) {
				if (XHR.status === 200) {
					resolve(XHR.response);
				} else {
					reject("Error: Account" + name + " not found. Please register.");
				}
			}
		}

		XHR.open('GET', getUrl, true);
		XHR.send();
	});
}

function postAccount(jsonAccount, url) { //try-catch.
	return new Promise(function (resolve, reject) {
		let postUrl = "http://127.0.0.1:8080/JavaEEServer-1.0/api/accounts/"
		const XHR = new XMLHttpRequest();

		XHR.onreadystatechange = function () {
			if (XHR.readyState === 4) {
				if (XHR.status === 201) {
					resolve("Successfully registered. Please login.");
				} else {
					reject("Error: Cannot create account. Try again or go away.");
				} 
			}
		}

		XHR.open('POST', postUrl, true);
		XHR.setRequestHeader('Content-Type', 'application/json');
		XHR.send(jsonAccount);
	});
}

function updateAccount() {
	return new Promise(function(resolve, reject) {
		
	});
}

function loadSessionAccount() {
	let account = JSON.parse(sessionStorage.getItem("user"));
	let {id} = account;
	let {name} = account;

	document.getElementById("id").value = id;
	document.getElementById("name").value = name;
}

function modifyAccount() {
	let thisButton = document.getElementById("editButton");

	if (thisButton.textContent === "Edit") {
		enableEdit(thisButton)
	} else if (thisButton.textContent === "Save") {
		updateAccount(thisButton)
	}
}

function enableEdit(button) {
	let nameInput = document.getElementById("name");
	nameInput.readOnly = false;
	button.textContent = "Save";
}

function updateAccount(button) {

}

function getAccountByName() {
	let name = document.getElementById("loginForm").elements["name"].value;
	let retrievedJson = getAccount(name).then((value) => {
		sessionStorage.setItem("user", value);
		window.location.assign("account.html");
		return false;
	}).catch((value) => {
		let message = document.getElementById("messageToUser");
		message.innerHTML = value;
	});

	return false;
}

function submitAccount() {
	let message = document.getElementById("messageToUser");
	let name = document.getElementById("loginForm").elements["name"].value;

	if (isStringEmpty(name)) {
		message.innerHTML = "Error: Please enter a name!";
		return false;
	}

	let account = new Account(name);
	let jsonString = JSON.stringify(account);

	postAccount(jsonString).then((value) => {
		message.innerHTML = value;
	}).catch((value) => {
		message.innerHTML = value;
	});;

	return false;
}

function isStringEmpty(string) {
	if (string == "") {
		return true
	} else { 
		return false
	}
}
