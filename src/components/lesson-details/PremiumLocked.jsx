import Link from "next/link";

import {
  Card,
  Button,
} from "@heroui/react";

import {
  Lock,
  CrownDiamond,
} from "@gravity-ui/icons";

export default function PremiumLocked() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6">

      <Card className="max-w-xl w-full rounded-3xl p-10 text-center shadow-lg">

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-amber-100">

          <Lock className="h-12 w-12 text-amber-600" />

        </div>

        <h1 className="mt-8 text-3xl font-bold">

          Premium Lesson

        </h1>

        <p className="mt-4 text-default-500">

          This lesson is available only to Premium members.

        </p>

        <div className="mt-8 flex justify-center">

          <div className="flex items-center gap-2 rounded-full bg-warning-100 px-4 py-2 text-warning-700">

            <CrownDiamond className="h-5 w-5" />

            Premium Required

          </div>

        </div>

        <div className="mt-10 flex flex-col gap-4">

          <Link href="/pricing">

            <Button
              color="warning"
              className="w-full"
            >
              Upgrade to Premium
            </Button>

          </Link>

          <Link href="/lessons">

            <Button
              variant="bordered"
              className="w-full"
            >
              Back to Lessons
            </Button>

          </Link>

        </div>

      </Card>

    </section>
  );
}