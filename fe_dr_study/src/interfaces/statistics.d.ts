export interface Top3StudyGroup {
    studyGroupId: number;
    studyGroupName: string;
    joinCount: number;
}

export interface TotalGroupTags {
    [key: string]: number;
}

export interface StatisticsData {
    totalConferenceTime: number;
    totalConferenceJoinCount: number;
    top3StudyGroups: Top3StudyGroup[];
    totalGroupJoinCount: number;
    totalGroupTags: TotalGroupTags;
}
