import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed top-0 flex justify-between items-center p-4 bg-none text-white w-full">
      <Link href="/" className="text-2xl font-bold">
        Chatly
      </Link>
      <UserButton
        showName
        appearance={{
          elements: {
            userButtonOuterIdentifier: "text-white text-sm",
            avatarBox: "size-8"
          },
        }}
      />
    </header>
  );
};

export default Header;
