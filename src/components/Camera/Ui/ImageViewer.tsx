"use client";

import { Button } from "@/components/shadcnui/button";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/shadcnui/carousel";
import { X } from "lucide-react";
import Image from "next/image";
import { CapturedImage } from "../Types";

interface ImageViewerProps {
	images: CapturedImage[];
	startIndex: number;
	onClose?: () => void;
}

const ImageViewer = ({ images, startIndex, onClose }: ImageViewerProps) => {
	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
			onClick={onClose}>
			<div
				className="relative w-full max-w-xl"
				onClick={(e) => e.stopPropagation()}>
				<Button
					size="icon"
					variant="ghost"
					className="absolute top-3 right-3 z-50 h-10 w-10 rounded-full bg-black/60 text-white hover:bg-black/80"
					onClick={onClose}>
					<X size={22} />
				</Button>

				<Carousel
					opts={{
						startIndex,
						align: "center",
					}}>
					<CarouselContent>
						{images.map((img) => (
							<CarouselItem key={img.id}>
								<div className="relative h-[80vh] w-full">
									<Image
										src={img.url}
										alt="Captured image"
										fill
										sizes="100vw"
										className="object-contain"
									/>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>
		</div>
	);
};

export default ImageViewer;
