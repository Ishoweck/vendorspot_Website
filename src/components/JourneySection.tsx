import { FiArrowRight } from "react-icons/fi";

const journeyCards = [
  {
    title: "Sell on the Spot",
    description:
      "Create your store in minutes, list products easily, and start receiving orders instantly. Vendorspot gives you the tools to sell faster, reach more buyers, and grow.",
    bgColor: "bg-purple-100",
    image: "/icons/vsp-build.svg",
  },
  {
    title: "Resell & earn",
    description:
      "Discover products, share them with your audience, and earn commissions on every successful sale. No inventory needed, just promote, sell, and start earning consistently.",
    bgColor: "bg-orange-100",
    image: "/icons/vsp-resell.svg",
  },
  {
    title: "Build with us",
    description:
      "Be part of a fast-growing platform shaping the future of commerce. Learn, contribute, and grow your career while helping vendors and buyers succeed every day.",
    bgColor: "bg-blue-100",
    image: "/icons/vsp-sell.svg",
  },
];

export default function JourneySection() {
  return (
    <section className="py-16 px-4 bg-white">
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-dark mb-12">
        Join us in this journey
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {journeyCards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Card illustration area */}
            <div
              className={`${card.bgColor} h-48 flex items-center justify-center p-4`}
            >
              <img
                src={card.image}
                alt={card.title}
                className="h-full w-auto object-contain"
              />
            </div>

            {/* Card content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-dark mb-3">{card.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {card.description}
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-1 text-sm font-bold text-dark hover:underline"
              >
                Join Now <FiArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
