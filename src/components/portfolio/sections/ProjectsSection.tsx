import React from "react";
import { motion } from "motion/react";
import { LightboxDataType } from "../Lightbox";

interface ProjectsSectionProps {
    projects: any[];
    setLightboxData: React.Dispatch<React.SetStateAction<LightboxDataType>>;
}

export function ProjectsSection({ projects, setLightboxData }: ProjectsSectionProps) {
    if (!projects || projects.length === 0) return null;

    return (
        <section id="projects" className="py-20 md:py-32 px-6 sm:px-8 md:px-20 border-b border-[var(--border)]">
            <div className="flex justify-between items-end mb-16 border-b border-white/5 pb-10 uppercase">
                <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 0.8, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-[0.85rem] font-mono text-[var(--accent)] tracking-[0.6em]"
                >05 // ACTIVE_MISSIONS</motion.span>
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-[0.85rem] font-mono text-white/20 tracking-widest"
                >({String(projects.length).padStart(2, '0')})</motion.span>
            </div>

            <div className="flex flex-col gap-1">
                {projects.map((p: any, i: number) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="group relative border-b border-white/5 py-12 transition-all hover:bg-white/[0.02] hover:px-10"
                    >
                        <div className="flex flex-col lg:flex-row gap-10 md:gap-12 items-start">
                            <div className="flex-1">
                                <div className="flex flex-wrap justify-between items-center gap-6 md:gap-10">
                                    <div className="flex gap-6 md:gap-10 items-center">
                                        <span className="text-2xl font-bold text-[var(--accent)] opacity-20" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>0{i + 1}</span>
                                        <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tight group-hover:text-[var(--accent)] transition-colors" style={{ fontFamily: "'Syne', sans-serif" }}>{p.title}</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-3 text-[0.85rem] font-mono opacity-20 group-hover:opacity-60 uppercase">
                                        {(p.technologiesUsed || p.technologies || []).map((t: string) => <span key={t} className="border border-white/10 px-2.5 py-1">[{t}]</span>)}
                                    </div>
                                </div>
                                <div className="mt-8 font-mono text-[0.9rem] text-white/30 uppercase max-w-4xl leading-relaxed tracking-wide">
                                    {p.description}
                                </div>
                            </div>

                            {((p.images?.length || 0) > 0 || p.image?.length > 0) && (
                                <div
                                    className="relative w-full lg:w-[450px] min-h-[250px] sm:min-h-[300px] lg:min-h-[400px] flex items-center justify-center group/assets cursor-pointer"
                                    data-images={JSON.stringify(p.images || p.image || [])}
                                    data-project-cluster
                                >
                                    {(() => {
                                        const allImages = p.images || p.image || [];
                                        // Limit to 3 for the creative cluster to maintain layout integrity
                                        const clusterImages = allImages.slice(0, 3);

                                        return clusterImages.map((img: string, imgIdx: number) => (
                                            <motion.div
                                                key={imgIdx}
                                                initial={{ opacity: 0, x: 20 * imgIdx, y: 10 * imgIdx }}
                                                whileInView={{ opacity: 1, x: 0, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.6, delay: i * 0.1 + imgIdx * 0.1 }}
                                                onClick={() => setLightboxData({ images: allImages, index: imgIdx })}
                                                animate={clusterImages.length > 1 ? {
                                                    x: [0, (imgIdx - (clusterImages.length - 1) / 2) * 20],
                                                    y: [0, imgIdx * 10],
                                                    rotate: [0, (imgIdx - (clusterImages.length - 1) / 2) * 5],
                                                    zIndex: 10 - imgIdx
                                                } : {}}
                                                whileHover={clusterImages.length > 1 ? {
                                                    x: (imgIdx - (clusterImages.length - 1) / 2) * 160,
                                                    y: imgIdx * -20,
                                                    rotate: (imgIdx - (clusterImages.length - 1) / 2) * 12,
                                                    scale: 1.05,
                                                    zIndex: 50,
                                                    transition: { duration: 0.4, ease: "easeOut" }
                                                } : { scale: 1.05 }}
                                                className={`absolute overflow-hidden border border-white/10 grayscale group-hover/assets:grayscale-0 transition-all duration-700 bg-[#080808] shadow-2xl
                                                            ${clusterImages.length === 1 ? 'w-full aspect-video relative' : 'w-[80%] aspect-[4/3]'}
                                                        `}
                                                style={{ left: clusterImages.length > 1 ? '10%' : 'auto' }}
                                                data-anim="project-image"
                                                data-index={imgIdx}
                                                data-total={clusterImages.length}
                                            >
                                                <img
                                                    src={img}
                                                    alt={`${p.title} asset ${imgIdx + 1}`}
                                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover/assets:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                                                {/* Tactical Asset Tag */}
                                                <div className="absolute top-3 left-3 flex items-center gap-2 px-2 py-1 bg-black/80 backdrop-blur-md border border-white/10 overflow-hidden">
                                                    <div className="w-1 h-1 bg-[var(--accent)] animate-pulse" />
                                                    <span className="font-mono text-[0.75rem] text-white/60 uppercase tracking-[0.2em]">
                                                        ASSET_0{imgIdx + 1} // LVL_{10 - imgIdx}
                                                    </span>
                                                </div>

                                                {/* Bottom Meta */}
                                                <div className="absolute bottom-3 right-3 font-mono text-[0.7rem] text-[var(--accent)]/40 uppercase tracking-widest">
                                                    IMG_S_0{i + 1}_{imgIdx + 1}
                                                </div>
                                            </motion.div>
                                        ));
                                    })()}

                                    {/* Counter for excessive images */}
                                    {((p.images?.length || p.image?.length || 0) > 3) && (
                                        <div className="absolute -bottom-6 right-0 font-mono text-[0.8rem] text-white/20 uppercase tracking-[0.3em]">
                                            + {Math.max(0, (p.images?.length || p.image?.length) - 3)} ADDITIONAL_ASSETS_REDACTED
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
