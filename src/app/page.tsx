import { Card, CardContent, CardHeader } from "@/components/shadcnui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Nextjs Starter Frontend",
	description: "Production grade Next.js starter template",
};

const page = () => {
	return (
		<section className="grid place-items-center h-[80dvh]">
			<Card className=" min-w-sm">
			<CardHeader className="text-center">LogIn Form</CardHeader>
			<CardContent></CardContent>
		</Card>
		</section>
	);
};

export default page;
