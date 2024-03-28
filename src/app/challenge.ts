export interface Skill {
    skill_id: number, 
    skill_name: string,
    value?: number,
    skill_color?: string
}

export interface SkillAssignment {
    skill_id: number,
    challenge_id: number,
    skill_value: number,
    group_id: number,
    account_name?: string,
    skill_name?: string
}

export interface HeroSkill {
    hero_id: number, 
    skill_id: number,
    group_id: number,
    account_name: string, 
    skill_value: number,
    skill_level: number
}

export interface Challenge {
    challenge_id: number,
    group_id: number,
    challenge_name: string,
    challenge_description: string,
    schedule_mode: string, 
    schedule_date: string,
    schedule_period: number,
    schedule_selection: string, 
    assigned_to: string,
    needs_scheduling: string,
    active: string
}