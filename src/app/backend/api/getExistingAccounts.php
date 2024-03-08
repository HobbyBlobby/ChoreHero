<?php
// basic script returning all data from table Groups

if (require 'handleCors.php') {return 200;}
require 'database.php';
require 'checkLogin.php';

if($validLogin == False) {
  http_response_code(401);
  die();
}

$groups = [];
$sql = "SELECT account_name FROM Accounts";

if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $groups[$i] = $row;
    $i++;
  }

  echo json_encode($groups);
}
else
{
  http_response_code(404);
}