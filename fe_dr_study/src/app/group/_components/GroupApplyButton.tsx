'use client';
import { Button } from '@/components/atoms';
import { postGroupAdmissionApply } from '../[group_id]/_api/csr';

interface GroupApplyButtonProps {
    groupId: string;
}

const GroupApplyButton: React.FC<GroupApplyButtonProps> = ({ groupId }) => {
    const onClickApplyHandler = async (e: React.MouseEvent<HTMLElement>) => {
        await postGroupAdmissionApply({
            groupId,
            message: '스터디 그룹 가입 신청합니다!',
        });
    };
    return <Button onClick={onClickApplyHandler}>스터디 가입 신청</Button>;
};

export default GroupApplyButton;
