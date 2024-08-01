import { ICreateModeratorReq } from '../../_types';

export interface FormData {
    [x: string]: string | number | readonly string[] | undefined;
    name: string;
    description?: string;
    typeVoice: string;
    typeCharacter: string;
    typeModel: string;
    prePrompt: string;
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
