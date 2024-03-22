<?php

$redis = new Redis();
if (!$redis->connect('127.0.0.1', 6379)) {
    die("Failed to connect to Redis");
}

// $servername = "localhost:3306";
// $username_db = "root";
// $password_db = "8903942007";
// $dbname = "jeethu";

$servername = "mysql5048.site4now.net";
$username_db="aa6c48_guvi123";
$password_db="Password@123";
$dbname="db_aa6c48_guvi123";

$conn = new mysqli($servername, $username_db, $password_db, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$username = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

$stmt = $conn->prepare("SELECT * FROM user WHERE username=? AND password=?");
if (!$stmt) {
    die("Error preparing statement: " . $conn->error);
}

$stmt->bind_param("ss", $username, $password);

if (!$stmt->execute()) {
    die("Error executing statement: " . $stmt->error);
}

$result = $stmt->get_result();
$response = array();

$loginTime = time();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $sessionId = uniqid();
    $redis->hMSet($sessionId, [
        'user_id' => $user_id,
        'username' => $username,
        'login_time' => $loginTime
    ]);
    $redis->expire($sessionId, 3600);
    $response['status'] = "logined";
    $response['sessionId'] = $sessionId;
} else {
    $response['status'] = "failed";
}


$stmt->close();
$conn->close();
header('Content-Type: application/json');
echo json_encode($response);

?>

