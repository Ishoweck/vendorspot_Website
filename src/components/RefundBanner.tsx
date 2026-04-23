export default function RefundBanner() {
  return (
    <section className="relative bg-white pt-10">
      {/* Dark curved background */}
      <div
        className="absolute inset-x-0 bottom-0 bg-dark"
        style={{
          height: "75%",
          clipPath: "ellipse(85% 100% at 50% 100%)",
        }}
      />

      <div className="relative z-10 text-center px-4 pb-16 pt-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
          You want to buy anything?
        </h2>
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent mb-3">
          100% refund guaranteed
        </p>
        <p className="text-gray-400 text-sm sm:text-base mb-8">
          If you don&apos;t get what you paid for
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="#"
            className="flex items-center gap-2 bg-white text-dark rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M3.176 3.09a1.5 1.5 0 0 0-.176.713v16.394c0 .257.063.5.176.713L13.338 12 3.176 3.09zm1.054-.854L14.89 11.15l2.95-2.95L5.665 1.448a1.49 1.49 0 0 0-1.435-.212zM18.95 9.31l-3.06 3.06 3.06 3.06 2.56-1.37a1.5 1.5 0 0 0 0-2.72l-2.56-1.37-.56.34h.56zm-4.16 4.16L4.23 22.764a1.49 1.49 0 0 0 1.435-.212l12.175-6.752-3.05-2.33z" />
            </svg>
            Download on Google Play
          </a>
          <a
            href="#"
            className="flex items-center gap-2 bg-white text-dark rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            Download on App Store
          </a>
        </div>
      </div>
    </section>
  );
}
