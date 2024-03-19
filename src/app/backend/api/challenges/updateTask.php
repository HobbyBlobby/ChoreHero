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

$DATA = json_decode(file_get_contents("php://input"), true);
if(empty($DATA["task_id"])) {
    echo json_encode(['status' => 'err_param']);
    http_response_code(404);
    return;
}

$task_id = $DATA["task_id"]; // use the key for the condition
unset($DATA["task_id"]); // do not update the key

// TODO: implement db_update(table, condition, data)

if(db_update("Tasks", ["task_id" => $task_id ], $DATA)) {
    echo json_encode([
        "status" => "success",
        "data" => $DATA
    ]);
    return;
} else {
    echo json_encode($error);
    return;
}


?>