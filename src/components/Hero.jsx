import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const videoRef = useRef();

  const isMobile = useMediaQuery({ maxWidth: 767 });


  useGSAP(() => {
    // ============================================
    // TEXT ANIMATIONS
    // ============================================
    
    // Split the title text into individual characters and words
    // animates each character separately for a stagger effect
    const heroSplit = new SplitText(".title", {
      type: "chars, words",
    });

    // Split the subtitle text into individual lines
    // animates each line independently
    const paragraphSplit = new SplitText(".subtitle", {
      type: "lines",
    });

    // Add a gradient effect class to each character of the title
    // This must be done before animating to ensure the gradient is visible
    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    // Animate the title characters sliding up from below
    // gsap.from() animates FROM the given values TO their natural state
    gsap.from(heroSplit.chars, {
      yPercent: 100,        // Start 100% below their normal position (hidden)
      duration: 1.8,        // Animation takes 1.8 seconds
      ease: "expo.out",     // Smooth easing that starts fast and slows down
      stagger: 0.06,        // Each character starts 0.06 seconds after the previous one
    });

    // Animate the subtitle lines fading in and sliding up
    gsap.from(paragraphSplit.lines, {
      opacity: 0,           // Start invisible
      yPercent: 100,        // Start 100% below their normal position
      duration: 1.8,        // Animation takes 1.8 seconds
      ease: "expo.out",     // Same smooth easing as the title
      stagger: 0.06,        // Each line starts 0.06 seconds after the previous one
      delay: 1,             // Wait 1 second before starting (after title animation begins)
    });

    // ============================================
    // PARALLAX SCROLL ANIMATIONS
    // ============================================
    
    // Create a timeline that's controlled by scrolling
    // ScrollTrigger makes animations play as you scroll up/down
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",     // Element that triggers the animation
          start: "top top",     // Start when top of #hero hits top of viewport
          end: "bottom top",    // End when bottom of #hero hits top of viewport
          scrub: true,          // Animation progress directly tied to scroll position
        },
      })
      // Animate decorative leaf images to create parallax effect
      // The "0" means all animations start at the same time in the timeline
      .to(".right-leaf", { y: 200 }, 0)   // Move right leaf down 200px
      .to(".left-leaf", { y: -200 }, 0)   // Move left leaf up 200px
      .to(".arrow", { y: 100 }, 0);       // Move arrow down 100px

    // ============================================
    // VIDEO SCRUBBING ANIMATION
    // ============================================
    
    // Adjust video trigger points based on screen size
    // Mobile devices need different scroll positions for better UX
    const startValue = isMobile ? "top 50%" : "center 60%";
    const endValue = isMobile ? "120% top" : "bottom top";

    // Create a timeline for controlling video playback via scroll
    // This creates a "scroll-through-video" effect
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: "video",     // The <video> element triggers this animation
        start: startValue,    // When to start scrubbing the video
        end: endValue,        // When to end scrubbing the video
        scrub: true,          // Tie video progress to scroll position
        pin: true,            // Pin the video in place while scrolling through it
      },
    });

    // Wait for video metadata to load (duration, dimensions, etc.)
    // This ensures we know the video length before trying to scrub through it
    videoRef.current.onloadedmetadata = () => {
      // Animate the video's currentTime from 0 to its full duration
      // As you scroll, the video "plays" through its entire length
      tl.to(videoRef.current, {
        currentTime: videoRef.current.duration,  // Scrub to the end of the video
      });
    };
  }, [])
  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">MOJITO</h1>

        <img
          src="/images/hero-left-leaf.png"
          alt="left-leaf"
          className="left-leaf"
        />
        <img
          src="/images/hero-right-leaf.png"
          alt="right-leaf"
          className="right-leaf"
        />

        <div className="body">
          {/* <img src="/images/arrow.png" alt="arrow" className="arrow" /> */}

          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic.</p>
              <p className="subtitle">
                Sip the Spirit <br /> of Summer
              </p>
            </div>

            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes — designed to delight your
                senses.
              </p>
              <a href="#cocktails">View cocktails</a>
            </div>
          </div>
        </div>
      </section>

      <div className="video absolute inset-0">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/videos/output.mp4"
        />
      </div>
    </>
  )
};

export default Hero