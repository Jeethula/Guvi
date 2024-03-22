<?php

$servername = "mysql5048.site4now.net";
$username_db = "aa6c48_guvi123";
$password_db = "Password@123";
$dbname = "db_aa6c48_guvi123";

$conn = new mysqli($servername, $username_db, $password_db, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$username = $_POST['email'];
$password = $_POST['password'];
$user_id = rand(10,99999);

$sql = "INSERT INTO user (username, password,user_id) VALUES (?, ?,?)";
$stmt = $conn->prepare($sql);

$stmt->bind_param("sss", $username, $password,$user_id);

if ($stmt->execute()) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$stmt->close();
$conn->close();
?>
