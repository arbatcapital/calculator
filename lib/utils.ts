import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any) {
  if (error.name === "ZodError") {
    // Handle Zod error
    const fieldErrors = Object.keys(error.errors).map(
      (field) => error.errors[field].message
    );

    return fieldErrors.join(". ");
  } else if (
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    // Handle Prisma error
    const field = error.meta?.target ? error.meta.target[0] : "Field";
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  } else {
    // Handle other errors
    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error.message);
  }
}

export function convertToNumber(str: string | null) {
  if (str) {
    return Number(str.replaceAll(",", ""));
  }
  return NaN;
}

export function formatDate(month: string | null, year: string | null) {
  if (month && year) {
    return `${month} - ${year}`;
  }
  return null;
}
export function convertToUrl(str: string | null) {
  if (str) {
    return new URL(str);
  }
  return null;
}

export const getLastThreeMonths = () => {
  const months = [
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
  ];

  const today = new Date();
  const lastThreeMonths = [];

  for (let i = 1; i <= 3; i++) {
    const monthIndex = (today.getMonth() - i + 12) % 12;
    lastThreeMonths.push(months[monthIndex]);
  }

  return lastThreeMonths;
};

export function formatSSN(value: string) {
  const rawValue = value.replace(/\D/g, "");
  let formattedValue = rawValue;
  if (rawValue.length > 3 && rawValue.length <= 5) {
    formattedValue = `${rawValue.slice(0, 3)}-${rawValue.slice(3)}`;
  } else if (rawValue.length > 5) {
    formattedValue = `${rawValue.slice(0, 3)}-${rawValue.slice(
      3,
      5
    )}-${rawValue.slice(5, 9)}`;
  }

  return formattedValue;
}

export function formatEIN(value: string) {
  const rawValue = value.replace(/\D/g, "");
  let formattedValue = rawValue;
  if (rawValue.length > 2) {
    formattedValue = `${rawValue.slice(0, 2)}-${rawValue.slice(2)}`;
  }
  return formattedValue;
}

export function formatAddress(
  street: string,
  city: string,
  state: string,
  zip: string
) {
  return `${street}, ${city}, ${state} ${zip}`;
}

export function formatStartDate(month: string, year: string) {
  return `${month}-${year}`;
}

export function formatName(f: string | null, l: string | null) {
  if (f && l) {
    return `${f} ${l}`;
  }
  return "NO_NAME";
}
