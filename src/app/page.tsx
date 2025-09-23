"use client"
import { useRouter } from "next/navigation";


export default function Home() {
  const navigation = useRouter();
  navigation.push("/dashboard/home")
  return (
    <div>
      Redirecting...
    </div>
  );
}