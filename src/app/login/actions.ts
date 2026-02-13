"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    redirect("/login?error=" + encodeURIComponent(error.message));
  }

  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const accessCode = formData.get("accessCode") as string;

  if (accessCode !== process.env.GYM_ACCESS_CODE) {
    redirect(
      "/signup?error=" +
        encodeURIComponent("アクセスコードが間違っています。")
    );
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    redirect("/signup?error=" + encodeURIComponent(error.message));
  }

  redirect(
    "/signup?message=" +
      encodeURIComponent(
        "確認メールを送信しました。メールを確認してください。"
      )
  );
}
