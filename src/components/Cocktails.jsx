import React from 'react'


import { cocktailLists, mockTailLists } from '../../constants';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Cocktails = () => {
  useGSAP(() => {
    // ============================================
    // PARALLAX LEAF ANIMATIONS
    // ============================================
    
    // Create a scroll-triggered timeline for decorative leaf animations
    // This creates a subtle parallax effect as users scroll through the menu
    const parallaxTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#cocktails',  // The cocktails section triggers this animation
        start: 'top 30%',       // Start when top of section is at 30% down the viewport
        end: 'bottom 80%',      // End when bottom of section is at 80% down the viewport
        scrub: true,            // Tie animation progress directly to scroll position
      }
    })

    // Animate the left decorative leaf
    // Moves diagonally down and to the right as you scroll
    parallaxTimeline.to('#c-left-leaf', {
      x: 100,   // Move 100px to the right
      y: 100,   // Move 100px down
    }, 0)       // Start at position 0 in the timeline (same time as other animations)

    // Animate the right decorative leaf
    // Creates a mirrored parallax effect with the left leaf
    parallaxTimeline.to('#c-right-leaf', {
      x: 100,   // Move 100px to the right
      y: 100,   // Move 100px down
    }, 0)       // Start at position 0 (runs simultaneously with left leaf)
  })

  return (
    <section id="cocktails" className='noisy'>
      <img src="/images/cocktail-left-leaf.png" alt="c-left-leaf" id='c-left-leaf' />
      <img src="/images/cocktail-right-leaf.png" alt="c-right-leaf" id='c-right-leaf' />

      <div className='list'>
        <div className='popular'>
          <h2>Most Popular</h2>
          <ul>
            {cocktailLists.map(({name, country, detail, price}) => (
              <li key={name}>
                <div className='md:me-28'>
                  <h3>{name}</h3>
                  <p>{country} | {detail}</p>
                </div>
                <span>
                  <span className='text-yellow'>-</span> {price}  
                </span>
                
              </li>
            ))}
          </ul>
        </div>

        <div className='loved'>
          <h2>Most Loved</h2>
          <ul>
            {mockTailLists.map(({name, country, detail, price}) => (
              <li key={name}>
                <div className='md:me-28'>
                  <h3>{name}</h3>
                  <p>{country} | {detail}</p>
                </div>
                <span>
                  <span className='text-yellow'>-</span> {price}  
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </section>
  )
}

export default Cocktails