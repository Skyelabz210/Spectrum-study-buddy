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
} from "lucide-react";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Quick Lookup", url: "/lookup", icon: Search },
  { title: "Curriculum", url: "/curriculum", icon: BookOpen },
  { title: "My Setup", url: "/setup", icon: KeyRound },
  { title: "Scenarios", url: "/scenarios", icon: ClipboardCheck },
  { title: "Flashcards", url: "/flashcards", icon: Layers },
  { title: "Sales Coach", url: "/tutor", icon: Sparkles },
  { title: "Plan", url: "/plan", icon: CalendarDays },
  { title: "Tips", url: "/tips", icon: Lightbulb },
  { title: "Weekly Ledger", url: "/corner", icon: History },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const path = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (url: string) =>
    url === "/" ? path === "/" : path.startsWith(url);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2 px-2 py-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary glow">
            <span className="text-base">☎️</span>
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <div className="text-sm font-bold tracking-tight">CallFlow Lab</div>
              <div className="text-[11px] text-muted-foreground">Spectrum Study Buddy</div>
            </div>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Study</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
