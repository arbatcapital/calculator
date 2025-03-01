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
  BUSINESS_PROPERTY_INFO,
  BUSINESS_STATE,
  BUSINESS_TYPE,
  defaultBusinessInfoFormValues,
  FUNDING_AMOUNT,
  FUNDING_REASON,
  MONTHS,
  YEARS,
} from "@/lib/constants";
import { TBusinessInfoForm } from "@/lib/types";
import { businessInfoFormSchema } from "@/lib/validators";
import { ArrowRight, DollarSign, Loader } from "lucide-react";
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
import { formatEIN } from "@/lib/utils";

const BusinessInfoForm = () => {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<TBusinessInfoForm>({
    resolver: zodResolver(businessInfoFormSchema),
    defaultValues: defaultBusinessInfoFormValues,
  });

  const businessPropertyInfo = form.watch("businessPropertyInfo");

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

  useEffect(
    function () {
      if (businessPropertyInfo !== "other") {
        form.setValue("businessPropertyInfoOther", "");
      }
    },
    [businessPropertyInfo, form]
  );

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
                    What is your business legal name?
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter business name"
                      {...field}
                      maxLength={40}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dba"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-3 sm:mb-2 inline-block">
                    What is your DBA
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter DBA" {...field} maxLength={40} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="businessPropertyInfo"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between gap-1 md:gap-4 mb-4 flex-wrap">
                    <FormLabel className="mb-3 sm:mb-2 inline-block">
                      Business property information
                    </FormLabel>{" "}
                  </div>
                  <FormControl>
                    <RgGroup
                      value={field.value}
                      onChange={field.onChange}
                      className={"flex gap-2 md:gap-4 flex-wrap"}
                    >
                      {BUSINESS_PROPERTY_INFO.map((info) => (
                        <Field
                          key={info}
                          className="flex items-center gap-2 relative py-3 px-6 rounded-md bg-white hover:cursor-pointer"
                        >
                          <Radio
                            value={info}
                            className="absolute inset-0 rounded-md border-[2px] border-solid border-gray-200  data-[checked]:border-primary-blue"
                          >
                            <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
                          </Radio>
                          <UILabel>{info}</UILabel>
                        </Field>
                      ))}
                    </RgGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {businessPropertyInfo === "Other" && (
              <FormField
                control={form.control}
                name="businessPropertyInfoOther"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-3 sm:mb-2 inline-block">
                      Please specify
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Other" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="fundingAmount"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between gap-1 md:gap-4 mb-4 flex-wrap">
                    <FormLabel className="mb-3 sm:mb-2 inline-block">
                      How much do you need?
                    </FormLabel>{" "}
                    <span className="text-muted-foreground">$USD</span>
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
                        <SelectValue placeholder="Marketing" />
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
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="January" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {MONTHS.map((month) => (
                            <SelectItem key={month} value={month}>
                              {month}
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
                  name="businessStartYear"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="2025" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {YEARS.map((year) => (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

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
                    <div className="relative">
                      <Input
                        type="text"
                        value={
                          field.value
                            ? Number(field.value).toLocaleString()
                            : ""
                        }
                        onChange={(e) => {
                          const rawValue = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                          field.onChange(rawValue);
                        }}
                        placeholder="Enter annual revenue"
                        maxLength={10}
                      />
                      <DollarSign className="absolute top-[50%] -translate-y-[50%] right-2 text-muted-foreground h-5 w-5" />
                    </div>
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
                      onChange={(e) =>
                        field.onChange(formatEIN(e.target.value))
                      }
                      maxLength={10}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="businessWebsite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-3 sm:mb-2 inline-block">
                    Business website
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter website"
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
              name="businessEmailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-3 sm:mb-2 inline-block">
                    Business email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter email"
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
              name="businessPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-3 sm:mb-2 inline-block">
                    Business phone
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter phone"
                      value={field.value}
                      onChange={field.onChange}
                      maxLength={10}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="businessAddressStreet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-3 sm:mb-2 inline-block">
                      What is your business address?
                    </FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter street address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="businessAddressState"
                render={({ field }) => (
                  <FormItem>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select state" />
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

              <div className="flex gap-4 justify-stretch">
                <FormField
                  control={form.control}
                  name="businessAddressCity"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="City"
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
                  name="businessAddressZip"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Zip code"
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.value.replace(/\D/g, ""));
                          }}
                          maxLength={5}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
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
