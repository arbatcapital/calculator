export const BUSINESS_TYPE = [
  "LLC",
  "Sole Proprietorship",
  "Partnership",
  "C Corporation",
  "S Corporation",
  "Wholesale",
  "Business Services",
  "Consumer Services",
  "Restaurant Bar",
  "Administrative",
  "IT",
] as const;

export const FUNDING_AMOUNT = [
  "5,000",
  "7,500",
  "12,500",
  "17,500",
  "10,000",
  "15,000",
  "20,000",
  "30,000",
  "50,000",
  "75,000",
  "100,000",
  "150,000",
] as const;

export const FUNDING_REASON = [
  "Open New Location",
  "Equipment Purchase",
  "Inventory",
  "Marketing",
  "Payroll",
  "Vehicle Purchase",
  "Remodel Store/Office",
  "Refinance Debt",
  "Working Capital",
  "Rent",
] as const;

export const INDUSTRY = [
  "Administrative",
  "Agriculture",
  "Arts",
  "Education",
  "Health care",
  "Information",
  "Management",
  "Manufacturing",
  "Mining",
  "Scientific",
  "Real Estate",
  "Retail",
  "Transportation",
  "Other",
] as const;

export const HOME_OWNERSHIP = [
  "Own",
  "Own with mortgage",
  "Rent",
  "Other",
] as const;

export const CREDIT_SCORE = [
  "Excellent +720",
  "Good 680 - 719",
  "Fair 640 - 679",
  "Poor 639 or less",
] as const;

export const EMPLOYMENT_STATUS = [
  "Employed",
  "Employed full time",
  "Military",
  "Employed part time",
] as const;

export const EDUCATION = [
  "No Diploma",
  "High School / GED",
  "Associate Degree",
  "Bachelor Degree",
  "Master Degree",
  "PhD",
] as const;

export const BUSINESS_STATE = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
] as const;

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const BUSINESS_PROPERTY_INFO = ["Owning", "Renting", "Other"] as const;

export const YEARS = Array.from({ length: 2025 - 1900 + 1 }, (_, i) =>
  (1900 + i).toString()
);

export const WEBSITE_HOME_PAGE =
  process.env.HOME_PAGE_URL || "https://www.arbat-capital.io";
export const WEBSITE_ABOUT_PAGE =
  process.env.ABOUT_PAGE_URL || "https://www.arbat-capital.io/about";
export const WEBSITE_FAQ_PAGE =
  process.env.FAQ_PAGE_URL || "https://www.arbat-capital.io/faq";
export const WEBSITE_CONTACT =
  process.env.CONTACT_PAGE_URL || "https://www.arbat-capital.io/contact";
export const WEBSITE_APPLY_NOW =
  process.env.APPLY_PAGE_URL || "app.arbat-capital.io";

export const MAX_FILE_SIZE = 4 * 1024 * 1024;
export const NAVLINKS = [
  {
    title: "Home",
    href: WEBSITE_HOME_PAGE,
  },

  {
    title: "About",
    href: WEBSITE_ABOUT_PAGE,
  },
  {
    title: "FAQ",
    href: WEBSITE_FAQ_PAGE,
  },
] as const;

export const defaultBusinessInfoFormValues = {
  businessType: "",
  businessName: "",
  fundingAmount: "",
  fundingReason: "",
  businessStartMonth: "",
  businessStartYear: "",
  businessStartDate: "",
  ein: "",
  businessAddress: "",
  annualRevenue: "",
  dba: "",
  businessPropertyInfo: "",
  businessPropertyInfoOther: "",
  businessWebsite: "",
  businessEmailAddress: "",
  businessPhone: "",
  businessAddressCity: "",
  businessAddressStreet: "",
  businessAddressZip: "",
  businessAddressState: "",
  completeBusinessAddress: "",
};

// city zip dba property info property info other website email phone

export const defaultPersonalInfoFormValues = {
  firstName: "",
  lastName: "",
  birthday: undefined,
  phoneNumber: "",
  email: "",
  education: "",
  homeOwnershipStatus: "",
  homeOwnershipStatusOther: "",
  industry: "",
  creditScore: "",
  employmentStatus: "",
  ssn: "",
  homeAddressStreet: "",
  homeAddressCity: "",
  homeAddressState: "",
  homeAddressZip: "",
  completeHomeAddress: "",
};

export const defaultUploadDocumentFormValues = {
  govId: "",
  articleOfIncorporation: "",
  annualReport: "",
  businessAddressProof: "",
  bankStatment1: "",
  bankStatment2: "",
  bankStatment3: "",
  signor: "",
  entityName: "",
  dateofSubmission: "",
};
