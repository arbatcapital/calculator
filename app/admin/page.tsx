import { prisma } from "@/db";
import { TDataTableSchema } from "@/lib/types";
import {
  convertToNumber,
  formatAddress,
  formatDate,
  formatName,
} from "@/lib/utils";
import {
  getKindeServerSession,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import DownloadSheet from "@/components/download-sheet";
import { buttonVariants } from "@/components/ui/button";

interface Role {
  id: string;
  key: string;
  name: string;
}

async function getData(): Promise<TDataTableSchema[]> {
  const res = await prisma.application.findMany({
    where: {
      isCompleted: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const data = res.map((res, i) => {
    return {
      serialNumber: i + 1,
      dateofSubmission: res.dateofSubmission,
      fullName: formatName(res.firstName, res.lastName),
      personalContact: {
        email: res.email,
        phone: res.phoneNumber,
      },
      businessContact: {
        businessWebsite: res.businessWebsite,
        businessEmailAddress: res.businessEmailAddress,
        businessPhone: res.businessPhone,
      },
      businessType: res.businessType,
      dba: res.dba,
      businessPropertyInfo:
        res.businessPropertyInfo || res.businessPropertyInfoOther,
      fundingAmount: convertToNumber(res.fundingAmount),
      businessName: res.businessName,
      fundingReason: res.fundingReason,
      businessStartDate: formatDate(
        res.businessStartMonth,
        res.businessStartYear
      ),

      ein: res.ein,
      completeBusinessAddress: formatAddress(
        res.businessAddressStreet!,
        res.businessAddressCity!,
        res.businessAddressState!,
        res.businessAddressZip!
      ),
      birthday: res.birthday?.toLocaleDateString(),
      completeHomeAddress: formatAddress(
        res.homeAddressStreet!,
        res.homeAddressCity!,
        res.homeAddressState!,
        res.homeAddressZip!
      ),
      education: res.education,
      homeOwnershipStatus:
        res.homeOwnershipStatus || res.homeOwnershipStatusOther,
      industry: res.industry,
      employmentStatus: res.employmentStatus,
      creditScore: res.creditScore,
      docs: {
        annualReport: res.annualReport,
        articleOfIncorporation: res.articleOfIncorporation,
        businessAddressProof: res.businessAddressProof,
        govId: res.govIdDoc,
        bankStatment1: res.bankStatment1,
        bankStatment2: res.bankStatment2,
        bankStatment3: res.bankStatment3,
      },
      revenue: convertToNumber(res.annualRevenue),
      ssn: res.ssn,
      signor: res.signor,
    };
  });

  return data;
}

export default async function AdminPage() {
  const { isAuthenticated, getClaim } = getKindeServerSession();
  if (!isAuthenticated) redirect("/api/auth/login");
  const claim = await getClaim("roles", "access_token");
  let roles: Role[] = [];
  if (claim?.value) {
    try {
      roles =
        typeof claim.value === "string" ? JSON.parse(claim.value) : claim.value;
    } catch (error) {
      console.log("Error parsing roles claim", error);
    }
  }
  const hasAdminRole = roles.some((x) => x.key === "admin");
  if (!hasAdminRole) {
    redirect("/unauthorized");
  }

  const data = await getData();

  return (
    <div className="container mx-auto py-large px-4 md:px-8 mx-w-[1440px] mxa-auto">
      <div className="space-y-4 md:space-y-8">
        <h1 className="text-3xl font-medium md:text-4xl text-center">
          Applications submitted
        </h1>
        <div className="flex items-center justify-between">
          <DownloadSheet />
          <LogoutLink className={buttonVariants({ variant: "outline" })}>
            Log out
          </LogoutLink>
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
