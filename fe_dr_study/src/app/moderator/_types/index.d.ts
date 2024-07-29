export interface IModerator {
    id: number;
    pre_prompt: string;
    fb_script: string;
    description: string;
    name: string;
    type_model: string;
    type_voice: string;
    type_tone: string;
}

export interface ICreateModeratorReq
    extends Pick<
        IModerator,
        | 'type_model'
        | 'type_voice'
        | 'type_tone'
        | 'name'
        | 'description'
        | 'pre_prompt'
        | 'fb_script'
    > {}
