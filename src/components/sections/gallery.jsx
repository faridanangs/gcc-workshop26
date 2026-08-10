"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiPlay, FiZoomIn } from "react-icons/fi";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { galleryPhotos, galleryVideos } from "@/data/dummy";
import Image from "next/image";

export function Gallery() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section id="galeri" className="relative bg-cream-50 py-24 sm:py-28">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <span className="section-heading-eyebrow inline-block rounded-full bg-clay-100 px-4 py-1.5 text-xs font-semibold text-clay-600">
              // dokumentasi
            </span>
            <h2 className="mt-5 text-balance font-display text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
              Keseruan GCC dari tahun ke tahun.
            </h2>
          </div>
        </div>

        <Tabs defaultValue="photos" className="mt-10">
          <TabsList>
            <TabsTrigger value="photos">Foto</TabsTrigger>
            <TabsTrigger value="videos">Video</TabsTrigger>
          </TabsList>

          <TabsContent value="photos">
            <div className="columns-2 gap-4 sm:columns-3 [&>*]:mb-4">
              {galleryPhotos.map((photo, i) => (
                <Dialog key={photo.id}>
                  <DialogTrigger asChild>
                    <motion.button
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                      className="group relative block w-full overflow-hidden rounded-2xl border-2 border-ink-900/8"
                    >
                      <Image
                        src={photo.src}
                        alt={photo.caption}
                        width={500}
                        height={650}
                        loading="lazy"
                        sizes="(max-width: 640px) 50vw, 33vw"
                        className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink-950/70 via-ink-950/0 to-ink-950/0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <p className="text-left text-xs font-semibold text-cream-50">
                          {photo.caption}
                        </p>
                      </div>
                      <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-cream-50/90 text-ink-900 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <FiZoomIn className="h-4 w-4" />
                      </span>
                    </motion.button>
                  </DialogTrigger>
                  <DialogContent>
                    <Image
                      src={photo.src}
                      alt={photo.caption}
                      width={900}
                      height={1200}
                      className="max-h-[75vh] w-full rounded-xl object-contain"
                    />
                    <p className="px-3 py-3 text-center text-sm font-medium text-ink-900/70">
                      {photo.caption}
                    </p>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {galleryVideos.map((video, i) => (
                <Dialog
                  key={video.id}
                  onOpenChange={(o) => setActiveVideo(o ? video.id : null)}
                >
                  <DialogTrigger asChild>
                    <motion.button
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="group relative block aspect-video w-full overflow-hidden rounded-2xl border-2 border-ink-900/8"
                    >
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-ink-950/35 transition-colors group-hover:bg-ink-950/50" />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-clay-500 text-cream-50 shadow-xl transition-transform duration-300 group-hover:scale-110">
                          <FiPlay className="ml-0.5 h-5 w-5" />
                        </span>
                      </span>
                      <p className="absolute bottom-3 left-3 right-3 text-left text-sm font-semibold text-cream-50">
                        {video.title}
                      </p>
                    </motion.button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl p-0">
                    {activeVideo === video.id && (
                      <video
                        src={video.src}
                        poster={video.thumbnail}
                        controls
                        autoPlay
                        preload="none"
                        className="w-full rounded-2xl"
                      />
                    )}
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}