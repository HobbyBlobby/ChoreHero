import { Injectable } from '@angular/core';
import { Group } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  groupList: Group[] = [
    { "id": 1,
      "name": "FamilyLemke",
      "members": []
    },
    { "id": 2,
      "name": "FamilyZwo",
      "members": []
    },
    { "id": 3,
      "name": "FamilyLemke",
      "members": []
    },
    { "id": 4,
      "name": "FamilyZwo",
      "members": []
    }
  ]

  constructor() { }

  getAllGroups(): Group[] {
    return this.groupList;
  }

  getGroupById(search_id: number): Group | undefined {
    return this.groupList.find(group => search_id == group.id);
  }

}
