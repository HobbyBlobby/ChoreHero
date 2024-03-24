import { Injectable } from '@angular/core';
import { WebService } from '../web.service';
import { Observable } from 'rxjs';
import { Hero } from '../hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService extends WebService {
  private getHerosURL = this.baseURL + 'heros/getHeros.php';
  private heroCreateURL = this.baseURL + 'heros/heroCreate.php';

  getHeros(group_id: number) : Observable<Hero[]> {
    return this.fetch_data(this.getHerosURL, {group_id: group_id});
  }

  createHero(data: Hero): Observable<any> {
    return this.post_data(this.heroCreateURL, {}, data);
  }
}
