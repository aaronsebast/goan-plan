import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, CloudUpload, Download, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";
import memoriesHero from "@/assets/memories-hero.jpg";
import goaFort from "@/assets/goa-fort.jpg";
import northGoaBeach from "@/assets/north-goa-beach.jpg";
import cruiseDinner from "@/assets/cruise-dinner.jpg";
import marvellaVilla from "@/assets/marvella-villa.jpg";
import heroSunset from "@/assets/hero-goa-sunset.jpg";

const GOOGLE_DRIVE_FOLDER = "https://drive.google.com/drive/folders/1qgF8KKBovFLvqJdKK0_LqhKZVDcYB9Xf";

const galleryImages = [
  { src: goaFort, alt: "Historic Goa Fort", span: "tall" },
  { src: northGoaBeach, alt: "North Goa Beach", span: "wide" },
  { src: cruiseDinner, alt: "Cruise Dinner", span: "normal" },
  { src: marvellaVilla, alt: "Marvella Villa", span: "normal" },
  { src: heroSunset, alt: "Goa Sunset", span: "tall" },
  { src: memoriesHero, alt: "Beach Sunset", span: "wide" },
];

const MemoriesSection = () => {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openViewer = (index: number) => {
    setCurrentIndex(index);
    setViewerOpen(true);
  };

  const navigate = (dir: number) => {
    setCurrentIndex((prev) => (prev + dir + galleryImages.length) % galleryImages.length);
  };

  const downloadImage = (src: string, alt: string) => {
    const link = document.createElement("a");
    link.href = src;
    link.download = `${alt.replace(/\s+/g, "-").toLowerCase()}.jpg`;
    link.click();
  };

  return (
    <section id="memories" className="relative">
      {/* Hero Header */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src={memoriesHero}
          alt="Goa beach sunset"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-white/80"
          >
            Captured Together
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="luxury-heading text-4xl font-semibold text-white md:text-6xl"
          >
            Goa Trip <span className="italic">Memories</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-4 max-w-lg text-base text-white/70 md:text-lg"
          >
            Every laugh, sunset, and late night — captured together.
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-16 md:py-24">
        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-wrap justify-center gap-3"
        >
          <a
            href={GOOGLE_DRIVE_FOLDER}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-2.5 text-sm font-medium text-secondary-foreground transition-all hover:scale-105 hover:shadow-lg"
          >
            <Upload className="h-4 w-4" />
            Upload Photos
          </a>
          <a
            href={GOOGLE_DRIVE_FOLDER}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-2.5 text-sm font-medium text-foreground transition-all hover:scale-105 hover:bg-muted"
          >
            <ExternalLink className="h-4 w-4" />
            View Full Gallery
          </a>
          <a
            href={GOOGLE_DRIVE_FOLDER}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-2.5 text-sm font-medium text-foreground transition-all hover:scale-105 hover:bg-muted"
          >
            <Download className="h-4 w-4" />
            Download Photos
          </a>
        </motion.div>

        {/* Masonry Gallery */}
        <div className="columns-2 gap-4 md:columns-3 lg:gap-6">
          {galleryImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="mb-4 break-inside-avoid lg:mb-6"
            >
              <div
                onClick={() => openViewer(index)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-md transition-shadow hover:shadow-xl"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
                <div className="absolute bottom-0 left-0 right-0 translate-y-full p-3 transition-transform group-hover:translate-y-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white drop-shadow">{img.alt}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadImage(img.src, img.alt);
                      }}
                      className="rounded-full bg-white/20 p-1.5 backdrop-blur-sm transition-colors hover:bg-white/40"
                    >
                      <Download className="h-3.5 w-3.5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Upload Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mb-4 break-inside-avoid lg:mb-6"
          >
            <a
              href={GOOGLE_DRIVE_FOLDER}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card group flex min-h-[250px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-secondary/40 p-8 text-center transition-all hover:scale-[1.02] hover:border-secondary hover:shadow-lg"
            >
              <CloudUpload className="mb-4 h-10 w-10 text-secondary transition-transform group-hover:scale-110" />
              <span className="text-lg font-semibold text-foreground">Upload Your Memories</span>
              <span className="mt-1 text-sm text-muted-foreground">
                Unlimited uploads · Group members only
              </span>
              <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2 text-sm font-medium text-secondary-foreground transition-all group-hover:shadow-md">
                <Upload className="h-4 w-4" />
                Upload Photos
              </span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Fullscreen Viewer */}
      <AnimatePresence>
        {viewerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4"
            onClick={() => setViewerOpen(false)}
          >
            <button
              onClick={() => setViewerOpen(false)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              className="absolute left-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="absolute right-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.img
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={galleryImages[currentIndex].src}
              alt={galleryImages[currentIndex].alt}
              className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-4">
              <span className="text-sm text-white/70">
                {currentIndex + 1} / {galleryImages.length}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  downloadImage(galleryImages[currentIndex].src, galleryImages[currentIndex].alt);
                }}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <Download className="h-4 w-4" />
                Download
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MemoriesSection;
