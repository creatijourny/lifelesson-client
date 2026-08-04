import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";

export async function POST() {

  try {

    const headersList = await headers();

    const origin = headersList.get("origin");

    const PRICE_ID =
      "price_1U0ICC2QcgSkH28KJy9kIPcK";

    const session =
      await stripe.checkout.sessions.create({

        mode: "payment",

        line_items: [
          {
            price: PRICE_ID,
            quantity: 1,
          },
        ],

        success_url:
          `${origin}/pricing/success-payment?session_id={CHECKOUT_SESSION_ID}`,

        cancel_url:
          `${origin}/pricing`,

      });

    return NextResponse.redirect(
      session.url,
      303
    );

  } catch (err) {

    console.log(err);

    return NextResponse.json(
      {
        error: err.message,
      },
      {
        status:
          err.statusCode || 500,
      }
    );

  }

}



// import { NextResponse } from 'next/server'
// import { headers } from 'next/headers'
// import { stripe } from '@/lib/stripe';



// export async function POST() {
//   try {
//     const headersList = await headers()
//     const origin = headersList.get('origin')

//     const PRICE_ID = "price_1U0ICC2QcgSkH28KJy9kIPcK"

//     // Create Checkout Sessions from body params.
//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           // Provide the exact Price ID (for example, price_1234) of the product you want to sell
//           price: PRICE_ID,
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: `${origin}/pricing/success-payment?session_id={CHECKOUT_SESSION_ID}`,
//       // Provide a name (for example, hosted_web_0001) to label this Checkout integration and measure its conversion independently
//     //   integration_identifier: '{{INTEGRATION_ID}}',
//     });
//     return NextResponse.redirect(session.url, 303)
//   } catch (err) {
//     return NextResponse.json(
//       { error: err.message },
//       { status: err.statusCode || 500 }
//     )
//   }
// }



// import { NextResponse } from 'next/server'
// import { headers } from 'next/headers'
// import { stripe } from '@/lib/stripe';



// export async function POST() {
//   try {
//     const headersList = await headers()
//     const origin = headersList.get('origin')

//     const PRICE_ID = price_1U0ICC2QcgSkH28KJy9kIPcK

//     // Create Checkout Sessions from body params.
//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           // Provide the exact Price ID (for example, price_1234) of the product you want to sell
//           price: PRICE_ID,
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: `${origin}/pricing/success-payment?session_id={CHECKOUT_SESSION_ID}`,
//       // Provide a name (for example, hosted_web_0001) to label this Checkout integration and measure its conversion independently
//       integration_identifier: '{{INTEGRATION_ID}}',
//     });
//     return NextResponse.redirect(session.url, 303)
//   } catch (err) {
//     return NextResponse.json(
//       { error: err.message },
//       { status: err.statusCode || 500 }
//     )
//   }
// }



// import { NextResponse } from 'next/server'
// import { headers } from 'next/headers'
// import { stripe } from '@/lib/stripe';

// // import { stripe } from '../../../lib/stripe'

// export async function POST() {
//   try {
//     const headersList = await headers()
//     const origin = headersList.get('origin')

//     // Create Checkout Sessions from body params.
//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           // Provide the exact Price ID (for example, price_1234) of the product you want to sell
//           price: '{{PRICE_ID}}',
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
//       // Provide a name (for example, hosted_web_0001) to label this Checkout integration and measure its conversion independently
//       integration_identifier: '{{INTEGRATION_ID}}',
//     });
//     return NextResponse.redirect(session.url, 303)
//   } catch (err) {
//     return NextResponse.json(
//       { error: err.message },
//       { status: err.statusCode || 500 }
//     )
//   }
// }