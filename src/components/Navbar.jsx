
import { navLinks } from '../../constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';


const Navbar = () => {
    useGSAP(() => {
        // ============================================
        // NAVBAR SCROLL ANIMATION
        // ============================================
        
        // Create a timeline with a ScrollTrigger
        // This will change the navbar appearance when scrolling down the page
        const navTween = gsap.timeline({
            scrollTrigger: {
                trigger: 'nav',       // The navbar element itself triggers this animation
                start: 'bottom top',  // Start when bottom of navbar reaches top of viewport
            }
        });

        // Animate navbar from transparent to semi-transparent with blur
        // fromTo() animates FROM first state TO second state
        navTween.fromTo('nav', 
            { backgroundColor: 'transparent' },  // Starting state: fully transparent
            {
                backgroundColor: '#00000050',    // Ending state: black with 50% opacity
                backgroundFilter: 'blur(10px)',  // Add a 10px blur effect for glassmorphism
                duration: 1,                     // Animation takes 1 second
                ease: 'power2.inOut',           // Smooth easing (slow start, fast middle, slow end)
            }
        )
    });
    
  return (
    <nav>
        <div>
            <a href="#home" className='flex items-center gap-2'>
                <img src="/images/logo.png" alt="logo" />
                <p>Velvet Pour</p>
            </a>
            <ul>
                {navLinks.map((link) => (
                    <li key={link.id}>
                        <a href={`#${link.id}`}>{link.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    </nav>
  )
}

export default Navbar