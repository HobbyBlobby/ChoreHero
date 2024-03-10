<?php
// basic script returning all data from table Groups

if (require 'handleCors.php') {return 200;}
require 'database.php';
if (!require 'checkLogin.php') {http_response_code(401); return;}

$res = [];
$sql = "SELECT * FROM angular.GroupInvitations as inv
        INNER JOIN angular.Groups as gr on gr.group_id = inv.group_id
        WHERE account_name = '$_GET[account]'";
if(array_key_exists("group_id", $_GET)) {
  $sql = "SELECT * FROM angular.GroupInvitations as inv
  INNER JOIN angular.Groups as gr on gr.group_id = inv.group_id
  WHERE inv.group_id = '$_GET[group_id]'";
}


if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $ret[$i] = $row;
    $i++;
  }

  echo json_encode($ret);
}
else
{
  http_response_code(404);
}