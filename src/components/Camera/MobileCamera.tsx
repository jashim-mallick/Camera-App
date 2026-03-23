"use client";

import { Camera, RefreshCw, X } from "lucide-react";
import { useState } from "react";
import Webcam from "react-webcam";
import { Button } from "../shadcnui/button";
import { filterMap, FilterType } from "./Config/Filter";
import { MobileCameraProps, useCamera } from "./Logic/UseCamera";
import CameraControls from "./Ui/CameraControl";
import Thumblin from "./Ui/Thumblin";

const MobileCamera = ({ onCapture }: MobileCameraProps) => {
	const [open, setOpen] = useState(false);

	const {
		webcamRef,
		facingMode,
		setFacingMode,
		images,
		filter,
		setFilter,
		flash,
		capture,
		closeCamera,
		removeImage,
		removeLastImage,
	} = useCamera({ onCapture });

	return (
		<>
			{!open && (
				<Button onClick={() => setOpen(true)}>
					<Camera size={35} />
				</Button>
			)}

			{open && (
				<div className="fixed inset-0 z-50 flex flex-col bg-black">
					{/* Header */}
					<div className="z-30 flex items-center justify-between px-4 py-4 text-white">
						<Button
							size="icon"
							variant="ghost"
							onClick={() => {
								closeCamera();
								setOpen(false);
							}}>
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

					{/* Preview */}
					<div className="relative flex-1 overflow-hidden">
						{flash && (
							<div className="absolute inset-0 z-40 bg-white opacity-80" />
						)}

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
					</div>

					{/* Filters */}
					{!images.length && (
						<div className="mx-2 my-3 overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
							<div className="flex min-w-max gap-3">
								{(Object.keys(filterMap) as FilterType[]).map((key) => (
									<Button
										variant="ghost"
										key={key}
										onClick={() => setFilter(key)}
										className={`shrink-0 rounded-full border px-4 py-1 text-sm ${
											filter === key
												? "bg-white text-black"
												: "border-white text-white"
										}`}>
										{key}
									</Button>
								))}
							</div>
						</div>
					)}

					<Thumblin
						images={images}
						onDelete={removeImage}
					/>

					{/* Controls */}
					<CameraControls
						imageCount={images.length}
						onCapture={capture}
						onDeleteLast={removeLastImage}
						onDone={() => {
							closeCamera();
							setOpen(false);
						}}
					/>
				</div>
			)}
		</>
	);
};

export default MobileCamera;
