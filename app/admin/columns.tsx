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
export type Payment = {
  amount: number;
  email: string;
  fullname: string;
};

export const columns: ColumnDef<TDataTableSchema>[] = [
  {
    id: "docs",
    cell: ({ row }) => {
      const einDoc = row.original.docs.einDoc;
      const mpsDoc = row.original.docs.mpsDoc;
      const govId = row.original.docs.govIdDoc;
      const businessAddress = row.original.docs.businessAddressDoc;
      const licenseDoc = row.original.docs.licenseDoc;

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
            {licenseDoc ? (
              <DropdownMenuItem>
                <a
                  href={licenseDoc}
                  download={"ein.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  License document
                </a>
              </DropdownMenuItem>
            ) : (
              ""
            )}
            {businessAddress ? (
              <DropdownMenuItem>
                <a
                  href={businessAddress}
                  download={"ein.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Business address
                </a>
              </DropdownMenuItem>
            ) : (
              ""
            )}
            {govId ? (
              <DropdownMenuItem>
                <a
                  href={govId}
                  download={"ein.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Government ID
                </a>
              </DropdownMenuItem>
            ) : (
              ""
            )}
            {mpsDoc ? (
              <DropdownMenuItem>
                <a
                  href={mpsDoc}
                  download={"ein.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Membership Processing Statement
                </a>
              </DropdownMenuItem>
            ) : (
              ""
            )}
            {einDoc ? (
              <DropdownMenuItem>
                <a
                  href={einDoc}
                  download={"ein.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  EIN Document
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
    accessorKey: "name",
    header: "Applicant name",
  },
  {
    accessorKey: "email",
    header: "Email",
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
    accessorKey: "amount",

    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(amount);

      return <div>{formatted}</div>;
    },
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
  },
  {
    accessorKey: "ein",
    header: "EIN",
  },
  {
    accessorKey: "businessState",
    header: "Business State",
  },
  {
    accessorKey: "businessAddress",
    header: "Business Address",
  },

  {
    accessorKey: "birthday",
    header: "Birth Day",
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
  },
  {
    accessorKey: "homeAddress",
    header: "Home Address",
  },
  {
    accessorKey: "education",
    header: "Education",
  },
  {
    accessorKey: "homeOwnership",
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
];
