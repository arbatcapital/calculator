export const BUSINESS_TYPE = [
  "LLC",
  "Sole Proprietorship",
  "Partnership",
  "C Corporation",
  "S Corporation",
] as const;

export const FUNDING_AMOUNT = [
  "5",
  "10",
  "15",
  "20",
  "30",
  "50",
  "75",
  "100",
  "150",
] as const;

export const FUNDING_REASON = [
  "Expansion",
  "Equipment purchase",
  "Finance Accounts receivable",
  "Inventory",
  "Marketing",
  "Payroll",
  "Vehicle purchase",
  "Remodel building",
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

export const WEBSITE_HOME_PAGE = "https://www.arbat-capital.io";
export const WEBSITE_ABOUT_PAGE = "https://www.arbat-capital.io/about";
export const WEBSITE_FAQ_PAGE = "https://www.arbat-capital.io/faq";
export const WEBSITE_CONTACT = "https://www.arbat-capital.io/contact";
export const WEBSITE_APPLY_NOW = "https://www.arbat-capital.io/apply";

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
  {
    title: "Contact",
    href: WEBSITE_CONTACT,
  },
] as const;

export const defaultBusinessInfoFormValues = {
  businessType: "",
  businessName: "",
  fundingAmount: "",
  fundingReason: "",
  businessStartMonth: "",
  businessStartYear: "",
  ein: "",
  businessState: "",
  businessAddress: "",
  annualRevenue: "",
};

export const defaultPersonalInfoFormValues = {
  name: "",
  birthday: undefined,
  phoneNumber: "",
  email: "",
  homeAddress: "",
  education: "",
  homeOwnershipStatus: "",
  industry: "",
  creditScore: "",
  employmentStatus: "",
  ssn: "",
};

export const defaultUploadDocumentFormValues = {
  license: "",
  ein: "",
  mercantProcessingStatement: "",
  govId: "",
  businessAddressDoc: "",
};
