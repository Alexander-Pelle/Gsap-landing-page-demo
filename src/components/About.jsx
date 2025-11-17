import gsap from 'gsap';
import { SplitText} from 'gsap/all'
import { useGSAP } from '@gsap/react'

const About = () => {
 useGSAP(() => {
	// ============================================
	// ABOUT SECTION ANIMATIONS
	// ============================================
	
	// Split the heading into individual words
	// animates each word separately for a revealing effect
	const titleSplit = new SplitText('#about h2', {
	 type: 'words'       // Split by words (not characters or lines)
	})
	
	// Create a scroll-triggered timeline
	// Animations will play when user scrolls to this section
	const scrollTimeline = gsap.timeline({
	 scrollTrigger: {
		trigger: '#about',      // The about section triggers this animation
		start: 'top center'     // Start when top of section hits center of viewport
	 }
	})
	
	// Chain two animations that play in sequence (with overlap)
	scrollTimeline
	 // 1. Animate heading words sliding up and fading in
	 .from(titleSplit.words, {
		opacity: 0,             // Start invisible
		duration: 1,            // Animation takes 1 second
		yPercent: 100,          // Start 100% below normal position (hidden below)
		ease: 'expo.out',       // Exponential easing (fast start, slow end)
		stagger: 0.02           // Each word starts 0.02s after the previous one
	})
	 // 2. Animate image grid divs fading in
	 // Targets all divs inside both top-grid and bottom-grid
	 .from('.top-grid div, .bottom-grid div', {
		opacity: 0,             // Start invisible
		duration: 1,            // Animation takes 1 second
		ease: 'power1.inOut',   // Smooth easing
		stagger: 0.04,          // Each grid item starts 0.04s after the previous
	}, '-=0.5')                 // Start 0.5s BEFORE previous animation ends (overlap)
 })
 
 return (
	<div id="about">
	 <div className="mb-16 md:px-0 px-5">
		<div className="content">
		 <div className="md:col-span-8">
			<p className="badge">Best Cocktails</p>
			<h2>
			 Where every detail matters <span className="text-white">-</span>
				from muddle to garnish
			</h2>
		 </div>
		 
		 <div className="sub-content">
			<p>
			 Every cocktail we serve is a reflection of our obsession with detail — from the first muddle to the final garnish. That care is what turns a simple drink into something truly memorable.
			</p>
			
			<div>
			 <p className="md:text-3xl text-xl font-bold">
				<span>4.5</span>/5
			 </p>
			 <p className="text-sm text-white-100">
				More than +12000 customers
			 </p>
			</div>
		 </div>
		</div>
	 </div>
	 
	 <div className="top-grid">
		<div className="md:col-span-3">
		 <div  className="noisy" />
		 <img src="/images/abt1.png" alt="grid-img-1" />
		</div>
		
		<div className="md:col-span-6">
		 <div  className="noisy" />
		 <img src="/images/abt2.png" alt="grid-img-2" />
		</div>
		
		<div className="md:col-span-3">
		 <div  className="noisy" />
		 <img src="/images/abt5.png" alt="grid-img-5" />
		</div>
	 </div>
	 
	 <div className="bottom-grid">
		<div className="md:col-span-8">
		 <div  className="noisy" />
		 <img src="/images/abt3.png" alt="grid-img-3" />
		</div>
		
		<div className="md:col-span-4">
		 <div  className="noisy" />
		 <img src="/images/abt4.png" alt="grid-img-4" />
		</div>
	 </div>
	 
	</div>
 )
}
export default About