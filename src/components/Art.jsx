import React from 'react'
import { featureLists, goodLists, MOBILE_BREAKPOINT } from '../../constants'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useMediaQuery } from 'react-responsive'



const Art = () => {

  const isMobile = useMediaQuery({maxWidth: MOBILE_BREAKPOINT})

  useGSAP(() => {
    // ============================================
    // MASK REVEAL ANIMATION
    // ============================================
    
    // Adjust the start position based on device
    // Mobile needs to start earlier (20% down) for better visibility
    // Desktop can start immediately when section hits top
    const start = isMobile ? 'top 20%' : 'top top'

    // Create a timeline with scroll-triggered mask reveal effect
    // This creates a dramatic "unveiling" animation as you scroll
    const maskTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#art",         // The art section triggers this animation
        start,                   // Responsive start position (mobile vs desktop)
        end: 'bottom center',    // End when bottom of section reaches center of viewport
        scrub: 1.5,              // Smooth scrubbing tied to scroll (1.5 = slight lag for smoothness)
        pin: true                // Pin the section in place while the animation plays
      }
    })

    // Three-stage reveal sequence:
    maskTimeline
      // Stage 1: Fade out the initial content (heading and feature lists)
      .to(".will-fade", {
        opacity: 0,              // Fade to invisible
        stagger: 0.2,            // Each element fades 0.2s after the previous one
        ease: "power1.inOut"     // Smooth easing
      })
      // Stage 2: Zoom and reveal the masked image
      // The image has a CSS mask that we're expanding and repositioning
      .to('.masked-img', {
        scale: 1.3,              // Zoom in to 130% size
        maskPosition: 'center',  // Move the mask to center of image
        maskSize: '400%',        // Expand the mask to 4x its original size (reveals more)
        duration: 2,             // Takes 2 seconds to complete
        ease: 'power1.inOut'     // Smooth easing
      })
      // Stage 3: Fade in the new content (final heading and description)
      .to('#masked-content', {
        opacity: 1,              // Fade from invisible to visible
        duration: 2,             // Takes 2 seconds
        ease: 'power1.inOut'     // Smooth easing
      })
    })
    
  return (
    <section id="art">
      <div className='container mx-auto h-full pt-20'>  
        <h2 className='will-fade'>The ART</h2>

        <div className='content'>
          <ul className='space-y-4 will-fade'>
              {goodLists.map((feature, index) => (
                <li key={index} className='flex items-center gap-2'>
                  <img src="/images/check.png" alt="check" />
                  <p>{feature}</p>
                </li>
              ))}
          </ul>

          <div className='cocktail-img'>
              <img src="/images/under-img.jpg" alt="cocktail" 
                    className='abs-center masked-img size-full object-contain' 
              />
          </div>

          <ul className='space-y-4 will-fade'>
              {featureLists.map((feature, index) => (
                <li key={index} className='flex items-center justify-start gap-2'>
                  <img src="/images/check.png" alt="check" />
                  <p className='md:w-fit w-60'>{feature}</p>
                </li>
              ))}
          </ul>
        </div>

        <div className='masked-container'>
          <h2 className='will-fade'>Sip-Worthy Perfection</h2>
          <div id='masked-content'>
            <h3>Made with Craft, Poured with Passion</h3>
            <p>This isn't just a drink. It's a carefully crafted moment made just for you.</p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Art