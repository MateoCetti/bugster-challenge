"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const isProduction = process.env.VERCEL_URL;
  const origin = isProduction
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000"; // Ajusta la URL según el entorno de desarrollo

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required",
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/protected");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};


export const sendIdea = async (formData: FormData) => {
  const idea = formData.get("idea")?.toString();

  const supabase = await createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    console.error("Error obteniendo el usuario:", userError?.message);
    return { message: "Error obteniendo el usuario." };
  }

  const consumptions = await getConsumptions();
  if (typeof (consumptions) !== "number") {
    return { message: consumptions.message };
  }

  if (user.user_metadata.plan !== "pro" && consumptions > 0) {
    return { message: "Haz alcanzado tu limite diario. Si quieres volver a probar conviertete en PRO!" }
  }

  let judgement = "";
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `La siguiente idea fue otorgada por un usuario. Deberas clasificar la misma como "idea millonaria" o "Estafa piramidal" dependiendo si encaja en una de estas dos categorias según su definición. responde con humor.
            
            Idea: ${idea}`
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    logConsumption()
    const data = await response.json();
    judgement = data.candidates[0].content.parts[0].text;
    return { message: judgement }
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function updateUserPlan() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "Usuario no autenticado" };
  }

  const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
    user_metadata: { plan: "pro" },
  });

  if (updateError) {
    return { error: updateError.message };
  }
  return { success: true };
}

export async function logConsumption() {
  const supabase = await createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("Error obteniendo el usuario:", userError?.message);
    return;
  }

  const { error } = await supabase.from("consumption").insert({});

  if (error) {
    console.error("Error al registrar consumo:", error.message);
  } else {
    console.log("Consumo registrado!");
  }
}

export async function getConsumptions() {
  const supabase = await createClient();

  // Obtener el ID del usuario actual desde la sesión
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { message: 'Usuario no autenticado' };
  }

  const userId = user.id;

  const today = new Date();

  // Establecer el inicio y fin del día (en UTC)
  const startOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0)); // 00:00:00 UTC
  const endOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59, 999)); // 23:59:59.999 UTC

  // Convertir a formato ISO (UTC) para la comparación correcta
  const startOfDayISOString = startOfDay.toISOString();
  const endOfDayISOString = endOfDay.toISOString();

  // Consultar el conteo de consumptions para el usuario hoy

  let { count, error } = await supabase
    .from('consumption')
    .select('id', { count: "exact" })
    .eq("user_id", userId)
    .gte('created_at', startOfDayISOString)  // Mayor o igual a 00:00:00 UTC
    .lte('created_at', endOfDayISOString);
  if (error) {
    console.log(error)
    return { message: 'Error al consultar las consumptions', error };
  }
  if (count === null) {
    return { message: 'Error' };
  }
  return count;
}