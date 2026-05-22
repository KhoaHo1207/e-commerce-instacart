import { Loader2Icon } from "lucide-react";

export default function LoadingSpin() {
  return (
    <div className="flex-center h-full min-h-96 w-full">
      <Loader2Icon className="size-8 animate-spin text-green-950" />
    </div>
  );
}
