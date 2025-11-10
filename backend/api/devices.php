<?php
// cors.php handles CORS for API requests
require_once __DIR__ . '/cors.php';
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . '/../config/database.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

try {
    switch($method) {
        case 'GET':
            if(isset($_GET['id'])) {
                $query = "SELECT * FROM devices WHERE id = :id";
                $stmt = $db->prepare($query);
                $stmt->bindParam(":id", $_GET['id']);
                $stmt->execute();
                
                $device = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if($device) {
                    $device['settings'] = json_decode($device['settings']);
                    http_response_code(200);
                    echo json_encode($device);
                } else {
                    http_response_code(404);
                    echo json_encode(["message" => "Device not found"]);
                }
            } else {
                $query = "SELECT * FROM devices ORDER BY created_at DESC";
                $stmt = $db->prepare($query);
                $stmt->execute();
                
                $devices = [];
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $row['settings'] = json_decode($row['settings']);
                    $devices[] = $row;
                }
                
                http_response_code(200);
                echo json_encode($devices);
            }
            break;
            
        case 'POST':
            $data = json_decode(file_get_contents("php://input"));
            
            if(!empty($data->type) && !empty($data->settings)) {
                $query = "INSERT INTO devices (type, name, settings) VALUES (:type, :name, :settings)";
                $stmt = $db->prepare($query);
                
                $stmt->bindParam(":type", $data->type);
                $stmt->bindParam(":name", $data->name);
                $settings = json_encode($data->settings);
                $stmt->bindParam(":settings", $settings);
                
                if($stmt->execute()) {
                    http_response_code(201);
                    echo json_encode([
                        "message" => "Device saved successfully",
                        "id" => $db->lastInsertId()
                    ]);
                } else {
                    http_response_code(503);
                    echo json_encode(["message" => "Unable to save device"]);
                }
            } else {
                http_response_code(400);
                echo json_encode(["message" => "Invalid input data"]);
            }
            break;
            
        case 'PUT':
            $data = json_decode(file_get_contents("php://input"));
            
            if(!empty($data->id) && !empty($data->settings)) {
                $query = "UPDATE devices SET settings = :settings WHERE id = :id";
                $stmt = $db->prepare($query);
                
                $stmt->bindParam(":id", $data->id);
                $settings = json_encode($data->settings);
                $stmt->bindParam(":settings", $settings);
                
                if($stmt->execute()) {
                    http_response_code(200);
                    echo json_encode(["message" => "Device updated successfully"]);
                } else {
                    http_response_code(503);
                    echo json_encode(["message" => "Unable to update device"]);
                }
            } else {
                http_response_code(400);
                echo json_encode(["message" => "Invalid input data"]);
            }
            break;
            
        case 'DELETE':
            if(isset($_GET['id'])) {
                $query = "DELETE FROM devices WHERE id = :id";
                $stmt = $db->prepare($query);
                $stmt->bindParam(":id", $_GET['id']);
                
                if($stmt->execute()) {
                    http_response_code(200);
                    echo json_encode(["message" => "Device deleted successfully"]);
                } else {
                    http_response_code(503);
                    echo json_encode(["message" => "Unable to delete device"]);
                }
            } else {
                http_response_code(400);
                echo json_encode(["message" => "Device ID required"]);
            }
            break;
            
        default:
            http_response_code(405);
            echo json_encode(["message" => "Method not allowed"]);
            break;
    }
} catch(Exception $e) {
    http_response_code(500);
    echo json_encode(["message" => "Server error: " . $e->getMessage()]);
}
?>
