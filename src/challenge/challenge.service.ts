import { Injectable } from '@angular/core';
import { WebService } from '../app/web.service';
import { Observable } from 'rxjs';
import { Task } from '../app/interfaces';
import { Challenge, SkillAssignment } from '../app/challenge';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService extends WebService {
  private challengeCreateURL = this.baseURL + "challenges/challengeCreate.php";
  private challengeGetURL = this.baseURL + "challenges/challengeGet.php";
  private getTasksURL = this.baseURL + "challenges/getTasks.php";
  private updateTaskURL = this.baseURL + "challenges/updateTask.php";
  private skillsUpdateURL = this.baseURL + "challenges/skillsUpdate.php";
  private skillsGetURL = this.baseURL + "challenges/skillsGet.php"

  getTasks(group_id: number): Observable<any> {
    return this.fetch_data(this.getTasksURL, {group_id: group_id});
  }

  updateTask(task: Task): Observable<any> {
    return this.post_data(this.updateTaskURL, {}, task);
  }

  createChallenge(data: any) : Observable<any>{
    return this.post_data(this.challengeCreateURL, {}, data);
  }

  updateSkills(data: SkillAssignment[]) : Observable<any> {
    return this.post_data(this.skillsUpdateURL, {}, data);
  }

  getSkills(challenge_ids: string[], group_id: number) : Observable<SkillAssignment[]> {
    return this.fetch_data<SkillAssignment[]>(this.skillsGetURL, {
      challenges: challenge_ids.join(","),
      group_id: group_id
    });
  }

  getChallenges(group_id: number) : Observable<Challenge[]>{
    return this.fetch_data<Challenge[]>(this.challengeGetURL, {group_id : group_id});
  }
}