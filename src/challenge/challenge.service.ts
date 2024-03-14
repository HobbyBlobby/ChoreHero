import { Injectable } from '@angular/core';
import { WebService } from '../app/web.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService extends WebService {
  private challengeCreateURL = this.baseURL + "challenges/challengeCreate.php";
  private getTasksURL = this.baseURL + "challenges/getTasks.php";

  getTasks(group_id: number): Observable<any> {
    return this.fetch_data(this.getTasksURL, {group_id: group_id});
  }

  createChallenge(data: any) : Observable<any>{
    return this.post_data(this.challengeCreateURL, {}, data);
  }
}