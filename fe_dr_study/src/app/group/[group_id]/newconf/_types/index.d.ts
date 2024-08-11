import { IRegisterReq } from '@/interfaces/members';
import { CreateConferenceFormData } from '../CreateConferenceProgress';

export interface FormData {
    [x: string]: string | number | readonly string[] | undefined;
    email: string;
    nickname: string;
}

export interface StepProps {
    onNext: () => void;
    onBack: () => void;
    onSubmit: (e: FormEvent, data: any) => void;
    data: CreateConferenceFormData;
    setData: (data: Conference) => void;
}

export interface CreateFormPageProps {
    // title?: string;
    // initialFormData?: ICreateModeratorReq;
}
