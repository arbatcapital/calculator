"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TDataTableSchema } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<TDataTableSchema>[] = [
  {
    id: "docs",
    cell: ({ row }) => {
      const annualReport = row.original.docs.annualReport;
      const articleOfIncorporation = row.original.docs.articleOfIncorporation;
      const businessAddressProof = row.original.docs.businessAddressProof;
      const govId = row.original.docs.govId;
      const bankStatment1 = row.original.docs.bankStatment1;
      const bankStatment2 = row.original.docs.bankStatment2;
      const bankStatment3 = row.original.docs.bankStatment3;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Documents</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {annualReport ? (
              <DropdownMenuItem>
                <a
                  href={annualReport}
                  download={"annualReport.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Annual Report
                </a>
              </DropdownMenuItem>
            ) : (
              ""
            )}
            {articleOfIncorporation ? (
              <DropdownMenuItem>
                <a
                  href={articleOfIncorporation}
                  download={"articleOfIncorporation.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Article of Incorporation
                </a>
              </DropdownMenuItem>
            ) : (
              ""
            )}
            {govId ? (
              <DropdownMenuItem>
                <a
                  href={govId}
                  download={"govId.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Government ID
                </a>
              </DropdownMenuItem>
            ) : (
              ""
            )}
            {businessAddressProof ? (
              <DropdownMenuItem>
                <a
                  href={businessAddressProof}
                  download={"businessAddressProof.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Proof of Business Address
                </a>
              </DropdownMenuItem>
            ) : (
              ""
            )}

            {bankStatment1 ? (
              <DropdownMenuItem>
                <a
                  href={bankStatment1}
                  download={"ein.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bank Statement 1
                </a>
              </DropdownMenuItem>
            ) : (
              ""
            )}
            {bankStatment2 ? (
              <DropdownMenuItem>
                <a
                  href={bankStatment2}
                  download={"ein.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bank Statement 2
                </a>
              </DropdownMenuItem>
            ) : (
              ""
            )}
            {bankStatment3 ? (
              <DropdownMenuItem>
                <a
                  href={bankStatment3}
                  download={"ein.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bank Statement 3
                </a>
              </DropdownMenuItem>
            ) : (
              ""
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "serialNumber",
    header: "No",
  },

  {
    accessorKey: "dateofSubmission",
    header: "Submission date",
    cell: ({ row }) => {
      const date = row.getValue("dateofSubmission") as string;

      return <div>{date}</div>;
    },
  },

  {
    accessorKey: "fullname",
    header: "Applicant name",
    cell: ({ row }) => {
      const name = row.original.fullName;
      return <div>{name}</div>;
    },
  },
  {
    accessorKey: "personalContact",
    header: "Personal Contant Info",
    cell: ({ row }) => {
      const email = row.original.personalContact.email;
      const phone = row.original.personalContact.phone;

      return (
        <ul className="flex gap-2 flex-col">
          <li>{email}</li>
          <li>{phone}</li>
        </ul>
      );
    },
  },

  {
    accessorKey: "businessType",
    header: "Business Type",
  },
  {
    accessorKey: "businessName",
    header: "Business Name",
  },

  {
    accessorKey: "businessContact",
    header: "Business Contact Info",
    cell: ({ row }) => {
      const email = row.original.businessContact.businessEmailAddress;
      const phone = row.original.businessContact.businessPhone;
      const website = row.original.businessContact.businessWebsite;

      return (
        <ul className="flex gap-2 flex-col">
          <li>{email}</li>
          <li>{phone}</li>
          <li>{website}</li>
        </ul>
      );
    },
  },

  {
    accessorKey: "fundingAmount",
    header: "Funding Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("fundingAmount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "dba",
    header: "DBA",
  },

  {
    accessorKey: "businessPropertyInfo",
    header: "Business Property Info",
  },

  {
    accessorKey: "fundingReason",
    header: "Funding Reason",
  },
  {
    accessorKey: "businessStartDate",
    header: "Start Date",
  },
  {
    accessorKey: "revenue",
    header: "Annual Revenue",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("revenue"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "ein",
    header: "EIN",
  },

  {
    accessorKey: "completeBusinessAddress",
    header: "Business Address",
    cell: ({ row }) => {
      return <div className="">{row.getValue("completeBusinessAddress")}</div>;
    },
  },

  {
    accessorKey: "birthday",
    header: "Birth Day",
  },

  {
    accessorKey: "completeHomeAddress",
    header: "Home Address",
    cell: ({ row }) => {
      return <div className="">{row.getValue("completeHomeAddress")}</div>;
    },
  },
  {
    accessorKey: "education",
    header: "Education",
  },
  {
    accessorKey: "homeOwnershipStatus",
    header: "Home Ownership",
  },
  {
    accessorKey: "industry",
    header: "Industry",
  },
  {
    accessorKey: "employmentStatus",
    header: "Employment Status",
  },
  {
    accessorKey: "creditScore",
    header: "Credit Score",
  },
  {
    accessorKey: "ssn",
    header: "SSN",
  },

  {
    accessorKey: "signor",
    header: "Signor",
  },
];
