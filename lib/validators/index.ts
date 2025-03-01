import { z } from "zod";

export const businessInfoFormSchema = z
  .object({
    businessType: z.string().min(2, "Please select an option"),
    businessName: z
      .string()
      .min(2, "Business name must be atleast 2 characters"),
    dba: z.string().min(1, "DBA is required"),
    businessPropertyInfo: z
      .string()
      .min(1, "Business property information is required"),
    businessPropertyInfoOther: z.string().optional(),
    businessWebsite: z.string().url("Please provide a valid website url"),

    businessEmailAddress: z
      .string()
      .email()
      .min(1, "Business email is required"),
    businessPhone: z.string().optional(),
    fundingAmount: z.string().min(2, "Please select an option"),
    fundingReason: z.string().min(2, "Please select an option"),
    businessStartMonth: z
      .string()
      .min(1, "Please select business month")

      .transform((value) => String(value)),

    businessStartYear: z.string().min(1, "Please select business year"),
    businessStartDate: z.string().optional(),
    annualRevenue: z
      .string()
      .min(3, "Revenue is required")
      .refine((val) => !isNaN(Number(val.replace(/[^0-9.-]+/g, ""))), {
        message: "Invalid revenue amount",
      }),
    ein: z
      .string()
      .regex(/^\d{2}-\d{7}$/, "Enter a valid EIN (XX-XXXXXXX).")
      .optional(),

    businessAddressStreet: z
      .string()
      .min(1, "Please enter your street address"),
    businessAddressCity: z.string().min(1, "Please enter your city"),
    businessAddressState: z.string().min(1, "Please select a state"),
    businessAddressZip: z.string().min(5, "Please enter zip code"),
    completeBusinessAddress: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.businessPropertyInfo === "Other") {
        return data.businessPropertyInfoOther
          ? data.businessPropertyInfoOther.trim().length > 1
          : false;
      }
      return true;
    },
    {
      message: "Please specify business property information",
      path: ["businessPropertyInfoOther"],
    }
  );
// city zip dba property info property info other website email phone

export const personalInfoFormSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    birthday: z.date().optional(),
    phoneNumber: z.string().optional(),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please provide a valid email address"),
    education: z.string().min(2, "Please select an option"),
    homeOwnershipStatus: z.string().min(2, "Please select an option"),
    homeOwnershipStatusOther: z.string().optional(),
    industry: z.string().min(2, "Please select an option"),
    employmentStatus: z.string().min(2, "Please select an option"),
    creditScore: z.string().min(2, "Please select an option"),
    ssn: z
      .string()
      .regex(
        /^(?!666|9\d{2})[0-8]\d{2}-\d{2}-\d{4}$/,
        "Enter a valid SSN (XXX-XX-XXXX)."
      ),
    homeAddressStreet: z.string().min(1, "Please enter your street address"),
    homeAddressCity: z.string().min(1, "Please enter your city"),
    homeAddressState: z.string().min(1, "Please select a state"),
    homeAddressZip: z.string().min(5, "Please enter zip code"),
    completeHomeAddress: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.homeOwnershipStatus === "Other") {
        return data.homeOwnershipStatusOther
          ? data.homeOwnershipStatusOther.trim().length > 1
          : false;
      }
      return true;
    },
    {
      message: "Please specify your home ownership status",
      path: ["homeOwnershipStatusOther"],
    }
  );

export const uploadDocumentsFormSchema = z.object({
  govId: z.string().optional(),
  annualReport: z.string().optional(),
  articleOfIncorporation: z.string().optional(),
  businessAddressProof: z.string().optional(),
  bankStatment1: z.string().optional(),
  bankStatment2: z.string().optional(),
  bankStatment3: z.string().optional(),
  entityName: z.string().min(1, "Entity name is required"),
  dateofSubmission: z.string().optional(),
  signor: z.string().min(3, "Authorized signor is required"),
});

export const DataTableSchema = z.object({
  dateofSubmission: z.string().nullable(),
  fullName: z.string().nullable(),
  personalContact: z.object({
    email: z.string().email().nullable(),
    phone: z.string().nullable(),
  }),
  businessType: z.string().nullable(),
  businessName: z.string().nullable(),
  dba: z.string().nullable(),
  businessPropertyInfo: z.string().nullable(),
  fundingAmount: z.number().int().nullable(),
  businessContact: z.object({
    businessWebsite: z.string().nullable(),
    businessEmailAddress: z.string().nullable(),
    businessPhone: z.string().nullable(),
  }),
  fundingReason: z.string().nullable(),
  businessStartDate: z.string().nullable(),
  ein: z.string().nullable(),
  completeBusinessAddress: z.string().nullable(),

  birthday: z.string().optional(),
  completeHomeAddress: z.string().nullable(),
  education: z.string().nullable(),
  homeOwnershipStatus: z.string().nullable(),
  industry: z.string().nullable(),
  employmentStatus: z.string().nullable(),
  creditScore: z.string().nullable(),
  revenue: z.number().int().nullable(),
  ssn: z.string().nullable(),
  signor: z.string().nullable(),
  docs: z.object({
    annualReport: z.string().nullable(),
    articleOfIncorporation: z.string().nullable(),
    businessAddressProof: z.string().nullable(),
    govId: z.string().nullable(),
    bankStatment1: z.string().nullable(),
    bankStatment2: z.string().nullable(),
    bankStatment3: z.string().nullable(),
  }),
});
