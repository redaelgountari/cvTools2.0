import React from 'react';

export type LightboxDataType = {
    images: string[];
    index: number;
} | null;

interface LightboxProps {
    lightboxData: LightboxDataType;
    setLightboxData: React.Dispatch<React.SetStateAction<LightboxDataType>>;
}

export function Lightbox({ lightboxData, setLightboxData }: LightboxProps) {
    return (
        <div
            className={`fixed inset-0 z-[2000] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-10 transition-all duration-500 ${lightboxData ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            id="lightbox-container"
            onClick={() => setLightboxData(null)}
        >
            {/* Close Button */}
            <button
                className="absolute top-10 right-10 z-[2100] w-12 h-12 flex items-center justify-center border border-white/10 rounded-full hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-all group"
                onClick={(e) => { e.stopPropagation(); setLightboxData(null); }}
            >
                <div className="relative w-6 h-6">
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white rotate-45" />
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white -rotate-45" />
                </div>
            </button>

            {/* Image Container */}
            <div className="relative w-full max-w-6xl aspect-video flex items-center justify-center group/lightbox" onClick={(e) => e.stopPropagation()}>
                <img
                    id="lightbox-image"
                    src={lightboxData ? lightboxData.images[lightboxData.index] : ""}
                    className={`max-w-full max-h-full object-contain shadow-2xl border border-white/5 transition-all duration-500 transform ${lightboxData ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                    alt="Lightbox View"
                />

                {/* Left Navigation */}
                <button
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center border border-white/5 rounded-full bg-white/[0.02] hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-all opacity-0 group-hover/lightbox:opacity-100`}
                    id="lightbox-prev"
                    onClick={(e) => {
                        e.stopPropagation();
                        setLightboxData(prev => prev ? { ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length } : null);
                    }}
                    style={{ display: lightboxData && lightboxData.images.length > 1 ? 'flex' : 'none' }}
                >
                    <div className="w-3 h-3 border-l border-b border-white rotate-45 ml-1" />
                </button>

                {/* Right Navigation */}
                <button
                    className={`absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center border border-white/5 rounded-full bg-white/[0.02] hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-all opacity-0 group-hover/lightbox:opacity-100`}
                    id="lightbox-next"
                    onClick={(e) => {
                        e.stopPropagation();
                        setLightboxData(prev => prev ? { ...prev, index: (prev.index + 1) % prev.images.length } : null);
                    }}
                    style={{ display: lightboxData && lightboxData.images.length > 1 ? 'flex' : 'none' }}
                >
                    <div className="w-3 h-3 border-t border-r border-white rotate-45 mr-1" />
                </button>
            </div>

            {/* Pagination / Context */}
            <div className="mt-10 flex flex-col items-center gap-4">
                <div className="flex gap-2" id="lightbox-pagination">
                    {lightboxData ? lightboxData.images.map((_, i) => (
                        <div
                            key={i}
                            className={`w-1.5 h-1.5 rotate-45 transition-all duration-500 ${i === lightboxData.index ? 'bg-[var(--accent)] scale-125' : 'bg-white/20'}`}
                        />
                    )) : (
                        <div className="w-1.5 h-1.5 rotate-45 bg-[var(--accent)] scale-125"></div>
                    )}
                </div>
                <div className="font-mono text-[0.6rem] tracking-[0.4em] opacity-40 uppercase" id="lightbox-counter">
                    {lightboxData ? `IMAGE_${String(lightboxData.index + 1).padStart(2, '0')} // TOTAL_${String(lightboxData.images.length).padStart(2, '0')}` : "IMAGE_00 // TOTAL_00"}
                </div>
            </div>
        </div>
    );
}
