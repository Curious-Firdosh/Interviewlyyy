import {
  ArrowRightIcon,
  Code2Icon,
  CrownIcon,
  SparklesIcon,
  UsersIcon,
  ZapIcon,
  LoaderIcon,
} from "lucide-react";
import { Link } from "react-router";
import { getDifficultyBadgeClass } from "../../lib/utils";

function ActiveSessions({ sessions, isLoading, isUserInSession }) {
  return (
    <div className="lg:col-span-2 card bg-base-100 border-2 border-primary/40 h-full">
      <div className="card-body">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl">
              <ZapIcon className="size-5 text-white" />
            </div>
            <h2 className="text-2xl font-black">Live Sessions</h2>
          </div>

          <div className="flex items-center gap-2 text-success">
            <div className="size-2 bg-success rounded-full" />
            <span className="text-sm font-medium">
              {sessions.length} active
            </span>
          </div>
        </div>

        {/* Sessions */}
        <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <LoaderIcon className="size-10 animate-spin text-primary" />
            </div>
          ) : sessions.length > 0 ? (
            sessions.map((session) => {
              const isFullForUser =
                session.participant && !isUserInSession(session);

              return (
                <div
                  key={session._id}
                  className="card bg-base-200 border border-base-300 hover:border-primary/40"
                >
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                    {/* Left */}
                    <div className="flex gap-3 min-w-0">
                      <div className="relative size-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                        <Code2Icon className="size-7 text-white" />
                        <div className="absolute -top-1 -right-1 size-3 bg-success rounded-full border-2 border-base-100" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-base sm:text-lg truncate max-w-[180px] sm:max-w-none">
                            {session.problem}
                          </h3>
                          <span
                            className={`badge badge-sm ${getDifficultyBadgeClass(
                              session.difficulty
                            )}`}
                          >
                            {session.difficulty}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm opacity-80">
                          <div className="flex items-center gap-1">
                            <CrownIcon className="size-4" />
                            <span className="font-medium">
                              {session.host?.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <UsersIcon className="size-4" />
                            <span>
                              {session.participant ? "2/2" : "1/2"}
                            </span>
                          </div>

                          {isFullForUser ? (
                            <span className="badge badge-error badge-sm">
                              FULL
                            </span>
                          ) : (
                            <span className="badge badge-success badge-sm">
                              OPEN
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Button */}
                    <div className="w-full sm:w-auto">
                      {isFullForUser ? (
                        <button className="btn btn-disabled btn-sm w-full sm:w-auto">
                          Full
                        </button>
                      ) : (
                        <Link
                          to={`/session/${session._id}`}
                          className="btn btn-primary btn-sm w-full sm:w-auto gap-2"
                        >
                          {isUserInSession(session) ? "Rejoin" : "Join"}
                          <ArrowRightIcon className="size-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl flex items-center justify-center">
                <SparklesIcon className="w-10 h-10 text-primary/50" />
              </div>
              <p className="text-lg font-semibold opacity-70 mb-1">
                No active sessions
              </p>
              <p className="text-sm opacity-50">
                Be the first to create one!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ActiveSessions;
