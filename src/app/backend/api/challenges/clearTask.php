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

// 1. get existing skill from DB (initialize with zero if not found)
// 2. add the new skill points
// 3. update table HeroSkills

// 1. 
$heroSkills = db_select("HeroSkills", [
    "account_name" => $DATA["assigned_to"]
]);

$hero = null;
if($heros = db_select("Heros",[
    "group_id" => $DATA["group_id"],
    "account_name" => $DATA["assigned_to"]
])) {
    $hero = $heros[0];
};
if(!$hero) {
    echo json_encode(["status" => 'err_noHero']);
    http_response_code(500);
    return;
}

$insertSkills = [];
$updateSkills = [];

if($taskSkills = db_select("Skills", [
    "challenge_id" => $DATA["challenge_id"]
])) {
    foreach($taskSkills as $skill) {
        if($heroSkill = hasSkill($heroSkills, $skill["skill_id"])) { // existing skill > add
            $heroSkill["skill_value"] += $skill["skill_value"];
            $updateSkills[] = $heroSkill;
        } else { // new skill > init value
            $insertSkills[] = [
                "hero_id" => $hero["hero_id"],
                "skill_id" => $skill["skill_id"],
                "group_id" => $hero["group_id"],
                "account_name" => $hero["account_name"],
                "skill_value" => $skill["skill_value"]
            ];
        }
    }
};

foreach($insertSkills as $skill) {
    db_insert("HeroSkills", $skill);
}

foreach($updateSkills as $skill) {
    db_update("HeroSkills",[
        "hero_id" => $skill["hero_id"],
        "skill_id" => $skill["skill_id"]
    ], $skill);
}


function hasSkill($skillListe, $skill_id) {
    foreach($skillListe as $skill) {
        if ($skill["skill_id"] == $skill_id) {
            return $skill;
        }
    }
    return false;
}

// if(db_update("Tasks", ["task_id" => $task_id ], $DATA)) {
//     echo json_encode([
//         "status" => "success",
//         "data" => $DATA
//     ]);
//     return;
// } else {
//     echo json_encode($error);
//     return;
// }


?>