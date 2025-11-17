import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../utils/db";
import User from "../../models/User";
import { getSession } from "../../lib/auth";

export async function POST(req: NextRequest) {
  try {
    console.log("➡️ /api/sync-user called");

    // Try to get user info from request body first (called from NextAuth callback)
    // Otherwise get from session
    let keycloakId: string;
    let username: string;
    let email: string | null;

    try {
      const body = await req.json();
      keycloakId = body.keycloakId;
      username = body.username;
      email = body.email;
    } catch {
      // If no body, get from session
      const session = await getSession();
      if (!session || !session.user) {
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 401 }
        );
      }
      keycloakId = (session.user as any).id;
      username = session.user.name || session.user.email || "";
      email = session.user.email || null;
    }

    if (!keycloakId || !username) {
      return NextResponse.json(
        { error: "User information missing" },
        { status: 400 }
      );
    }

    await dbConnect();
    let user = await User.findOne({ keycloakId: keycloakId });
    if (!user) {
      user = await User.create({
        keycloakId: keycloakId,
        username: username,
        email,
      });
      console.log("✅ Created new user:", user);
    } else {
      console.log("✅ User already exists:", user);
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (err: any) {
    console.error("User sync error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
