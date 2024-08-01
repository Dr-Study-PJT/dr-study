export interface IGroup {
    id: number;
    name: string;
    description: string;
    goal: string;
    created_at: Date;
    dueDate: Date;
    member_count: number;
    memberCapacity: number;
}

export interface ICreateGroupReq
    extends Pick<
        IGroup,
        'name' | 'description' | 'goal' | 'dueDate' | 'memberCapacity'
    > {}
