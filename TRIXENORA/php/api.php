<?php
/**
 * TRIXENORA - Backend API
 * Handles user data, game saves, leaderboards
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Max-Age: 86400');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$request_method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path_parts = explode('/', trim($path, '/'));

$db_host = 'ep-broad-mode-ank96ajf-pooler.c-6.us-east-1.aws.neon.tech';
$db_user = 'neondb_owner';
$db_pass = 'npg_L2feKDHgFN6n';
$db_name = 'trixenora_db';

try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit();
}

switch ($request_method) {
    case 'GET':
        handleGet($pdo, $path_parts);
        break;
    case 'POST':
        handlePost($pdo, $path_parts);
        break;
    case 'PUT':
        handlePut($pdo, $path_parts);
        break;
    case 'DELETE':
        handleDelete($pdo, $path_parts);
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}

function handleGet($pdo, $path_parts) {
    global $request_method;
    
    if (count($path_parts) === 2 && $path_parts[0] === 'api' && $path_parts[1] === 'leaderboard') {
        $stmt = $pdo->query("
            SELECT username, score, level, playtime 
            FROM leaderboards 
            ORDER BY score DESC 
            LIMIT 100
        ");
        $leaderboard = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(['success' => true, 'data' => $leaderboard]);
    } elseif (count($path_parts) === 3 && $path_parts[0] === 'api' && $path_parts[1] === 'user') {
        $user_id = $path_parts[2];
        $stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
        $stmt->execute([$user_id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($user) {
            echo json_encode(['success' => true, 'data' => $user]);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'User not found']);
        }
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);
    }
}

function handlePost($pdo, $path_parts) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (count($path_parts) === 2 && $path_parts[0] === 'api' && $path_parts[1] === 'save') {
        $user_id = $input['user_id'] ?? null;
        $game_data = $input['game_data'] ?? null;
        
        if ($user_id && $game_data) {
            $stmt = $pdo->prepare("
                INSERT INTO game_saves (user_id, game_data, created_at, updated_at) 
                VALUES (?, ?, NOW(), NOW())
                ON DUPLICATE KEY UPDATE 
                game_data = VALUES(game_data), updated_at = NOW()
            ");
            
            $success = $stmt->execute([$user_id, json_encode($game_data)]);
            
            if ($success) {
                // Update leaderboard
                updateLeaderboard($pdo, $user_id, $game_data['score'] ?? 0);
                echo json_encode(['success' => true, 'message' => 'Game saved']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Save failed']);
            }
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields']);
        }
    } elseif (count($path_parts) === 3 && $path_parts[0] === 'api' && $path_parts[1] === 'user') {
        // Create new user
        $username = $input['username'] ?? null;
        $email = $input['email'] ?? null;
        
        if ($username && $email) {
            $stmt = $pdo->prepare("INSERT INTO users (username, email, created_at) VALUES (?, ?, NOW())");
            $success = $stmt->execute([$username, $email]);
            
            if ($success) {
                $user_id = $pdo->lastInsertId();
                echo json_encode(['success' => true, 'user_id' => $user_id]);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'User creation failed']);
            }
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Missing username or email']);
        }
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);
    }
}

function handlePut($pdo, $path_parts) {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (count($path_parts) === 3 && $path_parts[0] === 'api' && $path_parts[1] === 'user') {
        $user_id = $path_parts[2];
        $updates = $input;
        
        $setClause = [];
        $params = [$user_id];
        
        foreach ($updates as $key => $value) {
            $setClause[] = "$key = ?";
            $params[] = $value;
        }
        
        $stmt = $pdo->prepare("UPDATE users SET " . implode(', ', $setClause) . " WHERE id = ?");
        $success = $stmt->execute($params);
        
        echo json_encode(['success' => $success]);
    }
}

function handleDelete($pdo, $path_parts) {
    if (count($path_parts) === 3 && $path_parts[0] === 'api' && $path_parts[1] === 'save') {
        $save_id = $path_parts[2];
        $stmt = $pdo->prepare("DELETE FROM game_saves WHERE id = ?");
        $success = $stmt->execute([$save_id]);
        echo json_encode(['success' => $success]);
    }
}

function updateLeaderboard($pdo, $user_id, $score) {
    $stmt = $pdo->prepare("
        INSERT INTO leaderboards (user_id, score, level, playtime, updated_at) 
        VALUES (?, ?, 1, 0, NOW())
        ON DUPLICATE KEY UPDATE 
        score = GREATEST(score, ?), updated_at = NOW()
    ");
    $stmt->execute([$user_id, $score, $score]);
}

?>