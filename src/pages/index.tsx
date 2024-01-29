import Image from "next/image";
import { Inter } from "next/font/google";
import { signOut, useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const data = useSession()
  console.log(data)

  return (
   <>
   <button onClick={() => signOut()}>Sign out</button>
   </>
  );
}
