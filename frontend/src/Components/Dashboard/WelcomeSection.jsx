import { useUser } from "@clerk/clerk-react";
import { ArrowRightIcon, SparklesIcon, ZapIcon } from "lucide-react";

function WelcomeSection({ onCreateSession }) {
  const { user } = useUser();

  return (
    <div className="relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 py-6 xs:py-8 sm:py-12 lg:py-16 2xl:py-20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-0">

          {/* LEFT CONTENT */}
          <div className="min-w-0">
            <div className="flex items-center gap-3 mb-2 sm:mb-4">
              <div className="w-9 h-9 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                <SparklesIcon className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white" />
              </div>

              <h1 className="text-xl xs:text-2xl sm:text-3xl lg:text-5xl 2xl:text-6xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight break-words">
                Welcome back, {user?.firstName || "there"}!
              </h1>
            </div>

            <p className="text-xs xs:text-sm sm:text-base lg:text-xl text-base-content/60 sm:ml-14 max-w-2xl">
              Ready to level up your coding skills?
            </p>
          </div>

          {/* ACTION BUTTON */}
          <button
            onClick={onCreateSession}
            className="group w-full lg:w-auto px-5 xs:px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-secondary rounded-2xl transition-all duration-200 hover:opacity-90"
          >
            <div className="flex items-center justify-center gap-2 sm:gap-3 text-white font-bold text-sm xs:text-sm sm:text-base lg:text-lg whitespace-nowrap">
              <ZapIcon className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
              <span>Create Session</span>
              <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;
