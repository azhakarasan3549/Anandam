import { UserPlus, Search, MessageCircle } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Register",
    subtitle: "Setup profile",
    icon: UserPlus,
  },
  {
    id: 2,
    title: "Browse",
    subtitle: "Find matches",
    icon: Search,
  },
  {
    id: 3,
    title: "Connect",
    subtitle: "On WhatsApp",
    icon: MessageCircle,
  },
];

export default function Howitswork() {
  return (
    <section className="px-4 sm:px-6 md:px-8 py-6">
      {/* Title */}
      <h2 className="text-lg sm:text-xl font-semibold mb-4">
        How it works
      </h2>

      {/* Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.id}
              className="bg-white rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition"
            >
              {/* Icon */}
              <div className="mx-auto mb-3 w-14 h-14 rounded-full bg-emerald-200 flex items-center justify-center">
                <Icon className="w-6 h-6 text-white text-4xl" />
              </div>

              {/* Text */}
              <h3 className="font-semibold text-sm sm:text-base">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                {step.subtitle}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}