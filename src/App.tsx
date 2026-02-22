import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import './index.css';
import Preloader from './components/Preloader';
import CosmicCursor from './components/CosmicCursor';
import CosmosCanvas from './components/Galaxy/CosmosCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import Timeline from './components/Timeline';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import StoryInterlude from './components/StoryInterlude';

export default function App() {
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={handleLoadComplete} />}
      </AnimatePresence>

      <CosmosCanvas />
      {!loading && <CosmicCursor />}
      {!loading && <ScrollProgress />}
      <div className="page-content">
        <Navbar />
        <Hero />

        <StoryInterlude
          constellation="origin"
          line1="Chapter I — The Origin"
          line2="Every great festival begins with a dream that dares to be bigger than the universe itself."
        />

        <About />

        <StoryInterlude
          constellation="launch"
          line1="Chapter II — The Launch"
          line2="Nine stellar events. Three unforgettable days. One cosmic celebration."
        />

        <Events />

        <StoryInterlude
          constellation="journey"
          line1="Chapter III — The Journey"
          line2="From opening ceremony to star night — every moment is a constellation in the making."
        />

        <Timeline />

        <StoryInterlude
          constellation="memories"
          line1="Chapter IV — The Memories"
          line2="Moments frozen in time, glowing like distant stars across the cosmic canvas."
        />

        <Gallery />
        <Footer />
      </div>
    </>
  );
}
