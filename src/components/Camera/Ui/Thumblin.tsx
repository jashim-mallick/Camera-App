"use client";

import { Button } from "@/components/shadcnui/button";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { CapturedImage } from "../Types";
import ImageViewer from "./ImageViewer";

interface ThumbnailBarProps {
	images: CapturedImage[];
	onDelete?: (id: string) => void;
}

const Thumblin = ({ images, onDelete }: ThumbnailBarProps) => {
	const [viewerOpen, setViewerOpen] = useState(false);

	if (!images.length) return null;

	const latestImage = images[images.length - 1];

	return (
		<>
			<div className="absolute bottom-28 left-4 z-40">
				<div
					className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border-2 border-white"
					onClick={() => setViewerOpen(true)}>
					<Image
						src={latestImage.url}
						alt="Thumbnail"
						fill
						className="object-cover"
					/>

					{onDelete && (
						<Button
							size="icon"
							variant="ghost"
							className="absolute top-0 right-0 h-6 w-6 bg-black/50 p-0"
							onClick={(e) => {
								e.stopPropagation();
								onDelete(latestImage.id);
							}}>
							<Trash2 size={18} />
						</Button>
					)}
				</div>
			</div>

			{viewerOpen && (
				<ImageViewer
					images={images}
					startIndex={images.length - 1}
					onClose={() => setViewerOpen(false)}
				/>
			)}
		</>
	);
};

export default Thumblin;
