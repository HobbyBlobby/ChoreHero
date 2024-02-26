import { Injectable } from '@angular/core';
import { Group } from './interfaces';

import * as JSONgroups from './data/groups.json';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  groupList: Group[] = []
  
  constructor() { 
    // this.getAllGroups().then((groupList: Group[]) => this.groupList = groupList);
  }

  getAllGroups(): Group[] {
    return JSONgroups.groups;
    // const data = await fetch('./data/groups.json');
    // return await data.json() ?? [];
  }

  getGroupById(search_id: number): Group | undefined {
    return JSONgroups.groups.find(group => search_id == group.id);
  }

}
