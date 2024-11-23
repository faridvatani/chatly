import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { ArrowRight, LogIn } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;
  return (
    <div className="relative flex justify-center items-center w-screen min-h-screen bg-gradient-to-tr from-gray-900 via-purple-900 to-violet-600">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center">
          <h1 className="mr-3 text-white text-7xl font-semibold">
            Chat with any PDF
          </h1>
          <UserButton />
        </div>
        <div className="flex mt-2">
          {isAuth && (
            <Button>
              Go to Chats <ArrowRight className="ml-2" />
            </Button>
          )}
        </div>
        <p className="max-w-xl mt-1 text-lg text-slate-200">
          Join millions of students, researchers and professionals to instantly
          answer questions and understand research with AI
        </p>
        <div className="w-full mt-4">
          {isAuth ? (
            <h1>Upload file dropbox</h1>
          ) : (
            <Link href="/sign-in">
              <Button>
                Login to get Started!
                <LogIn className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
