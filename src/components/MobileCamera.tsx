"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Webcam from "react-webcam";

import { Camera, RotateCcw, X } from "lucide-react";
import { Button } from "./shadcnui/button";

interface MobileCameraProps {
	onCapture?: (img: string) => void;
}

const MobileCamera = ({ onCapture }: MobileCameraProps) => {
	const webcamRef = useRef<Webcam>(null);
	const [open, setOpen] = useState(false);
	const [facingMode, setFacingMode] = useState<"user" | "environment">(
		"environment",
	);
	const [captured, setCaptured] = useState<string | null>(null);

	const revokeImage = () => {
		if (captured) {
			URL.revokeObjectURL(captured);
		}
	};

	const capture = () => {
		const video = webcamRef.current?.video;
		if (!video) return;

		const canvas = document.createElement("canvas");
		const width = video.videoWidth;
		const height = video.videoHeight;

		canvas.width = width;
		canvas.height = height;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		if (facingMode === "user") {
			ctx.translate(width, 0);
			ctx.scale(-1, 1);
		}

		ctx.drawImage(video, 0, 0, width, height);

		canvas.toBlob(
			(blob) => {
				if (!blob) return;

				revokeImage();

				const url = URL.createObjectURL(blob);
				setCaptured(url);
				onCapture?.(url);
			},
			"image/jpeg",
			0.95,
		);
	};

	const switchCamera = () => {
		setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
	};

	const closeCamera = () => {
		stopStream();
		revokeImage();
		setCaptured(null);
		setOpen(false);
	};

	const stopStream = () => {
		const stream = webcamRef.current?.video?.srcObject as MediaStream | null;
		stream?.getTracks().forEach((track) => track.stop());
	};

	return (
		<>
			{!open && (
				<Button onClick={() => setOpen(true)}>
					<Camera size={32} />
				</Button>
			)}

			{open && (
				<div className="fixed inset-0 z-50 bg-black">
					<div className="absolute top-4 right-4 left-4 z-10 flex items-center justify-between text-white">
						<Button
							size="icon"
							variant="ghost"
							className="text-white"
							onClick={closeCamera}>
							<X className="h-6 w-6" />
						</Button>

						<Button
							size="icon"
							variant="ghost"
							className="text-white"
							onClick={switchCamera}>
							<RotateCcw className="h-5 w-5" />
						</Button>
					</div>

					{!captured ? (
						<Webcam
							ref={webcamRef}
							audio={false}
							screenshotFormat="image/jpeg"
							videoConstraints={{
								facingMode,
								width: { ideal: 1920 },
								height: { ideal: 1080 },
							}}
							className={`h-full w-full object-cover ${
								facingMode === "user" ? "scale-x-[-1]" : ""
							}`}
						/>
					) : (
						<Image
							src={captured}
							alt="Captured"
							fill
							className="object-cover"
						/>
					)}

					{!captured ? (
						<div className="absolute right-0 bottom-10 left-0 flex justify-center">
							<Button
								onClick={capture}
								type="button"
								aria-label="Capture photo"
								className="h-20 w-20 rounded-full border-4 border-white bg-white/20 backdrop-blur-md transition active:scale-95"
							/>
						</div>
					) : (
						<div className="absolute right-0 bottom-10 left-0 flex justify-center gap-4">
							<Button
								variant="secondary"
								onClick={() => {
									revokeImage();
									setCaptured(null);
								}}>
								Retake
							</Button>

							<Button onClick={closeCamera}>Done</Button>
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default MobileCamera;
