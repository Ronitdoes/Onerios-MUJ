import { motion, useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';

const galleryItems = [
    { label: 'War of Bands', gradient: 'linear-gradient(135deg, #1a0533, #4c1d95)' },
    { label: 'DJ Night', gradient: 'linear-gradient(135deg, #0c1445, #1e40af)' },
    { label: 'Fashion Show', gradient: 'linear-gradient(135deg, #2d0a3e, #7c3aed)' },
    { label: 'Dance Battle', gradient: 'linear-gradient(135deg, #1a0533, #be185d)' },
    { label: 'Star Night', gradient: 'linear-gradient(135deg, #0f172a, #0369a1)' },
    { label: 'Campus Vibes', gradient: 'linear-gradient(135deg, #1e1b4b, #6d28d9)' },
];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

// Deterministic pseudo-random using a seed
function seededRandom(seed: number) {
    const x = Math.sin(seed * 9301 + 49297) * 49297;
    return x - Math.floor(x);
}

export default function Gallery() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    // Pre-compute star positions so they're stable across re-renders
    const starPositions = useMemo(() => {
        return galleryItems.map((_, itemIdx) =>
            Array.from({ length: 12 }, (_, starIdx) => {
                const seed = itemIdx * 100 + starIdx;
                return {
                    width: seededRandom(seed) * 3 + 1,
                    height: seededRandom(seed + 1) * 3 + 1,
                    top: seededRandom(seed + 2) * 100,
                    left: seededRandom(seed + 3) * 100,
                    opacity: seededRandom(seed + 4) * 0.5 + 0.2,
                };
            })
        );
    }, []);

    return (
        <section className="section" id="gallery" ref={ref}>
            <motion.div
                className="section-header"
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={fadeUp}
                transition={{ duration: 0.7 }}
            >
                <p className="section-label">✦ Memories From The Cosmos</p>
                <h2 className="section-title">Gallery</h2>
                <div className="section-divider" />
            </motion.div>

            <div className="gallery-grid">
                {galleryItems.map((item, i) => (
                    <motion.div
                        className="gallery-item"
                        key={item.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.03 }}
                        style={{ background: item.gradient }}
                    >
                        {/* Cosmic pattern overlay */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: `radial-gradient(circle at ${30 + i * 10}% ${40 + i * 5}%, rgba(255,255,255,0.08) 0%, transparent 50%)`,
                        }} />

                        {/* Scattered stars — stable positions */}
                        {starPositions[i].map((star, j) => (
                            <div
                                key={j}
                                style={{
                                    position: 'absolute',
                                    width: star.width + 'px',
                                    height: star.height + 'px',
                                    background: '#fff',
                                    borderRadius: '50%',
                                    top: star.top + '%',
                                    left: star.left + '%',
                                    opacity: star.opacity,
                                }}
                            />
                        ))}

                        <div className="gallery-overlay">
                            <span>{item.label}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
