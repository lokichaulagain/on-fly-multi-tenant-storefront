"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Package } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  navigation: any;
};
export default function MobileSheet({ navigation }: Props) {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Menu size={18} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className=" flex items-center justify-center">
          <Link
            href="/"
            className=" flex items-center gap-1 text-primary">
            <Package />
            <p className=" text-2xl tracking-wide font-serif ">Miniture</p>
          </Link>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {navigation.map((item: any, idx: number) => {
            return (
              <SheetClose
              asChild
                key={idx}
                className="text-gray-700 hover:text-orange-600">
                <Link
                  href={item.path}
                  className={`${pathname === item.path ? " text-primary" : ""}`}>
                  {item.title}
                </Link>
              </SheetClose>
            );
          })}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <div className="flex items-center gap-4">
              <Button className=" w-full" variant={"outline"}>Log In</Button>
              <Button className=" w-full">Sign In</Button>
            </div>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}