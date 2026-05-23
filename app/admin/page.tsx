"use client";

import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  Mic,
  ImageIcon,
  Users,
  ChevronDown,
  ChevronRight,
  Handshake,
  FileText,
  Trophy,
  List,
  UserCheck,
  LogOut,
  Shield,
} from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";

import SpeakersCMS from "./components/admin/SpeakersCMS";
import PartnersCMS from "./components/admin/PartnersCMS";
import LeadsPage from "./components/admin/leads";
import DashboardStats from "./components/admin/DashboardStats";

/* ───────────────────────────────────────────── */
/* Roles */
/* ───────────────────────────────────────────── */

export type Role =
  | "admin"
  | "editor"
  | "viewer";

const CURRENT_ROLE: Role =
  "admin";

function can(
  role: Role,
  action: "view" | "edit" | "delete"
): boolean {

  if (action === "view")
    return true;

  if (action === "edit")
    return role !== "viewer";

  if (action === "delete")
    return role === "admin";

  return false;
}

/* ───────────────────────────────────────────── */
/* Types */
/* ───────────────────────────────────────────── */

export type LeadFilter =
  | ""
  | "delegate"
  | "sponsor"
  | "brochure"
  | "nomination";

interface Stats {
  total: number;

  byType: {
    delegate?: number;
    sponsor?: number;
    brochure?: number;
    nomination?: number;
  };

  byStatus: {
    new?: number;
    contacted?: number;
    converted?: number;
    rejected?: number;
  };
}

interface SubItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  filter: LeadFilter;
  allowedRoles: Role[];
}

interface MenuItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  allowedRoles: Role[];
  children?: SubItem[];
}

/* ───────────────────────────────────────────── */
/* Menu */
/* ───────────────────────────────────────────── */

const LEAD_CHILDREN: SubItem[] = [
  {
    key: "leads-all",
    label: "All Leads",
    icon: <List size={14} />,
    filter: "",
    allowedRoles: [
      "admin",
      "editor",
      "viewer",
    ],
  },

  {
    key: "leads-delegate",
    label: "Delegates",
    icon: <UserCheck size={14} />,
    filter: "delegate",
    allowedRoles: [
      "admin",
      "editor",
      "viewer",
    ],
  },

  {
    key: "leads-sponsor",
    label: "Sponsors",
    icon: <Handshake size={14} />,
    filter: "sponsor",
    allowedRoles: [
      "admin",
      "editor",
    ],
  },

  {
    key: "leads-brochure",
    label: "Brochures",
    icon: <FileText size={14} />,
    filter: "brochure",
    allowedRoles: [
      "admin",
      "editor",
      "viewer",
    ],
  },

  {
    key: "leads-nomination",
    label: "Nominations",
    icon: <Trophy size={14} />,
    filter: "nomination",
    allowedRoles: ["admin"],
  },
];

const MENU: MenuItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: (
      <LayoutDashboard size={18} />
    ),
    allowedRoles: [
      "admin",
      "editor",
      "viewer",
    ],
  },

  {
    key: "speakers",
    label: "Speakers CMS",
    icon: <Mic size={18} />,
    allowedRoles: [
      "admin",
      "editor",
    ],
  },

  {
    key: "partners",
    label: "Partners CMS",
    icon: <ImageIcon size={18} />,
    allowedRoles: [
      "admin",
      "editor",
    ],
  },

  {
    key: "leads",
    label: "Leads",
    icon: <Users size={18} />,
    allowedRoles: [
      "admin",
      "editor",
      "viewer",
    ],
    children: LEAD_CHILDREN,
  },
];

/* ───────────────────────────────────────────── */
/* Role Badge */
/* ───────────────────────────────────────────── */

const roleBadgeStyle: Record<
  Role,
  string
> = {
  admin:
    "bg-rose-500/10 text-rose-400 border border-rose-500/20",

  editor:
    "bg-amber-500/10 text-amber-400 border border-amber-500/20",

  viewer:
    "bg-slate-500/10 text-slate-400 border border-slate-500/20",
};

/* ───────────────────────────────────────────── */
/* Sidebar Button */
/* ───────────────────────────────────────────── */

function SidebarButton({
  icon,
  label,
  active,
  onClick,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
  badge?: React.ReactNode;
}) {

  return (
    <button
      onClick={onClick}
      className={`
        w-full
        flex
        items-center
        gap-3
        px-3
        py-2.5
        rounded-xl
        transition-all
        text-sm

        ${
          active
            ? "bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-medium"
            : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
        }
      `}
    >
      <span
        className={
          active
            ? "text-cyan-400"
            : "text-slate-500"
        }
      >
        {icon}
      </span>

      <span className="flex-1 text-left">
        {label}
      </span>

      {badge}
    </button>
  );
}

/* ───────────────────────────────────────────── */
/* Component */
/* ───────────────────────────────────────────── */

