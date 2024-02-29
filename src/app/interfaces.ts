export interface Hero {
    id: number,
    name: string
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