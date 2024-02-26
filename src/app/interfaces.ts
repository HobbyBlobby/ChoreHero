export interface Hero {
    id: number,
    name: string
}

export interface Group {
    id: number,
    name: string,
    members: Array<Hero>
 }
