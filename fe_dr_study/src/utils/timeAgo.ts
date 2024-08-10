export const timeAgo = (date: string) => {
    const now = new Date();
    const createdTime = new Date(date);
    const differenceInSeconds = Math.floor(
        (now.getTime() - createdTime.getTime()) / 1000,
    );

    if (differenceInSeconds < 60) {
        return `${differenceInSeconds}초 전`;
    } else if (differenceInSeconds < 3600) {
        const minutes = Math.floor(differenceInSeconds / 60);
        return `${minutes}분 전`;
    } else if (differenceInSeconds < 86400) {
        const hours = Math.floor(differenceInSeconds / 3600);
        return `${hours}시간 전`;
    } else {
        const days = Math.floor(differenceInSeconds / 86400);
        return `${days}일 전`;
    }
};
