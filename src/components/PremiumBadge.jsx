import { CrownDiamond } from "@gravity-ui/icons";

export default function PremiumBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
      <CrownDiamond className="h-4 w-4" />
      Premium
    </div>
  );
}