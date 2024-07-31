export interface IGroup {
    id: number;
    name: string;
    description: string;
    goal: string;
    created_at: Date;
    due_date: Date;
    member_count: number;
    member_capacity: number;
}

export interface ICreateGroupReq
    extends Pick<
        IGroup,
        'name' | 'description' | 'goal' | 'due_date' | 'member_capacity'
    > {}
