"use client";

import { Search, ChevronDown } from "lucide-react";
import { FormType, LeadStatus } from "@/types/lead";

interface AdminFiltersProps {
    search: string;
    filterType: FormType | "";
    filterStatus: LeadStatus | "";
    filterBadgeSent: string;
    filterCheckedIn: string;
    onSearch: (q: string) => void;
    onTypeChange: (v: FormType | "") => void;
    onStatusChange: (v: LeadStatus | "") => void;
    onBadgeSentChange: (v: string) => void;
    onCheckedInChange: (v: string) => void;
}

export default function AdminFilters({
    search,
    filterType,
    filterStatus,
    filterBadgeSent,
    filterCheckedIn,
    onCheckedInChange,
    onSearch,
    onTypeChange,
    onStatusChange,
    onBadgeSentChange,
}: AdminFiltersProps) {
    return (
        <div className="bg-[#06111f] border border-cyan-500/10 rounded-xl p-4">
            <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative flex-1">
                    <Search
                        size={14}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                    />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => onSearch(e.target.value)}
                        placeholder="Search by name, email, company…"
                        className="w-full bg-[#0a1628]/60 border border-cyan-500/20 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-all"
                    />
                </div>

                {/* Type */}
                <Select
                    value={filterType}
                    onChange={(v) => onTypeChange(v as FormType | "")}
                >
                    <option value="">All Types</option>
                    <option value="delegate">Delegate</option>
                    <option value="sponsor">Sponsor</option>
                    <option value="brochure">Brochure</option>
                    <option value="nomination">Nomination</option>
                </Select>

                {/* Status */}
                <Select
                    value={filterStatus}
                    onChange={(v) => onStatusChange(v as LeadStatus | "")}
                >
                    <option value="">All Statuses</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="converted">Converted</option>
                    <option value="rejected">Rejected</option>
                </Select>

                {/* Badge sent */}
                <Select value={filterBadgeSent} onChange={onBadgeSentChange}>
                    <option value="">All Badges</option>
                    <option value="sent">Sent</option>
                    <option value="pending">Pending</option>
                </Select>

                {/* Checked-In */}
                <Select value={filterCheckedIn} onChange={onCheckedInChange}>
                    <option value="">All Check-Ins</option>
                    <option value="checkedin">Checked-In</option>
                    <option value="pending">Pending</option>
                </Select>

            </div>
        </div>
    );
}

/* tiny local helper so we don't repeat select markup 3 times */
function Select({
    value,
    onChange,
    children,
}: {
    value: string;
    onChange: (v: string) => void;
    children: React.ReactNode;
}) {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="appearance-none bg-[#0a1628]/60 border border-cyan-500/20 rounded-lg pl-3 pr-8 py-2 text-sm text-white focus:outline-none focus:border-cyan-400 transition-all"
            >
                {children}
            </select>
            <ChevronDown
                size={13}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
            />
        </div>
    );
}