import { GroupData, Member } from '@/app/group/[group_id]/_types';
import { IConference } from '@/app/group/[group_id]/dummy';
import GroupCard from '@/app/group/list/components/GroupCard';
import ProfileCard from '@/components/molecules/ProfileCard/ProfileCard';
import Statistics from '@/components/molecules/Statistics/Statistics';
import ConferenceList from '@/components/organisms/ConferenceList/ConferenceList';
import { StatisticsData } from '@/interfaces/statistics';

interface MyPageTemplateProps {
    member: Member | null;
    conferences: IConference[];
    statistics: StatisticsData | null;
    myGroups: GroupData[];
}

const MyPageTemplate = ({
    member,
    conferences,
    statistics,
    myGroups,
}: MyPageTemplateProps) => {
    return (
        <div className="flex flex-col p-[4rem] justify-center items-center gap-dr-30 bg-dr-indigo-400 ">
            {/* 상 */}
            <div className="w-[75%] flex p-[2rem] bg-dr-indigo-300 rounded-lg gap-dr-30">
                {/* 왼 */}
                <div className="flex items-center justify-center rounded-lg w-1/3 p-[2rem] bg-dr-indigo-100 shadow-dr-rb-2">
                    <ProfileCard member={member} />
                </div>
                {/* 오 */}
                <div className="flex items-start justify-start px-12 rounded-lg w-full bg-dr-indigo-100 shadow-dr-rb-2">
                    <Statistics statistics={statistics} />
                </div>
            </div>

            {/* 하 */}
            <div className="w-[75%] flex flex-col p-[2rem] bg-dr-indigo-300 rounded-lg gap-dr-30">
                {/* 왼 */}
                <div className="flex items-center justify-center rounded-lg w-full bg-dr-indigo-100 shadow-dr-rb-2">
                    <ConferenceList conferences={conferences} />
                </div>
                {/* 오 */}
                <div className="flex flex-col items-center justify-center w-full bg-dr-indigo-100 rounded-lg px-[2rem] shadow-dr-rb-2">
                    <div className="text-left text-dr-header-3 text-dr-coral-50 pt-[2rem] pb-[1rem] font-bold w-full">
                        가입된 스터디 그룹
                    </div>

                    {myGroups?.map((group) => (
                        <GroupCard
                            key={group.id}
                            id={group.id}
                            name={group.name}
                            imageUrl={group.imageUrl}
                            description={group.description}
                            createdAt={group.createdAt}
                            tags={group.tags}
                            memberCount={group.memberCount}
                            memberCapacity={group.memberCapacity}
                            widthFull
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyPageTemplate;
