import { BikeIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      to={`/`}
      className="flex shrink-0 items-center gap-2 text-[22px] font-medium"
      title="Instacart"
    >
      <BikeIcon size={24} /> Instacart
    </Link>
  );
}
