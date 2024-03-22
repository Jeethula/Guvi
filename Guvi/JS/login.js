function login() {
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.status === "logined" ) {
                    sessionStorage.setItem("isLoggedIn", "true");
                    sessionStorage.setItem("email", document.getElementById("email").value);
                    sessionStorage.setItem("time", new Date().getTime());
                    sessionStorage.setItem("sessionId", response.sessionId); // Store the session ID
                    window.location.replace("http://localhost/GUVI/profile.html");
                } else {
                    console.log(response);
                    alert("Login failed. Please try again.");
                }
            } else {
                alert("Error: " + xhr.status);
            }
        }
    };

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var url = "PHP/login.php";
    var params = "email=" + encodeURIComponent(email) + "&password=" + encodeURIComponent(password);

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(params);
}
