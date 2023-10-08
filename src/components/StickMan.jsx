import React, { useRef, useEffect } from 'react';

function StickMan({ character }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        context.lineWidth = 5;

        // Arms
        context.beginPath();
        context.strokeStyle = "pink";
        context.moveTo(100, 120);
        context.lineTo(60, 180);
        context.moveTo(100, 120);
        context.lineTo(140, 180);
        context.stroke();

        // Legs
        context.beginPath();
        context.strokeStyle = "brown";
        context.moveTo(100, 205);
        context.lineTo(60, 320);
        context.moveTo(100, 205);
        context.lineTo(140, 320);
        context.stroke();

        // Body
        context.beginPath();
        context.moveTo(100, 210);
        context.lineTo(100, 100);
        context.strokeStyle = "navy";
        context.stroke();

        // Head
        context.beginPath();
        context.fillStyle = "#0000ff";
        context.arc(100, 50, 50, 0, Math.PI * 2, true);
        context.fill();

        // Insert character in the center of the head
        context.font = "36px Arial";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.fillText(character, 100, 65);
    }, [character]);

    return (
        <canvas
            id="myCanvas"
            ref={canvasRef}
            width={200}
            height={300}
        />
    );
}

export default StickMan;
