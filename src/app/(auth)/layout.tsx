import Image from "next/image";
import type * as React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-dvh flex-col overflow-hidden bg-gradient-to-br from-success-700 via-success-600 to-success-900 lg:flex-row">
      
      <section className="relative flex shrink-0 flex-col items-center justify-center px-6 py-12 text-center text-white lg:w-1/2 lg:border-r lg:border-success-800/20 lg:items-start lg:px-12 lg:py-8 lg:text-left">
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_40%)]" />
          <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-success-400/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-success-300/10 blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-lg space-y-6 lg:mt-0 lg:space-y-8">
          
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-white shadow-lg backdrop-blur-md lg:size-12">
              <Image
                src="/images/auth/logo.png"
                alt="Usely Market Logo"
                width= "100"
                height="100"
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden lg:block">
              <h2 className="font-heading text-title font-bold text-white">
                Usely Market
              </h2>
              <p className="text-caption text-white/70">
                Marketplace Infrastructure
              </p>
            </div>
          </div>

          <div className="space-y-2 lg:hidden">
            <h1 className="font-heading text-h2 font-bold text-white">
              Welcome Back!
            </h1>
            <p className="text-body text-white/80">
              Please enter your details to continue.
            </p>
          </div>

          <div className="hidden flex-1 flex-col justify-center space-y-6 lg:flex">
            <div className="relative mx-auto w-full max-w-[280px] aspect-square xl:max-w-sm">
              <div className="absolute inset-0 rounded-full bg-white/5 blur-3xl" />
              <Image
                src="/images/auth/auth-illustration.png"
                alt="Usely Market Illustration"
                fill
                sizes="(max-width: 1280px) 480px, 420px"
                priority
                className="object-contain"
              />
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-4 py-1.5 backdrop-blur-md">
                <span className="text-caption font-medium text-white">
                  Multi Vendor Marketplace Platform
                </span>
              </div>

              <h1 className="font-heading text-h2 font-bold leading-tight text-white xl:text-h1">
                Operate your marketplace with confidence.
              </h1>

              <div className="flex items-center gap-4 pt-2">
                <div>
                  <h3 className="font-heading text-title font-bold text-white">Secure</h3>
                </div>
                <div className="h-6 w-px bg-white/20" />
                <div>
                  <h3 className="font-heading text-title font-bold text-white">Scalable</h3>
                </div>
                <div className="h-6 w-px bg-white/20" />
                <div>
                  <h3 className="font-heading text-title font-bold text-white">Modern</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="relative z-20 flex flex-1 items-center justify-center overflow-y-auto rounded-t-[2rem] bg-background px-4 lg:py-10 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] sm:px-8 lg:rounded-none lg:shadow-none">
        
        <div className="absolute inset-0 hidden bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.08),transparent_30%)] lg:block" />
        <div className="absolute bottom-0 left-0 hidden h-64 w-64 rounded-full bg-success-100/40 blur-3xl lg:block" />

        <div className="relative z-10 w-full max-w-md">
          {children}
        </div>
      </section>
      
    </main>
  );
}