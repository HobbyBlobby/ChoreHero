<?php
// login script
// 1. read table Accounts with accountname and hash
// 2. if successful: generate token and enter token in Table 

require 'database.php';

$groups = [];
$sql = "SELECT * FROM Groups";

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