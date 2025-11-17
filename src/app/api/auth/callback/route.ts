import { NextResponse } from "next/server";
import { exchangeCodeForToken } from "../../../lib/keycloak";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  try {
    const tokenData = await exchangeCodeForToken(code);

    // Save tokens in cookie or session (for demo purpose we’ll just return)
    console.log("Received tokens:", tokenData);

    // Optional: sync user to your backend
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/sync-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_token: tokenData.id_token }),
    });

    // Redirect to your dashboard
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to exchange code" }, { status: 500 });
  }
}
