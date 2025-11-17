import React, { useState, useRef } from 'react'
import { sliderLists } from '../../constants'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Menu = () => {
  const contentRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  // ============================================
  // SLIDE TRANSITION ANIMATIONS
  // ============================================
  
  // These animations run every time the currentIndex changes (when user clicks a cocktail)
  // The [currentIndex] dependency ensures fresh animations on each slide change
  useGSAP(() => {
    // 1. Fade in the cocktail title
    // fromTo() allows us to reset from invisible and animate to visible each time
    gsap.fromTo('#title', 
      {opacity: 0},                      // Start: invisible
      {opacity: 1, duration: 1})         // End: fully visible over 1 second
    
    // 2. Slide in the cocktail image from the left
    gsap.fromTo('.cocktail img', 
      {opacity: 0, xPercent: -100},      // Start: invisible and 100% to the left (off-screen)
      {xPercent: 0,                      // End: at normal position (0% offset)
       opacity: 1,                       // Fully visible
       duration: 1,                      // Takes 1 second
       ease:'power1.inOut'})             // Smooth acceleration and deceleration

    // 3. Slide up the cocktail recipe heading
    gsap.fromTo('.details h2', 
      {yPercent: 100, opacity: 0},       // Start: 100% below normal position, invisible
      {yPercent: 0,                      // End: at normal position
       opacity: 100,                     // Fully visible
       ease: 'power1.inOut'})            // Smooth easing
    
    // 4. Slide up the cocktail recipe description
    gsap.fromTo('.details p', 
      {yPercent: 100, opacity: 0},       // Start: 100% below normal position, invisible
      {yPercent: 0,                      // End: at normal position
       opacity: 100,                     // Fully visible
       ease: 'power1.inOut'})            // Smooth easing
  
  }, [currentIndex])  // Re-run animations whenever currentIndex changes, just a React dependency list

  // ============================================
  // SLIDER NAVIGATION LOGIC
  // ============================================
  
  const totalCocktails = sliderLists.length;

  // Navigate to a specific slide with infinite wrapping
  // Uses modulo (%) to wrap around: -1 becomes last slide, last+1 becomes first slide
  const goToSlide = (index) => {
    const newIndex = (index + totalCocktails) % totalCocktails

    setCurrentIndex(newIndex)
  }

  // Get a cocktail at an offset from current position
  // Offset -1 = previous, 0 = current, 1 = next
  // Also uses modulo for infinite wrapping in both directions
  const getCocktailAt = (indexOffset) => {
    return sliderLists[(currentIndex + indexOffset + totalCocktails) % totalCocktails]
  }

  // Pre-calculate the cocktails we need for the current view
  const currentCocktail = getCocktailAt(0);   // The currently displayed cocktail
  const prevCocktail = getCocktailAt(-1);     // Previous cocktail (for left arrow label)
  const nextCocktail = getCocktailAt(1);      // Next cocktail (for right arrow label)

  return (
    <section id="menu" aria-labelledby="menu-heading">
      <img src="/images/slider-left-leaf.png" alt="left-leaf" id="m-left-leaf" />
      <img src="/images/slider-right-leaf.png" alt="right-leaf" id="m-right-leaf" />

      <h2 id='menu-heading' className='sr-only'>
        Cocktail Menu
      </h2>

      <nav className='cocktail-tabs' aria-label='Cocktail Navigation'>
        {sliderLists.map((cocktail, index) => {
          const isActive = index === currentIndex;

          return (
            <button 
              key={cocktail.id} 
              onClick={() => goToSlide(index)}
              className={`${isActive ? 'text-white border-white' : 'text-white/50 border-white/50'}`}
            >
              {cocktail.name}
            </button>
          )
        })}
      </nav>

      <div className='content'>
        <div className='arrows'>
          <button className='text-left' onClick={() => goToSlide(currentIndex-1)}>
            <span>{prevCocktail.name}</span>
            <img src="/images/right-arrow.png" alt="right-arrow" aria-hidden="true" />
          </button>
          <button className='text-left' onClick={() => goToSlide(currentIndex+1)}>
            <span>{nextCocktail.name}</span>
            <img src="/images/left-arrow.png" alt="left-arrow" aria-hidden="true" />
          </button>
        </div>

        <div className='cocktail'>
          <img src={currentCocktail.image} className='object-contain' />
        </div>

        <div className='recipe'>
          <div ref={contentRef} className='info'>
            <p>Recipe for:</p>
            <p id="title">{currentCocktail.name}</p>
          </div>

          <div className='details'>
            <h2>{currentCocktail.title}</h2>
            <p>{currentCocktail.description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Menu