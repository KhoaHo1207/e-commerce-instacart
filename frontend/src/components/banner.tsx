import { TruckIcon, XIcon, ZapIcon } from "lucide-react";
import { useState } from "react";

export default function Banner() {
  const [bannerVisiable, setBannerVisiable] = useState(() => {
    return sessionStorage.getItem("banner_dismissed") !== "true";
  });

  const dismissBanner = () => {
    setBannerVisiable(false);
    sessionStorage.setItem("banner_dismissed", "true");
  };
  return (
    <div>
      {bannerVisiable && (
        <div className="from-app-green to-app-green ms:text-sm relative overflow-hidden bg-linear-to-r via-emerald-800 text-xs text-white">
          <div className="flex-center mx-auto max-w-7xl gap-6 px-4 py-2 sm:px-6 lg:px-8">
            <div className="flex-center gap-2">
              <TruckIcon className="size-4 shrink-0" />
              <span className="font-medium">
                Free delivery on orders above $20
              </span>
            </div>
            <span className="hidden text-white/40 sm:inline"></span>
            <div className="hidden items-center gap-2 sm:flex">
              <ZapIcon className="size-3.5 shrink-0 fill-yellow-400 text-yellow-400" />
              <span>Farm-fresh produce delivered daily</span>
            </div>
          </div>
          <button
            onClick={dismissBanner}
            className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-1 hover:bg-white/10"
          >
            <XIcon className="size-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
