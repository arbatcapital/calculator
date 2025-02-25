"use client";
import {
  Field,
  Radio,
  RadioGroup as RgGroup,
  Label as UILabel,
} from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { getBusinessInfo, saveBusinessInfo } from "@/lib/actions";
import {
  BUSINESS_STATE,
  BUSINESS_TYPE,
  defaultBusinessInfoFormValues,
  FUNDING_AMOUNT,
  FUNDING_REASON,
} from "@/lib/constants";
import { TBusinessInfoForm } from "@/lib/types";
import { businessInfoFormSchema } from "@/lib/validators";
import { ArrowRight, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const BusinessInfoForm = () => {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<TBusinessInfoForm>({
    resolver: zodResolver(businessInfoFormSchema),
    defaultValues: defaultBusinessInfoFormValues,
  });

  const onSubmit = async (formData: TBusinessInfoForm) => {
    startTransition(async () => {
      try {
        const userId = localStorage.getItem("userId") || "";
        const res = await saveBusinessInfo(formData, userId);
        if (!res?.success) {
          toast({
            variant: "destructive",
            description: res?.message,
          });
          return;
        }
        localStorage.setItem("userId", res?.userId || "");
        router.push("/personal-info");
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      (async function () {
        const userId = localStorage.getItem("userId");
        if (userId) {
          setIsLoading(true);
          const res = await getBusinessInfo(userId);
          form.reset(res?.user as TBusinessInfoForm);
        }
        setIsLoading(false);
      })();
    }
  }, [form]);

  if (isLoading) {
    return (
      <div className=" flex items-center justify-center w-full">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <section className="">
      <div className="bg-gray1 p-6 md:p-8 rounded-3xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 md:space-y-8"
          >
            <FormField
              control={form.control}
              name="businessType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-3 sm:mb-2 inline-block">
                    What type of business do you own?
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="LLC" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {BUSINESS_TYPE.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-3 sm:mb-2 inline-block">
                    What is your business name?
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter business name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fundingAmount"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between gap-1 md:gap-4 mb-4 flex-wrap">
                    <FormLabel className="mb-3 sm:mb-2 inline-block">
                      How much do you need?
                    </FormLabel>{" "}
                    <span className="text-muted-foreground">[Value in k]</span>
                  </div>
                  <FormControl>
                    <RgGroup
                      value={field.value}
                      onChange={field.onChange}
                      className={"flex gap-2 md:gap-4 flex-wrap"}
                    >
                      {FUNDING_AMOUNT.map((amount) => (
                        <Field
                          key={amount}
                          className="flex items-center gap-2 relative py-3 px-6 rounded-md bg-white hover:cursor-pointer"
                        >
                          <Radio
                            value={amount}
                            className="absolute inset-0 rounded-md border-[2px] border-solid border-gray-200  data-[checked]:border-primary-blue"
                          >
                            <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
                          </Radio>
                          <UILabel>{amount}</UILabel>
                        </Field>
                      ))}
                    </RgGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fundingReason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-3 sm:mb-2 inline-block">
                    Why are you seeking funding for?
                  </FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Finance Accounts receivable" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {FUNDING_REASON.map((reason) => (
                        <SelectItem key={reason} value={reason}>
                          {reason}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormLabel className="mb-3 sm:mb-2 inline-block">
                When did you start your business?
              </FormLabel>
              <div className="flex gap-4 justify-stretch mt-4">
                <FormField
                  control={form.control}
                  name="businessStartMonth"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Month"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="businessStartYear"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Year"
                          value={field.value}
                          onChange={field.onChange}
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
              name="annualRevenue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-3 sm:mb-2 inline-block">
                    What&apos;s your annual revenue?
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      value={
                        field.value ? Number(field.value).toLocaleString() : ""
                      }
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/[^0-9]/g, "");
                        field.onChange(rawValue);
                      }}
                      placeholder="Enter annual revenue"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ein"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-3 sm:mb-2 inline-block">
                    What is you EIN?
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter EIN"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="businessState"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-3 sm:mb-2 inline-block">
                    Which state was your company formed?
                  </FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="New York" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {BUSINESS_STATE.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="businessAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-3 sm:mb-2 inline-block">
                    What is your business address?
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col">
              <Button disabled={isPending} type="submit" variant={"custom"}>
                Next
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
export default BusinessInfoForm;
