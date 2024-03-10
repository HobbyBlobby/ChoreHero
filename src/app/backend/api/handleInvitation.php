<?php
if (require 'handleCors.php') {
  return 200;
}
require 'database.php';
if (!require 'checkLogin.php') {
  http_response_code(401);
  return;
}

if ($_GET['accept']) {
  // Accept:
  // 1) Read invitation to get information
  // 2) remove invitation from GroupInvitations
  // 3) add account to GroupMemebers
  $sql = "SELECT * FROM angular.GroupInvitations 
          WHERE account_name = '$_GET[account]'
          AND   invitation_code = '$_GET[invitation_code]'
          LIMIT 1";
  if ($result = mysqli_query($con, $sql)) {
    if ($row = mysqli_fetch_assoc($result)) {
      $sql = "INSERT INTO `GroupMembers`
              (`account_name`,`group_id`, `group_role`) VALUES 
              ('$_GET[account]', $row[group_id], 'Member')";
      if ($result = mysqli_query($con, $sql)) {
        $sql = "DELETE FROM angular.GroupInvitations 
                WHERE account_name = '$_GET[account]'
                AND   invitation_code = '$_GET[invitation_code]'";
        if ($result = mysqli_query($con, $sql)) {
          echo json_encode([
            'status' => 'success',
            'data' => [
              'mode' => 'accept',
              'group_id' => $row["group_id"],
              'account_name' => $_GET["account"]]
          ]);
        } else {
          echo json_encode(['status' => 'err_delete']);  
          http_response_code(404);
          return;
        }
      } else {
          echo json_encode(['status' => 'err_insert']);  
          http_response_code(404);
          return;
        }
    } else {
      echo json_encode(['status' => 'err_find_invite']);  
      http_response_code(404);
      return;
    }
  } else {
    echo json_encode(['status' => 'err_find_invite']);  
    http_response_code(404);
    return;
  }
} elseif ($_GET['reject']) {
  // Reject:
  // 1) remove invitation from GroupInitations
  $sql = "DELETE FROM angular.GroupInvitations 
          WHERE account_name = '$_GET[account]'
          AND   invitation_code = '$_GET[invitation_code]'";
  if ($result = mysqli_query($con, $sql)) {
    $returnVal['status'] = 'success';
    $returnVal['data'] = ['mode' => 'reject', 'invitation_code' => $_GET["invitation_code"]];
    echo json_encode($returnVal);
  } else {
    echo json_encode(['status' => 'err_delete']);  
    http_response_code(404);
    return;
  }
} else {
  echo json_encode(['status' => 'err_no_mode']);  
  http_response_code(500);
  return;
}

http_response_code(200);
