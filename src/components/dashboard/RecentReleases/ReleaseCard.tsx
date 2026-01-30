"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Release } from "@/types/release";
import { Play } from "lucide-react";
import { formatStreams, formatRevenue, formatDate } from "@/lib/utils";

interface ReleaseCardProps {
  release: Release;
}

export function ReleaseCard({ release }: ReleaseCardProps) {
  const [imgError, setImgError] = useState(false);

  const placeholderUrl = `https://placehold.co/400x400/1a1a2e/ffffff?text=${encodeURIComponent(release.title.charAt(0))}`;

  return (
    <Card className="group overflow-hidden transition-transform duration-200 hover:scale-[1.02] hover:shadow-md cursor-pointer">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={imgError ? placeholderUrl : release.coverArt}
          alt={`${release.title} cover art`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setImgError(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <Badge
          variant="secondary"
          className="absolute top-2 right-2 bg-green-500/90 text-white border-0 z-10"
        >
          {formatRevenue(release.revenue)}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-sm line-clamp-1 mb-1">
          {release.title}
        </h3>
        <p className="text-xs text-muted-foreground mb-3">
          {formatDate(release.releaseDate)}
        </p>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Play className="h-3.5 w-3.5 fill-current" />
          <span>{formatStreams(release.streams)} streams</span>
        </div>
      </CardContent>
    </Card>
  );
}
