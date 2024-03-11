<?php
if (require 'handleCors.php') {http_response_code(200); return;}
require 'database.php';
if (!require 'checkLogin.php') {http_response_code(403); return;}

if($output = db_select("Accounts")) {
  echo json_encode($output);
} else {
  echo json_encode($error);
}
?>