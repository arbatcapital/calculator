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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import Link from "next/link";
import { cn, getLastThreeMonths } from "@/lib/utils";
import { getSignor, saveDocs } from "@/lib/actions";
import { Input } from "./ui/input";

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

  useEffect(() => {
    (async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        const res = await getSignor(userId);
        if (res && res.user?.fullName) {
          form.setValue("entityName", res.user.fullName);
        } else {
          form.setValue("entityName", "NO_NAME");
        }
        form.setValue("dateofSubmission", new Date().toLocaleDateString());
      }
    })();
  }, [form]);

  return (
    <section className="">
      <div className="bg-gray1 p-6 md:p-8 rounded-3xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FileInput
              form={form}
              name={"govId"}
              label="Government-issued ID"
            />
            <FileInput
              form={form}
              name={"annualReport"}
              label="State division of corporation / Annual report ( if applicable)"
            />
            <FileInput
              form={form}
              name={"articleOfIncorporation"}
              label="Business articles of incorporation (if applicable)"
            />

            <FileInput
              form={form}
              name={"businessAddressProof"}
              label="Proof of business address"
            />

            <FileInput
              form={form}
              name={"bankStatment1"}
              label={`${getLastThreeMonths()[0]} bank statment`}
            />

            <FileInput
              form={form}
              name={"bankStatment2"}
              label={`${getLastThreeMonths()[1]}  bank statment`}
            />

            <FileInput
              form={form}
              name={"bankStatment3"}
              label={`${getLastThreeMonths()[2]}  bank statment`}
            />
            <div className="flex items-center justify-between">
              <div>
                <FormField
                  control={form.control}
                  name="entityName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="mb-3 sm:mb-2 inline-block">
                        Entity name
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Entity name"
                          value={field.value}
                          onChange={field.onChange}
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="dateofSubmission"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="mb-3 sm:mb-2 inline-block">
                        Date
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Date"
                          value={field.value}
                          onChange={field.onChange}
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="signor"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="mb-3 sm:mb-2 inline-block">
                    As authorized signor for &quot;Entity name&quot;
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Entity sign"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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

            <p className="text-sm leading-6 text-muted-foreground">
              You understand that by signing below you are providing
              &quot;written instructions&quot; to Lexington Financial
              Consultants, LLC DBA Lexio Capital under the Fair Credit Reporting
              Act, authorizing Arbat Capital LLC to obtain information from your
              personal credit profile or other information from Experian,
              Transunion and/or Equifax. You authorize Arbat Capital LLC to
              obtain such information solely to conduct a per-qualification for
              credit and/or cash advance obtention purposes.
            </p>
          </form>
        </Form>
      </div>
    </section>
  );
};
export default DocumentUploadForm;
