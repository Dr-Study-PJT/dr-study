import { ICreateModeratorReq } from '../../_types';

export interface StepProps {
    onNext: () => void;
    onBack: () => void;
    onSubmit: (e: FormEvent, data: any) => void;
    data: ICreateModeratorReq;
    setData: (data: ICreateModeratorReq) => void;
}

export interface IGroup {
    id: number;
    name: string;
    description: string;
    tags: string[];
    created_at: Date;
    dueDate: Date;
    memberCount: number;
    memberCapacity: number;
}

export interface ICreateGroupReq
    extends Pick<
        IGroup,
        'name' | 'description' | 'tags' | 'dueDate' | 'memberCapacity'
    > {}
