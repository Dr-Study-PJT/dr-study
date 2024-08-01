'use client';

interface ConferenceControlBarProps {}

const ConferenceProgress = ({}: ConferenceControlBarProps) => {
    const steps = ['1단계', '2단계', '3단계', '4단계', '5단계'];
    const presenters = [
        '진행자A',
        '진행자B',
        '사회자',
        '진행자A',
        '진행자B',
        '사회자',
    ];

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="flex space-x-4 mb-4">
                {steps.map((step, index) => (
                    <div key={index} className="bg-gray-300 px-4 py-2 rounded">
                        {step}
                    </div>
                ))}
            </div>
            <div className="flex space-x-4">
                {presenters.map((presenter, index) => (
                    <div key={index} className="bg-gray-300 px-4 py-2 rounded">
                        {presenter}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConferenceProgress;
