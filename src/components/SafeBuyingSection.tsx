const phones = [
  { src: "/icons/phone-1.svg", alt: "App screenshot 1" },
  { src: "/icons/phone-2.svg", alt: "App screenshot 2" },
  { src: "/icons/phone-3.svg", alt: "App screenshot 3" },
  { src: "/icons/phone-4.svg", alt: "App screenshot 4" },
];

export default function SafeBuyingSection() {
  return (
    <section className="relative bg-white">
      {/* Pink background with curved top and bottom */}
      <div
        className="absolute inset-x-0 top-0 bottom-0 bg-primary"
        style={{
          clipPath: "ellipse(85% 50% at 50% 50%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 py-20 px-4">
        {/* Text row */}
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-12 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white max-w-md leading-tight">
            Simple ways to buy safely &amp; have your money protected
          </h2>
          <p className="text-white/90 text-sm sm:text-base max-w-sm leading-relaxed md:text-right">
            Shop confidently with secure payments, verified vendors, and buyer
            protection. Your money stays safe until your order is delivered
            successfully.
          </p>
        </div>

        {/* Phone mockups using real screenshots */}
        <div className="max-w-5xl mx-auto flex justify-center items-end gap-3 sm:gap-4 md:gap-6 px-4">
          {phones.map((phone, i) => (
            <div
              key={i}
              className={`relative drop-shadow-2xl ${
                i === 1 || i === 2
                  ? "w-36 sm:w-44 md:w-48 z-10"
                  : "w-28 sm:w-36 md:w-40 hidden sm:block"
              }`}
            >
              <img
                src={phone.src}
                alt={phone.alt}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
