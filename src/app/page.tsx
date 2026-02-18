import MobileCamera from "@/components/MobileCamera";
import { Card, CardContent, CardHeader } from "@/components/shadcnui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Nextjs Starter Frontend",
	description: "Production grade Next.js starter template",
};

const page = () => {
	return (
		<section className="grid h-[80dvh] place-items-center">
			<Card className="min-w-sm">
				<CardHeader className="text-center">capture</CardHeader>
				<CardContent>
					<MobileCamera />
				</CardContent>
			</Card>
		</section>
	);
};

export default page;
