'use client';

// import React, { useState, useEffect, useRef } from 'react';

// const AudioRecorder: React.FC = () => {
//     const [isRecording, setIsRecording] = useState(false);
//     const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
//         null,
//     );
//     const [webmData, setWebmData] = useState<any>();

//     // conference룸에서는 마이크 접근 권한 허가를 얻어야 할 필요가 없을 것임.
//     useEffect(() => {
//         async function requestMicrophoneAccess() {
//             try {
//                 const stream = await navigator.mediaDevices.getUserMedia({
//                     audio: true,
//                 });
//                 const recorder = new MediaRecorder(stream);
//                 setMediaRecorder(recorder);
//             } catch (error) {
//                 console.error('Error accessing microphone:', error);
//             }
//         }

//         requestMicrophoneAccess();
//     }, []);

//     // 녹음이 끝났을 시 webmData 형태로 저장 됨
//     // useEffect(() => {
//     //     console.log(webmData);
//     // }, [webmData]);

//     const startRecording = () => {
//         if (mediaRecorder) {
//             mediaRecorder.start();
//             setIsRecording(true);
//         }
//     };

//     // webm 파일 타입 작성 !필요!
//     const sendWebmToPythonServer = async (webmData: any) => {
//         const request = await fetch('url'); // python api 서버로 데이터를 전송해 음성 처리하도록 할 것
//     };

//     const request = () => {
//         fetch('url');
//     };

//     const stopRecording = () => {
//         if (mediaRecorder) {
//             mediaRecorder.stop();
//             setIsRecording(false);

//             mediaRecorder.ondataavailable = (e) => {
//                 // webmData 를 곧바로 Python API 서버로 보내면 될 것.
//                 sendWebmToPythonServer(e.data);
//                 console.log(e.data);

//                 // if (chunksRef.current.length > 0) {
//                 // const blob = new Blob(chunksRef.current, {
//                 //     type: 'audio/webm',
//                 // });
//                 // chunksRef.current = []; // Clear chunks

//                 const formData = new FormData();
//                 formData.append('audio', e.data, 'recording.webm');

//                 fetch('http://localhost:6080/audio', {
//                     method: 'POST',
//                     body: formData,
//                 })
//                     .then((response) => response.json())
//                     .then((data) => {
//                         console.log('Audio uploaded successfully:', data);
//                     })
//                     .catch((error) => {
//                         console.error('Error uploading audio:', error);
//                     });
//                 // }
//                 // post('http://localhost:6080/audio',body:{data: e.data});
//             };
//         }
//     };

//     return (
//         <div>
//             <button onClick={isRecording ? stopRecording : startRecording}>
//                 {isRecording ? 'Stop Recording' : 'Start Recording'}
//             </button>
//         </div>
//     );
// };

// export default AudioRecorder;

// import React, { useState, useRef } from 'react';

// function App() {
//     const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
//     const [isRecording, setIsRecording] = useState(false);
//     const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//     const chunksRef = useRef<Blob[]>([]);

//     const startAudioStream = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({
//                 audio: true,
//             });
//             setAudioStream(stream);

//             const mediaRecorder = new MediaRecorder(stream, {
//                 mimeType: 'audio/webm',
//             });
//             mediaRecorderRef.current = mediaRecorder;

//             mediaRecorder.ondataavailable = (event) => {
//                 if (event.data.size > 0) {
//                     console.log(event.data);
//                     chunksRef.current.push(event.data);
//                 }
//             };

//             mediaRecorder.onstop = () => {
//                 if (chunksRef.current.length > 0) {
//                     const blob = new Blob(chunksRef.current, {
//                         type: 'audio/webm',
//                     });
//                     chunksRef.current = []; // Clear chunks

//                     const formData = new FormData();
//                     formData.append('audio', blob, 'recording.webm');

//                     fetch('http://localhost:6080/audio', {
//                         method: 'POST',
//                         body: formData,
//                     })
//                         .then((response) => response.json())
//                         .then((data) => {
//                             console.log('Audio uploaded successfully:', data);
//                         })
//                         .catch((error) => {
//                             console.error('Error uploading audio:', error);
//                         });
//                 }
//             };

//             mediaRecorder.start();
//             setIsRecording(true);
//             console.log('Audio recording started');
//         } catch (error) {
//             console.error('Error accessing audio stream:', error);
//         }
//     };

//     const stopAudioStream = () => {
//         if (
//             mediaRecorderRef.current &&
//             mediaRecorderRef.current.state === 'recording'
//         ) {
//             mediaRecorderRef.current.stop();
//             console.log('Audio recording stopped');
//             setIsRecording(false);
//         }

