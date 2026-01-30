"use client";

import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ARTIST } from "@/lib/constants";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/10 bg-brand-navy text-white">
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Pulse Logo"
            width={36}
            height={36}
            className="rounded-lg"
          />
          <span className="text-xl font-bold">Pulse</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium">{ARTIST.name}</p>
            <p className="text-xs text-white/70">Artist</p>
          </div>
          <Avatar>
            <AvatarImage src={ARTIST.avatarUrl} alt={ARTIST.name} />
            <AvatarFallback className="bg-brand-red text-white">
              {ARTIST.initials}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};
