import { Injectable } from '@angular/core';
import { WebService } from '../app/web.service';
import { Observable } from 'rxjs';
import { Task } from '../app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService extends WebService {
  private challengeCreateURL = this.baseURL + "challenges/challengeCreate.php";
  private getTasksURL = this.baseURL + "challenges/getTasks.php";
  private updateTaskURL = this.baseURL + "challenges/updateTask.php";

  getTasks(group_id: number): Observable<any> {
    return this.fetch_data(this.getTasksURL, {group_id: group_id});
  }

  updateTask(task: Task): Observable<any> {
    return this.post_data(this.updateTaskURL, {}, task);
  }

  createChallenge(data: any) : Observable<any>{
    return this.post_data(this.challengeCreateURL, {}, data);
  }
}