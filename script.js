// Force the browser to scroll to the top on every page load/refresh
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

// Petal Background Animation
const petalContainer = document.getElementById('petal-container');
// Lower petal count for mobile/low-tier devices
const isLowTier = window.innerWidth < 768 || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
const MAX_PETALS = isLowTier ? 6 : 14;

// Create background petals once to prevent DOM thrashing
function initBackgroundPetals() {
    for (let i = 0; i < MAX_PETALS; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        
        const size = Math.random() * 10 + 6; 
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.left = `${Math.random() * 100}vw`;
        
        const colors = ['#fecdd3', '#fda4af', '#fb7185', '#ffd6db'];
        petal.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        petal.style.opacity = (Math.random() * 0.4 + 0.3).toString();

        const duration = Math.random() * 6 + 7; 
        const delay = -Math.random() * duration; 
        
        petal.style.animation = `fall ${duration}s linear ${delay}s infinite`;
        petalContainer.appendChild(petal);
    }
}

initBackgroundPetals();

// Burst for overlay interaction
function burstPetals() {
    const burstCount = isLowTier ? 5 : 12;
    for (let i = 0; i < burstCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        const size = Math.random() * 10 + 6;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.backgroundColor = '#fb7185';
        petal.style.opacity = '0.6';
        
        const duration = Math.random() * 3 + 4; 
        petal.style.animation = `fall ${duration}s linear forwards`;
        
        petalContainer.appendChild(petal);
        setTimeout(() => {
            if (petal.parentNode) petal.remove();
        }, duration * 1000 + 100);
    }
}

// Typewriter Animation
const apologyText = `Lately, I’ve spent a lot of time sitting with my thoughts, and I realized that I cannot let another moment go by without reaching out to you. Writing this isn't easy because it means facing the fact that I hurt someone I care about deeply, but you deserve to hear this from me.
I am so incredibly sorry for my behavior toward you and for breaking your trust. Looking back, I realize that is not the kind of person I want to be—especially not toward you, Tes-tes.
What weighs on me the most isn’t just the mistake itself, but seeing how it affected you. It hurts my heart to know that I can’t talk to you the way we used to. You have always been such a source of kindness, and the last thing you ever deserved was to feel undervalued or hurt by me.
I keep thinking about the way we laughed and how easy it is to talk to you; it reminds me of how much I truly value what we have. I hate that I let my own clumsiness get in the way of that. While I’ll play along with the "الأعداء" title if it makes you smile, the truth is I hate being on the wrong side of you.
Please know that I’m not just saying "sorry" to move past this. I am truly reflecting on why it happened and how I can make sure I never put that look in your eyes again. I value you more than I can properly put into words.
I don’t expect everything to be fixed with one letter. I know that trust and healing take time. I just wanted you to know that I see my mistake, I see your worth, and I am here whenever you are ready to talk—or even if you just need more space. I know words can't always fix things, but I hope you can feel how much I mean this.
I'd do anything to see you smile again, Tes-tes. You're too special for me to ever lose. Thank you for being the amazing person you are.

With all my heart,
"Enemies"`.trim();


const textSpan = document.getElementById('apology-text');
const cursor = document.getElementById('cursor');
const giftBtn = document.getElementById('gift-trigger');
const skipBtn = document.getElementById('skip-btn');
let charIndex = 0;

function getDelay(char) {
    if (char === '.' || char === '!' || char === '?') return Math.random() * 120 + 180;
    if (char === ',') return Math.random() * 60 + 80;
    if (char === '\n') return Math.random() * 100 + 150;
    return Math.random() * 30 + 30;
}

let typingTimeout = null;

function onTypingComplete() {
    cursor.style.display = 'none';
    if (skipBtn) skipBtn.style.display = 'none';
    giftBtn.classList.remove('btn-hidden');
    giftBtn.classList.add('btn-reveal');
}

function finishTyping() {
    if (typingTimeout) clearTimeout(typingTimeout);
    textSpan.textContent = apologyText;
    charIndex = apologyText.length;
    onTypingComplete();
}

