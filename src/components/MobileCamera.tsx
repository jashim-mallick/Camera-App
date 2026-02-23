"use client";

import { Camera, RefreshCw, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "./shadcnui/button";

interface MobileCameraProps {
	onCapture?: (blob: Blob) => void;
}

const FLASH_DURATION_MS = 120;

const filterMap: Record<string, string> = {
	none: "none",
	grayscale: "grayscale(100%)",
	sepia: "sepia(100%)",
	contrast: "contrast(140%)",
	warm: "sepia(40%) saturate(120%)",
	cool: "hue-rotate(180deg) saturate(120%)",
};

const MobileCamera = ({ onCapture }: MobileCameraProps) => {
	const webcamRef = useRef<Webcam>(null);
	const imageRef = useRef<string | null>(null);

	const [open, setOpen] = useState(false);
	const [facingMode, setFacingMode] = useState<"user" | "environment">(
		"environment",
	);
	const [captured, setCaptured] = useState<string | null>(null);
	const [filter, setFilter] = useState("none");
	const [flash, setFlash] = useState(false);

	const stopStream = () => {
		const stream = webcamRef.current?.video?.srcObject as MediaStream | null;
		stream?.getTracks().forEach((track) => track.stop());
	};

	const discardCapturedImage = () => {
		if (imageRef.current) {
			URL.revokeObjectURL(imageRef.current);
			imageRef.current = null;
		}
		setCaptured(null);
	};

	const capture = () => {
		const video = webcamRef.current?.video;
		if (!video) return;

		setFlash(true);
		setTimeout(() => setFlash(false), FLASH_DURATION_MS);

		const canvas = document.createElement("canvas");
		const width = video.videoWidth;
		const height = video.videoHeight;

		canvas.width = width;
		canvas.height = height;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		ctx.filter = filterMap[filter];

		if (facingMode === "user") {
			ctx.translate(width, 0);
			ctx.scale(-1, 1);
		}

		ctx.drawImage(video, 0, 0, width, height);

		canvas.toBlob(
			(blob) => {
				if (!blob) return;

				discardCapturedImage();

				const url = URL.createObjectURL(blob);
				imageRef.current = url;
				setCaptured(url);
				onCapture?.(blob);
			},
			"image/jpeg",
			0.95,
		);
	};

	const closeCamera = () => {
		stopStream();
		discardCapturedImage();
		setOpen(false);
	};

	useEffect(() => {
		return () => {
			stopStream();
			discardCapturedImage();
		};
	}, []);

	return (
		<>
			{!open && (
				<Button onClick={() => setOpen(true)}>
					<Camera size={35} />
				</Button>
			)}

			{open && (
				<div className="fixed inset-0 z-50 flex flex-col bg-black">
					<div className="z-30 flex items-center justify-between px-4 py-4 text-white">
						<Button
							size="icon"
							variant="ghost"
							onClick={closeCamera}>
							<X size={40} />
						</Button>

						<Button
							size="icon"
							variant="ghost"
							onClick={() =>
								setFacingMode((prev) =>
									prev === "user" ? "environment" : "user",
								)
							}>
							<RefreshCw size={40} />
						</Button>
					</div>

					<div className="relative flex-1 overflow-hidden">
						{flash && (
							<div className="absolute inset-0 z-40 bg-white opacity-80" />
						)}

						{!captured ? (
							<Webcam
								ref={webcamRef}
								audio={false}
								videoConstraints={{
									facingMode,
									width: { ideal: 1920 },
									height: { ideal: 1080 },
								}}
								style={{ filter: filterMap[filter] }}
								className={`h-full w-full object-cover ${
									facingMode === "user" ? "scale-x-[-1]" : ""
								}`}
							/>
						) : (
							<Image
								src={captured}
								alt="Captured image"
								fill
								className="object-contain"
							/>
						)}
					</div>

					<div className="bg-gradient from-black/80 to-transparent pt-4 pb-6">
						{!captured && (
							<div className="mx-2 my-3 overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
								<div className="flex min-w-max gap-3">
									{Object.keys(filterMap).map((key) => (
										<button
											key={key}
											onClick={() => setFilter(key)}
											className={`shrink-0 rounded-full border px-4 py-1 text-sm ${
												filter === key
													? "bg-white text-black"
													: "border-white text-white"
											}`}>
											{key}
										</button>
									))}
								</div>
							</div>
						)}

						<div className="relative flex items-center justify-center">
							{!captured ? (
								<Button
									variant="ghost"
									onClick={capture}
									type="button"
									aria-label="Capture photo"
									className="h-20 w-20 rounded-full border-4 border-white bg-white/20 transition active:scale-95"
								/>
							) : (
								<div className="flex gap-4">
									<Button
										variant="secondary"
										onClick={discardCapturedImage}>
										Retake
									</Button>

									<Button onClick={closeCamera}>Done</Button>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default MobileCamera;
