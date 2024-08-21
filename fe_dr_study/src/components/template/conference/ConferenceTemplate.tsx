'use client';

import { POST } from '@/app/api/routeModule';
import ConferenceControlBar from '@/components/organisms/ConferenceControlBar/ConferenceControlBar';
import ConferenceProgress, {
    Timer,
} from '@/components/organisms/ConferenceProgress/ConferenceProgress';
import ModeratorAvatar from '@/components/organisms/ModeratorAvatar/Mod';
import Signal from '@/components/organisms/Signal/Signal';
import Video from '@/components/organisms/Video/Video';
import Peer from 'peerjs';
import React, { useEffect, useRef, useState } from 'react';
import { conferenceAPI as API } from '@/app/api/axiosInstanceManager';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import TotalSummary from '@/components/organisms/ModeratorAvatar/TotalSummary';
import { ConferenceData } from '@/interfaces/conference';
import { useDispatch } from 'react-redux';
import { setIsAvatarSpeaking } from '@/store/slices/isAvatarSpeakingSlice';
import { setTimeForAvatarSpeaking } from '@/store/slices/timeForAvatarSpeakingSlice';
import { setIsMutedBySystem } from '@/store/slices/isMutedBySystemSlice';
import { setGptSummaryBySystem } from '@/store/slices/gptSummaryBySystemSlice';
import { initSummaryMessages } from '@/store/slices/summaryMessagesSlice';
import { setAvatarDialogue } from '@/store/slices/avatarDialogueSlice';
import { setTimeForAudioRecord } from '@/store/slices/timeForAudioRecord';
import { setFocusingId } from '@/store/slices/conferenceFocusingPeerIdSlice';
import { IMemberData } from '@/interfaces/members';

interface ConferenceTemplateProps {
    conferenceInfo: ConferenceData | null;
    memberData: IMemberData;
}

export interface ClientInterface {
    memberId: number;
    peerId: string;
    streamId: string;
}

export interface SummaryMessageInterface {
    message: string;
    time: string;
}

