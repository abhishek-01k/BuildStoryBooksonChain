"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";
import { State, WagmiProvider } from "wagmi";

import { createWeb3Modal } from "@web3modal/wagmi/react";
import { config, projectId } from "@/config/walletConfig";

const Provider = ({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) => {
  // Setup queryClient
  const queryClient = new QueryClient();

  // Create modal
  createWeb3Modal({
    wagmiConfig: config,
    projectId: projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
    enableOnramp: true, // Optional - false as default
  });

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};

export default Provider;
