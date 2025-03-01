"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { getPersonalInfo, savePersonalInfo } from "@/lib/actions";
import {
  BUSINESS_STATE,
  CREDIT_SCORE,
  defaultPersonalInfoFormValues,
  EDUCATION,
  EMPLOYMENT_STATUS,
  HOME_OWNERSHIP,
  INDUSTRY,
} from "@/lib/constants";
import { TPersonalInfoForm } from "@/lib/types";
import { cn, formatSSN } from "@/lib/utils";
import { personalInfoFormSchema } from "@/lib/validators";
import {
  Field,
  Radio,
  RadioGroup as RgGroup,
  Label as UILabel,
} from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { DatePicker } from "./date-picker";
import { Button, buttonVariants } from "./ui/button";
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

const PersonalInfoForm = () => {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<TPersonalInfoForm>({
    resolver: zodResolver(personalInfoFormSchema),
    defaultValues: defaultPersonalInfoFormValues,
  });

  const homeOwnershipStatus = form.watch("homeOwnershipStatus");

  const onSubmit = async (formData: TPersonalInfoForm) => {
    startTransition(async () => {
      try {
        const res = await savePersonalInfo(formData, userId!);
        if (!res.success) {
          toast({
            variant: "destructive",
            description: res.message,
          });
          return;
        }
        router.push("/document-upload");
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
          setUserId(userId);
          const res = await getPersonalInfo(userId);
          if (res.success) {
            form.reset(res?.user as unknown as TPersonalInfoForm);
          }
        } else {
          router.push("/");
        }
        setIsLoading(false);
      })();
    }
  }, [form, router]);

  useEffect(
    function () {
      if (homeOwnershipStatus !== "other") {
        form.setValue("homeOwnershipStatusOther", "");
      }
    },
    [homeOwnershipStatus, form]
  );

  if (isLoading) {
    return (
      <div className=" flex items-center justify-center w-full">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <section>
      <div className="bg-gray1 p-6 md:p-8 rounded-3xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-3 sm:mb-2 inline-block">
                    What is your first name?
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your first name"
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
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-3 sm:mb-2 inline-block">
                    What is your last name?
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your last name"
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
              name="birthday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-3 sm:mb-2 inline-block">
                    Your date of birth?
                  </FormLabel>
                  <FormControl>
                    <div>
                      <DatePicker date={field.value} setDate={field.onChange} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-3 sm:mb-2 inline-block">
                    What is the best phone to reach you?
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your phone"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-3 sm:mb-2 inline-block">
                    What is your email address?
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your email"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* TODO */}
            <FormField
              control={form.control}
              name="education"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-3 sm:mb-2 inline-block">
                    What is your highest level of education?
                  </FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Education" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {EDUCATION.map((education) => (
                        <SelectItem key={education} value={education}>
                          {education}
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
              name="homeOwnershipStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-3 sm:mb-2 inline-block">
                    Do you own your own home?
                  </FormLabel>
                  <FormControl>
                    <RgGroup
                      {...field}
                      className={"flex gap-2 md:gap-4 flex-wrap"}
                    >
                      {HOME_OWNERSHIP.map((owner) => (
                        <Field
                          key={owner}
                          className="flex items-center gap-2 relative py-3 px-6 rounded-md bg-white hover:cursor-pointer"
                        >
                          <Radio
                            value={owner}
                            className="absolute inset-0 rounded-md border-[2px] border-solid border-gray-200  data-[checked]:border-primary-blue"
                          >
                            <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
                          </Radio>
                          <UILabel>{owner}</UILabel>
                        </Field>
                      ))}
                    </RgGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {homeOwnershipStatus === "Other" && (
              <FormField
                control={form.control}
                name="homeOwnershipStatusOther"
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
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-3 sm:mb-2 inline-block">
                    What industry are you in?
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {INDUSTRY.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="employmentStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-3 sm:mb-2 inline-block">
                    What is your employment status?
                  </FormLabel>
                  <FormControl>
                    <RgGroup
                      {...field}
                      className={"flex gap-2 md:gap-4 flex-wrap"}
                    >
                      {EMPLOYMENT_STATUS.map((status) => (
                        <Field
                          key={status}
                          className="flex items-center gap-2 relative py-3 px-6 rounded-md bg-white hover:cursor-pointer"
                        >
                          <Radio
                            value={status}
                            className="absolute inset-0 rounded-md border-[2px] border-solid border-gray-200  data-[checked]:border-primary-blue"
                          >
                            <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
                          </Radio>
                          <UILabel>{status}</UILabel>
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
              name="creditScore"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-3 sm:mb-2 inline-block">
                    What is your personal credit score?
                  </FormLabel>
                  <FormControl>
                    <RgGroup
                      {...field}
                      className={"flex gap-2 md:gap-4 flex-wrap"}
                    >
                      {CREDIT_SCORE.map((score) => (
                        <Field
                          key={score}
                          className="flex items-center gap-2 relative py-3 px-6 rounded-md bg-white hover:cursor-pointer"
                        >
                          <Radio
                            value={score}
                            className="absolute inset-0 rounded-md border-[2px] border-solid border-gray-200  data-[checked]:border-primary-blue"
                          >
                            <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
                          </Radio>
                          <UILabel>{score}</UILabel>
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
              name="ssn"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="mb-3 sm:mb-2 inline-block">
                    What is your SSN?
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your SSN"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(formatSSN(e.target.value));
                      }}
                      maxLength={11}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="homeAddressStreet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-3 sm:mb-2 inline-block">
                      What is your home address?
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
                name="homeAddressState"
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
                  name="homeAddressCity"
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
                  name="homeAddressZip"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Zip code"
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
            <div className="flex gap-6 md:gap-8">
              <Link
                href={"/"}
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
export default PersonalInfoForm;
