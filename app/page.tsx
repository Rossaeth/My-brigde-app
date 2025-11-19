"use client";

import { useState } from "react";
import { createWalletClient, custom } from "viem";
import { base } from "viem/chains";
import { BridgeSDK } from "@circle-fin/bridge-kit";
import { ViemAdapter } from "@circle-fin/adapter-viem-v2";

import { 
  ConnectWallet, 
  Wallet, 
  WalletDropdown, 
  WalletDropdownDisconnect 
} from '@coinbase/onchainkit/wallet';
import { Address, Avatar, Name, Identity } from '@coinbase/onchainkit/identity';

export default function Home() {
  const [status, setStatus] = useState("Waiting for Wallet...");
  const [isConnected, setIsConnected] = useState(false);

  const initBridge = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
        setStatus("Wallet not found.");
        return;
    }

    try {
      // Membuat Wallet Client dari dompet browser
      const walletClient = createWalletClient({
        chain: base,
        transport: custom(window.ethereum),
      });

      // Menginisialisasi Adapter dan SDK
      const viemAdapter = new ViemAdapter({ walletClient });
      const sdk = new BridgeSDK({ adapters: [viemAdapter] });

      setStatus("Bridge Ready to Transfer!");
      setIsConnected(true);
      console.log("Bridge SDK Initialized:", sdk);
    } catch (e) {
      console.error(e);
      setStatus("Error initializing Bridge SDK.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100 text-black">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">

        <h1 className="text-4xl font-bold mb-8 text-blue-600">
          Base ➝ ETH Bridge
        </h1>

        {/* Komponen Connect Wallet dari OnchainKit */}
        <div className="mb-8">
            <Wallet>
              <ConnectWallet>
                <Avatar className="h-6 w-6" />
                <Name />
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick />
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
        </div>

        <div className="p-6 mt-4 border rounded-xl bg-white shadow-md w-full max-w-md">
          <p className="mb-4">Status: <strong>{status}</strong></p>

          <button 
            onClick={initBridge}
            disabled={isConnected}
            className={`w-full font-bold py-2 px-4 rounded ${isConnected ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-700'}`}
          >
            {isConnected ? 'SDK Initialized' : 'Initialize Bridge SDK'}
          </button>

          <p className="text-xs text-gray-500 mt-4">
            Powered by Circle Bridge Kit & OnchainKit
          </p>
        </div>

      </main>
    </div>
  );
}
