'use client';

import { Button, Paragraph, Span } from '@/components/atoms';
import ConferenceControlBar from '@/components/organisms/ConferenceControlBar/ConferenceControlBar';
import ConferenceProgress from '@/components/organisms/ConferenceProgress/ConferenceProgress';
import ModeratorAvatar from '@/components/organisms/ModeratorAvatar/Mod';
import Signal from '@/components/organisms/Signal/Signal';
import Video from '@/components/organisms/Video/Video';
import { getSessionStorageItem } from '@/utils/sessionStorage';
import axios from 'axios';
import Peer from 'peerjs';
import React, { useCallback, useEffect, useRef, useState } from 'react';

interface ConferenceTemplateProps {
    conferenceId: number;
}

interface RoomInfoInterface {
    title: string;
    memberCapacity: number;
}

interface clientInterface {
    memberId: string;
    peerId: string;
    streamId: string;
}

const ConferenceTemplate = ({ conferenceId }: ConferenceTemplateProps) => {
    const DEPLOY_URL = 'https://www.dr-study.kro.kr/v1';
    const LOCAL_URL = 'http://192.168.100.77:8080/v1';

    // 방 정보 상태
    const [roomInfo, setRoomInfo] = useState<RoomInfoInterface>({
        title: '', // 방 제목
        memberCapacity: 0, // 방의 최대 인원 수
    });

    // 기존 피어 상태
    const [existingPeers, setExistingPeers] = useState<
        Record<string, MediaStream>
    >({}); // 현재 방에 있는 피어들의 미디어 스트림
    const [existingPeerIds, setExistingPeerIds] = useState<string[]>([]); // 현재 방에 있는 피어들의 ID
    const [myPeerId, setMyPeerId] = useState<string>(''); // 내 피어 ID

    // 피어 생성 여부 상태
    const [isPeerCreated, setIsPeerCreate] = useState(false); // 내 피어가 생성되었는지 여부
    const [isMadeLocalStream, setIsMadeLocalStream] = useState(false); // 내 로컬 스트림이 생성되었는지 여부
    const [isFlag, setIsFlag] = useState(0); // 플래그 상태 (사용 용도에 따라 다름)

    // 시스템에 의한 상태
    const [isMutedBySystem, setIsMutedBySystem] = useState<boolean>(false); // 시스템에 의해 음소거되었는지 여부
    const [focusingMemberId, setFocusingMemberId] = useState<number>(0); // 현재 강조할 멤버의 ID
    const [isAvatarSpeaking, setIsAvatarSpeaking] = useState<boolean>(false); // 아바타 발화 여부
    const [timeForAvatarSpeaking, setTimeForAvatarSpeaking] =
        useState<number>(0); // 아바타 발화 시간
    const [gptSummaryBySystem, setGPTSummaryBySystem] =
        useState<string>('서마리'); // 현재 화면에 표시되는 멤버의 ID
    const [isStartRecordingAudio, setIsStartRecordingAudio] =
        useState<boolean>(false); // 오디오 스트림 시작 신호
    const [timeForAudioRecord, setTimeForAudioRecord] = useState<number>(0); // 오디오 스트림 시작 신호

    // 세션 스토리지에서 멤버 ID 가져오기
    const memberId = getSessionStorageItem('memberData');

    // 피어와 로컬 스트림 참조
    const myPeer = useRef<Peer | null>(null); // 내 피어 객체를 참조
    const localStream = useRef<MediaStream | null>(null); // 로컬 미디어 스트림을 참조

    // 클라이언트 정보 참조
    const client = useRef<clientInterface>({
        memberId: '', // 클라이언트 멤버 ID
        peerId: '', // 클라이언트 피어 ID
        streamId: '', // 클라이언트 스트림 ID
    });

    // 1. new Peer 내 피어 생성
    const onClickStart = (e: React.MouseEvent<HTMLElement>) => {
        setIsFlag(1);

        myPeer.current = new Peer();
        console.log(`1. 피어 생성`);

        myPeer.current.on('open', (id) => {
            console.log(`2. 피어 오픈됨, 피어아이디->${id}`);
            setMyPeerId(id);
            setIsPeerCreate(true);
        });

        myPeer.current.on('call', (call: any) => {
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: true })
                .then((stream) => {
                    call.answer(stream); // Answer the call with an A/V stream.
                    call.on('stream', (remoteStream: MediaStream) => {
                        setExistingPeers((prevPeers) => ({
                            ...prevPeers,
                            [remoteStream.id]: remoteStream, // 수신된 스트림을 기존 Peers에 추가
                        }));
                    });
                });
        });

        console.log('myPeer.current.open 여부 :' + myPeer.current.open);
    };

    // 2. 스트림 생성 및 설정
    useEffect(() => {
        if (!isFlag) return;

        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                localStream.current = stream;
                setExistingPeers((prevPeers) => ({
                    ...prevPeers,
                    [myPeerId]: stream,
                }));
                setIsMadeLocalStream(true);
            })
            .catch((error) =>
                console.error('Error accessing media devices.', error),
            );
    }, [isPeerCreated]);

    // 3. 서버에 다른 이용자의 peerID 요청
    const makeCall = async (remotePeerId?: string) => {
        if (!isFlag) return;

        // 기존에 방에 있는 멤버들에게 전화 연결하기
        console.log(remotePeerId, 'remotePeerId');
        if (remotePeerId) {
            // remotePeerId에 전화 걸기
            console.log(myPeer.current, 'myPeer.current');
            console.log(localStream.current, 'localStream.current');
            const myCall = myPeer.current?.call(
                remotePeerId, // 호출할 Peer ID에
                localStream.current as MediaStream, // 로컬 스트림 전달
            );
            console.log(myCall);
            // 스트림 수신 이벤트 처리
            myCall?.on('stream', (stream) => {
                console.log(`on stream ${existingPeers}`);
                setExistingPeers((prevPeers) => ({
                    ...prevPeers,
                    [remotePeerId]: stream, // 수신된 스트림을 기존 Peers에 추가
                }));
            });
        }
    };

    const joinConference = async (peerId: string) => {
        if (!isFlag) return;

        // 참여할때 peerId 넘기기 함수
        console.log('멤버 아이디(memberId) =>', memberId);
        console.log('피어 아이디(peerId) =>', peerId);
        console.log(
            '로컬 스트림 아이디(localStream.current.id) =>',
            localStream.current?.id,
        );
        console.log(myPeer, '마이피어');
        console.log(localStream.current, '로컬 스트림');

        client.current = {
            memberId,
            peerId,
            streamId: localStream.current?.id as string,
        };

        try {
            const response = await axios.post(
                `${LOCAL_URL}`,
                // `${process.env.NEXT_PUBLIC_HOST}/v1/conferences/${conferenceId}/join`,
                {
                    peerId,
                },
            ); // API 요청
            console.log(response, '조인 결과');
            const { data } = response.data;
            console.log(data, '조인 결과 data');
            data.forEach((remotePeerId: string) => makeCall(remotePeerId));
            // letPeers.push(...existingPeerIds, ...data.existingPeerIds);
            setExistingPeerIds([...existingPeerIds, ...data.existingPeerIds]); // 방에 존재하는 peerIds 저장
        } catch (error) {
            console.error('Error fetching room list:', error);
        }
    };

    // 4. 방에 참가할 때 서버에 알리고, 방에 존재하는 모든 peer에 연결
    useEffect(() => {
        if (!isFlag) return;

        joinConference(myPeerId);

        // 방 나갈때 연결 종료하기
        return () => {
            if (localStream.current) {
                localStream.current
                    .getTracks()
                    .forEach((track) => track.stop());
            }
            if (myPeer.current) {
                myPeer.current.destroy();
            }
        };
    }, [isMadeLocalStream]);

    // 컨퍼런스 룸 시작 함수 (방장만 가능, id가 방장과 일치할 때 조건)
    // 참여할때 peerId 넘기기 함수
    const openConference = async () => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_HOST}/v1/conferences/${conferenceId}/open`,
            ); // API 요청
            console.log('컨퍼런스 시작 성공:', response);
        } catch (error) {
            console.error('Error fetching room list:', error);
        }
    };

    // 컨퍼런스 룸 데이터 조회 함수
    const viewConference = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_HOST}/v1/conferences/${conferenceId}`,
            );
            console.log('컨퍼런스 조회 성공:', response);
            const { data } = response.data; // 응답 데이터에서 data를 추출
            setRoomInfo({
                title: data.title,
                memberCapacity: data.memberCapacity,
            });
        } catch (error) {
            console.error('컨퍼런스 조회 실패:', error);
        }
    };

    return (
        <div className="flex bg-dr-indigo-200 h-[100%] w-full">
            <div className="flex flex-col h-full w-full">
                <div className="fixed w-full h-[10%] bg-dr-dark-200 ">
                    <ConferenceProgress />
                </div>

                <div className="fixed top-[10%] left-0 flex flex-wrap w-[85%] h-[80%]">
                    {Object.keys(existingPeers).map((peerId) => (
                        <>
                            <Video
                                key={peerId}
                                existingPeers={existingPeers}
                                peerId={peerId}
                                focusing={memberId === focusingMemberId}
                            />
                        </>
                    ))}
                    {/* <div
                        key={peerId}
                        className="w-full h-full rounded-xl overflow-hidden"
                    >
                        <video
                            ref={(el) => {
                                if (el) {
                                    el.srcObject = existingPeers[peerId];
                                    el.play();
                                }
                            }}
                            autoPlay
                        ></video>
                    </div> */}
                </div>

                <div className="fixed left-0 bottom-0 w-full h-[10%] ">
                    <ConferenceControlBar
                        localStream={localStream.current}
                        existingPeers={existingPeers}
                        setExistingPeers={setExistingPeers}
                        isMutedBySystem={isMutedBySystem}
                    />
                    <div className="fixed bottom-[10%] left-[50%] w-[10%]">
                        <ModeratorAvatar
                            isAvatarSpeaking={isAvatarSpeaking}
                            timeForAvatarSpeaking={timeForAvatarSpeaking}
                            gptSummaryBySystem={gptSummaryBySystem}
                        />
                    </div>
                </div>
            </div>

            <div className="fixed top-8 left-8 p-3 flex flex-col gap-dr-5 rounded-xl bg-dr-black bg-opacity-40">
                <Paragraph>컨퍼런스 페이지 제목 : {roomInfo.title}</Paragraph>
                <Span color="white">최대 인원 : {roomInfo.memberCapacity}</Span>
                <Button fullWidth onClick={onClickStart}>
                    컨퍼런스 시작
                </Button>
            </div>

            <div className="absolute w-[15%] h-[80%] right-0 top-[10%]">
                <Signal
                    conferenceId={conferenceId}
                    memberId={1}
                    setIsMutedBySystem={setIsMutedBySystem}
                    setFocusingMemberId={setFocusingMemberId}
                    setIsAvatarSpeaking={setIsAvatarSpeaking}
                    setTimeForAvatarSpeaking={setTimeForAvatarSpeaking}
                    setGPTSummaryBySystem={setGPTSummaryBySystem}
                    timeForAudioRecord={timeForAudioRecord}
                    setTimeForAudioRecord={setTimeForAudioRecord}
                    isStartRecordingAudio={isStartRecordingAudio}
                    setIsStartRecordingAudio={setIsStartRecordingAudio}
                />
            </div>
        </div>
    );
};

export default ConferenceTemplate;
