import { Link, useRouterState } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Home,
  BookOpen,
  Layers,
  Sparkles,
  CalendarDays,
  Lightbulb,
  ClipboardCheck,
  History,
  KeyRound,
  Search,
  PhoneCall,
  WandSparkles,
  Building2,
  GraduationCap,
  X,
} from "lucide-react";

const groups = [
  { label: "Today", items: [{ title: "Home", url: "/", icon: Home }] },
  {
    label: "Live Call",
    items: [
      { title: "Quick Lookup", url: "/lookup", icon: Search },
      { title: "Prompt Engineer", url: "/sales-prompts", icon: WandSparkles },
      { title: "Sales Coach", url: "/tutor", icon: Sparkles },
    ],
  },
  {
    label: "Practice",
    items: [
      {
        title: "Across the Spectrum",
        url: "/across-spectrum",
        icon: PhoneCall,
      },
      { title: "Scenarios", url: "/scenarios", icon: ClipboardCheck },
      { title: "Flashcards", url: "/flashcards", icon: Layers },
    ],
  },
  {
    label: "Learn",
    items: [
      { title: "Curriculum", url: "/curriculum", icon: BookOpen },
      { title: "Prompt Academy", url: "/prompt-academy", icon: GraduationCap },
      { title: "The Full Spectrum", url: "/full-spectrum", icon: Building2 },
      { title: "Study Plan", url: "/plan", icon: CalendarDays },
      { title: "Tips", url: "/tips", icon: Lightbulb },
    ],
  },
  {
    label: "System",
    items: [
      { title: "My Setup", url: "/setup", icon: KeyRound },
      { title: "Weekly Ledger", url: "/corner", icon: History },
    ],
  },
] as const;

export function AppSidebar() {
  const { state, isMobile, setOpenMobile } = useSidebar();
  const collapsed = state === "collapsed";
  const path = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (url: string) =>
    url === "/" ? path === "/" : path.startsWith(url);

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-sidebar-border/80 bg-sidebar/95 backdrop-blur-xl"
    >
      <SidebarHeader className="flex-row items-center border-b border-sidebar-border/80 px-2 py-1">
        <Link
          to="/"
          onClick={() => setOpenMobile(false)}
          className="group flex min-w-0 flex-1 items-center gap-3 rounded-2xl px-2 py-3 hover:bg-sidebar-accent/60"
        >
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gradient-primary text-base shadow-[0_14px_34px_-18px_var(--neon)] transition-transform group-hover:-translate-y-0.5">
            <span aria-hidden="true">☎️</span>
          </div>
          {!collapsed && (
            <div className="min-w-0 leading-tight">
              <div className="truncate text-sm font-bold tracking-tight">
                CallFlow Lab
              </div>
              <div className="mt-0.5 truncate text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Spectrum Study Buddy
              </div>
            </div>
          )}
        </Link>
        {isMobile && (
          <button
            type="button"
            onClick={() => setOpenMobile(false)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-sidebar-border bg-sidebar-accent/50"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </SidebarHeader>
      <SidebarContent className="px-1 py-2">
        {groups.map((group) => (
          <SidebarGroup key={group.label} className="py-1.5">
            <SidebarGroupLabel className="px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground/80">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.url)}
                      tooltip={item.title}
                      className="h-10 rounded-xl px-3 text-[13px] font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground data-[active=true]:bg-gradient-to-r data-[active=true]:from-primary/20 data-[active=true]:to-transparent data-[active=true]:font-semibold data-[active=true]:text-sidebar-accent-foreground data-[active=true]:shadow-[inset_2px_0_0_var(--neon)]"
                    >
                      <Link
                        to={item.url}
                        onClick={() => setOpenMobile(false)}
                        className="flex items-center gap-3"
                      >
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
