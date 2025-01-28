"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import { usePathname } from "next/navigation";

type Props = {};
export default function ShopFilterSheet({}: Props) {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className=" flex items-center gap-1 ">
          Filters
          <Filter size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className=" flex items-center justify-center">
          <div className=" flex items-center gap-1">
            <p className=" text-xl tracking-wide f ">Apply Filters</p>
            <Filter size={20} />
          </div>
        </SheetHeader>
        <div className="grid gap-4 py-4">here goes the filter options</div>
        
      </SheetContent>
    </Sheet>
  );
}