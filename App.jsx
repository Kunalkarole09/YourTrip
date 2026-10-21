import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Compass,
  Instagram,
  Menu,
  Mountain,
  MoveUpRight,
  Pause,
  Play,
  X,
} from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { destinations, gallery, media, stories, testimonials, tours } from './data.js';

const contactUrl = 'https://wa.me/917249309036?text=Hello%20Traviator';

function Reveal({ children, className = '', delay = 0, reducedMotion }) {
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: reducedMotion ? 0 : 0.65, delay }}
    >
      {children}
    </motion.div>
  );
}

function Brand({ light = false }) {
  return (
    <a className={`brand${light ? ' brand-light' : ''}`} href="#home" aria-label="Traviator home">
      <span className="brand-mark" aria-hidden="true"><Compass size={20} strokeWidth={1.8} /></span>
      <span className="brand-name">TRAVIATOR<span>ADVENTURES & OUTDOORS</span></span>
    </a>
  );
}

function Navigation({ reducedMotion }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 42);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' menu-is-open' : ''}`}>
      <div className="nav-inner">
        <Brand light={!scrolled} />
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#journeys">Journeys</a>
          <a href="#story">Our way</a>
          <a href="#fieldnotes">Field notes</a>
        </nav>
        <a className="nav-contact" href={contactUrl} target="_blank" rel="noreferrer">
          Plan a journey <ArrowUpRight size={15} />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={reducedMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
          >
            <a href="#journeys" onClick={closeMenu}>Journeys <ArrowUpRight size={16} /></a>
            <a href="#story" onClick={closeMenu}>Our way <ArrowUpRight size={16} /></a>
            <a href="#fieldnotes" onClick={closeMenu}>Field notes <ArrowUpRight size={16} /></a>
            <a href={contactUrl} target="_blank" rel="noreferrer" onClick={closeMenu}>Plan a journey <ArrowUpRight size={16} /></a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero({ reducedMotion }) {
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoPaused, setVideoPaused] = useState(false);
  const [video, setVideo] = useState(null);
  const [videoAllowed, setVideoAllowed] = useState(false);
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, 0.24], ['0%', '15%']);

  useEffect(() => {
    const videoQuery = window.matchMedia('(min-width: 701px) and (prefers-reduced-motion: no-preference)');
    const updateVideoPreference = () => setVideoAllowed(videoQuery.matches);
    updateVideoPreference();
    videoQuery.addEventListener('change', updateVideoPreference);
    return () => videoQuery.removeEventListener('change', updateVideoPreference);
  }, []);

  useEffect(() => {
    const videoElement = video;
    if (!videoElement) return undefined;
    if (!videoAllowed || reducedMotion) {
      videoElement.pause();
      return undefined;
    }
    const playPromise = videoElement.play();
    if (playPromise) playPromise.catch(() => setVideoFailed(true));
    return undefined;
  }, [reducedMotion, video, videoAllowed]);

  const toggleVideo = () => {
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setVideoPaused(false)).catch(() => setVideoFailed(true));
    } else {
      video.pause();
      setVideoPaused(true);
    }
  };

  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <motion.div className="hero-image" style={{ y: reducedMotion ? 0 : imageY }}>
        <img src={media.heroImage} alt="A Himalayan landscape from Traviator Adventures" fetchPriority="high" />
      </motion.div>
      {videoAllowed && !videoFailed && !reducedMotion && (
        <video
          ref={setVideo}
          className={`hero-video${videoReady ? ' is-ready' : ''}`}
          poster={media.heroImage}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          aria-hidden="true"
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoFailed(true)}
        >
          <source src={media.heroVideo} type="video/mp4" />
        </video>
      )}
      <div className="hero-wash" />
      <Navigation reducedMotion={reducedMotion} />
      <div className="hero-content page-gutter">
        <motion.p
          className="eyebrow hero-eyebrow"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.65, delay: 0.1 }}
        >
          <span className="eyebrow-rule" /> SINCE 2016 · INDIA & BEYOND
        </motion.p>
        <h1 id="hero-title">
          <span className="hero-line">
            <motion.span initial={reducedMotion ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.55, delay: 0.18 }}>The</motion.span>
            <motion.span initial={reducedMotion ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.55, delay: 0.31 }}>long way</motion.span>
          </span><br />
          <span className="hero-line hero-line-second">
            <motion.span initial={reducedMotion ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.55, delay: 0.48 }}><em>is the</em></motion.span>
            <motion.span initial={reducedMotion ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.55, delay: 0.61 }}><em>way.</em></motion.span>
          </span>
        </h1>
        <motion.div
          className="hero-bottom"
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.7, delay: 0.42 }}
        >
          <p>Ride farther. Wander deeper.<br />Find your own way out there.</p>
          <div className="hero-actions">
            <a className="button button-gold" href="#journeys">Find your journey <ArrowRight size={16} /></a>
            <a className="text-link light-link" href={contactUrl} target="_blank" rel="noreferrer">Talk to a trip planner <ArrowUpRight size={16} /></a>
          </div>
        </motion.div>
      </div>
      <div className="hero-index" aria-hidden="true"><span>01</span><span className="index-line" /><span>HIMALAYA / BEYOND</span></div>
      <a className="scroll-cue" href="#destinations"><ArrowDown size={16} /><span>SCROLL TO WANDER</span></a>
      {!reducedMotion && !videoFailed && videoReady && (
        <button className="video-toggle" type="button" onClick={toggleVideo} aria-label={videoPaused ? 'Play hero video' : 'Pause hero video'}>
          {videoPaused ? <Play size={14} /> : <Pause size={14} />}
        </button>
      )}
    </section>
  );
}

function SectionHeading({ kicker, title, italic, description, light = false, reducedMotion }) {
  return (
    <Reveal className={`section-heading${light ? ' section-heading-light' : ''}`} reducedMotion={reducedMotion}>
      <p className="eyebrow"><span className="eyebrow-rule" />{kicker}</p>
      <h2>{title}{italic && <> <em>{italic}</em></>}</h2>
      {description && <p className="section-description">{description}</p>}
    </Reveal>
  );
}

function DestinationDialog({ destination, onClose, reducedMotion }) {
  const tour = destination ? tours.find((item) => item.id === destination.tourId) : null;

  useEffect(() => {
    if (!destination) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [destination, onClose]);

  return (
    <AnimatePresence>
      {destination && (
        <motion.div
          className="dialog-backdrop"
          role="presentation"
          onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <motion.section
            className="destination-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="destination-dialog-title"
            initial={reducedMotion ? false : { opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
          >
            <div className="dialog-image">
              <img src={destination.image} alt={destination.alt} />
              <button className="dialog-close" type="button" onClick={onClose} aria-label="Close destination details"><X size={19} /></button>
              <span className="dialog-region">{destination.region}</span>
            </div>
            <div className="dialog-copy">
              <p className="eyebrow"><span className="eyebrow-rule" />A PLACE TO BEGIN</p>
              <h2 id="destination-dialog-title">{destination.name}</h2>
              <p>{destination.note}</p>
              {tour ? (
                <a className="button button-dark" href={tour.href} target="_blank" rel="noreferrer">
                  Explore the trip <ArrowUpRight size={16} />
                </a>
              ) : (
                <a className="button button-dark" href={contactUrl} target="_blank" rel="noreferrer">
                  Ask about this place <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Destinations({ reducedMotion }) {
  const [selected, setSelected] = useState(null);
  const scrollCards = (direction) => {
    document.querySelector('.destination-track')?.scrollBy({ left: direction * 390, behavior: reducedMotion ? 'instant' : 'smooth' });
  };

  return (
    <section className="destinations section-pad" id="destinations">
      <div className="section-inner">
        <div className="destination-heading-row">
          <SectionHeading
            kicker="THE PLACES THAT STAY WITH YOU"
            title="A little further"
            italic="from here."
            description="Open roads, slower mornings and the sort of places that rearrange your sense of scale."
            reducedMotion={reducedMotion}
          />
          <div className="carousel-controls" aria-label="Destination carousel controls">
            <button type="button" onClick={() => scrollCards(-1)} aria-label="Scroll destinations left"><ArrowLeft size={18} /></button>
            <button type="button" onClick={() => scrollCards(1)} aria-label="Scroll destinations right"><ArrowRight size={18} /></button>
          </div>
        </div>
        <div className="destination-track" aria-label="Featured destinations">
          {destinations.map((destination, index) => (
            <Reveal key={destination.name} delay={index * 0.07} reducedMotion={reducedMotion}>
              <button className="destination-card" type="button" onClick={() => setSelected(destination)} aria-label={`Explore ${destination.name}`}>
                <img src={destination.image} alt={destination.alt} loading="lazy" />
                <span className="destination-shade" />
                <span className="destination-number">0{index + 1}</span>
                <span className="destination-meta">{destination.region}</span>
                <span className="destination-card-bottom"><span>{destination.name}</span><span className="destination-arrow"><ArrowUpRight size={18} /></span></span>
              </button>
            </Reveal>
          ))}
        </div>
        <div className="destination-footnote"><span>01 — 05</span><span>Pick a place. We’ll help with the rest.</span></div>
      </div>
      <DestinationDialog destination={selected} onClose={() => setSelected(null)} reducedMotion={reducedMotion} />
    </section>
  );
}

function Manifesto({ reducedMotion }) {
  return (
    <section className="manifesto" id="story">
      <div className="manifesto-copy">
        <Reveal reducedMotion={reducedMotion}>
          <p className="eyebrow"><span className="eyebrow-rule" />THE TRAVIATOR WAY</p>
          <h2>Less itinerary.<br /><em>More in-between.</em></h2>
          <p className="manifesto-text">Since 2016, we’ve made room for the unplanned turn, the roadside chai and the stories you only hear when you slow down. From the Himalaya to farther afield, every journey starts with curiosity and leaves space for the unexpected.</p>
          <a className="text-link" href="https://www.traviator.in/about-us" target="_blank" rel="noreferrer">A little about us <ArrowUpRight size={16} /></a>
        </Reveal>
      </div>
      <div className="manifesto-photo">
        <img src="https://vl-prod-static.b-cdn.net/system/images/000/883/166/20af78fb99665ccadf0606f7770cc86d/1200gt/PHOTO-2025-04-06-17-04-31.jpg" alt="Travellers sharing a moment on a Traviator trip" loading="lazy" />
        <span className="photo-caption"><Mountain size={14} /> MADE FOR THE MOMENTS BETWEEN</span>
      </div>
      <div className="manifesto-stamp" aria-hidden="true"><span>TRAVEL WITH PURPOSE</span><Compass size={28} strokeWidth={1} /><span>EST. 2016 · INDIA</span></div>
    </section>
  );
}

function Experiences({ reducedMotion }) {
  const experiences = [
    { number: '01', title: 'Ride the long road', kind: 'Bike expeditions', icon: <Mountain size={20} strokeWidth={1.5} />, href: 'https://www.traviator.in/collections/bike-expeditions-tour-collection' },
    { number: '02', title: 'Find your own pace', kind: 'Backpacking', icon: <Compass size={20} strokeWidth={1.5} />, href: 'https://www.traviator.in/collections/backpacking-tour-collection' },
    { number: '03', title: 'Meet the place', kind: 'Culture & festivals', icon: <Instagram size={19} strokeWidth={1.5} />, href: 'https://www.traviator.in/collections/tours' },
  ];
  return (
    <section className="experiences section-pad">
      <div className="section-inner">
        <SectionHeading kicker="TRAVEL IN YOUR OWN ELEMENT" title="Choose your" italic="kind of wild." reducedMotion={reducedMotion} />
        <div className="experience-list">
          {experiences.map((experience, index) => (
            <Reveal key={experience.number} delay={index * 0.08} reducedMotion={reducedMotion}>
              <a className="experience-row" href={experience.href} target="_blank" rel="noreferrer">
                <span className="experience-number">{experience.number}</span>
                <span className="experience-icon">{experience.icon}</span>
                <span className="experience-title">{experience.title}</span>
                <span className="experience-kind">{experience.kind}</span>
                <span className="experience-arrow"><ArrowUpRight size={19} /></span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Trips({ reducedMotion }) {
  const [filter, setFilter] = useState('all');
  const filteredTours = tours.filter((tour) => filter === 'all' || tour.category === filter);
  const filters = [
    { id: 'all', label: 'All journeys' },
    { id: 'india', label: 'India' },
    { id: 'international', label: 'International' },
  ];

  return (
    <section className="trips section-pad" id="journeys">
      <div className="section-inner">
        <div className="trips-header">
          <SectionHeading kicker="HANDPICKED, NEVER HURRIED" title="Journeys worth" italic="the miles." reducedMotion={reducedMotion} />
          <div className="tour-filters" role="group" aria-label="Filter journeys">
            {filters.map((item) => (
              <button key={item.id} type="button" className={filter === item.id ? 'is-active' : ''} aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>{item.label}</button>
            ))}
          </div>
        </div>
        {filteredTours.length > 0 ? (
          <motion.div className="tour-grid" layout>
            <AnimatePresence mode="popLayout">
              {filteredTours.map((tour, index) => (
                <motion.article
                  className="tour-card"
                  key={tour.id}
                  layout
                  initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: reducedMotion ? 0 : 0.28, delay: reducedMotion ? 0 : index * 0.025 }}
                >
                  <a className="tour-image" href={tour.href} target="_blank" rel="noreferrer" aria-label={`View ${tour.name}`}>
                    <img src={tour.image} alt={tour.alt} loading="lazy" />
                    <span className="tour-type">{tour.mode === 'bike' ? 'BIKE & BACKPACKING' : tour.mode === 'culture' ? 'CULTURE' : 'BACKPACKING'}</span>
                    <span className="tour-image-arrow"><ArrowUpRight size={17} /></span>
                  </a>
                  <div className="tour-copy">
                    <p className="tour-location">{tour.location}</p>
                    <h3><a href={tour.href} target="_blank" rel="noreferrer">{tour.name}</a></h3>
                    <p className="tour-description">{tour.description}</p>
                    <div className="tour-details"><span>{tour.duration}</span><span className="tour-price">{tour.price}</span></div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <p className="empty-state" role="status">No journeys match this filter yet. Try another collection.</p>
        )}
        <div className="trips-footer"><span>Prices and departure availability may change.</span><a className="text-link" href="https://www.traviator.in/collections/tours" target="_blank" rel="noreferrer">View every journey <ArrowRight size={16} /></a></div>
      </div>
    </section>
  );
}

function TripPlanner() {
  const [destination, setDestination] = useState('');
  const [style, setStyle] = useState('');
  const [status, setStatus] = useState('');
  const submitPlanner = (event) => {
    event.preventDefault();
    if (!destination || !style) {
      setStatus('Choose a destination and travel style to start your enquiry.');
      return;
    }
    setStatus('Opening WhatsApp with your trip preferences.');
    const message = `Hello Traviator, I am interested in a ${style} journey to ${destination}. Please share current options and availability.`;
    window.open(`https://wa.me/917249309036?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="planner section-pad" id="planner">
      <div className="planner-inner">
        <div className="planner-copy">
          <p className="eyebrow"><span className="eyebrow-rule" />START SOMEWHERE</p>
          <h2>Every great trip<br />starts with <em>a maybe.</em></h2>
          <p>Tell us what’s calling. We’ll take it from there, one real conversation at a time.</p>
          <span className="planner-note"><span className="note-dot" />A real person, not a booking bot.</span>
        </div>
        <form className="planner-form" onSubmit={submitPlanner}>
          <label htmlFor="planner-destination">Where are you dreaming of?</label>
          <span className="select-wrap">
            <select id="planner-destination" value={destination} onChange={(event) => { setDestination(event.target.value); setStatus(''); }} required>
              <option value="" disabled>Choose a destination</option>
              {destinations.map((item) => <option key={item.name} value={item.name}>{item.name}</option>)}
              <option value="Somewhere else">Somewhere else</option>
            </select>
            <ChevronDown size={16} aria-hidden="true" />
          </span>
          <label htmlFor="planner-style">How would you like to travel?</label>
          <span className="select-wrap">
            <select id="planner-style" value={style} onChange={(event) => { setStyle(event.target.value); setStatus(''); }} required>
              <option value="" disabled>Choose your travel style</option>
              <option value="bike and backpacking">Bike & backpacking</option>
              <option value="backpacking">Backpacking</option>
              <option value="culture and festival">Culture & festival</option>
              <option value="custom">A custom journey</option>
            </select>
            <ChevronDown size={16} aria-hidden="true" />
          </span>
          <button className="button button-dark planner-submit" type="submit">Start a conversation <ArrowUpRight size={16} /></button>
          <p className="form-status" aria-live="polite">{status}</p>
        </form>
      </div>
    </section>
  );
}

