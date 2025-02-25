"use server";

import { prisma } from "@/db";
import {
  businessInfoFormSchema,
  personalInfoFormSchema,
  uploadDocumentsFormSchema,
} from "../validators";
import { formatError } from "../utils";

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
              fundingAmount: String(Number(validatedData.fundingAmount) * 1000),
              fundingReason: validatedData.fundingReason,
              businessStartMonth: validatedData.businessStartMonth,
              businessStartYear: validatedData.businessStartYear,
              annualRevenue: validatedData.annualRevenue,
              ein: validatedData.ein,
              businessState: validatedData.businessState,
              businessAddress: validatedData.businessAddress,
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
              fundingAmount: validatedData.fundingAmount,
              fundingReason: validatedData.fundingReason,
              businessStartMonth: validatedData.businessStartMonth,
              businessStartYear: validatedData.businessStartYear,
              annualRevenue: validatedData.annualRevenue,
              ein: validatedData.ein,
              businessState: validatedData.businessState,
              businessAddress: validatedData.businessAddress,
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
        name: validatedData.name,
        email: validatedData.email,
        application: {
          update: {
            name: validatedData.name,
            birthday: validatedData.birthday
              ? new Date(validatedData.birthday)
              : null,
            phoneNumber: validatedData.phoneNumber,
            email: validatedData.email,
            education: validatedData.education,
            homeOwnershipStatus: validatedData.homeOwnershipStatus,
            industry: validatedData.industry,
            employmentStatus: validatedData.employmentStatus,
            creditScore: validatedData.creditScore,
            ssn: validatedData.ssn,
            homeAddress: validatedData.homeAddress,
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
            licenseDoc: validatedData.license || null,
            businessAddressDoc: validatedData.businessAddressDoc || null,
            einDoc: validatedData.ein || null,
            govIdDoc: validatedData.govId || null,
            mercantProcessingStatement:
              validatedData.mercantProcessingStatement || null,
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
            fundingAmount: true,
            fundingReason: true,
            businessStartMonth: true,
            businessStartYear: true,
            annualRevenue: true,
            ein: true,
            businessState: true,
            businessAddress: true,
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
            name: true,
            birthday: true,
            phoneNumber: true,
            email: true,
            education: true,
            homeOwnershipStatus: true,
            industry: true,
            employmentStatus: true,
            creditScore: true,
            ssn: true,
            homeAddress: true,
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
