"use client"

import { Button } from "@/components/ui/button";
import {
 AlertDialog,
 AlertDialogAction,
 AlertDialogCancel,
 AlertDialogContent,
 AlertDialogDescription,
 AlertDialogFooter,
 AlertDialogHeader,
 AlertDialogTitle,
 AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface CustomAlertProps {
  title: string;
  description: string;
  onConfirm: () => void;
}

export const CustomAlert: React.FC<CustomAlertProps> = ({
  title,
  description,
  onConfirm,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild  className="my-6">
        <Button variant="destructive">خروج</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
         <div className="flex flex-col gap-6">
          <AlertDialogTitle className="text-right">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-right text-xl">{description}</AlertDialogDescription>
         </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-end"  dir="rtl">
          <AlertDialogCancel className="mr-4 text-right">استمرار</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="text-right">الخروج</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
