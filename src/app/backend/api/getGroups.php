<?php
// basic script returning all data from table Groups

if (require 'handleCors.php') {return 200;}
require 'database.php';
if (!require 'checkLogin.php') {http_response_code(403); return;}

if($validLogin == False) {
  http_response_code(401);
  die();
}

$groups = [];
// $sql = "SELECT * FROM Groups" ;
$sql = "SELECT * FROM angular.Groups as gr 
        INNER JOIN angular.GroupMembers as gm on gm.group_id = gr.group_id 
        WHERE gm.account_name = '$_GET[account]'";

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