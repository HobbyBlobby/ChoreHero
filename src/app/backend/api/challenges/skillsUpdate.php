<?php
if (require '../handleCors.php') {http_response_code(200); return;}
require '../database.php';
if (!require '../checkLogin.php') {http_response_code(403); return;}

$DATA = json_decode(file_get_contents("php://input"), true);

$skillsToAdd = [];
$skillsToUpdate = [];
foreach($DATA as $skill) {
    if(empty($skill["challenge_id"]) || empty($skill["skill_id"] || empty($skill["group_id"])) ) {
        echo json_encode(['status' => 'err_param', 'wrongDataset' => $skill]);
        http_response_code(404);
        return;
    }
    if(db_select("Skills", [
        "skill_id" => $skill["skill_id"],
        "challenge_id" => $skill["challenge_id"]
    ])) {
        $skillsToUpdate[] = $skill;
    } else {
        $skillsToAdd[] = $skill;
    }
}

foreach($skillsToAdd as $skill) {
    db_insert("Skills",[
        "skill_id" => $skill["skill_id"],
        "challenge_id" => $skill["challenge_id"],
        "skill_value" => $skill["skill_value"],
        "group_id" => $skill["group_id"],
        "account_name" => empty($skill["account_name"]) ? '' : $skill["account_name"]
    ]);
}
foreach($skillsToUpdate as $skill) {
    db_update("Skills", [
        "skill_id" => $skill["skill_id"],
        "challenge_id" => $skill["challenge_id"]
    ], $skill);
}

if(empty($error)) {
    echo json_encode([
        "status"=>"succes",
    ]);
    return;
} else {
    echo json_encode($error);
    return;   
}

?>