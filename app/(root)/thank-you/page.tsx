import { buttonVariants } from "@/components/ui/button";
import { WEBSITE_HOME_PAGE } from "@/lib/constants";
import { Home } from "lucide-react";
import Link from "next/link";

const ThankyouPage = () => {
  return (
    <section className="py-large max-w-[550px] mx-auto w-full px-4 md:px-0 min-h-[calc(100dvh-80px)]  md:min-h-[calc(100dvh-116px)] flex items-center justify-center">
      <div className="p-6 md:p-8 bg-gray1 rounded-3xl space-y-4 text-center">
        <h1 className="text-2xl md:text-4xl font-bold text-center">
          Thank you
        </h1>
        <p>Your submission has been received.</p>
        <Link
          href={WEBSITE_HOME_PAGE}
          className={buttonVariants({ variant: "custom" })}
        >
          <Home /> Go Home
        </Link>
      </div>
    </section>
  );
};
export default ThankyouPage;
