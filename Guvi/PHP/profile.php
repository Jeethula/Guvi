<?php

require_once __DIR__ . '/../vendor/autoload.php';
use Exception;
use MongoDB\Client;

$uri = 'mongodb+srv://jeethula:Password123@cluster10.8szajkb.mongodb.net/?retryWrites=true&w=majority';

try {
    $client = new Client($uri);
    $db = $client->guvi; 

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {

        $email = $_GET['email'] ?? null;

        if (!$email) {
            http_response_code(400);
            echo json_encode(array("message" => "Email not provided"));
            exit();
        }
        $collection = $db->userProfile; 
        $userProfile = $collection->findOne(['email' => $email]);

        if (!$userProfile) {
            http_response_code(404);
            echo json_encode(array("message" => "User profile not found"));
            exit();
        }

        http_response_code(200);
        echo json_encode($userProfile);
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
   
        $postData = json_decode(file_get_contents('php://input'), true);


        if (!isset($postData['email'])) {
            http_response_code(400);
            echo json_encode(array("message" => "Email not provided"));
            exit();
        }

        $collection = $db->userProfile; 
        $result = $collection->updateOne(
            ['email' => $postData['email']],
            ['$set' => $postData],
            ['upsert' => true]
        );

        if ($result->getModifiedCount() == 1 || $result->getUpsertedCount() == 1) {
            http_response_code(200);
            echo json_encode(array("message" => "Profile updated successfully"));
        } else {
            http_response_code(500);
            echo json_encode(array("message" => "Failed to update profile"));
        }
    } else {
        http_response_code(405); // Method Not Allowed
        echo json_encode(array("message" => "Method not allowed"));
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Internal Server Error: " . $e->getMessage()));
}
