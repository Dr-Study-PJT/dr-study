'use client';

import { Paragraph, Span } from '@/components/atoms';
import Room from '@/components/organisms/Room/Room';
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
    const [roomInfo, setRoomInfo] = useState<RoomInfoInterface>({
        title: '',
        memberCapacity: 0,
    });

    const [existingPeers, setExistingPeers] = useState<
        Record<string, MediaStream>
    >({});
    const [existingPeerIds, setExistingPeerIds] = useState<string[]>([]);
    const [remotePeerId, setRemotePeerId] = useState('');

    const myPeer = useRef<Peer | null>(null);
    const [myPeerId, setMyPeerId] = useState<string>('');
    const myPeerIdRef = useRef<string>('');
    const localStream = useRef<MediaStream | null | undefined>(null);

    const [isPeerCreated, setIsPeerCreate] = useState(false); // 내 peer 생성
    const [isMadeLocalStream, setIsMadeLocalStream] = useState(false); // 내 localStream 생성
    const [isPeerIdsRequested, setIsPeerIdsRequested] = useState(false); // 다른 이용자 peerIds 요청

    const [isFlag, setIsFlag] = useState(0);

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
    // // 1. new Peer 내 피어 생성
    // useEffect(() => {
    //     console.log('호출시도' + isFlag);
    //     if (isFlag !== 0) {
    //         return;
    //     }

    //     // myPeer 인스턴스 생성
    // }, []);

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
                `http://172.30.1.81:8080/v1/conferences/${conferenceId}/join`,
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

    useEffect(() => {
        if (!isFlag) return;

        console.log(isMadeLocalStream, localStream.current, '4번');
        console.log('myPeerId:', myPeerId, '4번');

        joinConference(myPeerId);
    }, [isMadeLocalStream]);

    useEffect(() => {
        console.log(existingPeers);
    }, [existingPeers]);

    // // 컨퍼런스 룸 시작 함수 (방장만 가능, id가 방장과 일치할 때 조건)
    // // 참여할때 peerId 넘기기 함수
    // const startConference = async () => {
    //     try {
    //         const response = await axios.post(
    //             `http://172.30.1.81:8080/v1/conferences/${conferenceId}/start`,
    //         ); // API 요청
    //         console.log('컨퍼런스 시작 성공:', response);
    //     } catch (error) {
    //         console.error('Error fetching room list:', error);
    //     }
    // };

    // // 컨퍼런스 룸 데이터 조회 함수
    // const viewConference = async () => {
    //     try {
    //         const response = await axios.get(
    //             `http://172.30.1.81:8080/v1/conferences/${conferenceId}`,
    //         );
    //         console.log('컨퍼런스 조회 성공:', response);
    //         const { data } = response.data; // 응답 데이터에서 data를 추출
    //         setRoomInfo({
    //             title: data.title,
    //             memberCapacity: data.memberCapacity,
    //         });
    //     } catch (error) {
    //         console.error('컨퍼런스 조회 실패:', error);
    //     }
    // };

    // let letPeers = [];

    // 자신이 나갔음을 서버에 알리는 함수
    // const quitConference = async () => {
    //     try {
    //         const response = await axios.post(
    //             `http://192.168.100.77:8080/v1/conferences/${conferenceId}/quit`,
    //             {
    //                 peerId: myPeerId,
    //             },
    //         ); // API 요청
    //         // setRoomList(response.data); // roomList에 저장
    //         //
    //     } catch (error) {
    //         console.error('Error fetching room list:', error);
    //     }
    // };

    // // PeerJS 인스턴스 생성 및 연결
    // useEffect(() => {
    //     // myPeer 인스턴스 생성
    //     myPeer.current = new Peer();
    //     console.log('myPeer 생성됨 : ' + myPeer.current);

    //     // PeerJS 인스턴스의 ID가 생성되면 myPeerId 저장. immutable
    //     myPeer.current.on('open', (id) => {
    //         console.log("myPeer.current.on('open') start");
    //         setMyPeerId(id);
    //         myPeerIdRef.current = id;
    //         makeLocalStream();
    //         joinConference(id);
    //         console.log('My peer ID is: ' + id);
    //     });

    //     // 통화 수신 처리
    //     myPeer.current.on('call', (call) => {
    //         console.log(
    //             `myPeer.current.on('call'), localStream => ${localStream.current}`,
    //         );
    //         // 호출이 수신되면
    //         call.answer(localStream.current as MediaStream); // 수신된 호출에 로컬 스트림으로 응답하기
    //         // 상대방의 스트림 수신 처리, stream 콜백 인자에 스트림 정보가 들어 있음
    //         call.on('stream', (stream) => {
    //             setExistingPeers((prevPeers) => ({
    //                 // 원격 비디오 스트림 저장
    //                 ...prevPeers,
    //                 [call.peer]: stream,
    //             }));
    //         });
    //     });

    //     // 사용자 믿기어 스트림 요청
    //     const makeLocalStream = () => {
    //         console.log(
    //             `before navigator.mediaDevices create local stream, localStream state => ${localStream}`,
    //         );
    //         navigator.mediaDevices
    //             .getUserMedia({ video: true, audio: true })
    //             .then((stream) => {
    //                 // 로컬 스트림 정보 저장
    //                 localStream.current = stream;
    //                 console.log(stream);
    //                 console.log('localStream.current: =>', localStream.current);
    //                 console.log(myPeerIdRef);
    //                 setExistingPeers((prevPeers) => ({
    //                     ...prevPeers,
    //                     [myPeerIdRef.current]: stream, // 피어에 자신의 스트림 추가
    //                 }));
    //             })
    //             .catch((error) =>
    //                 console.error('Error accessing media devices.', error),
    //             );

    //         console.log(
    //             `after navigator.mediaDevices create local stream, localStream state => ${localStream}`,
    //         );
    //     };

    //     // 방 나갈때 연결 종료하기
    //     return () => {
    //         if (localStream.current) {
    //             localStream.current
    //                 .getTracks()
    //                 .forEach((track) => track.stop());
    //         }
    //         if (myPeer.current) {
    //             myPeer.current.destroy();
    //         }
    //     };
    // }, []);

    // const makeCall = (member) => {
    //     if (member || remotePeerId) {
    //       const myCall = myPeer.current.call(
    //         member || remotePeerId,
    //         localStream.current
    //       );

    //       myCall?.on('stream', (stream) => {
    //         setConnectedPeers(
    //           (prevPeers) => (
    //             console.log(prevPeers, 'prevPeers-----------------------'),
    //             {
    //               ...prevPeers,
    //               [member || remotePeerId]: stream,
    //             }
    //           )
    //         );
    //       });
    //     }
    //   };

    // useEffect(() => {
    //     console.log('myPeerIdRef.current', myPeerIdRef.current);
    //     console.log(`existingPeerIds => ${existingPeerIds}`);
    //     viewConference(); // 컨퍼런스 정보 불러옴
    //     startConference(); // 컨퍼런스 시작을 서버에 알림
    //     joinConference(myPeerIdRef.current); // 참여할때 peerId 넘기고, 연결할 방의 peer 아이디 목록 저장
    //     // existingPeerIds.forEach((remotePeerId) => makeCall(remotePeerId));
    // }, [myPeer.current]);

    // useEffect(() => {
    //     // 모든 방 멤버에게 전화 걸기
    //     if (existingPeerIds.length > 0) {
    //         existingPeerIds.forEach((remotePeerId) => makeCall(remotePeerId));
    //     }
    // }, []);

    // useEffect(() => {
    //     console.log(existingPeers, 'existingPeers');
    // }, [existingPeers]);

    return (
        <div>
            <h1>컨퍼런스 페이지 제목 : {roomInfo.title}</h1>
            <button className="bg-red-700" onClick={onClickStart}>
                시작
            </button>
            {/* <input
                type="text"
                value={remotePeerId}
                // value={remotePeerId-----}
                onChange={(e) => setRemotePeerId(e.target.value)}
                placeholder="Enter peer ID to call"
            />
            <button onClick={(e) => makeCall()}>Call</button> */}

            <Span>최대 인원 : {roomInfo.memberCapacity}</Span>
            {/* <Room
                myPeer={myPeer.current}
                myPeerId={myPeerId}
                localStream={localStream.current}
                initialPeers={existingPeers}
                initialPeerIds={existingPeerIds}
            /> */}
            {/* 
            {Object.keys(existingPeerIds).map(
                (peerId) =>
                    peerId !== '' && (
                        <div key={peerId} className="video-item">
                            <h3>User: {peerId}</h3>
                            <video
                                ref={(el) => {
                                    if (el) {
                                        el.srcObject = existingPeerIds[peerId];
                                        el.play();
                                    }
                                }}
                                autoPlay
                                muted
                                style={{ width: '300px', height: '200px' }}
                            ></video>
                        </div>
                    ),
            )} */}

            <div className="video-container">
                {Object.keys(existingPeers).map((peerId) => (
                    <div key={peerId} className="video-item">
                        <h3>User: {peerId}</h3>
                        <video
                            ref={(el) => {
                                if (el) {
                                    el.srcObject = existingPeers[peerId];
                                    el.play();
                                }
                            }}
                            autoPlay
                            muted
                            style={{ width: '300px', height: '200px' }}
                        ></video>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConferenceTemplate;
