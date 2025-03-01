"use server";
import ExcelJS from "exceljs";
import path from "path";
import { prisma } from "@/db";
import fs from "fs";
import {
  businessInfoFormSchema,
  personalInfoFormSchema,
  uploadDocumentsFormSchema,
} from "../validators";
import { formatAddress, formatError, formatStartDate } from "../utils";

export const saveBusinessInfo = async (data: unknown, userId: string) => {
  try {
    const validatedData = businessInfoFormSchema.parse(data);
    if (!validatedData) throw new Error("Invalid data");

    if (userId) {
      const findUser = await prisma.user.findFirst({
        where: { id: userId },
      });
      if (!findUser) throw new Error("User application not found");

      const updatedUser = await prisma.user.update({
        where: { id: findUser.id },
        data: {
          application: {
            update: {
              businessType: validatedData.businessType,
              businessName: validatedData.businessName,
              dba: validatedData.dba,
              fundingAmount: validatedData.fundingAmount,
              fundingReason: validatedData.fundingReason,
              businessPropertyInfo: validatedData.businessPropertyInfo,
              businessPropertyInfoOther:
                validatedData.businessPropertyInfoOther,
              businessStartDate: formatStartDate(
                validatedData.businessStartMonth,
                validatedData.businessStartYear
              ),
              businessStartMonth: validatedData.businessStartMonth,
              businessStartYear: validatedData.businessStartYear,
              businessWebsite: validatedData.businessWebsite,
              businessEmailAddress: validatedData.businessEmailAddress,
              businessPhone: validatedData.businessPhone,
              annualRevenue: validatedData.annualRevenue,
              ein: validatedData.ein,
              businessAddressStreet: validatedData.businessAddressStreet,
              businessAddressCity: validatedData.businessAddressCity,
              businessAddressState: validatedData.businessAddressState,
              businessAddressZip: validatedData.businessAddressZip,
              completeBusinessAddress: formatAddress(
                validatedData.businessAddressStreet,
                validatedData.businessAddressCity,
                validatedData.businessAddressState,
                validatedData.businessAddressZip
              ),
              stepOneCompleted: true,
            },
          },
        },
      });
      if (!updatedUser) throw new Error("Failed to update the user");
      return {
        success: true,
        message: "Business information updated successfully",
        userId: updatedUser.id,
      };
    } else {
      const user = await prisma.user.create({
        data: {
          application: {
            create: {
              businessType: validatedData.businessType,
              businessName: validatedData.businessName,
              dba: validatedData.dba,
              fundingAmount: validatedData.fundingAmount,
              fundingReason: validatedData.fundingReason,
              businessPropertyInfo: validatedData.businessPropertyInfo,
              businessPropertyInfoOther:
                validatedData.businessPropertyInfoOther,
              businessStartDate: formatStartDate(
                validatedData.businessStartMonth,
                validatedData.businessStartYear
              ),
              businessStartMonth: validatedData.businessStartMonth,
              businessStartYear: validatedData.businessStartYear,
              businessWebsite: validatedData.businessWebsite,
              businessEmailAddress: validatedData.businessEmailAddress,
              businessPhone: validatedData.businessPhone,
              annualRevenue: validatedData.annualRevenue,
              ein: validatedData.ein,
              businessAddressStreet: validatedData.businessAddressStreet,
              businessAddressCity: validatedData.businessAddressCity,
              businessAddressState: validatedData.businessAddressState,
              businessAddressZip: validatedData.businessAddressZip,
              completeBusinessAddress: formatAddress(
                validatedData.businessAddressStreet,
                validatedData.businessAddressCity,
                validatedData.businessAddressState,
                validatedData.businessAddressZip
              ),
              stepOneCompleted: true,
            },
          },
        },
      });
      if (!user) throw new Error("Failed to save business information");
      return {
        success: true,
        message: "Business information saved successfully",
        userId: user.id,
      };
    }
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};

export const savePersonalInfo = async (data: unknown, userId: string) => {
  try {
    const validatedData = personalInfoFormSchema.parse(data);
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) throw new Error("Application not found");
    //update the user
    await prisma.user.update({
      where: { id: user.id },
      data: {
        fullName: `${validatedData.firstName} ${validatedData.lastName}`,
        email: validatedData.email,
        application: {
          update: {
            firstName: validatedData.firstName,
            lastName: validatedData.lastName,
            birthday: validatedData.birthday
              ? new Date(validatedData.birthday)
              : null,
            phoneNumber: validatedData.phoneNumber,
            email: validatedData.email,
            education: validatedData.education,
            homeOwnershipStatus: validatedData.homeOwnershipStatus,
            homeOwnershipStatusOther: validatedData.homeOwnershipStatusOther,
            industry: validatedData.industry,
            employmentStatus: validatedData.employmentStatus,
            creditScore: validatedData.creditScore,
            ssn: validatedData.ssn,
            homeAddressStreet: validatedData.homeAddressStreet,
            homeAddressCity: validatedData.homeAddressCity,
            homeAddressState: validatedData.homeAddressState,
            homeAddressZip: validatedData.homeAddressZip,
            completeHomeAddress: formatAddress(
              validatedData.homeAddressStreet,
              validatedData.homeAddressCity,
              validatedData.homeAddressState,
              validatedData.homeAddressZip
            ),
            stepTwoCompleted: true,
          },
        },
      },
    });

    return {
      success: true,
      message: "Business information saved successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};

export const saveDocs = async (data: unknown, userId: string) => {
  try {
    const validatedData = uploadDocumentsFormSchema.parse(data);
    if (!validatedData) throw new Error("Invalid data");
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) throw new Error("User not found");
    //update the user
    await prisma.user.update({
      where: { id: user.id },
      data: {
        application: {
          update: {
            govIdDoc: validatedData.govId || null,
            annualReport: validatedData.annualReport || null,
            articleOfIncorporation:
              validatedData.articleOfIncorporation || null,
            businessAddressProof: validatedData.businessAddressProof || null,
            bankStatment1: validatedData.bankStatment1 || null,
            bankStatment2: validatedData.bankStatment2 || null,
            bankStatment3: validatedData.bankStatment3 || null,
            signor: validatedData.signor,
            entityName: validatedData.entityName,
            dateofSubmission: validatedData.dateofSubmission,
            isCompleted: true,
          },
        },
      },
    });

    return {
      success: true,
      message: "Documents saved successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};

export const getBusinessInfo = async (userId: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id: userId },
      include: {
        application: {
          select: {
            businessType: true,
            businessName: true,
            dba: true,
            businessPropertyInfo: true,
            businessPropertyInfoOther: true,
            fundingAmount: true,
            fundingReason: true,
            businessStartMonth: true,
            businessStartYear: true,
            annualRevenue: true,
            ein: true,
            businessAddressStreet: true,
            businessAddressState: true,
            businessAddressZip: true,
            businessAddressCity: true,
            businessWebsite: true,
            businessPhone: true,
            businessEmailAddress: true,
            stepOneCompleted: true,
          },
        },
      },
    });
    if (user && user.application) {
      return {
        success: true,
        user: user?.application,
      };
    }
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};

export const getPersonalInfo = async (userId: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id: userId },
      include: {
        application: {
          select: {
            firstName: true,
            lastName: true,
            birthday: true,
            phoneNumber: true,
            email: true,
            education: true,
            homeOwnershipStatus: true,
            homeOwnershipStatusOther: true,
            industry: true,
            employmentStatus: true,
            creditScore: true,
            ssn: true,
            homeAddressStreet: true,
            homeAddressState: true,
            homeAddressZip: true,
            homeAddressCity: true,
            stepTwoCompleted: true,
          },
        },
      },
    });
    if (user && user.application?.stepTwoCompleted) {
      return {
        success: true,
        user: user.application,
      };
    } else {
      return {
        success: false,
      };
    }
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};

