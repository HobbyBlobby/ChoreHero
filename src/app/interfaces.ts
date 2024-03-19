import { InterpolationConfig } from "@angular/compiler"

export interface Hero {
    id: number,
    name: string
}

export interface Account {
    account_name: string
}

export interface Group {
    group_id: number,
    group_name: string
    // members: Array<Hero>
 }

export interface LoginResponse {
    status: string,
    data: {token: string, expire_on: string}
}

export interface LogoutResponse {
    status: string,
    data: {account_name: string}
}

export interface CreateAccoutResponse {
    status: string,
    data: {newAccount: string}
}

export interface GroupMember {
    group_id: string
    account_name: string,
    group_role: string
}

export interface Invitation {
    account_name: string,
    group_id: number,
    group_name?: string,
    invitation_code: string
  }

  export interface InvitationResponse {
    status: string,
    data:  {
        account_name: string, 
        group_ip: number, 
        invitation_code: string
    }
  }

  export interface bottomAction {
    text: string,
    icon: string,
    action: Function
  }

  export interface Task {
    task_id: number,
    challenge_id: number,
    group_id: number,
    assigned_to: string,
    due_date: string,
    task_name: string,
    task_description: string,
    status: string
  }