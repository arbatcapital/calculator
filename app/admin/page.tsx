import { prisma } from "@/db";
import { TDataTableSchema } from "@/lib/types";
import { convertToNumber, formatDate } from "@/lib/utils";
import { columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<TDataTableSchema[]> {
  const res = await prisma.application.findMany({
    where: {
      isCompleted: true,
    },
  });

  const data = res.map((res) => {
    return {
      name: res.name,
      email: res.email,
      phone: res.phoneNumber,
      businessType: res.businessType,
      amount: convertToNumber(res.fundingAmount),
      businessName: res.businessName,
      fundingReason: res.fundingReason,
      businessStartDate: formatDate(
        res.businessStartMonth,
        res.businessStartYear
      ),
      businessState: res.businessState,
      ein: res.ein,
      businessAddress: res.businessAddress,
      birthday: res.birthday?.toLocaleDateString(),
      homeAddress: res.homeAddress,
      education: res.education,
      homeOwnership: res.homeOwnershipStatus,
      industry: res.industry,
      employmentStatus: res.employmentStatus,
      creditScore: res.creditScore,
      docs: {
        licenseDoc: res.licenseDoc,
        einDoc: res.einDoc,
        mpsDoc: res.mpsDoc,
        govIdDoc: res.govIdDoc,
        businessAddressDoc: res.businessAddressDoc,
      },
      revenue: convertToNumber(res.annualRevenue),
      ssn: res.ssn,
    };
  });

  return data;
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-large px-4 md:px-8 mx-w-[1440px] mxa-auto">
      <div className="space-y-4 md:space-y-8">
        <h1 className="text-3xl font-medium md:text-4xl text-center">
          Applications received
        </h1>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
