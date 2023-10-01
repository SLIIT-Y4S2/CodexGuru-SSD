"use client";
import React, { Suspense, createContext, useCallback, useEffect } from "react";
import { Lab, LabContextType } from "@/types/LabTypes";
import { labService } from "@/services";
import { useSession } from "next-auth/react";

const LabContext = createContext<LabContextType | null>(null);
const { Provider } = LabContext;

const LabProvider = ({ children }: { children: React.ReactNode }) => {
  const [labs, setLabs] = React.useState<Lab[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { data: session, status } = useSession();

  const fetchLab = useCallback(async () => {
    if (status === "loading") return; // Do nothing while loading
    if (session?.user.token === undefined) return;
    try {
      setLoading(true);
      const response = await labService(session.user.token).getLab();
      setLabs(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [session, status]);

  useEffect(() => {
    fetchLab();
  }, [fetchLab]);

  return (
    <Provider
      value={{
        labs,
        loading,
      }}
    >
      {children}
    </Provider>
  );
};

export { LabProvider, LabContext };
