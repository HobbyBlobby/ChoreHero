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

if(empty($_GET["challenges"]) || empty($_GET["group_id"])) {
    echo json_encode(['status' => 'err_param']);
    http_response_code(404);
    return;
}

$sql = "SELECT * FROM Skills WHERE challenge_id IN ( $_GET[challenges] ) AND group_id = $_GET[group_id]";
if($result = _doSelect($sql)) {
    echo json_encode($result);
    return;
} else {
    json_encode($error);
    http_response_code(500);
}

?>