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

function scheduleChallenge($challenge)
{
    $tasks = [];
    switch ($challenge['schedule_mode']) {
        case 'OneTime':
            $tasks[] = [
                'task' => $challenge['challenge_name'],
                'description' => $challenge['challenge_description'],
                'date' => date('Y-m-d', strtotime($challenge["schedule_date"]))
            ];
            break;
        case 'Daily':
            for ($i = 0; $i < 7; $i++) {
                if ($i % (int) $challenge['schedule_period'] == 0) {
                    $tasks[] = [
                        'challenge' => $challenge['challenge_id'],
                        'task' => $challenge['challenge_name'],
                        'description' => $challenge['challenge_description'],
                        'date' => date('Y-m-d', strtotime("now + $i days"))
                    ];
                }
            }
            break;
        case 'Weekly':
            foreach(explode(",", $challenge['schedule_selection']) as $day) {
                $tasks[] = [
                    'challenge' => $challenge['challenge_id'],
                    'task' => $challenge['challenge_name'],
                    'description' => $challenge['challenge_description'],
                    'date' => date('Y-m-d', strtotime("next $day"))
                ];
                }
            break;
        case 'Monthly':
            foreach(explode(",", $challenge['schedule_selection']) as $day) {
                $yearmonth = date("Y-m");
                $currentday = date("d");
                
                if($currentday > (int)$day) {
                    $yearmonth = date("Y-m", strtotime("next Month"));
                }
                $tasks[] = [
                    'challenge' => $challenge['challenge_id'],
                    'task' => $challenge['challenge_name'],
                    'description' => $challenge['challenge_description'],
                    'date' => "$yearmonth-$day"
                ];                
            }
            break;
        default:
            $tasks[] = [
                'challenge' => $challenge['challenge_id'],
                'task' => $challenge['challenge_name'],
                'description' => $challenge['challenge_description'],
                'date' => date('Y-m-d')
            ];
    }
    return $tasks;
}

if ($result = db_select('Challenges', [
    'group_id' => $_GET['group_id']
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