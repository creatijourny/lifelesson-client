"use client";

import { Card, Button } from "@heroui/react";
import { Star } from "@gravity-ui/icons";
import { useRouter } from "next/navigation";

export default function PricingPage() {
  const router = useRouter();

  const handleUpgrade = () => {
    router.push("/payment");
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold">
          Upgrade to Premium ⭐
        </h1>

        <p className="mt-4 text-lg text-default-500">
          Pay once and unlock premium access forever.
        </p>
      </div>

      <div className="flex justify-center">
        <Card className="max-w-md w-full rounded-3xl border border-default-200 p-10">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
              <Star className="h-8 w-8" />
            </div>
          </div>

          <h2 className="text-center text-3xl font-bold">
            Premium Lifetime
          </h2>

          <p className="mt-3 text-center text-default-500">
            One payment. Lifetime access.
          </p>

          <div className="mt-8 text-center">
            <span className="text-5xl font-bold">
              ৳1500
            </span>
            <p className="mt-2 text-default-500">
              Pay once • Use forever
            </p>
          </div>

          <ul className="mt-10 space-y-4">
            <li>✅ Access all premium lessons</li>
            <li>✅ Create premium lessons</li>
            <li>✅ Premium profile badge</li>
            <li>✅ Ad-free experience</li>
            <li>✅ Future premium features included</li>
          </ul>

          <Button
            color="primary"
            className="mt-10 w-full"
            onPress={handleUpgrade}
          >
            Upgrade Now
          </Button>
        </Card>
      </div>
    </section>
  );
}