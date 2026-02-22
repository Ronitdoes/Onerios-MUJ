import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const stagger = {
    visible: { transition: { staggerChildren: 0.15 } },
};

const stats = [
    { number: '8K+', label: 'Followers' },
    { number: '300+', label: 'Events' },
    { number: '10K+', label: 'Footfall' },
];

export default function About() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section className="section" id="about" ref={ref}>
            <motion.div
                className="section-header"
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={fadeUp}
            >
                <p className="section-label">✦ About The Fest</p>
                <h2 className="section-title">Where Stars Align</h2>
                <div className="section-divider" />
            </motion.div>

            <motion.div
                className="about-content"
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={stagger}
            >
                <motion.div className="about-text" variants={fadeUp}>
                    <p>
                        <strong>Oneiros</strong> is the Annual Cultural Festival of Manipal University Jaipur —
                        a cosmic celebration that brings together thousands of students from academic
                        institutions across Rajasthan and beyond.
                    </p>
                    <p>
                        From electrifying musical performances and celebrity appearances to fierce
                        competitions and breathtaking art, Oneiros transforms the campus into a
                        universe of creativity, talent, and unforgettable memories.
                    </p>
                    <p>
                        Named after the Greek word for "dreams," Oneiros invites you to dream
                        beyond limits, reach for the stars, and lose yourself in the magic of
                        art, music, and culture.
                    </p>

                    <motion.div className="about-stats" variants={stagger}>
                        {stats.map((stat) => (
                            <motion.div className="stat-item" key={stat.label} variants={fadeUp}>
                                <div className="stat-number">{stat.number}</div>
                                <div className="stat-label">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                <motion.div className="about-visual" variants={fadeUp}>
                    <div className="orbit-ring">
                        <div className="orbit-ring-inner" />
                        <div className="orbit-center">MUJ</div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
