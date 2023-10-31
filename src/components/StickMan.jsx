import React, { useRef, useEffect } from 'react';

function StickMan({ character }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        // Scale factors for responsive design
        const scaleX = canvasWidth / 200; // The original canvas width
        const scaleY = canvasHeight / 300; // The original canvas height

        // Scale the canvas
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        context.lineWidth = 5 * scaleX;

        // Arms
        context.beginPath();
        context.strokeStyle = "black";
        context.moveTo(100 * scaleX, 120 * scaleY);
        context.lineTo(60 * scaleX, 180 * scaleY);
        context.moveTo(100 * scaleX, 120 * scaleY);
        context.lineTo(140 * scaleX, 180 * scaleY);
        context.stroke();

        // Legs
        context.beginPath();
        context.strokeStyle = "black";
        context.moveTo(100 * scaleX, 205 * scaleY);
        context.lineTo(60 * scaleX, 320 * scaleY);
        context.moveTo(100 * scaleX, 205 * scaleY);
        context.lineTo(140 * scaleX, 320 * scaleY);
        context.stroke();

        // Body
        context.beginPath();
        context.moveTo(100 * scaleX, 210 * scaleY);
        context.lineTo(100 * scaleX, 92 * scaleY);
        context.strokeStyle = "black";
        context.stroke();

        // Head
        context.beginPath();
        context.strokeStyle = "black"; // Set the outline color of the head
        context.arc(100 * scaleX, 50 * scaleY, 45 * scaleY, 0, Math.PI * 2, true);
        context.stroke();

        // Insert character in the center of the head
        const fontSize = Math.min(canvasWidth / 4, canvasHeight / 8) * scaleX; // Adjust font size based on canvas size
        context.font = `${fontSize}px Arial`;
        context.fillStyle = "black"; // Set the character text color to black
        context.textAlign = "center";
        context.fillText(character, 100 * scaleX, 65 * scaleY); // Adjust the character text position
    }, [character]);

    return (
        <canvas
            id="myCanvas"
            ref={canvasRef}
            width={200}
            height={300}
            style={{ width: "100%", height: "100%" }}
        />
    );
}

export default StickMan;
