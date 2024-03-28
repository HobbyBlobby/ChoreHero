<?php
if (require '../handleCors.php') {
    http_response_code(200);
    return;
}
require '../database.php';
if (!require '../checkLogin.php') {
    http_response_code(403);
    return;
}

if(empty($_GET["group_id"]) || empty($_GET["challenge_id"])) {
    echo json_encode(['status' => 'err_param']);
    http_response_code(404);
    return;
}

if(db_delete("Challenges", [
    "group_id" => $_GET["group_id"],
    "challenge_id" => $_GET["challenge_id"]
])) {
    if($_GET["withTasks"]) {
        if(db_delete("Tasks", [
            "group_id" => $_GET["group_id"],
            "challenge_id" => $_GET["challenge_id"],
            "status" => "open"
        ])) {
            echo json_encode([
                "status" => "success"
            ]);
            return;
        } else {
            echo json_encode($error);
            http_response_code(500);
        }
    }
    return;
} else {
    echo json_encode($error);
    http_response_code(500);
}

?>