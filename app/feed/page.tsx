import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";
import { redirect } from "next/navigation";

export default async function Feed() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="animate-in w-full flex-1 flex flex-col gap-20 opacity-0 max-w-5xl px-3">
        <Header />

        <main className="flex-1 flex flex-col gap-6">
          <div>Your followed collections</div>
        </main>
      </div>
    </div>
  );
}
