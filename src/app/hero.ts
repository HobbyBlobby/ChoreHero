export interface Hero {
    hero_id: number,
    account_name: string,
    group_id: number,
    class_id: number,
    hero_name: string
}

export interface HeroClass {
    class_id: number,
    class_name: string,
    img: string,
    img_head: string
}