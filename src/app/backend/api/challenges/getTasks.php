<?php
if (require '../handleCors.php') {
    http_response_code(200);
    return;
}
require '../database.php';
if (!require '../checkLogin.php') {
    http_response_code(403);
    return;
}

function prefill_task_from_challenge($challenge) {
    $ret = [
        "challenge_id" => $challenge["challenge_id"],
        "group_id" => $challenge["group_id"],
        "assigned_to" => $challenge["assigned_to"],
        "task_name" => $challenge["challenge_name"],
        "task_description" => $challenge["challenge_description"],
        "status" => "open"
    ];
    foreach($ret as $key=>$property) {
        if(empty($property)) {
            unset($ret[$key]);
        }
    }
    return $ret;
}

function insert_tasks($tasks) {
    // write tasks to DB; enrich task with generated task_id
    $added_tasks = [];
    foreach($tasks as $task) {
        if(db_insert("Tasks", $task)) {
            if($newID = mysqli_insert_id(connect())) {
                $task["task_id"] = $newID;
                $added_tasks[] = $task;
            }
        }
    }
    return $added_tasks;
}

function scheduleChallenge($challenge)
{
// fields for tasks: task_id, challenge_id, group_id, assigned_to, due_date, task_name, task_description, status
// field for challenges: challenge_id, group_id, challenge_name, challenge_description, schedule_mode, schedule_date, schedule_period, schedule_selection, assigned_to, needs_scheduling, active

// Logic:
//  1. select existing tasks for challenge
//  2. if last task due_date is more then 1 week in the future > we are finished; return tasks from DB
//  3. else: schedule tasks starting from latest due_date until scheduled date is > 1 week ahead
//  4. write tasks into Tasks table > re-read table and deliver data

    $schedule_for = 7; //days
    $schedule_until = date('Y-m-d', strtotime("now + $schedule_for days"));
    $latest = [];
// 1.
    if($exist_tasks = db_select("Tasks", [
        "challenge_id" => $challenge["challenge_id"],
        "group_id" => $challenge["group_id"]
    ])) {
        $latest = $exist_tasks[0];
        foreach($exist_tasks as $task) {
            if($task["due_date"] > $latest["due_date"]) {
                $latest = $task;
            }
        }
// 2. 
        if($latest["due_date"] > $schedule_until) {
            return $exist_tasks;
        }
    }

    $schedule_start = date('Y-m-d', strtotime("yesterday"));
    if(!empty($latest)) {
        $schedule_start = $latest["due_date"];
    }

    $tasks = [];
//  3. 
    switch ($challenge['schedule_mode']) {
        case 'OneTime':
            $task = prefill_task_from_challenge($challenge);
            $task["due_date"] = date('Y-m-d', strtotime($challenge["schedule_date"]));
            if(empty($latest) || $latest["due_date"] != $task["due_date"]) { // only add, if the entry is not existing (or on a different date > e.g. after date change)
                $tasks[] = $task;
            }
            break;
        case 'Daily':
            $offset = 0;
            $due_date = $schedule_start;
            while($due_date <= $schedule_until) {
                $due_date = date('Y-m-d', strtotime("$schedule_start + $offset days"));
                if ($offset % (int) $challenge['schedule_period'] == 0) {
                    $task = prefill_task_from_challenge($challenge);
                    $task["due_date"] = $due_date;
                    if($task["due_date"] > $schedule_start) {
                        $tasks[] = $task;
                    }
                }
                $offset++;
            }
            break;
        case 'Weekly':
            foreach(explode(",", $challenge['schedule_selection']) as $day) {
                $task = prefill_task_from_challenge($challenge);
                $task["due_date"] = date('Y-m-d', strtotime("next $day"));
                if($task["due_date"] > $schedule_start) {
                    $tasks[] = $task;
                }
            }
            break;
        case 'Monthly':
            foreach(explode(",", $challenge['schedule_selection']) as $day) {
                $yearmonth = date("Y-m");
                $currentday = date("d");
                
                if($currentday > (int)$day) {
                    $yearmonth = date("Y-m", strtotime("next Month"));
                }
                $task = prefill_task_from_challenge($challenge);
                $task["due_date"] = "$yearmonth-" . sprintf("%02d", $day);
                if($task["due_date"] > $schedule_start) {
                    $tasks[] = $task;
                }
            }
            break;
        default:
            $tasks[] = prefill_task_from_challenge($challenge);
    }
// 4.
    $new_tasks = insert_tasks($tasks);
    return array_merge($exist_tasks, $new_tasks);
}

if ($result = db_select('Challenges', [
    'group_id' => $_GET['group_id'],
    'active' => 'X'
])) {
    $tasks = [];
    foreach ($result as $challenge) {
        $tasks = array_merge($tasks, scheduleChallenge($challenge));
    }
    echo json_encode($tasks);
    return;
} else {
    echo json_encode($error);
}
?>