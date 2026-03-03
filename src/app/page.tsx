import MobileCamera from "@/components/Camera/MobileCamera";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Nextjs Starter Frontend",
	description: "Production grade Next.js starter template",
};

const page = () => {
	return (
		<section className="grid h-[80dvh] place-items-center">
			<MobileCamera />
		</section>
	);
};

export default page;
