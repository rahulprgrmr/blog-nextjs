import { Great_Vibes } from "@next/font/google";

import Link from "next/link";
const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"] });

function SiteLogo(props: { size?: string; className?: string }) {
  const { size, className } = props;
  return (
    <Link href="/" className="text-white">
      <h1
        className={`${greatVibes.className} sm:text-2xl md:text-5xl ${
          className ?? ""
        }`}
      >
        Blogosphere
      </h1>
    </Link>
  );
}

export default SiteLogo;
