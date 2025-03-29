import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { FormIdea } from "@/components/form-idea";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <FormIdea></FormIdea>
  );
}
