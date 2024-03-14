import { Injectable } from '@angular/core';
import { WebService } from '../app/web.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService extends WebService {
  private challengeCreateURL = this.baseURL + "challenges/challengeCreate.php";

  createChallenge(data: any) : Observable<any>{
    console.log("create a challenge", this.challengeCreateURL, data);
    return this.post_data(this.challengeCreateURL, {}, data);
    // return new Observable<any>(observer=> {
    //   observer.next('Final');
    //   observer.complete();
    //   return {unsubscribe() {}}
    // });
  }
}