<?php
if (require 'handleCors.php') {return 200;}

$validLogin = False;
$headers = getallheaders();

if(array_key_exists("login-token", $headers) && !empty($headers["login-token"])) {
    // TODO: check, if token is in Token table
    $validLogin = True;
}
return $validLogin;
?>