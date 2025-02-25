import {
  NAVLINKS,
  WEBSITE_APPLY_NOW,
  WEBSITE_HOME_PAGE,
} from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="px-[5%] max-w-[1440px] mx-auto py-4 md:py-6">
      <div className="w-full flex gap-4 items-center justify-between">
        <Link href={WEBSITE_HOME_PAGE}>
          <Image
            src={"/arbat-capital-logo.svg"}
            alt="Arbat capital logo"
            width={140}
            height={50}
            priority
            className="h-[48px] w-auto"
          />
        </Link>
        <div className=" gap-6 hidden md:flex">
          {NAVLINKS.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="mx-4 py-2 font-medium text-base"
            >
              {link.title}
            </Link>
          ))}
        </div>
        <div className="flex gap-8 items-center justify-between">
          <Link
            href={WEBSITE_APPLY_NOW}
            className={cn(
              buttonVariants({ variant: "custom" }),
              "bg-primary pr-2 pl-6 hover:bg-primary/90 hidden md:flex"
            )}
          >
            Apply Now
            <Image
              src={"/button-arrow.svg"}
              alt="Arrow"
              width={40}
              height={40}
              priority
            />
          </Link>
          <div className="block md:hidden">
            <Sheet>
              <SheetTrigger>
                <Menu className="w-10 h-10 p-1 bg-primary-blue text-white rounded-md" />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle></SheetTitle>
                  <SheetDescription></SheetDescription>
                  <div className="gap-3 flex flex-col">
                    {NAVLINKS.map((link) => (
                      <Link
                        key={link.title}
                        href={link.href}
                        className="mx-4 py-2 font-medium text-base"
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
