import { getSupabaseServerClient } from "@/lib/supabase/server";

export type AccountOverview = {
  email: string | null;
  registeredAt: string | null;
  tripCount: number;
  placeCount: number;
};

export async function getCurrentAccountOverview(): Promise<AccountOverview | null> {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(userError.message);
  }

  if (!user) {
    return null;
  }

  const [profileResult, tripsResult, placesResult] = await Promise.all([
    supabase
      .from("profiles")
      .select("email, created_at")
      .eq("id", user.id)
      .maybeSingle(),
    supabase
      .from("trips")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id),
    supabase
      .from("places")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id),
  ]);

  if (profileResult.error) {
    throw new Error(profileResult.error.message);
  }

  if (tripsResult.error) {
    throw new Error(tripsResult.error.message);
  }

  if (placesResult.error) {
    throw new Error(placesResult.error.message);
  }

  return {
    email: profileResult.data?.email ?? user.email ?? null,
    registeredAt: profileResult.data?.created_at ?? user.created_at ?? null,
    tripCount: tripsResult.count ?? 0,
    placeCount: placesResult.count ?? 0,
  };
}
