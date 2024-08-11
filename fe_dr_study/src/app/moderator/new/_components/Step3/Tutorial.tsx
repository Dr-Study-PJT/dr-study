import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/atoms';

interface TutorialStep {
    selector: string;
    content: string;
}

interface TutorialProps {
    steps: TutorialStep[];
    onClose: () => void;
}

const Tutorial: React.FC<TutorialProps> = ({ steps, onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [position, setPosition] = useState<{ top: number; left: number }>({
        top: 0,
        left: 0,
    });
    const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);
    const tutorialRef = useRef<HTMLDivElement | null>(null);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onClose();
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    useEffect(() => {
        // Disable body scrolling when the tutorial is active
        document.body.style.overflow = 'hidden';

        const targetElement = document.querySelector(
            steps[currentStep].selector,
        );
        if (targetElement && tutorialRef.current) {
            const rect = targetElement.getBoundingClientRect();
            setHighlightRect(rect);
            setPosition({
                top:
                    rect.top +
                    window.scrollY -
                    tutorialRef.current.offsetHeight -
                    10,
                left:
                    rect.left +
                    window.scrollX +
                    rect.width / 2 -
                    tutorialRef.current.offsetWidth / 2,
            });
        }

        // Cleanup function to restore body scrolling
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [currentStep, steps]);

    const maskStyle: React.CSSProperties = highlightRect
        ? {
              WebkitMaskImage: `linear-gradient(black, black)`,
              WebkitMaskSize: `${highlightRect.width}px ${highlightRect.height}px`,
              WebkitMaskPosition: `${highlightRect.left}px ${highlightRect.top}px`,
              WebkitMaskRepeat: 'no-repeat',
              maskImage: `linear-gradient(black, black)`,
              maskSize: `${highlightRect.width}px ${highlightRect.height}px`,
              maskPosition: `${highlightRect.left}px ${highlightRect.top}px`,
              maskRepeat: 'no-repeat',
              position: 'fixed',
              inset: 0,
              clipPath: `polygon(
                  0 0,
                  100% 0,
                  100% 100%,
                  0 100%,
                  0 ${highlightRect.top}px,
                  ${highlightRect.left}px ${highlightRect.top}px,
                  ${highlightRect.left}px ${highlightRect.bottom}px,
                  ${highlightRect.right}px ${highlightRect.bottom}px,
                  ${highlightRect.right}px ${highlightRect.top}px,
                  0 ${highlightRect.top}px
              )`,
          }
        : {};

    return (
        <div>
            {/* Backdrop with a mask effect */}
            <div
                className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm"
                style={maskStyle}
            ></div>

            {/* Tutorial pop-up */}
            <div
                ref={tutorialRef}
                className="fixed z-50 bg-dr-indigo-50 border border-gray-300 p-4 rounded-md shadow-lg max-w-36 text-dr-body-4"
                style={{ top: position.top, left: position.left }}
            >
                <p>{steps[currentStep].content}</p>
                <div className="flex justify-between mt-2">
                    <Button
                        onClick={handlePrevious}
                        disabled={currentStep === 0}
                    >
                        이전
                    </Button>
                    <Button onClick={handleNext}>
                        {currentStep === steps.length - 1 ? '완료' : '다음'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Tutorial;
