window.onload = function() {
    if(sessionStorage.getItem("isLoggedIn") === "true") {
        console.log("User is logged in.");
        fetchUserProfile();
    } else {
        alert("Please login to continue");
        window.location.replace("http://localhost/GUVI/login.html");
    }
}

function fetchUserProfile() {
    var email = sessionStorage.getItem("email"); 
    if (!email) {
        console.log("Email not found in session storage plz login again.");
        alert("session timed out. Please login again.");
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            if(xhr.status == 200) {
                var userData = JSON.parse(xhr.responseText);
                displayUserProfile(userData);
            } else {
                console.log("Error fetching user profile: " + xhr.statusText);
                alert("update your profile");
            }
        }
    };

    var url = "PHP/profile.php?email=" + encodeURIComponent(email); 
    xhr.open("GET", url, true);
    xhr.send();
}

function displayUserProfile(userData) {

    document.getElementById("name").value = userData.name || '';
    document.getElementById("address").value = userData.address || '';
    document.getElementById("phone").value = userData.phone || '';
    document.getElementById("age").value = userData.age || '';
}

function logout() {
    sessionStorage.clear();
    window.location.replace("http://localhost/GUVI/login.html");
}
var email = sessionStorage.getItem("email");
function updateProfile() {
    var email = sessionStorage.getItem("email");
    if (!email) {
        alert("session timed out. Please login again.");
        console.log("Email not found in session storage plz login again.")
        return;
    }

    var name = document.getElementById("name").value;
    // var address = document.getElementById("address").value;
    var phone = document.getElementById("phone").value;
    var age = document.getElementById("age").value;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                alert("Profile updated successfully");
                fetchUserProfile(); // Fetch current data after update
            } else {
                alert("Error updating profile");
                console.log("Error updating profile: " + xhr.statusText)
            }
        }
    };

    var url = "PHP/profile.php";
    xhr.open("POST", url, true);
    var params = "email=" + encodeURIComponent(email) + "&name=" + encodeURIComponent(name) + "&phone=" + encodeURIComponent(phone) + "&age=" + encodeURIComponent(age);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(params);
}
