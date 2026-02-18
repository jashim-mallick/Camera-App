"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRef, useState } from "react";
import Webcam from "react-webcam";

const MobileCamera = () => {
	const webcamRef = useRef<Webcam>(null);
	const [open, setOpen] = useState(false);
	const [image, setImage] = useState<string | null>(null);

	const capture = () => {
		const imageSrc = webcamRef.current?.getScreenshot();
		if (imageSrc) {
			setImage(imageSrc);
		}
	};

	return (
		<Card className="mx-auto w-full max-w-md space-y-4 p-4">
			<CardContent className="space-y-4">
				{!open && (
					<Button
						className="w-full"
						onClick={() => setOpen(true)}>
						Open Camera
					</Button>
				)}

				{open && (
					<div className="space-y-4">
						<div className="overflow-hidden rounded-xl border">
							<Webcam
								ref={webcamRef}
								audio={false}
								screenshotFormat="image/jpeg"
								videoConstraints={{ facingMode: "environment" }}
								className="w-full"
							/>
						</div>

						<div className="flex gap-2">
							<Button
								className="flex-1"
								onClick={capture}>
								Capture
							</Button>

							<Button
								variant="destructive"
								className="flex-1"
								onClick={() => setOpen(false)}>
								Close
							</Button>
						</div>
					</div>
				)}

				{image && (
					<div className="space-y-2">
						<p className="text-muted-foreground text-sm">Captured Image</p>
						<img
							src={image}
							alt="Captured"
							className="rounded-xl border"
						/>
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default MobileCamera;
