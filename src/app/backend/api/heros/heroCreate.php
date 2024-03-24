<?php
if (require '../handleCors.php') {http_response_code(200); return;}
require '../database.php';
if (!require '../checkLogin.php') {http_response_code(403); return;}

$DATA = json_decode(file_get_contents("php://input"), true);

if(empty($DATA["hero_name"]) || empty($_GET["account"] || empty($DATA["group_id"])) ) {
    echo json_encode(['status' => 'err_param']);
    http_response_code(404);
    return;
}

if(db_insert("Heros", [
    "group_id" => $DATA["group_id"],
    "account_name" => $_GET["account"],
    "hero_name" => $DATA["hero_name"],
    "class_id" => $DATA["class_id"]
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