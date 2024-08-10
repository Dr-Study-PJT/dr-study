import { Member } from '@/app/group/[group_id]/_types';
import { IConference } from '@/app/group/[group_id]/dummy';
import ProfileCard from '@/components/molecules/ProfileCard/ProfileCard';
import Statistics from '@/components/molecules/Statistics/Statistics';
import ConferenceList from '@/components/organisms/ConferenceList/ConferenceList';
import { StatisticsData } from '@/interfaces/statistics';

interface MyPageTemplateProps {
    member: Member | null;
    conferences: IConference[] | null;
    statistics: StatisticsData | null;
}

const MyPageTemplate = ({
    member,
    conferences,
    statistics,
}: MyPageTemplateProps) => {
    return (
        <div className="flex flex-col p-[4rem] justify-center items-center gap-dr-30 bg-dr-indigo-400 ">
            {/* 상 */}
            <div className="w-[75%] flex p-[2rem] bg-dr-indigo-300 rounded-lg gap-dr-30">
                {/* 왼 */}
                <div className="flex items-center justify-center rounded-lg w-1/3 p-[2rem] bg-dr-indigo-100">
                    <ProfileCard member={member} />
                </div>
                {/* 오 */}
                <div className="flex items-center justify-center rounded-lg w-2/3 bg-dr-indigo-100">
                    <Statistics statistics={statistics} />
                </div>
            </div>

            {/* 하 */}
            <div className="w-[75%] flex flex-col p-[2rem] bg-dr-indigo-300 rounded-lg gap-dr-30">
                {/* 왼 */}
                <div className="flex items-center justify-center rounded-lg w-full bg-dr-indigo-100">
                    <ConferenceList conferences={conferences} />
                </div>
                {/* 오 */}
                <div className="flex items-center justify-center w-full bg-dr-indigo-100 rounded-lg">
                    <>스터디리스트</>
                </div>
            </div>
        </div>
    );
};

export default MyPageTemplate;
