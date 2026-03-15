import { nanoid } from "nanoid";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { filterMap, FilterType, FlashDuration } from "../Config/Filter";
import { CapturedImage } from "../Types";

export interface MobileCameraProps {
	onCapture?: (blob: Blob) => void;
}

export const useCamera = ({ onCapture }: MobileCameraProps) => {
	const webcamRef = useRef<Webcam>(null);
	const imageRef = useRef<string | null>(null);
	const flashTimeout = useRef<NodeJS.Timeout | null>(null);

	const [open, setOpen] = useState(false);
	const [facingMode, setFacingMode] = useState<"user" | "environment">(
		"environment",
	);
	const [images, setImages] = useState<CapturedImage[]>([]);
	const [filter, setFilter] = useState<FilterType>("none");
	const [flash, setFlash] = useState(false);

	const stopStream = () => {
		const stream = webcamRef.current?.video?.srcObject as MediaStream | null;
		stream?.getTracks().forEach((track) => track.stop());
	};
	const discardAllImages = () => {
		setImages((prevImages) => {
			prevImages.forEach((img) => URL.revokeObjectURL(img.url));
			return [];
		});
	};

	const capture = () => {
		const video = webcamRef.current?.video;
		if (!video) return;

		setFlash(true);
		flashTimeout.current = setTimeout(() => {
			setFlash(false);
		}, FlashDuration);

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

				const url = URL.createObjectURL(blob);

				setImages((prev) => [
					...prev,
					{
						id: nanoid(),
						url,
						blob,
						createdAt: Date.now(),
					},
				]);

				onCapture?.(blob);
			},
			"image/jpeg",
			0.95,
		);
	};

	const closeCamera = () => {
		stopStream();
		discardAllImages();
		setOpen(false);
	};
	const removeImage = (id: string) => {
		setImages((prev) => {
			const target = prev.find((img) => img.id === id);
			if (target) URL.revokeObjectURL(target.url);
			return prev.filter((img) => img.id !== id);
		});
	};

	const removeLastImage = () => {
		setImages((prev) => {
			if (!prev.length) return prev;
			const last = prev[prev.length - 1];
			URL.revokeObjectURL(last.url);
			return prev.slice(0, -1);
		});
	};

	useEffect(() => {
		return () => {
			if (flashTimeout.current) {
				clearTimeout(flashTimeout.current);
			}
			stopStream();
			discardAllImages();
		};
	}, []);

	return {
		webcamRef,
		open,
		setOpen,
		facingMode,
		setFacingMode,
		images,
		filter,
		setFilter,
		flash,
		capture,
		closeCamera,
		discardAllImages,
		removeImage,
		removeLastImage,
	};
};
