import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Escribe tu idea:</h2>
        <textarea className="flex h-10 w-full rounded-md border border-input 
        bg-background px-3 py-2 
        text-sm ring-offset-background 
        file:border-0 file:bg-transparent 
        file:text-sm file:font-medium 
        placeholder:text-muted-foreground 
        focus-visible:outline-none focus-visible:ring-2 
        focus-visible:ring-ring 
        focus-visible:ring-offset-2 
        disabled:cursor-not-allowed 
        disabled:opacity-50" name="" id="">

        </textarea>
      </div>
      <button className="p-1 border rounded-xl bg-secondary">Enviar idea</button>
    </div>
  );
}
