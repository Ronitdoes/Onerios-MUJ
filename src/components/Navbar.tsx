import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            className="navbar"
            initial={{ y: -80, x: '-50%' }}
            animate={{ y: 0, x: '-50%' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
                background: scrolled
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(139,92,246,0.06), rgba(236,72,153,0.04), rgba(255,255,255,0.07))'
                    : undefined,
                borderColor: scrolled ? 'rgba(255, 255, 255, 0.14)' : undefined,
            }}
        >
            <div className="navbar-logo">ONEIROS</div>

            <ul className="navbar-links">
                {['About', 'Events', 'Schedule', 'Gallery', 'Contact'].map((item, i) => (
                    <motion.li
                        key={item}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                    >
                        <a href={`#${item.toLowerCase()}`}>{item}</a>
                    </motion.li>
                ))}
            </ul>

            <button className="menu-toggle" aria-label="Menu">
                <span />
                <span />
                <span />
            </button>
        </motion.nav>
    );
}
