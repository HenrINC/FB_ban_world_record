//JS CODE
//REQUIRE TEMPMAIL PYTHON SERVER
//You neeed this to make it work : https://github.com/PhilGrayson/chrome-csp-disable
function generatePassword() { //Password generator
    var length = 12,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
//Random number generator
function randint(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
//Inject jquery in to the webpage
script = document.createElement("script");
script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
document.head.appendChild(script);
//Get the user's name
try{document.getElementsByClassName('_9o-r')[0].children[1].click();}catch{console.log("You should clear your browser's cookies")}//Close cookie popup
document.getElementsByClassName('_6ltg')[1].children[0].click();//Get the register form
setTimeout(() => {
	$.ajax({url: 'https://randomuser.me/api/',dataType: 'jsonp',success: function(data) {
		//[TODO] i have to request the API agin if the genter is male
		r = data.results[0];
		document.getElementsByName('firstname')[0].value = r.name.first;
		document.getElementsByName('lastname')[0].value = r.name.last;
	}});
	$.ajax({url: 'http://localhost:2558/main?q=regen', dataType: 'text', //'text' bypass the cross origin blocker
		success: function(data) {
			d = JSON.parse(data).email;
			document.getElementsByName('reg_email__')[0].value = d;
			document.getElementsByName('reg_email_confirmation__')[0].value = d;
			document.getElementsByName("websubmit")[0].click();
		}
	});
	document.getElementsByName('reg_passwd__')[0].value = generatePassword();
	document.getElementsByName('birthday_day')[0].value = randint(1,28);
	document.getElementsByName('birthday_month')[0].value = randint(1,12);
	document.getElementsByName('birthday_year')[0].value = randint(1990,2000);
	document.getElementsByName("sex")[1].checked = true;
}, 1000);//Wait for jquery to load
/*
IN DEV
Let's make code that will be executed in the new facebook page
//CONCEPT:
var newWin = window.open("pageB.aspx");  // ref to pageB is stored in var newWin
newWin.onload = function () 
{
    newWin.helloB();
}
function helloA()
{
    // Run the alert method inside the new window
    newWin.alert("Hello from page A!");
}



//Before clicking
var win = window.open("www.google.com")
win.onload = function(){
	var win2 = window.open("www.facebook.com")
	win2.onload = function(){
		//Everything here will be done on the comfirmation page
		
		
		
	}
	setTimeout(() => {
		
		
	}, 5000);
	
}






*/
