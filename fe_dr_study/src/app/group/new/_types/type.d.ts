import { ICreateModeratorReq } from '../../_types';

export interface FormData {
    [x: string]: string | number | readonly string[] | undefined;
    name: string;
    voiceType: string;
    characterType: string;
    modelType: string;
    pre_prompt: string;
    description?: string;
}

export interface StepProps {
    onNext: () => void;
    onBack: () => void;
    data: ICreateModeratorReq;
    setData: (data: ICreateModeratorReq) => void;
}

export interface CreateFormPageProps {
    // title?: string;
    // initialFormData?: ICreateModeratorReq;
}
