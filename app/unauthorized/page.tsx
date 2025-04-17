"use client";
import { buttonVariants } from "@/components/ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

const UnauthorizedPage = () => {
  return (
    <div className="flex items-center justify-center text-center gap-4 flex-col">
      <h1 className="">
        Access Denied: You are not authorized to view this page.
      </h1>
      <LogoutLink className={buttonVariants({ variant: "outline" })}>
        Log out
      </LogoutLink>
    </div>
  );
};
export default UnauthorizedPage;
