"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { UiButton } from "@/components/ui/button";
import { UiIcon } from "@/components/ui/icon";
import {
  UiSheet,
  UiSheetContent,
  UiSheetHeader,
  UiSheetTitle,
  UiSheetTrigger,
} from "@/components/ui/sheet";
import { APP_NAME, ROUTES } from "@/lib/constants";

const navLinks = [
  { href: ROUTES.marketplace, label: "Marketplace", icon: "shopping-bag" },
  { href: ROUTES.vendor, label: "Sell", icon: "store" },
  { href: ROUTES.cart, label: "Cart", icon: "shopping-cart" },
];

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-9999 border-b border-success-100 bg-background/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href={ROUTES.home} className="flex shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 md:hidden">
            <div className="relative size-8 overflow-hidden rounded">
              <Image
                src="/images/logo.png"
                alt={APP_NAME}
                fill
                className="object-contain"
              />
            </div>
            <span className="text-sm font-bold text-foreground">Usely</span>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <div className="relative size-10 overflow-hidden rounded">
              <Image
                src="/images/logo.png"
                alt={APP_NAME}
                fill
                className="object-contain"
              />
            </div>
            <span className="text-base font-bold text-foreground">{APP_NAME}</span>
          </div>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-success-600"
            >
              {/* <UiIcon name={link.icon as any} size={16} /> */}
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Button */}
        <div className="hidden items-center gap-2 md:flex">
          <UiButton asChild variant="outline" size="sm">
            <Link href={ROUTES.login}>Sign In</Link>
          </UiButton>
          <UiButton
            asChild
            size="sm"
            className="bg-success-500 hover:bg-success-600"
          >
            <Link href={ROUTES.register}>Sign Up</Link>
          </UiButton>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <UiSheet open={isOpen} onOpenChange={setIsOpen}>
            <UiSheetTrigger asChild>
              <UiButton
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
              >
                <UiIcon name="menu" size={20} />
                <span className="sr-only">Toggle menu</span>
              </UiButton>
            </UiSheetTrigger>
            <UiSheetContent side="right" className="w-full sm:w-80">
              <UiSheetHeader>
                <UiSheetTitle className="flex items-center gap-2">
                  <div className="relative size-8 overflow-hidden rounded">
                    <Image
                      src="/images/logo.png"
                      alt={APP_NAME}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span>{APP_NAME}</span>
                </UiSheetTitle>
              </UiSheetHeader>

              <nav className="mt-8 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-success-50 hover:text-success-600"
                  >
                    {/* <UiIcon name={link.icon as unknown as Icon} size={18} /> */}
                    <span>{link.label}</span>
                  </Link>
                ))}
              </nav>

              <div className="absolute bottom-6 left-0 right-0 flex flex-col gap-3 px-4">
                <UiButton asChild variant="outline" className="w-full">
                  <Link href={ROUTES.login} onClick={() => setIsOpen(false)}>
                    Sign In
                  </Link>
                </UiButton>
                <UiButton
                  asChild
                  className="w-full bg-success-500 text-success-600"
                >
                  <Link className="w-full bg-success-500 hover:bg-success-600"  href={ROUTES.register} onClick={() => setIsOpen(false)}>
                    Sign Up
                  </Link>
                </UiButton>
              </div>
            </UiSheetContent>
          </UiSheet>
        </div>
      </div>
    </header>
  );
}
