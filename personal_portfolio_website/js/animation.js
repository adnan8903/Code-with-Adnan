// const typedTextSpan = document.querySelector(".typed-text");
// const cursorSpan = document.querySelector(".cursor");

// const textArray = ["Mahar Hamza", "Feelancer", "Web Designer", "SEO Master", "Content Writer"];
// const typingDelay = 200;
// const erasingDelay = 100;
// const newTextDelay = 1500; // Delay between current and next text
// let textArrayIndex = 0;
// let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
  	setTimeout(erase, newTextDelay);
  }
}

function erase() {
	if (charIndex > 0) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex>=textArray.length) textArrayIndex=0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
  if(textArray.length) setTimeout(type, newTextDelay + 250);
});





{
  // Some help functions.
  const shuffleArray = arr => arr.sort(() => Math.random() - 0.5);
  const lineEq = (y2, y1, x2, x1, currentVal) => {
      let m = (y2 - y1) / (x2 - x1); 
      let b = y1 - m * x1;
      return m * currentVal + b;
  };
  const lerp = (a, b, n) => (1 - n) * a + n * b;
  const body = document.body;
  const bodyColor = getComputedStyle(body).getPropertyValue('--color-bg').trim() || 'white';
  const getMousePos = (e) => {
      let posx = 0;
      let posy = 0;
      if (!e) e = window.event;
      if (e.pageX || e.pageY) {
          posx = e.pageX;
          posy = e.pageY;
      }
      else if (e.clientX || e.clientY) 	{
          posx = e.clientX + body.scrollLeft + document.documentElement.scrollLeft;
          posy = e.clientY + body.scrollTop + document.documentElement.scrollTop;
      }
      return { x : posx, y : posy }
  }

  // Window sizes.
  let winsize;
  const calcWinsize = () => winsize = {width: window.innerWidth, height: window.innerHeight};
  calcWinsize();
  // Recalculate window sizes on resize.
  window.addEventListener('resize', calcWinsize);

  // Custom mouse cursor.
  class CursorFx {
      constructor(el) {
          this.DOM = {el: el};
          this.DOM.dot = this.DOM.el.querySelector('.cursor__inner--dot');
          this.DOM.circle = this.DOM.el.querySelector('.cursor__inner--circle');
          this.bounds = {dot: this.DOM.dot.getBoundingClientRect(), circle: this.DOM.circle.getBoundingClientRect()};
          this.scale = 1;
          this.opacity = 1;
          this.mousePos = {x:0, y:0};
          this.lastMousePos = {dot: {x:0, y:0}, circle: {x:0, y:0}};
          this.lastScale = 1;
          this.lastOpacity = 1;
          
          this.initEvents();
          requestAnimationFrame(() => this.render());
      }
      initEvents() {
          window.addEventListener('mousemove', ev => this.mousePos = getMousePos(ev));
      }
      render() {
          this.lastMousePos.dot.x = lerp(this.lastMousePos.dot.x, this.mousePos.x - this.bounds.dot.width/2, 1);
          this.lastMousePos.dot.y = lerp(this.lastMousePos.dot.y, this.mousePos.y - this.bounds.dot.height/2, 1);
          this.lastMousePos.circle.x = lerp(this.lastMousePos.circle.x, this.mousePos.x - this.bounds.circle.width/2, 0.15);
          this.lastMousePos.circle.y = lerp(this.lastMousePos.circle.y, this.mousePos.y - this.bounds.circle.height/2, 0.15);
          this.lastScale = lerp(this.lastScale, this.scale, 0.15);
          this.lastOpacity = lerp(this.lastOpacity, this.opacity, 0.1);
          this.DOM.dot.style.transform = `translateX(${(this.lastMousePos.dot.x)}px) translateY(${this.lastMousePos.dot.y}px)`;
          this.DOM.circle.style.transform = `translateX(${(this.lastMousePos.circle.x)}px) translateY(${this.lastMousePos.circle.y}px) scale(${this.lastScale})`;
          this.DOM.circle.style.opacity = this.lastOpacity
          requestAnimationFrame(() => this.render());
      }
      enter() {
          cursor.scale = 2.7;
      }
      leave() {
          cursor.scale = 1;
      }
      click() {
          this.lastScale = 1;
          this.lastOpacity = 0;
      }
  }
  
  const cursor = new CursorFx(document.querySelector('.cursor'));

  // Custom cursor chnages state when hovering on elements with 'data-hover'.
  [...document.querySelectorAll('[data-hover]')].forEach((link) => {
      link.addEventListener('mouseenter', () => cursor.enter() );
      link.addEventListener('mouseleave', () => cursor.leave() );
      link.addEventListener('click', () => cursor.click() );
  });
}