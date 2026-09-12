import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { anthropic } from "@/lib/anthropic";

export async function POST(req: Request) {
  const supabase = createServerSupabase();
  const body = await req.json();

  const aiResponse = await anthropic.messages.create({
    model: "claude-3-sonnet-20240229",
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: body.input
      }
    ]
  });

  return NextResponse.json({ output: aiResponse });
}
