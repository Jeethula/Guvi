function register() {
    var a;
    if(window.XMLHttpRequest) {
        a = new XMLHttpRequest();
    } else {
        a = new ActiveXObject("Microsoft.XMLHTTP");
    }

    a.onreadystatechange = function() {
        if(a.readyState == 4) {
            if(a.status == 200) {
                alert("Registration successful login to continue");
                window.location.replace("http://localhost/GUVI/login.html");
                console.log(a.responseText);
            } else {
                alert("Error: " + a.status);
            }
        }
    }

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm_password").value;
    if(password != confirmPassword) {
        alert("Passwords do not match");
        return;
    }
    var passValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if(!password.match(passValid)) {
        alert("Password must contain at least one number, one uppercase and one lowercase letter, and at least 6 characters");
        return;
    }

    var url = "PHP/register.php";
    var val = "email=" + encodeURIComponent(email) + "&password=" + encodeURIComponent(password) ;

    a.open("POST", url, true);
    a.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    a.send(val);    


}