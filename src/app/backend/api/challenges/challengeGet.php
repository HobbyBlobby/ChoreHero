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

if(empty($_GET["group_id"])) {
    echo json_encode(['status' => 'err_param']);
    http_response_code(404);
    return;
}

$whereObject = [
    "group_id" => $_GET["group_id"]
];

if(array_key_exists('challenge_id', $_GET) && !empty($_GET["challenge_id"])) {
    $whereObject["challenge_id"] = $_GET["challenge_id"];
}

if($result = db_select("Challenges", $whereObject)) {
    echo json_encode($result);
    return;
} else {
    if(empty($error)) {return;} // no challenges could be the case in a new groupd > this isn't an error
    echo json_encode($error);
    http_response_code(500);
}

?>