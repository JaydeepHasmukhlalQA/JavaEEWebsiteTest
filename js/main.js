function getAccount(name) {
	return new Promise(function(resolve, reject) {
		let getUrl = "http://127.0.0.1:8080/JavaEEServer-1.0/api/accounts/"+name;
		
	});
}

function postAccount(jsonAccount, url) {
	return new Promise(function (resolve, reject) {
		let postUrl = "http://127.0.0.1:8080/JavaEEServer-1.0/api/accounts/"
		const XHR = new XMLHttpRequest();

		XHR.onreadystatechange = function () {
			if (XHR.readyState === 4) {
				if (XHR.status === 201) {
					resolve("Your account was created. Try logging in.");
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

function getAccountByName() {
	let name = document.getElementById("loginForm").elements["name"].value;

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
	});

	return false;
}

function isStringEmpty(string) {
	if (string == "") {
		return true
	} else { 
		return false
	}
}
