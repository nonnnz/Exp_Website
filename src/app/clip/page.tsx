"use client";

import { useState, useEffect, useMemo } from "react";
import Footer from "@/components/Footer";

const SHEET_URL = "https://docs.google.com/spreadsheets/d/1OTDJzXn-x7Zj3XdIeyiM3iDefNhpXMv1S_XaOCQlbYA/export?format=csv";

interface Clip {
  id: number;
  projectId: string;
  nameEn: string;
  nameTh: string;
  nicknameEn: string;
  nicknameTh: string;
  title: string;
  thumbnailUrl?: string;
  description: string;
  url: string;
  originalUrl: string;
}

function VideoPlayer({ url, className }: { url: string; className?: string }) {
  // YouTube
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    let videoId = "";
    if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("shorts/")) {
      videoId = url.split("shorts/")[1].split("?")[0];
    }
    
    return (
      <iframe
        className={className || "absolute inset-0 w-full h-full rounded-[24px]"}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    );
  }

  // TikTok
  if (url.includes("tiktok.com")) {
    const videoIdMatch = url.match(/\/video\/(\d+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    if (videoId) {
      return (
        <iframe
          className={className || "absolute inset-0 w-full h-full rounded-[24px]"}
          src={`https://www.tiktok.com/embed/${videoId}`}
          allowFullScreen
          allow="autoplay; encrypted-media; picture-in-picture"
          title="TikTok video player"
        ></iframe>
      );
    }
  }

  // Instagram
  if (url.includes("instagram.com/reel/")) {
    const reelId = url.split("/reel/")[1].split("/")[0];
    return (
      <iframe
        className={className || "absolute inset-0 w-full h-full rounded-[24px]"}
        src={`https://www.instagram.com/reel/${reelId}/embed`}
        frameBorder="0"
        scrolling="no"
        allowTransparency={true}
        allow="autoplay; encrypted-media; picture-in-picture"
        title="Instagram reel player"
      ></iframe>
    );
  }

  return (
    <div className={className || "absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-space-bg/50 border border-white/10 rounded-[24px] text-center p-4"}>
      <p className="text-xs mb-4 opacity-60">Preview not available</p>
      <a href={url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-accent/20 hover:bg-accent/40 rounded-full text-xs transition-colors">
        Watch External
      </a>
    </div>
  );
}

function VideoThumbnail({ url, title, thumbnailUrl }: { url: string; title: string; thumbnailUrl?: string }) {
  // If we have a direct thumbnailUrl from oEmbed, use it first
  if (thumbnailUrl) {
    return (
      <img 
        src={thumbnailUrl} 
        alt={title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    );
  }

  let thumbUrl = "";
  
  // YouTube Thumbnail Fallback
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    let videoId = "";
    if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("shorts/")) {
      videoId = url.split("shorts/")[1].split("?")[0];
    }
    if (videoId) thumbUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }
  
  if (thumbUrl) {
    return (
      <img 
        src={thumbUrl} 
        alt={title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        onError={(e) => {
          (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${url.split("/").pop()?.split("?")[0]}/0.jpg`;
        }}
      />
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/30 via-space-bg to-accent/20 group-hover:scale-110 transition-transform duration-500">
      <div className="w-16 h-16 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center">
        <svg className="w-8 h-8 text-accent ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
      </div>
    </div>
  );
}

export default function ClipPage() {
  const [clips, setClips] = useState<Clip[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClip, setSelectedClip] = useState<Clip | null>(null);

  useEffect(() => {
    async function fetchClips() {
      try {
        const response = await fetch(SHEET_URL);
        const text = await response.text();
        const lines = text.split(/\r?\n/).filter(line => line.trim() !== "");
        if (lines.length < 2) {
          setLoading(false);
          return;
        }

        const splitCsv = (row: string) => row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        const headers = splitCsv(lines[0]);
        const videoColIndex = headers.findIndex(h => h.includes("link คลิปวิดีโอ"));
        const finalColIndex = videoColIndex !== -1 ? videoColIndex : 9;

        const parsedClips = await Promise.all(lines.slice(1).map(async (row, index) => {
          const columns = splitCsv(row).map(c => c.trim().replace(/^"|"$/g, ""));
          const videoUrl = columns[finalColIndex];
          if (!videoUrl || !videoUrl.startsWith("http")) return null;

          let realTitle = "";
          let thumbUrl = "";
          let resolvedUrl = videoUrl;

          // Fetch metadata from oEmbed or Proxy Scraper
          try {
            if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
              const res = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`);
              if (res.ok) {
                const data = await res.json();
                realTitle = data.title;
                thumbUrl = data.thumbnail_url;
              }
            } else if (videoUrl.includes("tiktok.com") || videoUrl.includes("instagram.com")) {
              const isTikTok = videoUrl.includes("tiktok.com");
              const oEmbedUrl = isTikTok 
                ? `https://www.tiktok.com/oembed?url=${encodeURIComponent(videoUrl)}`
                : `https://api.instagram.com/oembed?url=${encodeURIComponent(videoUrl)}`;
              
              const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(oEmbedUrl)}`);
              const data = await res.json();
              
              let foundTitle = "";
              if (data.contents) {
                try {
                  const oEmbedData = JSON.parse(data.contents);
                  if (oEmbedData.title && oEmbedData.title !== "TikTok") foundTitle = oEmbedData.title;
                  if (oEmbedData.thumbnail_url) thumbUrl = oEmbedData.thumbnail_url;
                } catch {
                   // Ignore parse error, fallback to scraping
                }
              }

              // Fallback: Scrape title from meta tags if oEmbed fails
              if (!foundTitle) {
                try {
                  const pageRes = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(videoUrl)}`);
                  const pageData = await pageRes.json();
                  const titleMatch = pageData.contents.match(/<title>(.*?)<\/title>/);
                  if (titleMatch && !titleMatch[1].includes("Instagram") && !titleMatch[1].includes("TikTok")) {
                    foundTitle = titleMatch[1].replace("Instagram: ", "").split("•")[0].trim();
                  }
                } catch {
                  console.error("Scraping failed for:", videoUrl);
                }
              }
              
              realTitle = foundTitle;

              if (isTikTok && videoUrl.includes("vt.tiktok.com")) {
                const redirectRes = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(videoUrl)}`);
                const redirectData = await redirectRes.json();
                const match = redirectData.contents.match(/href="([^"]+)"/);
                if (match) resolvedUrl = match[1];
              }
            }
          } catch (e) { console.error("Error fetching metadata:", e); }

          // Fallback logic for missing or generic titles
          const isGeneric = !realTitle || 
                            realTitle.trim() === "" || 
                            realTitle.toLowerCase() === "youtube" ||
                            realTitle.toLowerCase() === "tiktok" ||
                            realTitle.toLowerCase() === "instagram";
          
          const nickname = columns[5] || columns[4];
          const finalTitle = isGeneric ? `${nickname}'s Video` : realTitle;

          return {
            id: index,
            projectId: columns[1],
            nameEn: columns[3],
            nameTh: columns[2],
            nicknameEn: columns[5],
            nicknameTh: columns[4],
            title: finalTitle,
            thumbnailUrl: thumbUrl,
            description: columns[7] || "",
            url: resolvedUrl,
            originalUrl: videoUrl
          };
        }));

        setClips(parsedClips.filter(c => c !== null) as Clip[]);
      } catch (error) {
        console.error("Error loading clips:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchClips();
  }, []);

  const filteredClips = useMemo(() => {
    return clips.filter(clip => {
      const search = searchQuery.toLowerCase();
      return (
        clip.title.toLowerCase().includes(search) ||
        clip.projectId.toLowerCase().includes(search) ||
        clip.nameEn.toLowerCase().includes(search) ||
        clip.nicknameEn.toLowerCase().includes(search)
      );
    });
  }, [clips, searchQuery]);

  const recommendations = useMemo(() => {
    if (!selectedClip) return [];
    return clips.filter(c => c.id !== selectedClip.id).slice(0, 10);
  }, [clips, selectedClip]);

  const isVerticalVideo = (url: string) => {
    return url.includes("shorts") || url.includes("tiktok.com") || url.includes("reel");
  };

  const getDisplayName = (clip: Clip) => {
    return `${clip.projectId} - ${clip.nameEn} (${clip.nicknameEn})`;
  };

  return (
    <div className="bg-space-bg text-space-cream min-h-screen pt-20">
      {/* Header & Search */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 stars-layer opacity-30" />
        <div className="relative max-w-[1831px] mx-auto px-4 text-center">
          <h1 className="font-anton text-[40px] sm:text-[60px] md:text-[75px] uppercase">Clip Gallery</h1>
          
          <div className="max-w-3xl mx-auto mt-10 relative">
            <input
              type="text"
              placeholder="Search by name, ID or video title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-5 px-8 focus:outline-none focus:border-accent/50 transition-colors font-mono text-base"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-40">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-8">
        <div className="max-w-[1831px] mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-accent"></div></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredClips.map((clip) => (
                <div 
                  key={clip.id} 
                  onClick={() => setSelectedClip(clip)}
                  className="liquid-glass rounded-[32px] p-[18px] hover:bg-white/5 transition-all duration-300 group cursor-pointer"
                >
                  <div className="relative pb-[56.25%] rounded-[24px] overflow-hidden bg-black/40">
                    <VideoThumbnail url={clip.url} title={clip.title} thumbnailUrl={clip.thumbnailUrl} />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
                  </div>
                  <div className="px-2 pt-6 pb-2">
                    <h3 className="font-anton text-base uppercase mb-1 group-hover:text-accent transition-colors truncate">{clip.title}</h3>
                    <p className="font-mono text-xs text-accent uppercase tracking-widest">{getDisplayName(clip)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Full Mode Modal */}
      {selectedClip && (
        <div className="fixed inset-0 z-[100] bg-space-bg/95 flex flex-col lg:flex-row p-6 lg:p-12 gap-8 animate-in fade-in duration-300">
          {/* Close Button */}
          <button 
            onClick={() => setSelectedClip(null)}
            className="fixed top-6 right-8 lg:top-8 lg:right-10 z-[120] p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all border border-white/10 shadow-xl group"
          >
            <svg className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          {/* Main Content */}
          <div className="flex-1 flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-4">
            <div className={`relative w-full ${isVerticalVideo(selectedClip.url) ? 'aspect-[9/16] max-w-[450px] mx-auto' : 'aspect-video'} rounded-3xl overflow-hidden bg-black shadow-2xl border border-white/5 transition-all duration-500`}>
              <VideoPlayer url={selectedClip.url} />
            </div>
            <div className="pb-8 text-center lg:text-left">
              <h2 className="font-anton text-3xl sm:text-5xl uppercase mb-2 group-hover:text-accent transition-colors">{selectedClip.title}</h2>
              <p className="font-mono text-sm sm:text-base text-accent uppercase tracking-widest">{getDisplayName(selectedClip)}</p>
            </div>
          </div>

          {/* Recommendations Sidebar */}
          <div className="w-full lg:w-[420px] flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2">
            <h3 className="font-anton text-xl uppercase mb-2 text-accent/80 tracking-wider">Recommended Clips</h3>
            <div className="flex flex-col gap-3">
              {recommendations.map(clip => (
                <div 
                  key={clip.id} 
                  onClick={() => {
                    setSelectedClip(clip);
                    const mainContent = document.querySelector('.custom-scrollbar');
                    if (mainContent) mainContent.scrollTop = 0;
                  }}
                  className="flex gap-4 p-3 rounded-2xl hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-white/10 group"
                >
                  <div className="w-32 aspect-video rounded-xl bg-black/40 overflow-hidden relative flex-shrink-0 border border-white/5">
                    <VideoThumbnail url={clip.url} title={clip.title} thumbnailUrl={clip.thumbnailUrl} />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <h4 className="font-anton text-sm uppercase truncate mb-1 group-hover:text-accent transition-colors">{clip.title}</h4>
                    <p className="font-mono text-[10px] text-space-cream/40 truncate">{getDisplayName(clip)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
