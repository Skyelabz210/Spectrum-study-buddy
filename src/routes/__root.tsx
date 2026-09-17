import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Search } from "lucide-react";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="surface-panel max-w-md rounded-2xl p-8 text-center">
        <div className="eyebrow text-neon">Navigation</div>
        <h1 className="mt-3 text-7xl font-bold text-gradient-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you are looking for does not exist or has moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-95"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="surface-panel max-w-md rounded-2xl p-8 text-center">
        <div className="eyebrow text-neon">Recovery</div>
        <h1 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
          This page did not load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something failed in the study shell. Refresh, or return home and reopen the module.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-xl bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-input bg-background/70 px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CallFlow Lab — Weekly Spectrum Sales Study" },
      { name: "description", content: "A weekly-updated study system for Spectrum inbound sales training: call flow, SOP gates, tools, scenarios, flashcards, and an AI coach." },
      { name: "author", content: "CallFlow Lab" },
      { property: "og:title", content: "CallFlow Lab — Weekly Spectrum Sales Study" },
      { property: "og:description", content: "Call flow, policy gates, A-R-M scenario drills, weekly Otter ingestion, and a plain-language AI coach." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "CallFlow Lab — Weekly Spectrum Sales Study" },
      { name: "twitter:description", content: "Weekly-updated sales training in small, actionable bites." },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const routeContext = [
  { match: "/lookup", workspace: "Live Call", label: "Quick Lookup" },
  { match: "/sales-prompts", workspace: "Live Call", label: "AI Sales Specialist" },
  { match: "/tutor", workspace: "Live Call", label: "Sales Coach" },
  { match: "/across-spectrum", workspace: "Practice", label: "Across the Spectrum" },
  { match: "/scenarios", workspace: "Practice", label: "Scenario Trainer" },
  { match: "/flashcards", workspace: "Practice", label: "Flashcards" },
  { match: "/curriculum", workspace: "Learn", label: "Curriculum" },
  { match: "/plan", workspace: "Learn", label: "Study Plan" },
  { match: "/tips", workspace: "Learn", label: "Tips" },
  { match: "/setup", workspace: "System", label: "My Setup" },
  { match: "/corner", workspace: "System", label: "Weekly Ledger" },
] as const;

function resolveRouteContext(pathname: string) {
  return routeContext.find((item) => pathname.startsWith(item.match)) ?? {
    workspace: "Today",
    label: "Home",
  };
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const context = resolveRouteContext(pathname);

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-background/20 text-foreground">
          <AppSidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <header className="shell-bar sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b px-3 sm:px-4">
              <div className="flex min-w-0 items-center gap-3">
                <SidebarTrigger className="rounded-xl border border-border/70 bg-card/60 hover:bg-secondary" />
                <div className="hidden h-6 w-px bg-border/80 sm:block" />
                <div className="min-w-0 leading-tight">
                  <div className="eyebrow truncate">{context.workspace}</div>
                  <div className="truncate text-sm font-semibold tracking-tight">{context.label}</div>
                </div>
              </div>

              <Link
                to="/lookup"
                className="inline-flex h-9 items-center gap-2 rounded-xl border border-border/80 bg-card/70 px-3 text-xs font-semibold text-foreground shadow-sm hover:border-neon/40 hover:bg-secondary"
              >
                <Search className="h-3.5 w-3.5 text-neon" />
                <span className="hidden sm:inline">Quick Lookup</span>
              </Link>
            </header>
            <main className="app-main flex-1">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </QueryClientProvider>
  );
}
