"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type AuthContextValue = {
  isLoading: boolean;
  session: Session | null;
  user: User | null;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type SupabaseAuthProviderProps = {
  children: ReactNode;
};

export function SupabaseAuthProvider({
  children,
}: SupabaseAuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    let isMounted = true;

    void supabase.auth.getSession().then(({ data, error }) => {
      if (!isMounted) {
        return;
      }

      if (error) {
        console.error("Failed to load Supabase session", error);
      }

      setSession(data.session ?? null);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoading, session, user: session?.user ?? null }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useSupabaseAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useSupabaseAuth must be used within SupabaseAuthProvider.");
  }

  return context;
}
