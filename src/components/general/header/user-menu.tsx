"use client";
import { ChevronDown } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserMenu() {
	return (
		<div dir="rtl" className="text-right">
		<DropdownMenu>
			<DropdownMenuTrigger className="flex items-center">
				<Avatar className="h-8 w-8">
					<AvatarImage src="/app.png" alt="@shadcn" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<ChevronDown className="ml-2 w-4 h-4" />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel dir="rtl">حسابي</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<Link href="/profile" dir="rtl">
					<DropdownMenuItem dir="rtl">الملف الشخصي</DropdownMenuItem>
				</Link>
				<Link href="/settings" dir="rtl">
					<DropdownMenuItem dir="rtl">الإعدادات</DropdownMenuItem>
				</Link>
				<DropdownMenuItem dir="rtl">تسجيل الخروج</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
		</div>
	);
}