const ConferenceTemplate = ({
    conferenceInfo,
    memberData,
}: ConferenceTemplateProps) => {
    // stompClient 상태
    const [stompClient, setStompClient] = useState<any>(null);

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

    // 조인 상태
    const [isJoined, setIsJoined] = useState<boolean>(false); // 방에 조인되었는지 여부

    // 현재 멤버
    const [currentMembers, setCurrentMembers] = useState<any[]>([
        {
            id: memberData?.id,
            nickname: memberData?.nickname,
            imageUrl: memberData?.imageUrl,
        },
    ]);

    // device 상태
    const [audioInputs, setAudioInputs] = useState<MediaDeviceInfo[]>([]); // 디바이스 목록
    const [audioOutputs, setAudioOutputs] = useState<MediaDeviceInfo[]>([]); // 디바이스 목록
    const [videoInputs, setVideoInputs] = useState<MediaDeviceInfo[]>([]); // 디바이스 목록

    // 클라이언트 정보 참조
    const client = useRef<ClientInterface>({
        memberId: -1, // 클라이언트 멤버 ID
        peerId: '', // 클라이언트 피어 ID
        streamId: '', // 클라이언트 스트림 ID
    });

    // 피어와 로컬 스트림 참조
    const myPeer = useRef<Peer | null>(null); // 내 피어 객체를 참조
    const localStream = useRef<MediaStream | null>(null); // 로컬 미디어 스트림을 참조

    // 구독 목록
    const subscriptionList = useRef<string[]>([]);

    // 소켓 생성 및 Stomp 클라이언트 생성
    const BACK_HOST = process.env.NEXT_PUBLIC_HOST;
    const ENDPOINT = 'room';
    const sockTargetUrl = `${BACK_HOST}/${ENDPOINT}`;

    useEffect(() => {
        onClickJoin();
    }, []);

    const dispatch = useDispatch();

    const initConference = () => {
        console.log('initConference');
        dispatch(setIsAvatarSpeaking(false));
        dispatch(setTimeForAvatarSpeaking(0));
        dispatch(setIsMutedBySystem(false));
        dispatch(setGptSummaryBySystem(''));
        dispatch(initSummaryMessages());
        dispatch(setAvatarDialogue(''));
        dispatch(setTimeForAudioRecord(0));
        dispatch(setFocusingId(''));
    };

    // 1. new Peer 내 피어 생성
    const onClickJoin = () => {
        setIsFlag(1);
        initConference();

        myPeer.current = new Peer();

        myPeer.current.on('open', (id) => {
            setMyPeerId(id);
            setIsPeerCreate(true);
            setExistingPeerIds([id]);
        });

        myPeer.current.on('call', (call: any) => {
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: true })
                ?.then((stream) => {
                    call.answer(stream); // Answer the call with an A/V stream.
                    call.on('stream', (remoteStream: MediaStream) => {
                        setExistingPeers((prevPeers) => ({
                            ...prevPeers,
                            [call.peer]: remoteStream, // 수신된 스트림을 기존 Peers에 추가
                        }));
                    });
                });
        });
    };

    const setDevices = (devices: MediaDeviceInfo[]) => {
        devices.forEach((device) => {
            switch (device.kind) {
                case 'audioinput':
                    setAudioInputs((prev) => [...prev, device]);
                    break;
                case 'audiooutput':
                    setAudioOutputs((prev) => [...prev, device]);
                    break;
                case 'videoinput':
                    setVideoInputs((prev) => [...prev, device]);
                    break;

                default:
                    break;
            }
        });
    };

    // 2. 스트림 생성 및 설정
    useEffect(() => {
        if (!isFlag) return;

        if (!navigator.mediaDevices) {
            return;
        }

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

    // 기존에 방에 있는 멤버들에게 전화 연결하기
    const makeCall = async (remotePeerId?: string) => {
        if (!isFlag) return;

        if (remotePeerId) {
            const myCall = myPeer.current?.call(
                remotePeerId, // 호출할 Peer ID에
                localStream.current as MediaStream, // 로컬 스트림 전달
            );

            // 스트림 수신 이벤트 처리
            myCall?.on('stream', (stream) => {
                setExistingPeers((prevPeers) => ({
                    ...prevPeers,
                    [remotePeerId]: stream, // 수신된 스트림을 기존 Peers에 추가
                }));
            });
        }
    };

    // 회의에 참여하기 위해 모든 피어에 전화 연결
    const joinConference = async (peerId: string) => {
        if (!isFlag) return;

        client.current = {
            memberId: memberData.id,
            peerId,
            streamId: localStream.current?.id as string,
        };

        try {
            const response = await POST({
                API: API,
                endPoint: `${conferenceInfo?.id}/join`,
                body: { peerId },
                isAuth: true,
            });

            const { data } = response.data;

            setCurrentMembers((prevMembers) => [
                ...prevMembers,
                ...data.existingMembers,
            ]);

            data.existingPeerIds.forEach((remotePeerId: string) =>
                makeCall(remotePeerId),
            );

            const socket = new SockJS(sockTargetUrl); // SockJS 소켓 생성
            const clientStomp = Stomp.over(socket); // Stomp 클라이언트 생성

            setStompClient(clientStomp); // 생성한 Stomp 클라이언트 상태에 저장

            setIsJoined(true);
            setExistingPeerIds([...existingPeerIds, ...data.existingPeerIds]); // 방에 존재하는 peerIds 저장
        } catch (error) {
            console.error('Error joining conference:', error);
        }
    };

    return (
        <div className="flex h-[100%] w-[100%] bg-[#191B28] border-b-[1px] border-dr-indigo-0">
            <div className="flex flex-col w-full h-full">
                <div className="fixed w-4/5 h-[11%] bg-[#191B28] border-b-[1px] border-dr-indigo-0">
                    <ConferenceProgress />
                </div>
                <div className="h-[11%]"></div>
                <div className="flex w-full h-[80%] bg-[#242736] border-b-[1px] border-dr-indigo-0">
                    <div className="CAM-LIST-PARTICIPANTS relative flex flex-wrap flex-1 h-[100%] p-4">
                        {Object.keys(existingPeers).map((peerId) => {
                            return (
                                <React.Fragment key={peerId}>
                                    <Video
                                        existingPeers={existingPeers}
                                        peerId={peerId}
                                        client={client.current}
                                    />
                                </React.Fragment>
                            );
                        })}
                    </div>

                    <Signal
                        currentMembers={currentMembers}
                        setCurrentMembers={setCurrentMembers}
                        conferenceInfo={conferenceInfo}
                        client={client.current}
                        isJoined={isJoined}
                        existingPeers={existingPeers}
                        setExistingPeers={setExistingPeers}
                        subscriptionList={subscriptionList.current}
                        stompClient={stompClient}
                        memberData={memberData}
                        conferenceId={conferenceInfo?.id || 0}
                    />
                </div>

                <div className="fixed left-0 bottom-0 w-4/5 h-[9%] z-30 bg-[#191B28] border-t-[1px] border-dr-indigo-0">
                    <ConferenceControlBar
                        audioInputs={audioInputs}
                        audioOutputs={audioOutputs}
                        videoInputs={videoInputs}
                        subscriptionList={subscriptionList.current}
                        client={client.current}
                        stompClient={stompClient}
                        conferenceId={conferenceInfo?.id || 0}
                        localStream={localStream.current}
                        existingPeers={existingPeers}
                        setExistingPeers={setExistingPeers}
                    />
                    <div className="fixed bottom-[9%] left-[40%] w-[10%] z-40 ">
                        <ModeratorAvatar conferenceInfo={conferenceInfo} />
                    </div>
                </div>
            </div>
            <TotalSummary />
        </div>
    );
};

export default ConferenceTemplate;
