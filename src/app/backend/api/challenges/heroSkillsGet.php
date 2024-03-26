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

if(empty($_GET["heros"]) || empty($_GET["group_id"])) {
    echo json_encode(['status' => 'err_param']);
    http_response_code(404);
    return;
}

$sql = "SELECT * FROM HeroSkills WHERE hero_id IN ( $_GET[heros] ) AND group_id = $_GET[group_id]";
if($result = _doSelect($sql)) {
    echo json_encode($result);
    return;
} else {
    json_encode($error);
    http_response_code(500);
}

?>