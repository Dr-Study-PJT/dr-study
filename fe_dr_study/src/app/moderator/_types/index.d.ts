export interface IModerator {
    id: number;
    prePrompt: string;
    script: string;
    description: string;
    name: string;
    modelType: string;
    voiceType: string;
    characterType: string;
}
// 아래는 수정을 위해서??
export interface ICreateModeratorReq
    extends Pick<
        IModerator,
        | 'name'
        | 'description'
        | 'characterType'
        | 'modelType'
        | 'voiceType'
        | 'script'
        | 'prePrompt'
    > {}
