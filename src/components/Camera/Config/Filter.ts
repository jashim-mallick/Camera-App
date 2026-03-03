export const FlashDuration = 300;

export const filterMap: Record<string, string> = {
	none: "none",
	grayscale: "grayscale(100%)",
	sepia: "sepia(100%)",
	contrast: "contrast(120%)",
	warm: "sepia(40%) saturate(120%)",
	cool: "brightness(102%) contrast(108%) saturate(130%)",
};

export type FilterType = keyof typeof filterMap;
