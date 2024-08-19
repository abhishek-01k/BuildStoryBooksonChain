import Image from "next/image";
import logo2 from "@/images/logo2.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import StoryWriter from "@/components/StoryWriter";

export default function Home() {

  return (
    <main className="flex-1 flex flex-col">
      <section className="flex-1 grid grid-cols-1 lg:grid-cols-2">
        <div
          className="bg-purple-500 flex flex-col space-y-5 justify-center items-center order-1 lg:-order-1 pb-10 "
        >
          <Image src={logo2} height={170} alt="logo" />
          <Button asChild className="px-20 bg-purple-700 p-10 text-xl">
            <Link href="/stories">Explore all Stories</Link>
          </Button>
        </div>
        <StoryWriter />
      </section>
    </main>
  );
}
