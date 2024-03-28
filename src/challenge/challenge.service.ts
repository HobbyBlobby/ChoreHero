import { Injectable } from '@angular/core';
import { WebService } from '../app/web.service';
import { Observable } from 'rxjs';
import { Task } from '../app/interfaces';
import { Challenge, HeroSkill, SkillAssignment } from '../app/challenge';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService extends WebService {
  private challengeCreateURL = this.baseURL + "challenges/challengeCreate.php";
  private challengeUpdateURL = this.baseURL + "challenges/challengeUpdate.php";
  private challengeGetURL = this.baseURL + "challenges/challengeGet.php";
  private challengeDeleteURL = this.baseURL + "challenges/challengeDelete.php";
  private getTasksURL = this.baseURL + "challenges/getTasks.php";
  private updateTaskURL = this.baseURL + "challenges/updateTask.php";
  private clearTaskURL = this.baseURL + "challenges/clearTask.php";
  private skillsUpdateURL = this.baseURL + "challenges/skillsUpdate.php";
  private skillsGetURL = this.baseURL + "challenges/skillsGet.php"
  private heroSkillsGetURL = this.baseURL + "challenges/heroSkillsGet.php"

  getTasks(group_id: number): Observable<any> {
    return this.fetch_data(this.getTasksURL, {group_id: group_id});
  }

  updateTask(task: Task): Observable<any> {
    return this.post_data(this.updateTaskURL, {}, task);
  }

  clearTask(task: Task): Observable<any> {
    return this.post_data(this.clearTaskURL, {}, task);
  }

  createChallenge(data: any) : Observable<any>{
    return this.post_data(this.challengeCreateURL, {}, data);
  }
  updateChallenge(data: any) : Observable<any>{
    return this.post_data(this.challengeUpdateURL, {}, data);
  }
  getChallenges(group_id: number) : Observable<Challenge[]>{
    return this.fetch_data<Challenge[]>(this.challengeGetURL, {group_id : group_id});
  }
  getChallenge(group_id: number, challenge_id: number) : Observable<Challenge[]>{
    return this.fetch_data<Challenge[]>(this.challengeGetURL, {group_id : group_id, challenge_id: challenge_id});
  }
  deleteChallenge(group_id: number, challenge_id: number, withTasks : boolean = false) : Observable<any>{
    return this.fetch_data(this.challengeDeleteURL, {
      group_id: group_id,
      challenge_id: challenge_id,
      withTasks: withTasks
    });
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

  getHeroSkills(hero_ids: string[], group_id: number) : Observable<HeroSkill[]> {
    return this.fetch_data<HeroSkill[]>(this.heroSkillsGetURL, {
      heros: hero_ids.join(","),
      group_id: group_id
    });
  }
}