import { auth, signOut } from "@/auth";
import Home from "@/components/Home";
import { notFound } from "next/navigation";

const HomePage = async () => {
  // Fetch the session inside HomePage to pass the session to Home component
  const session = await auth();
  if (!session) return notFound();

  return (
    <main className="">
      <Home session={session} />
    </main>
  );
};

export default HomePage;