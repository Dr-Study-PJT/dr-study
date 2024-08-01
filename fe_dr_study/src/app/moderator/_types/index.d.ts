export interface IModerator {
    id: number;
    prePrompt: string;
    script: string;
    description: string;
    name: string;
    typeModel: string;
    typeVoice: string;
    typeCharacter: string;
}

export interface ICreateModeratorReq
    extends Pick<
        IModerator,
        | 'name'
        | 'description'
        | 'typeCharacter'
        | 'typeModel'
        | 'typeVoice'
        | 'script'
        | 'prePrompt'
    > {}
