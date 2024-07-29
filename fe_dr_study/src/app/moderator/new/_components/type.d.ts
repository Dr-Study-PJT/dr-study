interface FormData {
    name: string;
    type_voice: string;
    type_tone: string;
    type_model: string;
    pre_prompt: string;
    pre_promptDetails?: string;
}

interface StepProps {
    onNext: () => void;
    onBack: () => void;
    data: FormData;
    setData: (data: FormData) => void;
}

interface CreateFormPageProps {
    title: string;
    initialFormData: FormData;
}