export async function getSignor(userId: string) {
  try {
    if (!userId) throw new Error("Please provide a user Id");
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        fullName: true,
      },
    });

    if (user) {
      return { success: true, message: "User found", user: user };
    }
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function exportToExcel() {
  try {
    const applications = await prisma.application.findMany({
      where: { isCompleted: true },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (applications.length === 0) {
      return {
        success: false,
        message: "No data to download",
        fileUrl: null,
      };
    }

    const columns = [
      { header: "Business Type", key: "businessType", width: 20 },
      { header: "Business Name", key: "businessName", width: 25 },
      { header: "DBA", key: "dba", width: 25 },
      {
        header: "Business Property Info",
        key: "businessPropertyInfo",
        width: 30,
      },
      {
        header: "Other Property Info (If any)",
        key: "businessPropertyInfoOther",
        width: 30,
      },
      { header: "Funding Amount", key: "fundingAmount", width: 15 },
      { header: "Business Website", key: "businessWebsite", width: 30 },
      { header: "Business Email", key: "businessEmailAddress", width: 30 },
      { header: "Business Phone", key: "businessPhone", width: 20 },
      { header: "Funding Reason", key: "fundingReason", width: 30 },
      { header: "Business Start Month", key: "businessStartMonth", width: 15 },
      { header: "Business Start Year", key: "businessStartYear", width: 15 },
      { header: "Business Start Date", key: "businessStartDate", width: 20 },
      { header: "Annual Revenue ($USD)", key: "annualRevenue", width: 15 },
      { header: "EIN", key: "ein", width: 15 },
      { header: "Business Address", key: "completeBusinessAddress", width: 40 },
      { header: "First Name", key: "firstName", width: 20 },
      { header: "Last Name", key: "lastName", width: 20 },
      { header: "Birthday", key: "birthday", width: 15 },
      { header: "Phone Number", key: "phoneNumber", width: 20 },
      { header: "Email", key: "email", width: 30 },
      { header: "Education", key: "education", width: 20 },
      {
        header: "Home Ownership Status",
        key: "homeOwnershipStatus",
        width: 25,
      },
      {
        header: "Home Ownership Other (if any)",
        key: "homeOwnershipStatusOther",
        width: 25,
      },
      { header: "Industry", key: "industry", width: 20 },
      { header: "Employment Status", key: "employmentStatus", width: 25 },
      { header: "Credit Score", key: "creditScore", width: 15 },
      { header: "Home Address", key: "completeHomeAddress", width: 40 },
      { header: "SSN", key: "ssn", width: 20 },
      { header: "Signor", key: "signor", width: 20 },
      { header: "Entity Name", key: "entityName", width: 30 },
      { header: "Submission Date", key: "dateofSubmission", width: 20 },

      // Document Links (Hyperlinks)
      { header: "Gov ID Document", key: "govIdDoc", width: 30 },
      { header: "Annual Report", key: "annualReport", width: 30 },
      {
        header: "Articles of Incorporation",
        key: "articleOfIncorporation",
        width: 30,
      },
      {
        header: "Business Address Proof",
        key: "businessAddressProof",
        width: 30,
      },
      { header: "Bank Statement 1", key: "bankStatment1", width: 30 },
      { header: "Bank Statement 2", key: "bankStatment2", width: 30 },
      { header: "Bank Statement 3", key: "bankStatment3", width: 30 },
    ];

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Applications");

    worksheet.columns = columns;

    applications.forEach((app) => {
      const row = worksheet.addRow(app);

      const linkFields = [
        "govIdDoc",
        "annualReport",
        "articleOfIncorporation",
        "businessAddressProof",
        "bankStatment1",
        "bankStatment2",
        "bankStatment3",
      ] as const;

      linkFields.forEach((field) => {
        if (app[field]) {
          const cell = row.getCell(
            columns.findIndex((col) => col.key === field) + 1
          );
          cell.value = { text: "View Document", hyperlink: app[field] };
          cell.font = { color: { argb: "0000FF" }, underline: true };
        }
      });
    });

    worksheet.columns.forEach((column) => {
      let maxLength = column.width || 10;
      column.eachCell?.((cell) => {
        const cellValue = cell.value ? cell.value.toString() : "";
        maxLength = Math.max(maxLength, cellValue.length);
      });
      column.width = maxLength + 2;
    });

    // Save file
    const fileName = `${Date.now()}_applications.xlsx`;
    const filePath = path.join(
      process.cwd(),
      "public",
      "applications",
      fileName
    );
    await workbook.xlsx.writeFile(filePath);
    const fileUrl = `/applications/${fileName}`;
    return {
      success: true,
      message: "File downloaded successfully",
      fileUrl: fileUrl,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to download",
      fileUrl: null,
    };
  }
}
export async function deleteFile(fileName: string) {
  try {
    if (!fileName) {
      throw new Error("No file specified");
    }

    const filePath = path.join(
      process.cwd(),
      "public",
      "applications",
      fileName
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return { success: true };
    }
    return { success: false, message: "File not found" };
  } catch (error) {
    console.error("Error deleting file:", error);
    return { success: false, message: "Internal server error" };
  }
}
