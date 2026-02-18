"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Webcam from "react-webcam";

import { RotateCcw, X } from "lucide-react";
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

	const capture = () => {
		const imageSrc = webcamRef.current?.getScreenshot();
		if (imageSrc) {
			setCaptured(imageSrc);
			onCapture?.(imageSrc);
		}
	};

	const switchCamera = () => {
		setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
	};

	const closeCamera = () => {
		setCaptured(null);
		setOpen(false);
	};

	return (
		<>
			{!open && <Button onClick={() => setOpen(true)}>Open Camera</Button>}

			{open && (
				<div className="fixed inset-0 z-50 bg-black">
					{/* Top Controls */}
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

					{/* Preview */}
					{!captured ? (
						<Webcam
							ref={webcamRef}
							audio={false}
							screenshotFormat="image/jpeg"
							videoConstraints={{ facingMode }}
							className="h-full w-full object-cover"
						/>
					) : (
						<Image
							src={captured}
							alt="Captured"
							fill
							className="object-cover"
						/>
					)}

					{/* Bottom Controls */}
					{!captured ? (
						<div className="absolute right-0 bottom-10 left-0 flex justify-center">
							<button
								onClick={capture}
								className="h-20 w-20 rounded-full border-4 border-white bg-white/20 backdrop-blur-md transition active:scale-95"
							/>
						</div>
					) : (
						<div className="absolute right-0 bottom-10 left-0 flex justify-center gap-4">
							<Button
								variant="secondary"
								onClick={() => setCaptured(null)}>
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
