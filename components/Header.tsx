import Link from "next/link";
import AuthButton from "./AuthButton";

export default function Header() {
  return (
    <div className="w-full flex my-10 justify-between">
      <div className="flex">
        <img src={"/tracker.png"} width={40} height={40} alt="tracker" />
        <Link href="/" className="flex items-center">
          NFT Tracker
        </Link>
      </div>
      <AuthButton />
    </div>
  );
}
