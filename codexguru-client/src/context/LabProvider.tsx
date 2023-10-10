"use client";
import React, { Suspense, createContext, useCallback, useEffect } from "react";
import { InputLab, Lab, LabContextType } from "@/types/LabTypes";
import { labService } from "@/services";
import { useSession } from "next-auth/react";
import { App } from "antd";

const LabContext = createContext<LabContextType | null>(null);
const { Provider } = LabContext;

const LabProvider = ({ children }: { children: React.ReactNode }) => {
  const [labs, setLabs] = React.useState<Lab[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { data: session, status } = useSession();
  const { message } = App.useApp();

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
      message.error("Something went wrong");
    }
  }, [session, status]);

  useEffect(() => {
    fetchLab();
  }, [fetchLab]);

  const createLabSession = async (lab: InputLab) => {
    if (status === "loading") return;
    if (session?.user.token === undefined) return;

    try {
      setLoading(true);
      const response = await labService(session.user.token).createLab(lab);
      setLabs([...labs, response]);
      message.success("Lab session created successfully");
      setLoading(false);
    } catch (error: any) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <Provider
      value={{
        labs,
        loading,
        createLabSession,
      }}
    >
      {children}
    </Provider>
  );
};

export { LabProvider, LabContext };
