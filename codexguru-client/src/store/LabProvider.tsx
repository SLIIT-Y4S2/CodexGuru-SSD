"use client";
import React, { createContext, useCallback, useEffect } from "react";
import { Lab, LabContextType } from "@/types/LabTypes";
import { labService } from "@/services";
import { useSession } from "next-auth/react";

const LabContext = createContext<LabContextType | null>(null);
const { Provider } = LabContext;

const LabProvider = ({ children }: { children: React.ReactNode }) => {
  const [labs, setLabs] = React.useState<Lab[]>([]);
  const { data: session, status } = useSession();

  const fetchLab = useCallback(async () => {
    if (status === "loading") return; // Do nothing while loading
    if (session?.user.token === undefined) return;
    try {
      const response = await labService(session.user.token).getLab();
      setLabs(response);
    } catch (error) {
      console.log(error);
    }
  }, [session, status]);

  useEffect(() => {
    fetchLab();
  }, [fetchLab]);

  if (status === "loading") return <>loading</>;

  return (
    <Provider
      value={{
        labs,
      }}
    >
      {children}
    </Provider>
  );
};

export { LabProvider, LabContext };
