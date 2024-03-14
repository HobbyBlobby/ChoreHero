<?php
if (require '../handleCors.php') {http_response_code(200); return;}
require '../database.php';
if (!require '../checkLogin.php') {http_response_code(403); return;}

$DATA = json_decode(file_get_contents("php://input"), true);

if(empty($DATA["challenge_name"]) || empty($DATA["schedule_mode"] || empty($DATA["group_id"])) ) {
    echo json_encode(['status' => 'err_param']);
    http_response_code(404);
    return;
}

if(db_insert("Challenges", [
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
    if($newID = mysqli_insert_id(connect())) {
        echo json_encode([
            "status"=>"succes",
            "data" => ["newID" => $newID]
        ]);
        http_response_code(201);
        return;
    } else {
        echo json_encode([
            "status"=>"succes",
            "data" => ["newID" => -1]
        ]);
        return;
    }
} else {
    echo json_encode($error);
    return;
}
?>