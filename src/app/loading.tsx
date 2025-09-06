"use client";
import {CustomLoading} from "@/components/general/custom-loading";
export default function Loading() {
	return (
		<div className="flex justify-center items-center h-screen">
			<span className="sr-only">Loading...</span>
			<CustomLoading variant="dots" size="lg" />
		</div>
	);
}
