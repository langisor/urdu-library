"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface FallbackError extends Error {
	digest?: string;
}
type FallbackProps = {
	error: FallbackError;
};
export function Fallback({ error }: FallbackProps) {
	const currentPath = usePathname();

	const handlePreviousPage = () => {
		history.back();
	};
	const handleGoHome = () => {
		window.location.href = "/";
	};
	return (
		<div className="flex flex-col items-center gap-2 my-4">
			<Button variant={"outline"} onClick={handlePreviousPage} className="my-2">
				<span className=" material-symbols-outlined">
					<ArrowRight />
				</span>
				Go back to Previous Page
			</Button>
			<Button className="my-2" variant={"outline"} onClick={handleGoHome}>
				<span className="material-symbols-outlined">home</span>
				Go back to Home Page
			</Button>

			<div className="flex flex-col items-center gap-2">
				<p>Message: {error.message}</p>
				<p>Path: {currentPath}</p>
				<p>Digest: {error.digest}</p>
				<p>Stack: {error.stack}</p>
				<p>Name: {error.name}</p>
			</div>
		</div>
	);
}
