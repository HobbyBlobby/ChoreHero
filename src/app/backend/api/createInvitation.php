<?php
if (require 'handleCors.php') {http_response_code(200); return;}
require 'database.php';
if (!require 'checkLogin.php') {http_response_code(403); return;}

if(empty($_GET["group_id"])) {
    $returnVal["status"] = "err_param";
    echo json_encode($returnVal);
    http_response_code(404);
    return;
}

$output = db_select("GroupInvitations", [
    'account_name' => $_GET["account_name"],
    'group_id' => $_GET["group_id"]]);
if(gettype($output) === "array") {
    if(empty($output)) {
        $code = uniqid();
        if(db_insert("GroupInvitations",[
            'account_name' => $_GET["account_name"],
            'group_id' => $_GET["group_id"],
            'invitation_code' => $code
        ])) {
            echo json_encode([
                "status" => "success",
                "data" => [
                    "account_name" => $_GET["account_name"],
                    "group_id" => $_GET["group_id"],
                    "invitation_code" => $code]
            ]);
        } else {
            echo json_encode($error);
        }
    } else {
        echo json_encode(["status" => "err_exists"]);
        http_response_code(404);
    }
} else {
    echo json_encode($error);
}

?>