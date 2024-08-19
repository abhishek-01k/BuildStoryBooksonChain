"use client";
import { BookOpen, FilePen } from "lucide-react";
import Link from "next/link";
import ConnectButton from "./ConnectButton";

const Header = () => {
  return (
    <header className="relative p-4 lg:p-8 bg-gradient-to-r from-purple-600 to-blue-500 shadow-lg flex items-center justify-between">
      <Link href="/" className=" left-4 lg:left-8">
        <h1 className="text-xl lg:text-3xl font-bold text-white">
          BuildStoryBookswithAIAgent
        </h1>
      </Link>
      <div className="flex-1 flex justify-center">
        <div className="text-center">
          <h2 className="text-lg lg:text-2xl text-white">
            Bring your stories to Life!
          </h2>
          <div className="bg-purple-700 rounded-md mt-2 p-2">
            <p className="relative text-white px-2">By minting them onchain</p>
          </div>
        </div>
      </div>
      <div className=" right-4 lg:right-8 flex space-x-2 lg:space-x-4">
        <Link href="/">
          <FilePen className="h-6 w-6 lg:h-8 lg:w-8 text-white border border-white p-1 rounded-md hover:bg-white hover:text-purple-500 transition duration-300 ease-in-out cursor-pointer" />
        </Link>
        <Link href="/stories">
          <BookOpen className="h-6 w-6 lg:h-8 lg:w-8 text-white border border-white p-1 rounded-md hover:bg-white hover:text-purple-500 transition duration-300 ease-in-out cursor-pointer" />
        </Link>
        <ConnectButton />
      </div>
    </header>
  );
};

export default Header;
