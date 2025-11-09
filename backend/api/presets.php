<?php
/**
 * Presets API
 */

// CORS Configuration
$allowedOrigins = ['http://localhost:5173'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? null;

if ($origin && in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
}

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

require_once __DIR__ . '/../config/database.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

try {
    switch($method) {
        case 'GET':
            // Get ID from URL path (e.g., /api/presets/1)
            $uri = $_SERVER['REQUEST_URI'];
            $uri_parts = explode('/', trim(parse_url($uri, PHP_URL_PATH), '/'));
            $id = (count($uri_parts) > 2 && is_numeric(end($uri_parts))) ? end($uri_parts) : null;
            
            if($id) {
                // Get single preset by ID
                $query = "SELECT * FROM presets WHERE id = :id";
                $stmt = $db->prepare($query);
                $stmt->bindParam(":id", $id);
                $stmt->execute();
                
                $preset = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if($preset) {
                    $preset['device_state'] = json_decode($preset['device_state']);
                    http_response_code(200);
                    echo json_encode($preset);
                } else {
                    http_response_code(404);
                    echo json_encode(["message" => "Preset not found"]);
                }
            } else {
                // Get all presets
                $query = "SELECT * FROM presets ORDER BY created_at DESC";
                $stmt = $db->prepare($query);
                $stmt->execute();
                
                $presets = [];
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $row['device_state'] = json_decode($row['device_state']);
                    $presets[] = $row;
                }
                
                http_response_code(200);
                echo json_encode($presets);
            }
            break;
            
        case 'POST':
            $data = json_decode(file_get_contents("php://input"));
            
            if(!empty($data->name) && !empty($data->device_type) && !empty($data->device_state)) {
                $checkQuery = "SELECT id FROM presets WHERE name = :name";
                $checkStmt = $db->prepare($checkQuery);
                $checkStmt->bindParam(":name", $data->name);
                $checkStmt->execute();
                
                if($checkStmt->rowCount() > 0) {
                    http_response_code(409);
                    echo json_encode(["message" => "Preset name already exists"]);
                    break;
                }
                
                $query = "INSERT INTO presets (name, device_type, device_state) VALUES (:name, :device_type, :device_state)";
                $stmt = $db->prepare($query);
                
                $stmt->bindParam(":name", $data->name);
                $stmt->bindParam(":device_type", $data->device_type);
                $device_state = json_encode($data->device_state);
                $stmt->bindParam(":device_state", $device_state);
                
                if($stmt->execute()) {
                    http_response_code(201);
                    echo json_encode([
                        "message" => "Preset saved successfully",
                        "id" => $db->lastInsertId()
                    ]);
                } else {
                    http_response_code(503);
                    echo json_encode(["message" => "Unable to save preset"]);
                }
            } else {
                http_response_code(400);
                echo json_encode(["message" => "Invalid input data"]);
            }
            break;
            
        case 'PUT':
            // Get ID from URL path (/api/presets/1)
            $uri = $_SERVER['REQUEST_URI'];
            $uri_parts = explode('/', trim(parse_url($uri, PHP_URL_PATH), '/'));
            $id = end($uri_parts);
            
            $data = json_decode(file_get_contents("php://input"));
            
            if(!empty($id) && !empty($data->device_state)) {
                $query = "UPDATE presets SET device_state = :device_state WHERE id = :id";
                $stmt = $db->prepare($query);
                
                $stmt->bindParam(":id", $id);
                $device_state = json_encode($data->device_state);
                $stmt->bindParam(":device_state", $device_state);
                
                if($stmt->execute()) {
                    http_response_code(200);
                    echo json_encode(["message" => "Preset updated successfully"]);
                } else {
                    http_response_code(503);
                    echo json_encode(["message" => "Unable to update preset"]);
                }
            } else {
                http_response_code(400);
                echo json_encode(["message" => "Invalid input data"]);
            }
            break;
            
        case 'DELETE':
            // Get ID from URL path (/api/presets/1)
            $uri = $_SERVER['REQUEST_URI'];
            $uri_parts = explode('/', trim(parse_url($uri, PHP_URL_PATH), '/'));
            $id = end($uri_parts);
            
            if(!empty($id)) {
                $query = "DELETE FROM presets WHERE id = :id";
                $stmt = $db->prepare($query);
                $stmt->bindParam(":id", $id);
                
                if($stmt->execute()) {
                    http_response_code(200);
                    echo json_encode(["message" => "Preset deleted successfully"]);
                } else {
                    http_response_code(503);
                    echo json_encode(["message" => "Unable to delete preset"]);
                }
            } else {
                http_response_code(400);
                echo json_encode(["message" => "Preset ID required"]);
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
