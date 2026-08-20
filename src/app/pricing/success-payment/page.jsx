import Link from "next/link";
import { redirect } from "next/navigation";

import {
    Card,
    Button,
    Chip,
} from "@heroui/react";

import {
    CircleCheckFill,
    CrownDiamond,

} from "@gravity-ui/icons";

import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { payment } from "@/lib/actions/payment";
import SuccessSessionRefresh from "@/components/SuccessSessionRefresh";

export default async function Success({
    searchParams,
}) {
    const { session_id } =
        await searchParams;
    const session = await auth.api.getSession({
        headers: await headers()
    })

    const user = session?.user;


    if (!session_id) {
        redirect("/pricing");
    }

    const {
        status,
        customer_details,
    } =
        await stripe.checkout.sessions.retrieve(
            session_id,
            {
                expand: [
                    "line_items",
                    "payment_intent",
                ],
            }
        );

        if (status === "complete") {
            const result = await payment({user, session_id})
            console.log(result);

}

    if (status === "open") {
        redirect("/pricing");
    }

    return (
        <section className="min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-amber-50 px-6">
            <SuccessSessionRefresh />

            <Card className="max-w-2xl w-full rounded-3xl shadow-xl border border-green-200">

                <div className="p-12">

                    {/* Success Icon */}

                    <div className="flex justify-center">

                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100">

                            <CircleCheckFill className="h-14 w-14 text-green-600" />

                        </div>

                    </div>

                    {/* Heading */}

                    <h1 className="mt-8 text-center text-4xl font-bold text-green-700">

                        Payment Successful 🎉

                    </h1>

                    <p className="mt-4 text-center text-default-600 text-lg">

                        Welcome to

                        <span className="font-semibold">
                            {" "}
                            LifeLesson Premium
                        </span>

                        !

                    </p>

                    {/* Premium Badge */}

                    <div className="mt-6 flex justify-center">

                        <Chip
                            color="warning"
                            variant="flat"
                        >
                            <div className="flex items-center gap-2">
                                <CrownDiamond className="h-4 w-4" />
                                <span>Premium Member</span>
                            </div>
                        </Chip>

                    </div>

                    {/* Details */}

                    <div className="mt-10 rounded-2xl border border-default-200 bg-default-50 p-6 space-y-4">

                        <div className="flex justify-between">

                            <span className="font-medium">
                                Payment Status
                            </span>

                            <span className="font-semibold text-green-600 capitalize">

                                {status}

                            </span>

                        </div>

                        <div className="flex justify-between gap-4">

                            <span className="font-medium">
                                Email
                            </span>

                            <span className="text-right break-all">

                                {
                                    customer_details?.email
                                }

                            </span>

                        </div>

                        <div className="flex justify-between gap-4">

                            <span className="font-medium">
                                Session ID
                            </span>

                            <span className="text-right text-xs text-default-500 break-all">

                                {session_id}

                            </span>

                        </div>

                    </div>

                    {/* Message */}

                    <p className="mt-8 text-center text-default-600">

                        Your Premium membership has been activated successfully.

                        You can now enjoy unlimited access to premium lessons and create your own premium content.

                    </p>

                    {/* Buttons */}

                    <div className="mt-10 flex flex-col sm:flex-row gap-4">

                        <Link
                            href="/dashboard"
                            className="flex-1"
                        >
                            <Button
                                color="primary"
                                className="w-full"
                            >
                                Go to Dashboard
                            </Button>
                        </Link>

                        <Link
                            href="/lessons"
                            className="flex-1"
                        >
                            <Button
                                variant="bordered"
                                className="w-full"
                            >
                                Browse Lessons
                            </Button>
                        </Link>

                    </div>

                </div>

            </Card>

        </section>
    );
}

