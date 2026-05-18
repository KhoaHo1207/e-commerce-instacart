import { cn } from "@/utils/cn";
import { BikeIcon } from "lucide-react";
import { Link } from "react-router-dom";

type props = {
  className?: string;
};

export default function Logo({ className }: props) {
  return (
    <Link
      to={`/`}
      className={cn(
        "flex shrink-0 items-center gap-2 text-[22px] font-medium",
        className,
      )}
      title="Instacart"
    >
      <BikeIcon size={24} /> Instacart
    </Link>
  );
}
