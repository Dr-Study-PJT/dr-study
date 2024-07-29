import { ICreateModeratorReq } from '../../_types';

export interface FormData {
    [x: string]: string | number | readonly string[] | undefined;
    name: string;
    type_voice: string;
    type_tone: string;
    type_model: string;
    pre_prompt: string;
    pre_promptDetails?: string;
}

export interface StepProps {
    onNext: () => void;
    onBack: () => void;
    data: ICreateModeratorReq;
    setData: (data: ICreateModeratorReq) => void;
}

export interface CreateFormPageProps {
    title: string;
    initialFormData: ICreateModeratorReq;
}
