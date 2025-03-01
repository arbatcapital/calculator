import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest, NextResponse } from "next/server";

// Define the expected structure of req.kindeAuth
interface KindeRole {
  id: string;
  key: string;
  name: string;
}

interface KindeAuthToken {
  roles?: KindeRole[];
}

interface KindeAuthRequest extends NextRequest {
  kindeAuth: {
    token?: KindeAuthToken;
  };
}

export default withAuth(async function middleware(req: KindeAuthRequest) {
  const { token } = req.kindeAuth;
  if (!token) {
    return NextResponse.redirect(new URL("/api/auth/login", req.url));
  }

  const hasAdminRole = token.roles?.some((role) => role.key === "admin");

  if (!hasAdminRole) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
