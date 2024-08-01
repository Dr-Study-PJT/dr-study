'use client';

import { Button, Paragraph, Span } from '@/components/atoms';
import ConferenceControlBar from '@/components/organisms/ConferenceControlBar';
import ConferenceProgress from '@/components/organisms/ConferenceProgress';
import ModeratorAvatar from '@/components/organisms/ModeratorAvatar';
import Signal from '@/components/organisms/Signal/Signal';
import axios from 'axios';
import Peer from 'peerjs';
import React, { useCallback, useEffect, useRef, useState } from 'react';

interface ConferenceTemplateProps {
    conferenceId: string;
}

interface RoomInfoInterface {
    title: string;
    memberCapacity: number;
}

const ConferenceTemplate = ({ conferenceId }: ConferenceTemplateProps) => {
    const DEPLOY_URL = 'https://www.dr-study.kro.kr/v1';
    const LOCAL_URL = 'http://192.168.100.77:8080/v1';

    const [roomInfo, setRoomInfo] = useState<RoomInfoInterface>({
        title: '',
        memberCapacity: 0,
    });

    const [existingPeers, setExistingPeers] = useState<
        Record<string, MediaStream>
    >({});
    const [existingPeerIds, setExistingPeerIds] = useState<string[]>([]);
    const [myPeerId, setMyPeerId] = useState<string>('');

    const [isPeerCreated, setIsPeerCreate] = useState(false); // 내 peer 생성
    const [isMadeLocalStream, setIsMadeLocalStream] = useState(false); // 내 localStream 생성

    const [isFlag, setIsFlag] = useState(0);

    const myPeer = useRef<Peer | null>(null);
    const localStream = useRef<MediaStream | null>(null);

    // // 1. new Peer 내 피어 생성
    const onClickStart = (e: React.MouseEvent<HTMLElement>) => {
        setIsFlag(1);

        myPeer.current = new Peer();
        console.log(`1. 피어 생성`);

        myPeer.current.on('open', (id) => {
            console.log(`2. 피어 오픈됨, 피어아이디->${id}`);
            setMyPeerId(id);
            setIsPeerCreate(true);
            console.log(myPeer.current, '피어 오픈 여부 확인');
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

        console.log('myPeer.current' + myPeer.current.open);
    };

    // 2. 스트림 생성 및 설정
    useEffect(() => {
        if (!isFlag) return;

        console.log(myPeerId, 'myPeerId 체크');
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                localStream.current = stream;
                console.log(
                    localStream.current,
                    '2번 localStream.current 확인',
                );
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
        console.log(peerId, 'join conference');
        try {
            const response = await axios.post(
                `${LOCAL_URL}/conferences/${conferenceId}/join`,
                {
                    peerId,
                },
            ); // API 요청
            console.log(response, '조인 결과');
            const { data } = response.data;
            console.log(data, '조인 결과 data');
            data.existingPeerIds.forEach((remotePeerId: string) =>
                makeCall(remotePeerId),
            );
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
    const startConference = async () => {
        try {
            const response = await axios.post(
                `${LOCAL_URL}/conferences/${conferenceId}/start`,
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
                `${LOCAL_URL}/conferences/${conferenceId}`,
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

    // 자신이 나갔음을 서버에 알리는 함수
    const quitConference = async () => {
        try {
            const response = await axios.post(
                `${LOCAL_URL}/conferences/${conferenceId}/quit`,
                {
                    peerId: myPeerId,
                },
            ); // API 요청
            // setRoomList(response.data); // roomList에 저장
            //
        } catch (error) {
            console.error('Error fetching room list:', error);
        }
    };

    return (
        <div className="p-[30px] flex items-center justify-center bg-dr-indigo-200 h-[100%]">
            <div className="video-container h-[80%]">
                {Object.keys(existingPeers).map((peerId) => (
                    <div
                        key={peerId}
                        className="w-[100%] h-[100%] rounded-xl overflow-hidden"
                    >
                        {/* <h3>User: {peerId}</h3> */}
                        <video
                            ref={(el) => {
                                if (el) {
                                    el.srcObject = existingPeers[peerId];
                                    el.play();
                                }
                            }}
                            autoPlay
                            // muted
                        ></video>
                    </div>
                ))}
            </div>

            <div className="fixed top-0 left-0 w-full h-[10%] bg-dr-gray-500">
                <ConferenceProgress />
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-dr-white shadow-md z-50 ">
                <ConferenceControlBar
                    localStream={localStream.current}
                    existingPeers={existingPeers}
                    setExistingPeers={setExistingPeers}
                />
            </div>

            <div className="fixed bottom-0 left-[50%] w-[10%]">
                <ModeratorAvatar />
            </div>

            <div className="fixed top-16 left-16 p-3 flex flex-col gap-dr-5 rounded-xl bg-dr-black bg-opacity-40">
                <Paragraph>컨퍼런스 페이지 제목 : {roomInfo.title}</Paragraph>
                <Span color="white">최대 인원 : {roomInfo.memberCapacity}</Span>
                <Button fullWidth onClick={onClickStart}>
                    컨퍼런스 시작
                </Button>
            </div>

            <Signal conferenceId={1} memberId={1} />
        </div>
    );
};

export default ConferenceTemplate;
