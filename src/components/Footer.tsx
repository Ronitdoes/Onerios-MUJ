import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const socials = [
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/mujoneiros/',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
        ),
    },
    {
        label: 'Website',
        href: 'https://manipal.edu',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
        ),
    },
    {
        label: 'Email',
        href: 'mailto:oneiros@muj.manipal.edu',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="3" />
                <path d="M22 7l-10 7L2 7" />
            </svg>
        ),
    },
];

export default function Footer() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <footer className="footer" id="contact" ref={ref}>
            <motion.div
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={fadeUp}
            >
                <div className="footer-logo">ONEIROS</div>
                <p className="footer-tagline">
                    Annual Cultural Festival · Manipal University Jaipur
                </p>

                <div className="social-links" style={{ display: 'flex', gap: 16, justifyContent: 'center', margin: '28px 0' }}>
                    {socials.map(({ label, href, icon }) => (
                        <motion.a
                            key={label}
                            href={href}
                            target={href.startsWith('mailto') ? undefined : '_blank'}
                            rel="noopener noreferrer"
                            aria-label={label}
                            whileHover={{ scale: 1.15, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 48,
                                height: 48,
                                borderRadius: 14,
                                border: '1px solid rgba(139, 92, 246, 0.2)',
                                background: 'rgba(139, 92, 246, 0.06)',
                                color: 'rgba(240, 240, 255, 0.6)',
                                transition: 'all 0.3s ease',
                                backdropFilter: 'blur(8px)',
                            }}
                            onMouseEnter={e => {
                                const el = e.currentTarget;
                                el.style.borderColor = 'rgba(139, 92, 246, 0.5)';
                                el.style.color = '#A78BFA';
                                el.style.background = 'rgba(139, 92, 246, 0.12)';
                                el.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.2), 0 0 40px rgba(139, 92, 246, 0.1)';
                            }}
                            onMouseLeave={e => {
                                const el = e.currentTarget;
                                el.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                                el.style.color = 'rgba(240, 240, 255, 0.6)';
                                el.style.background = 'rgba(139, 92, 246, 0.06)';
                                el.style.boxShadow = 'none';
                            }}
                        >
                            {icon}
                        </motion.a>
                    ))}
                </div>

                <p className="footer-copy">
                    © {new Date().getFullYear()} Oneiros · Manipal University Jaipur · All rights reserved
                </p>
            </motion.div>
        </footer>
    );
}
