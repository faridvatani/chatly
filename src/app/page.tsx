import { Button } from "@/components/ui/button";
import Dropzone from "@/components/ui/dropzone";
import { auth } from "@clerk/nextjs/server";
import { ArrowRight, LogIn } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;
  return (
    <section className="relative flex justify-center items-center h-full w-full">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="flex items-center">
            <h1 className="mr-3 text-white text-4xl md:text-6xl lg:text-7xl font-semibold">
              Chat with any PDF
            </h1>
          </div>
          <div className="flex mt-2">
            {isAuth && (
              <Button>
                Go to Chats <ArrowRight className="ml-2" />
              </Button>
            )}
          </div>
          <p className="max-w-xl mt-1 text-base lg:text-lg text-slate-200">
            Join millions of students, researchers and professionals to
            instantly answer questions and understand research with AI
          </p>
          <div className="w-full mt-4 max-w-xl">
            {isAuth ? (
              <Dropzone />
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
    </section>
  );
}