function typeWriter() {
    if (charIndex < apologyText.length) {
        const char = apologyText.charAt(charIndex);
        textSpan.textContent += char;
        charIndex++;
        typingTimeout = setTimeout(typeWriter, getDelay(char));
    } else {
        onTypingComplete();
    }
}

// Overlay & Interaction Logic

const overlay = document.getElementById('overlay');
const overlayContent = document.getElementById('overlay-content');
const closeBtn = document.getElementById('close-overlay');

giftBtn.addEventListener('click', () => {
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
    setTimeout(() => { 
        overlay.classList.add('opacity-100'); 
        overlayContent.classList.add('scale-100'); 
    }, 10);
    burstPetals();
});

const closeOverlay = () => {
    overlay.classList.remove('opacity-100');
    overlayContent.classList.remove('scale-100');
    setTimeout(() => { 
        overlay.classList.remove('flex'); 
        overlay.classList.add('hidden'); 
    }, 300);
};

closeBtn.addEventListener('click', closeOverlay);
overlay.addEventListener('click', (e) => { 
    if (e.target === overlay) closeOverlay(); 
});

// Trigger typewriter on load
if (skipBtn) skipBtn.addEventListener('click', finishTyping);
window.addEventListener('load', () => setTimeout(typeWriter, 1000));

console.log(`%c

██╗                                                                                  
██║                                                                                  
██║                                                                                  
██║                                                                                  
██║                                                                                  
╚═╝                                                                                  
                                                                                     
 █████╗ ███╗   ███╗                                                                  
██╔══██╗████╗ ████║                                                                  
███████║██╔████╔██║                                                                  
██╔══██║██║╚██╔╝██║                                                                  
██║  ██║██║ ╚═╝ ██║                                                                  
╚═╝  ╚═╝╚═╝     ╚═╝                                                                  
                                                                                     
███████╗ ██████╗ ██████╗ ██████╗ ██╗   ██╗                                           
██╔════╝██╔═══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝                                           
███████╗██║   ██║██████╔╝██████╔╝ ╚████╔╝                                            
╚════██║██║   ██║██╔══██╗██╔══██╗  ╚██╔╝                                             
███████║╚██████╔╝██║  ██║██║  ██║   ██║                                              
╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝                                              
                                                                                     
███████╗ ██████╗ ██████╗                                                             
██╔════╝██╔═══██╗██╔══██╗                                                            
█████╗  ██║   ██║██████╔╝                                                            
██╔══╝  ██║   ██║██╔══██╗                                                            
██║     ╚██████╔╝██║  ██║                                                            
╚═╝      ╚═════╝ ╚═╝  ╚═╝                                                            
                                                                                     
███████╗██╗   ██╗███████╗██████╗ ██╗   ██╗████████╗██╗  ██╗██╗███╗   ██╗ ██████╗     
██╔════╝██║   ██║██╔════╝██╔══██╗╚██╗ ██╔╝╚══██╔══╝██║  ██║██║████╗  ██║██╔════╝     
█████╗  ██║   ██║█████╗  ██████╔╝ ╚████╔╝    ██║   ███████║██║██╔██╗ ██║██║  ███╗    
██╔══╝  ╚██╗ ██╔╝██╔══╝  ██╔══██╗  ╚██╔╝     ██║   ██╔══██║██║██║╚██╗██║██║   ██║    
███████╗ ╚████╔╝ ███████╗██║  ██║   ██║      ██║   ██║  ██║██║██║ ╚████║╚██████╔╝    
╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝   ╚═╝      ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝     
                                                                                     
██╗                                                                                  
██║                                                                                  
██║                                                                                  
██║                                                                                  
██║                                                                                  
╚═╝                                                                                  
                                                                                     
███╗   ███╗ █████╗ ██████╗ ███████╗                                                  
████╗ ████║██╔══██╗██╔══██╗██╔════╝                                                  
██╔████╔██║███████║██║  ██║█████╗                                                    
██║╚██╔╝██║██╔══██║██║  ██║██╔══╝                                                    
██║ ╚═╝ ██║██║  ██║██████╔╝███████╗                                                  
╚═╝     ╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝                                                  
                                                                                     
████████╗ ██████╗                                                                    
╚══██╔══╝██╔═══██╗                                                                   
   ██║   ██║   ██║                                                                   
   ██║   ██║   ██║                                                                   
   ██║   ╚██████╔╝                                                                   
   ╚═╝    ╚═════╝                                                                    
                                                                                     
██╗   ██╗ ██████╗ ██╗   ██╗                                                          
╚██╗ ██╔╝██╔═══██╗██║   ██║                                                          
 ╚████╔╝ ██║   ██║██║   ██║                                                          
  ╚██╔╝  ██║   ██║██║   ██║                                                          
   ██║   ╚██████╔╝╚██████╔╝                                                          
   ╚═╝    ╚═════╝  ╚═════╝                                                           
                                `, 
                               "color: #ce8484ff; font-weight: bold;");