function PhotoEssay({ reducedMotion }) {
  return (
    <section className="photo-essay">
      <div className="essay-image">
        <img src={gallery[0].image} alt={gallery[0].alt} loading="lazy" />
        <span className="essay-caption">CHANDRATAL · HIMACHAL PRADESH</span>
      </div>
      <Reveal className="essay-copy" reducedMotion={reducedMotion}>
        <p className="eyebrow"><span className="eyebrow-rule" />A NOTE FROM THE ROAD</p>
        <blockquote>“For us, journeys aren’t counted in kilometres, but in moments shared, roads conquered, and connections made.”</blockquote>
        <a className="text-link" href="https://www.instagram.com/traviator.in/" target="_blank" rel="noreferrer">Follow the road <Instagram size={15} /></a>
      </Reveal>
    </section>
  );
}

function FieldNotes({ reducedMotion }) {
  return (
    <section className="fieldnotes section-pad" id="fieldnotes">
      <div className="section-inner">
        <div className="fieldnotes-heading">
          <SectionHeading kicker="NOTES FOR THE ROAD" title="A little reading" italic="before you go." reducedMotion={reducedMotion} />
          <a className="text-link" href="https://www.traviator.in/bike-or-backpacking-expedition" target="_blank" rel="noreferrer">The journal <ArrowUpRight size={16} /></a>
        </div>
        <div className="story-list">
          {stories.map((story, index) => (
            <Reveal key={story.title} delay={index * 0.07} reducedMotion={reducedMotion}>
              <a className="story-row" href={story.href} target="_blank" rel="noreferrer">
                <span className="story-date">{story.date}</span><span className="story-title">{story.title}</span><span className="story-arrow"><ArrowUpRight size={19} /></span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews({ reducedMotion }) {
  const [active, setActive] = useState(0);
  const review = testimonials[active];
  return (
    <section className="reviews section-pad">
      <div className="reviews-inner">
        <Reveal className="reviews-intro" reducedMotion={reducedMotion}>
          <p className="eyebrow"><span className="eyebrow-rule" />POSTCARDS, IN THEIR WORDS</p>
          <h2>Good trips<br />make <em>good stories.</em></h2>
          <p>Real words from travellers who rode, trekked and backpacked with Traviator.</p>
          <div className="review-controls">
            <button type="button" onClick={() => setActive((current) => (current - 1 + testimonials.length) % testimonials.length)} aria-label="Previous traveller story"><ArrowLeft size={17} /></button>
            <span>0{active + 1} <i>/</i> 0{testimonials.length}</span>
            <button type="button" onClick={() => setActive((current) => (current + 1) % testimonials.length)} aria-label="Next traveller story"><ArrowRight size={17} /></button>
          </div>
        </Reveal>
        <div className="review-quote-wrap" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.figure
              key={review.trip}
              className="review-quote"
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: reducedMotion ? 0 : 0.28 }}
            >
              <span className="quote-mark" aria-hidden="true">“</span>
              <blockquote>{review.quote}</blockquote>
              <figcaption><span className="review-stars" aria-label="Five stars">★★★★★</span><span>{review.trip}</span></figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Gallery({ reducedMotion }) {
  return (
    <section className="gallery-section section-pad">
      <div className="section-inner">
        <div className="gallery-intro">
          <SectionHeading kicker="COLLECTED ALONG THE WAY" title="Not just places." italic="People. Moments." description="A glimpse of the way we travel: together, with purpose, and room enough for the unexpected." reducedMotion={reducedMotion} />
          <a className="text-link" href="https://www.instagram.com/traviator.in/" target="_blank" rel="noreferrer">More from the road <Instagram size={15} /></a>
        </div>
        <div className="gallery-grid">
          {gallery.map((photo, index) => (
            <Reveal key={photo.title} delay={index * 0.05} className={`gallery-item gallery-${photo.shape}`} reducedMotion={reducedMotion}>
              <a href="https://www.instagram.com/traviator.in/" target="_blank" rel="noreferrer" aria-label={`View more travel photos: ${photo.title}`}>
                <img src={photo.image} alt={photo.alt} loading="lazy" />
                <span>{photo.title}<ArrowUpRight size={16} /></span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [statusKind, setStatusKind] = useState('');
  const endpoint = import.meta.env.VITE_NEWSLETTER_ENDPOINT;

  const submitNewsletter = async (event) => {
    event.preventDefault();
    setStatus('');
    setStatusKind('');
    if (!endpoint) {
      setStatus('Our newsletter signup is not connected yet. Please email info.traviator@gmail.com to stay in touch.');
      setStatusKind('error');
      return;
    }
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error('Newsletter request failed');
      setEmail('');
      setStatus('You’re on the list. Watch your inbox for a note from us.');
      setStatusKind('success');
    } catch {
      setStatus('We couldn’t submit that just now. Please try again or email info.traviator@gmail.com.');
      setStatusKind('error');
    }
  };

  return (
    <section className="newsletter section-pad" id="newsletter">
      <div className="newsletter-inner">
        <div><p className="eyebrow"><span className="eyebrow-rule" />A GOOD THING TO RECEIVE</p><h2>Notes from <em>out there.</em></h2><p>Occasional stories, new departures and places we can’t stop thinking about.</p></div>
        <form className="newsletter-form" onSubmit={submitNewsletter}>
          <label className="sr-only" htmlFor="newsletter-email">Email address</label>
          <div className="newsletter-input"><input id="newsletter-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" autoComplete="email" required /><button type="submit" aria-label="Subscribe to the newsletter"><ArrowRight size={19} /></button></div>
          <p className={`newsletter-status${statusKind ? ` is-${statusKind}` : ''}`} aria-live="polite">{status || 'No spam. No backend is configured until you set VITE_NEWSLETTER_ENDPOINT.'}</p>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand"><Brand light /><p>Be a Traviator.<br />We’ll be your navigator.</p><a className="footer-contact" href="tel:+917249309036">+91 724 930 9036</a><a className="footer-contact" href="mailto:info.traviator@gmail.com">info.traviator@gmail.com</a></div>
        <div className="footer-column"><p>FIND YOUR WAY</p><a href="#journeys">All journeys</a><a href="https://www.traviator.in/collections/bike-backpacking-tours" target="_blank" rel="noreferrer">Bike & backpacking</a><a href="https://www.traviator.in/collections/international" target="_blank" rel="noreferrer">International trips</a></div>
        <div className="footer-column"><p>THE DETAILS</p><a href="https://www.traviator.in/about-us" target="_blank" rel="noreferrer">About us</a><a href="https://www.traviator.in/contact-us" target="_blank" rel="noreferrer">Contact us</a><a href="https://www.traviator.in/terms-and-conditions" target="_blank" rel="noreferrer">Cancellation policy</a><a href="https://www.traviator.in/privacy-policy" target="_blank" rel="noreferrer">Privacy policy</a></div>
        <div className="footer-social"><p>OUT THERE, TOGETHER</p><a href="https://www.instagram.com/traviator.in/" target="_blank" rel="noreferrer" aria-label="Traviator on Instagram"><Instagram size={18} /></a><a href="https://www.facebook.com/traviator.in/" target="_blank" rel="noreferrer" aria-label="Traviator on Facebook"><MoveUpRight size={18} /></a><a href={contactUrl} target="_blank" rel="noreferrer" aria-label="Contact Traviator on WhatsApp"><ArrowUpRight size={18} /></a></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Traviator Adventures & Outdoors</span><span>Made for the miles ahead <Compass size={13} /></span><a href="#home">BACK TO TOP ↑</a></div>
    </footer>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

function CursorFollower({ reducedMotion }) {
  const pointerX = useMotionValue(-80);
  const pointerY = useMotionValue(-80);
  const x = useSpring(pointerX, { stiffness: 520, damping: 38, mass: 0.18 });
  const y = useSpring(pointerY, { stiffness: 520, damping: 38, mass: 0.18 });
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    if (reducedMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;

    const onPointerMove = (event) => {
      pointerX.set(event.clientX + 10);
      pointerY.set(event.clientY + 10);
      setVisible(true);
    };
    const onPointerOver = (event) => {
      if (!(event.target instanceof Element)) return;
      setInteractive(Boolean(event.target.closest('a, button, [role="button"], select')));
    };
    const onPointerLeave = () => {
      setVisible(false);
      setInteractive(false);
    };

    document.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerover', onPointerOver, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);
    return () => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerover', onPointerOver);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [pointerX, pointerY, reducedMotion]);

  return (
    <motion.div
      className={`cursor-follower${visible ? ' is-visible' : ''}${interactive ? ' is-interactive' : ''}`}
      style={{ x, y }}
      aria-hidden="true"
    />
  );
}

export default function App() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) document.documentElement.classList.add('reduced-motion');
    else document.documentElement.classList.remove('reduced-motion');
    return () => document.documentElement.classList.remove('reduced-motion');
  }, [reducedMotion]);

  return (
    <>
      <ScrollProgress />
      <CursorFollower reducedMotion={reducedMotion} />
      <main>
        <Hero reducedMotion={reducedMotion} />
        <Destinations reducedMotion={reducedMotion} />
        <Manifesto reducedMotion={reducedMotion} />
        <Experiences reducedMotion={reducedMotion} />
        <Trips reducedMotion={reducedMotion} />
        <PhotoEssay reducedMotion={reducedMotion} />
        <TripPlanner />
        <FieldNotes reducedMotion={reducedMotion} />
        <Reviews reducedMotion={reducedMotion} />
        <Gallery reducedMotion={reducedMotion} />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}