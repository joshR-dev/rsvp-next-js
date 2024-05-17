// src/HeartCanvas.tsx
import React, { useRef, useEffect } from "react";

interface HeartCanvasProps {
	fillColor?: string;
	borderColor?: string;
	width?: number;
	height?: number;
}

const HeartCanvas: React.FC<HeartCanvasProps> = ({
	fillColor = "#fff",
	borderColor = "#000",
	width = 50,
	height = 50,
}) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas) {
			const ctx = canvas.getContext("2d");
			if (ctx) {
				drawHeart(ctx, fillColor, borderColor, width, height);
			}
		}
	}, [fillColor, borderColor, width, height]);

	const drawHeart = (
		ctx: CanvasRenderingContext2D,
		fillColor: string,
		borderColor: string,
		width: number,
		height: number
	) => {
		ctx.clearRect(0, 0, width, height);
		ctx.fillStyle = fillColor;
		ctx.strokeStyle = borderColor;
		ctx.lineWidth = 2;

		const x = width / 2;
		const y = height / 2;
		const scale = Math.min(width, height) / 400; // Adjust scale to fit the canvas size

		ctx.save();
		ctx.translate(x, y);
		ctx.scale(scale, scale);
		ctx.beginPath();
		ctx.moveTo(0, -30);
		ctx.bezierCurveTo(0, -37, -30, -60, -60, -60);
		ctx.bezierCurveTo(-120, -60, -120, 7.5, -120, 7.5);
		ctx.bezierCurveTo(-120, 60, -60, 90, 0, 120);
		ctx.bezierCurveTo(60, 90, 120, 60, 120, 7.5);
		ctx.bezierCurveTo(120, 7.5, 120, -60, 60, -60);
		ctx.bezierCurveTo(30, -60, 0, -37, 0, -30);
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	};

	return (
		<div>
			<canvas ref={canvasRef} width={width} height={height}></canvas>
		</div>
	);
};

export default HeartCanvas;