//         if (audioStream) {
//             audioStream.getTracks().forEach((track) => track.stop());
//             setAudioStream(null);
//         }
//     };

//     return (
//         <div className="AudioRecorder">
//             <header className="AudioRecorder-header">
//                 <h1>Audio Recorder</h1>
//                 <button onClick={startAudioStream} disabled={isRecording}>
//                     Start Audio Stream
//                 </button>
//                 <button onClick={stopAudioStream} disabled={!isRecording}>
//                     Stop Audio Stream
//                 </button>
//             </header>
//         </div>
//     );
// }

// export default App;

// import React, { useState, useRef } from "react";
// import "./App.css";

// function App() {
//     const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
//     const [isRecording, setIsRecording] = useState(false);
//     const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//     const socketRef = useRef<WebSocket | null>(null);
//     const chunksRef = useRef<Blob[]>([]);

//     const startAudioStream = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//             setAudioStream(stream);

//             const ws = new WebSocket("http://localhost:6080/".replace(/^http/, 'ws') + "audio");
//             socketRef.current = ws;

//             ws.onopen = () => {
//                 console.log("WebSocket connection opened.");

//                 const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
//                 mediaRecorderRef.current = mediaRecorder;

//                 mediaRecorder.ondataavailable = (event) => {
//                     if (event.data.size > 0) {
//                         chunksRef.current.push(event.data);
//                     }
//                 };

//                 mediaRecorder.onstop = () => {
//                     if (chunksRef.current.length > 0) {
//                         const blob = new Blob(chunksRef.current, { type: "audio/webm" });
//                         chunksRef.current = []; // Clear chunks
//                         const reader = new FileReader();
//                         reader.onload = () => {
//                             if (ws.readyState === WebSocket.OPEN) {
//                                 ws.send(reader.result as ArrayBuffer);
//                                 ws.close();
//                             }
//                         };
//                         reader.readAsArrayBuffer(blob);
//                     }
//                 };

//                 mediaRecorder.start();
//                 setIsRecording(true);
//                 console.log("Audio recording started");
//             };

//             ws.onclose = () => {
//                 console.log("WebSocket connection closed.");
//             };

//             ws.onerror = (error) => {
//                 console.error("WebSocket error:", error);
//             };

//         } catch (error) {
//             console.error("Error accessing audio stream:", error);
//         }
//     };

//     const stopAudioStream = () => {
//         if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
//             mediaRecorderRef.current.stop();
//             console.log("Audio recording stopped");
//             setIsRecording(false);
//         }

//         if (audioStream) {
//             audioStream.getTracks().forEach((track) => track.stop());
//             setAudioStream(null);
//         }
//     };

//     return (
//         <div className="App">
//             <header className="App-header">
//                 <h1>Audio Recorder</h1>
//                 <button onClick={startAudioStream} disabled={isRecording}>Start Audio Stream</button>
//                 <button onClick={stopAudioStream} disabled={!isRecording}>Stop Audio Stream</button>
//             </header>
//         </div>
//     );
// }

// export default App;

import React, { useState, useRef } from 'react';
// import './App.css';

function App() {
    const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const startAudioStream = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            setAudioStream(stream);

            const mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'audio/webm',
            });
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                if (chunksRef.current.length > 0) {
                    const blob = new Blob(chunksRef.current, {
                        type: 'audio/webm',
                    });
                    chunksRef.current = []; // Clear chunks

                    const formData = new FormData();
                    formData.append('file', blob, 'recording.webm');

                    fetch('http://localhost:6080/audio/', {
                        method: 'POST',
                        body: formData,
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log('Audio uploaded successfully:', data);
                        })
                        .catch((error) => {
                            console.error('Error uploading audio:', error);
                        });
                }
            };

            mediaRecorder.start();
            setIsRecording(true);
            console.log('Audio recording started');
        } catch (error) {
            console.error('Error accessing audio stream:', error);
        }
    };

    const stopAudioStream = () => {
        if (
            mediaRecorderRef.current &&
            mediaRecorderRef.current.state === 'recording'
        ) {
            mediaRecorderRef.current.stop();
            console.log('Audio recording stopped');
            setIsRecording(false);
        }

        if (audioStream) {
            audioStream.getTracks().forEach((track) => track.stop());
            setAudioStream(null);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Audio Recorder</h1>
                <button onClick={startAudioStream} disabled={isRecording}>
                    Start Audio Stream
                </button>
                <button onClick={stopAudioStream} disabled={!isRecording}>
                    Stop Audio Stream
                </button>
            </header>
        </div>
    );
}

export default App;
