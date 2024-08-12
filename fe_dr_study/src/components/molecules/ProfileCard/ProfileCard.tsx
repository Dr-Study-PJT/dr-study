import { memberAPI } from '@/app/api/axiosInstanceManager';
import { PATCH, POST } from '@/app/api/routeModule';
import { Member } from '@/app/group/[group_id]/_types';
import { Button } from '@/components/atoms';
import { showToast } from '@/utils/toastUtil';
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';

interface ProfileCardProps {
    member: Member | null;
}

const ProfileCard = ({ member }: ProfileCardProps) => {
    const [isEdit, setIsEdit] = useState(false);
    const [form, setForm] = useState({
        password: '',
        nickname: member?.nickname || '',
        imageUrl: member?.imageUrl || '',
        file: null as File | null, // 파일 상태 추가
    });
    const [imageId, setImageId] = useState<number | null>(null);

    const params = useParams();
    if (!member) {
        return <div>회원 정보가 없습니다.</div>;
    }

    const handleEdit = () => {
        setIsEdit(!isEdit);
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (name === 'imageUrl' && files) {
            const formData = new FormData();
            console.log(files[0]);
            formData.append('file', files[0]);
            formData.append('domain', 'members');

            try {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_HOST}/v1/media`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    },
                );

                const imageId = response.data.data.imageId;
                const imageUrl = URL.createObjectURL(files[0]);

                setImageId(imageId);
                setForm((prev) => ({
                    ...prev,
                    imageUrl: imageUrl,
                }));
                showToast('success', '이미지 업로드 성공!');
            } catch (error) {
                console.error('Image upload failed:', error);
                showToast('error', '이미지 업로드 실패!');
            }
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSave = async () => {
        try {
            const response = await PATCH({
                API: memberAPI,
                endPoint: '',
                body: {
                    nickname: form.nickname,
                    password: form.password,
                    imageId: imageId || 0,
                },
                isAuth: true,
            });

            console.log(response);

            setIsEdit(false);
            showToast('success', '회원 정보가 수정되었습니다.');
        } catch (error) {
            console.error('Error updating member info:', error);
            showToast('error', '회원 정보 수정에 실패했습니다.');
        }
    };

    return (
        <div className=" flex flex-col items-center justify-center text-center text-dr-white gap-dr-10">
            <ToastContainer />
            <div className="relative ">
                <div
                    className={`relative w-[10rem] h-[10rem] rounded-full overflow-hidden ${isEdit && 'border-2 border-dr-coral-500'}`}
                >
                    <Image
                        src={form.imageUrl || member.imageUrl} // 미리보기 이미지
                        alt="프로필 이미지"
                        fill
                        className="bg-dr-coral-50 hover:dr-coral-100"
                    />
                    {isEdit && (
                        <input
                            type="file"
                            name="imageUrl"
                            onChange={handleChange}
                            className="absolute top-0 left-0 bg-dr-white w-full h-full rounded-full opacity-0 cursor-pointer"
                        />
                    )}
                </div>
            </div>
            <div>
                {isEdit ? (
                    <div className="bg-dr-indigo-200">
                        <input
                            type="text"
                            name="nickname"
                            value={form.nickname}
                            onChange={handleChange}
                            placeholder="닉네임"
                            className="bg-dr-indigo-200"
                        />

                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="비밀번호"
                            className="bg-dr-indigo-200"
                        />
                    </div>
                ) : (
                    <>
                        <div className="text-dr-header-2">
                            {member.nickname}
                        </div>
                        <div className="text-dr-gray-300">
                            <p>
                                <span className="text-dr-white">Email</span> :
                                {member.email}
                            </p>
                            <p>
                                <span className="text-dr-white">가입일</span> :
                                {member.regDate}
                            </p>
                        </div>
                    </>
                )}
            </div>
            {member.id === parseInt(params.member_id as string) && (
                <>
                    {isEdit ? (
                        <div className="flex gap-dr-10">
                            <Button onClick={handleSave}>저장</Button>
                            <Button color="gray" onClick={handleEdit}>
                                수정 취소
                            </Button>
                        </div>
                    ) : (
                        <Button onClick={handleEdit}>회원 정보 수정하기</Button>
                    )}
                </>
            )}
        </div>
    );
};

export default ProfileCard;
