import React from 'react'
import { openingHours, socials } from '../../constants'
import gsap from 'gsap'

import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/all'


const Contact = () => {

  useGSAP(() => {
    // ============================================
    // FOOTER/CONTACT ANIMATIONS
    // ============================================
    
    // Split the footer heading into individual words
    // Allows each word to animate in separately for a staggered reveal effect
    const titleSplit = new SplitText('#contact h2', {type: 'words'})

    // Create a timeline that triggers when scrolling to the footer
    // All animations in this timeline will play sequentially
    const timeline = gsap.timeline({
      scrollTrigger : {
        trigger: 'contact',    // The footer/contact section triggers this
        start: 'top center'    // Start when top of footer reaches center of viewport
      },
      ease: 'power1.inOut'     // Default easing for all animations in this timeline
    })

    // Chain multiple animations that play one after another
    timeline 
      // 1. Animate title words sliding up and fading in
      .from(titleSplit.words, {
        opacity: 0,         // Start invisible
        yPercent: 100,      // Start 100% below normal position
        stagger: 0.02       // Each word starts 0.02s after the previous one
      })
      // 2. Animate all headings and paragraphs in the contact section
      // This runs AFTER the title animation completes
      .from('#contact h3, #contact p', {
        opacity: 0,         // Start invisible
        yPercent: 100,      // Start 100% below normal position
        stagger: 0.02       // Each element starts 0.02s after the previous
      })
      // 3. Animate the right  leaf moving up
      .to('#f-right-lead', {
        y: '-50',                  // Move 50px upward
        duration: 1,               // Animation takes 1 second
        ease: 'power1.inOut'       // Smooth easing
      })
      // 4. Animate the left  leaf moving up
      .to('#f-left-leaf', {
        y: '-50',                  // Move 50px upward
        duration: 1,               // Animation takes 1 second
        ease: 'power1.inOut'       // Smooth easing
      }, '<')                      // '<' means start at same time as previous animation
  })

  return (
    <footer id="contact">
      <img src="/images/footer-right-leaf.png" alt="leaf-right" id='f-right-leaf' />
      <img src="/images/footer-left-leaf.png" alt="leaf-left" id='f-left-leaf' />

      <div className='content'>
        <h2>Where to Find Us</h2>

        <div>
          <h3>Visit Our Bar</h3>
          <p>456, Raq, Blvd. #404, Los Angeles, CA 90210</p>
        </div>

        <div>
          <h3>Contact Us</h3>
          <p>(555) 987-6543</p>
          <p>hello@cocktailman.com</p>
        </div>

        <div>
          <h3>Open Every Day</h3>
          {openingHours.map((time) => (
            <p key={time.day}>
              {time.day} : {time.time}
            </p>
          ))}
        </div>

        <div>
          <h3>
            Socials
          </h3>

          <div className='flex-center gap-5'>
            {socials.map((social) => (
              <a 
                href={social.url}
                key={social.name}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={social.name}>
                  <img src={social.icon} alt={social.name} />
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Contact