"use client";
import { useUser } from "@/hooks/use-user";
import { Settings, Crown } from "lucide-react";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import {UserMenu} from "./user-menu";
import { Card } from "../card";
interface HeaderProps {
  categoryID: number;
  categoryName: string;
}
export function Header({ categoryName, categoryID }: HeaderProps) {
  const isMobile = useIsMobile();
  const { userState } = useUser();
  if (userState.promised) {
    return <div>Loading...</div>;
  }
  if (userState.error) {
    return <div>Error: {userState.error}</div>;
  }
  const { name, score, status, role } = userState;
  const level=1;
  return (
    <div className="flex flex-col mt-4">
      <header className="relative z-10 flex items-center justify-between  text-white">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            I
          </div>
          <span className="font-medium">{userState.name.get()}</span>
          <div className="flex items-center gap-2 bg-black/20 rounded-full px-3 py-1">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">🌙</span>
            </div>
            <span className="text-sm">المستوى  {level}| نقاط {score.get()} | {status.get()}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {!isMobile ? (
            <Link href={`/category/${categoryID}`}>
              <span> {categoryName}</span>
            </Link>
          ) : (
            <></>
          )}

          <div className="flex items-center gap-2">
            {isMobile ? <UserMenu /> : 
            <></>}
          </div>
          <div className="flex items-center gap-1">
            <Crown className="w-5 h-5 text-yellow-400" />
            <span>المميز</span>
          </div>
        </div>
      </header>
  
        <div className="flex items-center justify-center gap-4 mt-6">
          <Link href={`/category/${categoryID}`}>
            <Card className="text-2xl font-bold"> {categoryName}</Card>
          </Link>
        </div>
      
    </div>
  );
}
