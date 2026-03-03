"use client";

import { Button } from "@/components/shadcnui/button";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { CapturedImage } from "../Types";

interface ThumbnailBarProps {
	images: CapturedImage[];
	selectedId?: string;
	onSelect: (id: string) => void;
	onDelete?: (id: string) => void;
}

const Thumblin = ({
	images,
	selectedId,
	onSelect,
	onDelete,
}: ThumbnailBarProps) => {
	if (!images.length) return null;

	return (
		<div className="absolute right-0 bottom-28 left-0 px-4">
			<div className="flex gap-3 overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
				{images.map((img) => {
					const isSelected = img.id === selectedId;

					return (
						<div
							key={img.id}
							className={`relative h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-md border-2 ${
								isSelected ? "border-white" : "border-transparent"
							}`}
							onClick={() => onSelect(img.id)}>
							<Image
								src={img.url}
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
										onDelete(img.id);
									}}>
									<Trash2 size={22} />
								</Button>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Thumblin;
