import Link from "next/link";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BookOpenText } from "lucide-react";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: <FaFacebookF />,
  },
  {
    name: "X",
    href: "https://x.com",
    icon: <FaXTwitter />,
  },
  {
    name: "GitHub",
    href: "https://github.com",
    icon: <FaGithub />,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: <FaLinkedinIn />,
  },
];

export default function Footer() {
  return (
    <footer className="border-t bg-default-50">
      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Logo & Description */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <BookOpenText className="h-8 w-8 text-primary" />

              <span className="text-2xl font-bold text-default-900">
                LifeLesson
              </span>
            </Link>

            <p className="mt-4 text-sm leading-7 text-default-600">
              Preserve your life experiences, reflect on meaningful
              moments, and inspire others by sharing valuable life
              lessons.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Quick Links
            </h3>

            <ul className="space-y-3 text-default-600">

              <li>
                <Link
                  href="/"
                  className="hover:text-primary transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/public-lessons"
                  className="hover:text-primary transition"
                >
                  Public Lessons
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-primary transition"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  href="/pricing"
                  className="hover:text-primary transition"
                >
                  Pricing
                </Link>
              </li>

            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Contact
            </h3>

            <div className="space-y-4 text-default-600">

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-primary" />
                <span>support@lifelesson.com</span>
              </div>

              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-primary" />
                <span>+880 1700-000000</span>
              </div>

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-primary" />
                <span>Dhaka, Bangladesh</span>
              </div>

            </div>
          </div>

          {/* Legal & Social */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Legal
            </h3>

            <div className="space-y-3">

              <Link
                href="/terms"
                className="block text-default-600 hover:text-primary transition"
              >
                Terms & Conditions
              </Link>

              <Link
                href="/privacy"
                className="block text-default-600 hover:text-primary transition"
              >
                Privacy Policy
              </Link>

            </div>

            <h3 className="mt-8 mb-4 text-lg font-semibold">
              Follow Us
            </h3>

            <div className="flex gap-3">

              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-default-300 text-default-700 transition hover:border-primary hover:bg-primary hover:text-black"
                >
                  {social.icon}
                </Link>
              ))}

            </div>
          </div>

        </div>

        <div className="mt-10 border-t pt-6 text-center text-sm text-default-500">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-default-800">
            LifeLesson
          </span>
          . All rights reserved.
        </div>

      </div>
    </footer>
  );
}