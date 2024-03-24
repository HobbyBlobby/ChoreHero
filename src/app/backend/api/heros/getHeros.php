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

if(empty($_GET["group_id"]))  {
    echo json_encode(['status' => 'err_param']);
    http_response_code(404);
    return;
}

if ($result = db_select('Heros', [
    'group_id' => $_GET['group_id']
])) {
    echo json_encode($result);
    return;
} else {
    echo json_encode($error);
}
?>