export default function AdminPanel() {

  const role = CURRENT_ROLE;

  const [activePage, setActivePage] =
    useState<string>("dashboard");

  const [leadFilter, setLeadFilter] =
    useState<LeadFilter>("");

  const [leadsOpen, setLeadsOpen] =
    useState(false);

  /* Dashboard Stats */

  const [stats, setStats] =
    useState<Stats>({
      total: 0,

      byType: {},

      byStatus: {},
    });

  useEffect(() => {

    const fetchStats =
      async () => {

        try {

          const res =
            await fetch(
              "/api/admin/leads?page=1&limit=1"
            );

          const data =
            await res.json();

          setStats(
            data.stats || {
              total: 0,
              byType: {},
              byStatus: {},
            }
          );

        } catch (error) {

          console.error(error);
        }
      };

    fetchStats();

  }, []);

  /* Logic */

  const leadsActive =
    activePage === "leads";

  const handleMenuClick = (
    key: string
  ) => {

    if (key === "leads") {

      setLeadsOpen((o) => !o);

      if (!leadsActive) {

        setActivePage("leads");

        setLeadFilter("");
      }

    } else {

      setActivePage(key);

      setLeadsOpen(false);
    }
  };

  const handleSubItemClick = (
    sub: SubItem
  ) => {

    setActivePage("leads");

    setLeadFilter(sub.filter);
  };

  return (
    <div className="flex min-h-screen bg-[#020810] text-white">

      {/* Sidebar */}

      <aside className="w-[260px] shrink-0 border-r border-cyan-500/10 bg-[#06111f] flex flex-col p-4 gap-1">

        {/* Logo */}

        <h1 className="text-xl font-bold text-cyan-400 mb-4 px-2">
          Admin CMS
        </h1>

        {/* Role */}

        <div
          className={`
            flex
            items-center
            gap-2
            px-3
            py-1.5
            rounded-lg
            mb-3

            ${roleBadgeStyle[role]}
          `}
        >
          <Shield size={14} />

          <span className="text-xs font-medium capitalize">
            Role: {role}
          </span>
        </div>

        {/* Menu */}

        <nav className="flex flex-col gap-0.5 flex-1">

          {MENU
            .filter((item) =>
              item.allowedRoles.includes(
                role
              )
            )
            .map((item) => {

              const hasChildren =
                !!item.children?.length;

              const isActive =
                activePage === item.key &&
                !hasChildren;

              const isParentActive =
                activePage === item.key &&
                hasChildren;

              return (
                <div key={item.key}>

                  <SidebarButton
                    icon={item.icon}
                    label={item.label}
                    active={
                      isParentActive ||
                      isActive
                    }
                    onClick={() =>
                      handleMenuClick(
                        item.key
                      )
                    }
                    badge={
                      hasChildren ? (
                        <span className="text-slate-500">
                          {leadsOpen ? (
                            <ChevronDown
                              size={14}
                            />
                          ) : (
                            <ChevronRight
                              size={14}
                            />
                          )}
                        </span>
                      ) : undefined
                    }
                  />

                  {/* Sub Menu */}

                  <AnimatePresence initial={false}>

                    {hasChildren &&
                      leadsOpen && (

                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            duration: 0.2,
                          }}
                          className="overflow-hidden"
                        >

                          <div className="ml-4 mt-0.5 pl-3 border-l border-cyan-500/10 flex flex-col gap-0.5 py-1">

                            {item.children!
                              .filter((sub) =>
                                sub.allowedRoles.includes(
                                  role
                                )
                              )
                              .map((sub) => {

                                const subActive =
                                  activePage ===
                                    "leads" &&
                                  leadFilter ===
                                    sub.filter;

                                return (
                                  <button
                                    key={sub.key}
                                    onClick={() =>
                                      handleSubItemClick(
                                        sub
                                      )
                                    }
                                    className={`
                                      flex
                                      items-center
                                      gap-2
                                      px-3
                                      py-2
                                      rounded-lg
                                      text-xs
                                      transition-all
                                      text-left

                                      ${
                                        subActive
                                          ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/15 font-medium"
                                          : "text-slate-400 hover:bg-white/5 hover:text-slate-300"
                                      }
                                    `}
                                  >
                                    <span>
                                      {sub.icon}
                                    </span>

                                    <span>
                                      {sub.label}
                                    </span>
                                  </button>
                                );
                              })}
                          </div>

                        </motion.div>
                      )}
                  </AnimatePresence>
                </div>
              );
            })}
        </nav>

        {/* Logout */}

        <div className="border-t border-cyan-500/10 pt-3 mt-2">

          <button
            onClick={async () => {

              await fetch(
                "/api/admin/auth",
                {
                  method: "POST",
                  headers: {
                    "Content-Type":
                      "application/json",
                  },
                  body: JSON.stringify({
                    action:
                      "logout",
                  }),
                }
              );

              window.location.href =
                "/admin/login";
            }}
            className="
              w-full
              flex
              items-center
              gap-3
              px-3
              py-2.5
              rounded-xl
              text-sm
              text-rose-400
              hover:bg-rose-500/10
              transition-all
            "
          >
            <LogOut size={16} />

            Logout
          </button>
        </div>
      </aside>

      {/* Main */}

      <main className="flex-1 overflow-y-auto">

        {/* Dashboard */}

        {activePage ===
          "dashboard" && (

          <div className="p-8 space-y-8">

            <div>
              <h1 className="text-3xl font-bold mb-2">
                Dashboard
              </h1>

              <p className="text-slate-400">
                Welcome to the admin panel.
              </p>
            </div>

            <DashboardStats
              stats={stats}
            />

          </div>
        )}

        {/* Speakers */}

        {activePage ===
          "speakers" && (
          <SpeakersCMS />
        )}

        {/* Partners */}

        {activePage ===
          "partners" && (
          <PartnersCMS />
        )}

        {/* Leads */}

        {activePage ===
          "leads" && (

          <LeadsPage
            presetFilter={
              leadFilter
            }
            role={role}
            canEdit={can(
              role,
              "edit"
            )}
            canDelete={can(
              role,
              "delete"
            )}
          />
        )}
      </main>
    </div>
  );
}