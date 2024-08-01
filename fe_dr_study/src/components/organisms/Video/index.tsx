import React from 'react';

const Video = ({ existingPeers }: any) => {
    return (
        <div>
            {Object.keys(existingPeers).map((peerId) => (
                <div
                    key={peerId}
                    className="w-[100%] h-[100%] rounded-xl overflow-hidden"
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
                </div>
            ))}
        </div>
    );
};

export default Video;
