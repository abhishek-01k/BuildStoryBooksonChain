"use client";
import React from "react";
import { makeTextNftMetadata } from "@/components/makeTextNftMetadata";
import { makeContractMetadata } from "@/components/makeContractMetadata";
import { createCreatorClient } from "@zoralabs/protocol-sdk";
import { createPublicClient, http } from "viem";
import { Button } from "@/components/ui/button";
import { getEthersSigner } from "@/config/signerConfig";
import { config } from "@/config/walletConfig";
import { BaseContract, parseUnits } from "ethers";
import { useAccount } from "wagmi";
import { zoraSepolia } from "viem/chains";
import { getWalletClient } from "@wagmi/core";

const StoryButton = ({ story }: any) => {
  const { address } = useAccount();

  const zoraSepoliaviem = {
    id: 11155111,
    name: "zoraSepolia",
    rpcUrls: {
      default: {
        http: ["https://sepolia.rpc.zora.energy"],
        webSocket: ["wss://sepolia.rpc.zora.energy"],
      },
    },
    nativeCurrency: {
      name: "SepoliaETH",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorers: {
      default: {
        name: "Zora Sepolia Explorer",
        url: "https://sepolia.explorer.zora.energy/",
        apiUrl: "https://sepolia.explorer.zora.energy/api",
      },
    },
    testnet: true,
  };

  const mintStory = async () => {
    const publicClient = createPublicClient({
      chain: zoraSepoliaviem,
      transport: http(),
    });

    const creatorClient = createCreatorClient({
      chainId: zoraSepolia.id,
      publicClient,
    });

    // Upload metadata for each page
    const pageMetadataUris = await Promise.all(
      story.pages.map(async (page: any) => {
        const metadataUri = await makeTextNftMetadata({ text: page.txt });
        return metadataUri;
      })
    );

    // Create contract metadata
    const contractMetadataUri = await makeContractMetadata({
      imageFile: story.pages[0].png, // Using the first page's image for simplicity
      name: story.story,
      description: story.pages[0].txt, // Using the first page's text for simplicity
    });

    // Mint the token using the metadata URI
    const mintArgs = {
      metadataUri: pageMetadataUris[0], // Using the first page's metadata URI for simplicity
      to: address,
    };

    const tx = await creatorClient.create1155({
      contract: {
        name: story.story,
        uri: contractMetadataUri,
      },
      token: {
        tokenMetadataURI: mintArgs.metadataUri,
      },
      account: address!,
    });

    const signer = await getEthersSigner(config);

    // const contractInstance = new BaseContract(tx.collectionAddress,)

    const contract = {
      address: tx.collectionAddress,
      abi: [
        {
          name: "mint",
          type: "function",
          stateMutability: "nonpayable",
          inputs: [{ name: "to", type: "address" }],
          outputs: [],
        },
      ],
    };

    const transactionData = {
      ...contract,
      functionName: "mint",
      args: tx.parameters.args,
      value: parseUnits("0", 18), // Convert value to appropriate format
    };

    const walletClient = await getWalletClient(config);

    // Send the transaction
    const transactionResponse = await walletClient.sendTransaction(
      transactionData
    );
    console.log(transactionResponse, "transaction");
  };

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <Button
        onClick={mintStory}
        className="bg-gradient-to-r from-pink-500 to-rose-500 p-4"
      >
        Mint This Story
      </Button>
    </div>
  );
};

export default StoryButton;
