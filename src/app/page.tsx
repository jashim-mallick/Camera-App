import MobileCamera from "@/components/Camera/MobileCamera";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Camero - Capture Moments with Your Camera",
	description:
		"Camero is a user-friendly camera app that allows you to capture moments.",
};

const page = () => {
	return (
		<section className="grid h-[80dvh] place-items-center">
			<MobileCamera />
		</section>
	);
};

export default page;
