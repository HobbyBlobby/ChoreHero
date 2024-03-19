<?php
define('DB_HOST', 'localhost');
define('DB_USER', 'angular');
define('DB_PASS', 'phpfun');
define('DB_NAME', 'angular');

$con = NULL;
$error = [];

function connect()
{
  global $con;
  if($con) {return $con;}

  $con = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

  if (mysqli_connect_errno()) {
    die('Failed to connect:' . mysqli_connect_error());
  }

  mysqli_set_charset($con, 'utf8');

  return $con;
}

function prepare_condition($condition)
{
  $condStrings = [];
  foreach ($condition as $key => $value) {
    if (gettype($value) === 'string') {
      $condStrings[] = "`$key` = '$value'";
    } else {
      $condStrings[] = "`$key` = $value";
    }
  }
  return implode(' AND ', $condStrings);
}

function prepare_insert_values($valueMap) {
  $keys = [];
  $values = [];
  foreach ($valueMap as $key=>$value) {
    $keys[] = "`$key`";
    if (gettype($value) === 'string') {
      $values[] = "'$value'";
    } else {
      $values[] = "$value";
    }
  }
  return "(" . implode(",", $keys) . ") VALUES (" . implode(", ", $values) . ")";
}

function _doSelect($sql) {
  global $error;
  $output = [];
  if ($result = mysqli_query(connect(), $sql)) {
    while ($row = mysqli_fetch_assoc($result)) {
      $output[] = $row;
    }
    return $output;
  } else {
    $error = ["status" => "err_select", "data" => $_GET];
    http_response_code(500);
  }
  return FALSE;
}

function _doDelete($sql) {
  global $error;
  if ($result = mysqli_query(connect(), $sql)) {
    return ["status" => "success"];
  } else {
    $error = ["status" => "err_delete", "data" => $_GET];
    http_response_code(500);
  }
  return FALSE;
}

function _doInsert($sql) {
  // syslog(LOG_WARNING, "$sql");
  global $error;
  if ($result = mysqli_query(connect(), $sql)) {
    return ["status" => "success"];
  } else {
    $error = ["status" => "err_insert", "data" => $_GET, "query" => $sql];
    http_response_code(500);
  }
  return FALSE;
}

function db_select($table, $condition = NULL)
{
  global $error;
  if (empty($table)) {
    $error = ["status" => "err_notable"];
    return FALSE;
  }

  $sql = "SELECT * FROM $table";
  if (!empty($condition)) {
    $sql = $sql . ' WHERE ' . prepare_condition($condition);
  }
  return _doSelect($sql);
}

function db_delete($table, $condition) {
  global $error;
  if (empty($table)) {
    $error = ["status" => "err_notable"];
    return FALSE;
  }
  $sql = "DELETE FROM $table ";
  if (!empty($condition)) {
    $sql = $sql . ' WHERE ' . prepare_condition($condition);
  }
  return _doDelete($sql);
}

function db_insert($table, $values) {
  global $error;
  if (empty($table)) {
    $error = ["status" => "err_notable"];
    return FALSE;
  }
  $sql = "INSERT INTO `$table`" . prepare_insert_values($values);
  return _doInsert($sql);
}

$con  = connect();
?>