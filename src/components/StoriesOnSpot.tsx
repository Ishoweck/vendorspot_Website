import { FiArrowRight } from "react-icons/fi";

const stories = [
  {
    title: "How to Start Selling Online in Nigeria Without Stress",
    description:
      "A simple guide to setting up your store, getting your first customers, and growing your business step by step on Vendorspot.",
    bgColor: "bg-orange-100",
    image: "/icons/story-1.svg",
  },
  {
    title: "5 Proven Ways to Increase Your Sales on Online",
    description:
      "Practical strategies you can apply immediately to get more buyers, boost visibility, and turn visitors into paying...",
    bgColor: "bg-blue-100",
    image: "/icons/story-2.svg",
  },
  {
    title: "Why Smart Buyers Choose Secure Marketplaces",
    description:
      "Discover how secure platforms protect your money, reduce risks, and make online shopping safer and more reliable for...",
    bgColor: "bg-green-100",
    image: "/icons/story-3.svg",
  },
];

export default function StoriesOnSpot() {
  return (
    <section className="py-16 px-4 bg-white">
      {/* Header row */}
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark">
          Stories on Spot 🌍🌎
        </h2>
        <a
          href="#"
          className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
        >
          View All
        </a>
      </div>

      {/* Story cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div
            key={story.title}
            className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Illustration area */}
            <div
              className={`${story.bgColor} h-44 flex items-center justify-center p-4`}
            >
              <img src={story.image} alt={story.title} className="h-full w-auto object-contain" />
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-base font-bold text-dark mb-2 leading-snug">
                {story.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                {story.description}
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
              >
                Read More <FiArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
