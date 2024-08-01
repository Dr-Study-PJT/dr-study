import { IRegisterReq } from '@/interfaces/members';

export interface FormData {
    [x: string]: string | number | readonly string[] | undefined;
    email: string;
    nickname: string;
}

export interface StepProps {
    onNext: () => void;
    onBack: () => void;
    data: IRegisterReq;
    setData: (data: IRegisterReq) => void;
}

export interface CreateFormPageProps {
    // title?: string;
    // initialFormData?: ICreateModeratorReq;
}
