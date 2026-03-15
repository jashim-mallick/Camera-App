"use client";

import { Trash2 } from "lucide-react";
import { Button } from "../../shadcnui/button";

interface CameraControlsProps {
	imageCount: number;
	onCapture: () => void;
	onDeleteSelected?: () => void;
	onDone: () => void;
}

const CameraControls = ({
	imageCount,
	onCapture,
	onDone,
	onDeleteSelected,
}: CameraControlsProps) => {
	return (
		<div className="relative flex items-center justify-center pb-6">
			{/* Left Side - Image Count */}
			{imageCount > 0 && (
				<div className="absolute left-6 flex items-center gap-2 text-white">
					<span className="rounded-full bg-white/20 px-3 py-1 text-sm backdrop-blur-md">
						{imageCount}
					</span>

					<Button
						size="icon"
						variant="ghost"
						onClick={onDeleteSelected}
						aria-label="Delete last photo">
						<Trash2 size={22} />
					</Button>
				</div>
			)}

			{/* Center - Capture Button */}
			<Button
				variant="ghost"
				onClick={onCapture}
				aria-label="Capture photo"
				className="h-20 w-20 rounded-full border-4 border-white bg-white/20 transition active:scale-95"
			/>

			{/* Right Side - Done */}
			{imageCount > 0 && (
				<div className="absolute right-6">
					<Button onClick={onDone}>Done</Button>
				</div>
			)}
		</div>
	);
};

export default CameraControls;
