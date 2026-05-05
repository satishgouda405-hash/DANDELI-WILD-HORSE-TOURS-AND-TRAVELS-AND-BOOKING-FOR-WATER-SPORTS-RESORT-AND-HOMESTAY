import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoPanelRef = useRef<HTMLDivElement>(null);
  const textPanelRef = useRef<HTMLDivElement>(null);
  const goldBar1Ref = useRef<HTMLDivElement>(null);
  const goldBar2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const photoPanel = photoPanelRef.current;
    const textPanel = textPanelRef.current;
    const goldBar1 = goldBar1Ref.current;
    const goldBar2 = goldBar2Ref.current;
    if (!section || !photoPanel || !textPanel || !goldBar1 || !goldBar2) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=60%',   // FIX: was 130%, reduced to cut excessive blank scroll
          pin: true,
          scrub: 0.6,
        },
      });

      if (!isMobile) {
        // Photo panel: enters from right
        scrollTl
          .fromTo(photoPanel, { x: '50vw' }, { x: 0, ease: 'none' }, 0)
          .to(photoPanel, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.55);

        // Text panel: enters from left
        scrollTl
          .fromTo(textPanel, { x: '-40vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0)
          .to(textPanel, { x: '-12vw', opacity: 0, ease: 'power2.in' }, 0.55);
      } else {
        // Mobile: simple fade in/out instead of horizontal slides
        scrollTl
          .fromTo([photoPanel, textPanel], { opacity: 0 }, { opacity: 1, ease: 'none' }, 0)
          .to([photoPanel, textPanel], { opacity: 0, ease: 'power2.in' }, 0.6);
      }

      // Gold bars
      scrollTl
        .fromTo([goldBar1, goldBar2], { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0.08)
        .to([goldBar1, goldBar2], { scaleX: 0.2, opacity: 0, ease: 'power2.in' }, 0.55);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pinned-section flex flex-col md:flex-row z-20"
    >
      {/* Left Typography Panel — full width on mobile, 55% on desktop */}
      <div
        ref={textPanelRef}
        className="w-full md:w-[55vw] h-1/2 md:h-full bg-[#14120F] flex flex-col justify-center px-[6vw] py-[6vh] md:py-[10vh]"
      >
        <span className="font-mono-label text-[11px] text-[#D4A03D] mb-6 md:mb-8 block">
          ABOUT US
        </span>

        <h2 className="font-display font-black text-[clamp(28px,3.5vw,52px)] text-[#F4EFE6] leading-[1.05] mb-6 md:mb-8 max-w-full md:max-w-[38vw]">
          LOCAL GUIDES.<br />
          <span className="text-[#D4A03D]">REAL</span> ADVENTURES.
        </h2>

        <p className="text-[#B8B0A6] text-base leading-relaxed max-w-full md:max-w-[38vw] mb-4 md:mb-5">
          We&apos;re a local team of guides, drivers, and hosts who&apos;ve turned Dandeli&apos;s rivers and trails into a playbook of real adventures.
        </p>

        <p className="text-[#B8B0A6] text-base leading-relaxed max-w-full md:max-w-[38vw] mb-6 md:mb-8 hidden md:block">
          From taxi drops to full itineraries—rafting, ziplines, coracle rides, jungle camps—we handle the logistics so you get the stories.
        </p>

        <button className="text-[#D4A03D] text-sm hover:underline flex items-center gap-2 w-fit">
          Meet the team <span>&rarr;</span>
        </button>

        {/* Gold bars */}
        <div className="flex gap-3 mt-auto pt-4">
          <div ref={goldBar1Ref} className="gold-bar w-16" />
          <div ref={goldBar2Ref} className="gold-bar w-10" />
        </div>
      </div>

      {/* Right Photo Panel — full width on mobile, 45% on desktop */}
      <div
        ref={photoPanelRef}
        className="w-full md:w-[45vw] h-1/2 md:h-full relative overflow-hidden"
      >
        <img
          src="/images/IMG-20260505-WA0016.jpg"
          alt="Dandeli Wild Horse Guide"
          className="w-full h-full object-cover object-center"  // FIX: added object-center
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#14120F]/40 to-transparent" />
      </div>
    </section>
  );
}
