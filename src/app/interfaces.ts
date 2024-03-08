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

export interface CreateAccoutResponse {
    status: string,
    data: {newAccount: string}
}

export interface GroupMember {
    group_id: string
    account_name: string,
    group_role: string
}

export interface inviteData {
    inviteToken: string,
    inviteAccount: string
  }

  export interface InvitationResponse {
    status: string,
    data:  {
        account_name: string, 
        group_ip: string, 
        invitation_code: string
    }
  }