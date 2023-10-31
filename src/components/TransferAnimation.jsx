import Arrow from "./Arrow.jsx";
import React, {useState, useEffect} from "react";

export const TransferAnimation = () => {
    const [isAnimatingToLeft, setIsAnimatingToLeft] = useState(null);
    const [isAnimatingToRight, setIsAnimatingToRight] = useState(null);
    const [showRightEnvelopeOpen, setShowRightEnvelopeOpen] = useState(null)
    const [showLeftEnvelopeOpen, setShowLeftEnvelopeOpen] = useState(null)

    const animationDuration = 3000;
    const startAnimationLoop = () => {
        setShowRightEnvelopeOpen(false);
        setShowLeftEnvelopeOpen(false);
        setIsAnimatingToRight(true);

        setTimeout(() => {
            setIsAnimatingToRight(false);
            setShowRightEnvelopeOpen(true);
            setTimeout(() => {
                setIsAnimatingToLeft(true);
                setTimeout(() => {
                    setIsAnimatingToLeft(false);
                    setShowLeftEnvelopeOpen(true)
                    setTimeout(() => {
                        startAnimationLoop();
                    }, animationDuration - 1000);
                }, animationDuration);
            }, animationDuration);
        }, animationDuration);
    };

    useEffect(() => {
        startAnimationLoop();
    }, []);

    return (
        <div>
            <Arrow
                isRight={true}
                width={100}
                isAnimatingToRight={isAnimatingToRight}
                isAnimatingToLeft={isAnimatingToLeft}
                showRightEnvelopeOpen={showRightEnvelopeOpen}
                showLeftEnvelopeOpen={showLeftEnvelopeOpen}
            />
            <div style={{margin: '40px 0'}}/>
            <Arrow
                isRight={false}
                width={100}
                isAnimatingToRight={isAnimatingToRight}
                isAnimatingToLeft={isAnimatingToLeft}
                showRightEnvelopeOpen={showRightEnvelopeOpen}
                showLeftEnvelopeOpen={showLeftEnvelopeOpen}
            />
        </div>
    );
};
