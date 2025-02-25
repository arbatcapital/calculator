"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { defaultUploadDocumentFormValues } from "@/lib/constants";
import { TUploadDocumentsForm } from "@/lib/types";
import { uploadDocumentsFormSchema } from "@/lib/validators";
import { ArrowRight, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import FileInput from "./file-input";
import { Button, buttonVariants } from "./ui/button";
import { Form } from "./ui/form";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { saveDocs } from "@/lib/actions";

const DocumentUploadForm = () => {
  const [isPending, startTransition] = useTransition();
  const [userId, setUserId] = useState<null | string>(null);

  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<TUploadDocumentsForm>({
    resolver: zodResolver(uploadDocumentsFormSchema),
    defaultValues: defaultUploadDocumentFormValues,
  });

  const onSubmit = async (formData: TUploadDocumentsForm) => {
    startTransition(async () => {
      try {
        const res = await saveDocs(formData, userId!);
        if (!res?.success) {
          toast({
            variant: "destructive",
            description: res?.message,
          });
          return;
        }
        localStorage.removeItem("userId");
        router.push("/thank-you");
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("userId");
      if (userId) {
        setUserId(userId);
      } else {
        router.push("/");
      }
    }
  }, [router]);

  return (
    <section className="">
      <div className="bg-gray1 p-6 md:p-8 rounded-3xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FileInput form={form} name={"license"} label="Business License" />
            <FileInput
              form={form}
              name={"ein"}
              label="Employer Identification Number"
            />
            <FileInput
              form={form}
              name={"mercantProcessingStatement"}
              label="Merchant Processing Statements"
            />
            <FileInput
              form={form}
              name={"govId"}
              label="Government-issued ID"
            />
            <FileInput
              form={form}
              name={"businessAddressDoc"}
              label="Proof of Business Address"
            />

            <div className="flex gap-6 md:gap-8">
              <Link
                href={"/personal-info"}
                className={cn(
                  "w-full",
                  buttonVariants({ variant: "customOutline" })
                )}
              >
                Previous
              </Link>
              <Button
                className="w-full"
                disabled={isPending}
                type="submit"
                variant={"custom"}
              >
                Confirm
                {isPending ? (
                  <Loader className="animate-spin" />
                ) : (
                  <ArrowRight />
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};
export default DocumentUploadForm;