console.log(`%c
██████╗ ███████╗███████╗████████╗                        
██╔══██╗██╔════╝██╔════╝╚══██╔══╝                        
██████╔╝█████╗  ███████╗   ██║                           
██╔══██╗██╔══╝  ╚════██║   ██║                           
██████╔╝███████╗███████║   ██║                           
╚═════╝ ╚══════╝╚══════╝   ╚═╝                           
                                                         
████████╗███████╗███████╗   ████████╗███████╗███████╗    
╚══██╔══╝██╔════╝██╔════╝   ╚══██╔══╝██╔════╝██╔════╝    
   ██║   █████╗  ███████╗█████╗██║   █████╗  ███████╗    
   ██║   ██╔══╝  ╚════██║╚════╝██║   ██╔══╝  ╚════██║    
   ██║   ███████╗███████║      ██║   ███████╗███████║    
   ╚═╝   ╚══════╝╚══════╝      ╚═╝   ╚══════╝╚══════╝    
                                                         
██╗                                                      
██║                                                      
██║                                                      
██║                                                      
██║                                                      
╚═╝                                                      
                                                         
██╗  ██╗███╗   ██╗ ██████╗ ██╗    ██╗                    
██║ ██╔╝████╗  ██║██╔═══██╗██║    ██║                    
█████╔╝ ██╔██╗ ██║██║   ██║██║ █╗ ██║                    
██╔═██╗ ██║╚██╗██║██║   ██║██║███╗██║                    
██║  ██╗██║ ╚████║╚██████╔╝╚███╔███╔╝                    
╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝  ╚══╝╚══╝                     
                                                         
 █████╗ ███╗   ██╗██████╗                                
██╔══██╗████╗  ██║██╔══██╗                               
███████║██╔██╗ ██║██║  ██║                               
██╔══██║██║╚██╗██║██║  ██║                               
██║  ██║██║ ╚████║██████╔╝                               
╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝                                
                                                         
██╗                                                      
██║                                                      
██║                                                      
██║                                                      
██║                                                      
╚═╝                                                      
                                                         
██╗    ██╗██╗██╗     ██╗                                 
██║    ██║██║██║     ██║                                 
██║ █╗ ██║██║██║     ██║                                 
██║███╗██║██║██║     ██║                                 
╚███╔███╔╝██║███████╗███████╗                            
 ╚══╝╚══╝ ╚═╝╚══════╝╚══════╝                            
                                                         
███████╗██╗   ██╗███████╗██████╗                         
██╔════╝██║   ██║██╔════╝██╔══██╗                        
█████╗  ██║   ██║█████╗  ██████╔╝                        
██╔══╝  ╚██╗ ██╔╝██╔══╝  ██╔══██╗                        
███████╗ ╚████╔╝ ███████╗██║  ██║                        
╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝                        
                                                         
██╗  ██╗███╗   ██╗ ██████╗ ██╗    ██╗                    
██║ ██╔╝████╗  ██║██╔═══██╗██║    ██║                    
█████╔╝ ██╔██╗ ██║██║   ██║██║ █╗ ██║                    
██╔═██╗ ██║╚██╗██║██║   ██║██║███╗██║                    
██║  ██╗██║ ╚████║╚██████╔╝╚███╔███╔╝                    
╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝  ╚══╝╚══╝                     
 `, 
                               "color: #ce8484ff; font-weight: bold;");     
