<?php
if (require 'handleCors.php') {http_response_code(200); return;}

$headers = getallheaders();

$now = date('Y-m-d h:i:s');
$sql = "DELETE FROM AccountLogins WHERE expiration_date < '$now'";
_doDelete($sql);

if(array_key_exists("login-token", $headers) && !empty($headers["login-token"])) {
    if(db_select("AccountLogins", [
        "account_name" => $_GET["account"],
        "login_token" => $headers["login-token"]
    ])) {
        //TODO: extend expiration_date
        return TRUE;
    }
}
return FALSE;
?>