<?php
if (require '../handleCors.php') {http_response_code(200); return;}
require '../database.php';
if (!require '../checkLogin.php') {http_response_code(403); return;}

$DATA = json_decode(file_get_contents("php://input"), true);

if(empty($DATA["challenge_id"]) || empty($DATA["schedule_mode"] || empty($DATA["group_id"])) ) {
    echo json_encode(['status' => 'err_param']);
    http_response_code(404);
    return;
}

if(db_update("Challenges", [
    "challenge_id" => $DATA["challenge_id"],
    "group_id" => $DATA["group_id"]
    ], [
    "group_id" => $DATA["group_id"],
    "challenge_name" => $DATA["challenge_name"],
    "challenge_description" => $DATA["description"],
    "schedule_mode" => $DATA["schedule_mode"],
    "schedule_date" => date('Y-m-d H:i:s', strtotime($DATA["schedule_date"])),
    "schedule_period" => $DATA["schedule_period"],
    "schedule_selection" => implode(",", $DATA["schedule_selection"]),
    "needs_scheduling" => 'X',
    "active" => 'X'
])) {
    // in case of update, delete open tasks (will be re-schedules with next getTasks.php)
    db_delete("Tasks", [
        "challenge_id" => $DATA["challenge_id"],
        "group_id" => $DATA["group_id"],
        "status" => "open"
    ]);
    echo json_encode([
        "status"=>"succes",
        "data" => ["newID" => $DATA["challenge_id"]]
    ]);
    http_response_code(201);
    return;
} else {
    echo json_encode($error);
    return;
}
?>