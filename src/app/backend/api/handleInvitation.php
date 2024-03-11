<?php
if (require 'handleCors.php') {
  http_response_code(200);
  return;
}
require 'database.php';
if (!require 'checkLogin.php') {
  http_response_code(403);
  return;
}

if ($_GET['accept']) {
  // Accept:
  // 1) Read invitation to get information
  if ($output = db_select('GroupInvitations', [
    'account_name' => $_GET['account'],
    'invitation_code' => $_GET['invitation_code']
  ])) {
  // 2) add account to GroupMemebers
  if (db_insert('GroupMembers', [
      'account_name' => $_GET['account'],
      'group_id' => $output[0]['group_id'],
      'group_role' => 'Member'
    ])) {
  // 3) remove invitation from GroupInvitations
  if (db_delete('GroupInvitations', [
        'account_name' => $_GET['account'],
        'invitation_code' => $_GET['invitation_code']
      ])) {
        echo json_encode([
          'status' => 'success',
          'data' => [
            'mode' => 'accept',
            'group_id' => $row['group_id'],
            'account_name' => $_GET['account']
          ]
        ]);
      } else {
        echo json_encode($error);
        return;
      }
    } else {
      echo json_encode($error);
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
  if (db_delete('GroupInvitations', [
    'account_name' => $_GET['account'],
    'invitation_code' => $_GET['invitation_code']
  ])) {
    $returnVal['status'] = 'success';
    $returnVal['data'] = ['mode' => 'reject', 'invitation_code' => $_GET['invitation_code']];
    echo json_encode($returnVal);
  } else {
    http_response_code(404);
    return;
  }
} else {
  echo json_encode(['status' => 'err_no_mode']);
  http_response_code(500);
  return;
}
