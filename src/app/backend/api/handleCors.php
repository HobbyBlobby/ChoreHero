<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept,login-token");
if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
  return true;
}
return false;
?>
