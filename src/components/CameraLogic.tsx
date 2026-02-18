"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "./shadcnui/button";

const CameraLogic = () => {
	const videoref = useRef<HTMLVideoElement>(null);
	const canvas = useRef<HTMLCanvasElement>(null);

	const [filter, setFilter] = useState("none");
	const [image, setImage] = useState<string | null>(null);

	const StartCamera = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ video: true });

			if (videoref.current) {
				videoref.current.srcObject = stream;
			}
		} catch (err) {
			console.error("Camera error:", err);
		}
	};

	const CaptureFn = () => {
		const video = videoref.current;
		const canvasElement = canvas.current;

		if (!video || !canvasElement) return;

		const context = canvasElement.getContext("2d");
		if (!context) return;

		canvasElement.width = video.videoWidth;
		canvasElement.height = video.videoHeight;

		context.filter = filter;
		context.drawImage(video, 0, 0);

		const dataUrl = canvasElement.toDataURL("image/jpeg");
		setImage(dataUrl);
	};

	return (
		<div>
			<h1>Camera Mini Project</h1>

			<Button
				onClick={StartCamera}
				className="cursor-pointer"
				variant={"destructive"}>
				Start Camera
			</Button>

			<div>
				<select onChange={(e) => setFilter(e.target.value)}>
					<option value="none">None</option>
					<option value="grayscale(100%)">Grayscale</option>
					<option value="sepia(100%)">Sepia</option>
					<option value="contrast(150%)">High Contrast</option>
					<option value="blur(3px)">Blur</option>
				</select>
			</div>

			<div>
				<video
					ref={videoref}
					autoPlay
					playsInline
					style={{ filter }}
					width={400}
				/>
			</div>

			<button onClick={CaptureFn}>Capture</button>

			<canvas
				ref={canvas}
				style={{ display: "none" }}
			/>

			{image && (
				<div>
					<h2>Captured Image</h2>
					<Image
						alt="image"
						src={image}
						width={400}
					/>
				</div>
			)}
		</div>
	);
};

export default CameraLogic;
