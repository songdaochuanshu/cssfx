import type { Effect } from '../types'

export const effects: Effect[] = [
  // ===== BUTTON EFFECTS =====
  {
    id: 'button-bubble',
    name: 'Bubble',
    category: 'button',
    html: '<button>Bubble</button>',
    css: `.button-bubble {
  z-index: 1;
  position: relative;
  font-size: inherit;
  font-family: inherit;
  color: white;
  padding: 0.5em 1em;
  outline: none;
  border: none;
  background-color: hsl(236, 32%, 26%);
  overflow: hidden;
  transition: color 0.4s ease-in-out;
}

.button-bubble::before {
  content: '';
  z-index: -1;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background-color: #3cefff;
  transform-origin: center;
  transform: translate3d(-50%, -50%, 0) scale3d(0, 0, 0);
  transition: transform 0.45s ease-in-out;
}

.button-bubble:hover {
  cursor: pointer;
  color: #161616;
}

.button-bubble:hover::before {
  transform: translate3d(-50%, -50%, 0) scale3d(15, 15, 15);
}`,
  },
  {
    id: 'button-jelly',
    name: 'Jelly',
    category: 'button',
    html: '<button>Jelly</button>',
    css: `.button-jelly {
  z-index: 1;
  font-size: inherit;
  font-family: inherit;
  color: white;
  padding: 0.5em 1em;
  outline: none;
  border: none;
  background-color: hsl(236, 32%, 26%);
}

.button-jelly:hover {
  cursor: pointer;
  animation: jelly 0.5s;
}

@keyframes jelly {
  0%, 100% { transform: scale(1, 1); }
  25% { transform: scale(0.9, 1.1); }
  50% { transform: scale(1.1, 0.9); }
  75% { transform: scale(0.95, 1.05); }
}`,
  },
  {
    id: 'button-pulse',
    name: 'Pulse',
    category: 'button',
    html: '<button>Pulse</button>',
    css: `.button-pulse {
  z-index: 1;
  position: relative;
  font-size: inherit;
  font-family: inherit;
  color: white;
  padding: 0.5em 1em;
  outline: none;
  border: none;
  background-color: hsl(236, 32%, 26%);
}

.button-pulse:hover {
  cursor: pointer;
}

.button-pulse::before {
  content: '';
  z-index: -1;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border: 4px solid hsl(236, 32%, 26%);
  transform-origin: center;
  transform: scale(1);
}

.button-pulse:hover::before {
  transition: all 0.75s ease-in-out;
  transform-origin: center;
  transform: scale(1.75);
  opacity: 0;
}`,
  },
  {
    id: 'button-shine',
    name: 'Shine',
    category: 'button',
    html: '<button>Shine</button>',
    css: `.button-shine {
  position: relative;
  overflow: hidden;
  font-size: inherit;
  font-family: inherit;
  color: white;
  padding: 0.5em 1em;
  outline: none;
  border: none;
  background-color: hsl(236, 32%, 26%);
}

.button-shine::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: rotate(30deg) translateX(-100%);
  transition: transform 0.6s;
}

.button-shine:hover::after {
  transform: rotate(30deg) translateX(100%);
}`,
  },
  {
    id: 'button-slide',
    name: 'Slide',
    category: 'button',
    html: '<button>Slide</button>',
    css: `.button-slide {
  position: relative;
  overflow: hidden;
  font-size: inherit;
  font-family: inherit;
  color: white;
  padding: 0.5em 1em;
  outline: none;
  border: none;
  background-color: hsl(236, 32%, 26%);
  transition: color 0.4s ease-in-out;
}

.button-slide::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0;
  background-color: #3cefff;
  transition: height 0.4s ease-in-out;
  z-index: -1;
}

.button-slide:hover {
  color: #161616;
}

.button-slide:hover::before {
  height: 100%;
}`,
  },
  {
    id: 'button-fill',
    name: 'Fill',
    category: 'button',
    html: '<button>Fill</button>',
    css: `.button-fill {
  position: relative;
  z-index: 1;
  font-size: inherit;
  font-family: inherit;
  color: white;
  padding: 0.5em 1em;
  outline: none;
  border: 2px solid white;
  background-color: transparent;
  transition: color 0.4s ease-in-out;
}

.button-fill::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background-color: white;
  transition: width 0.4s ease-in-out;
  z-index: -1;
}

.button-fill:hover {
  color: hsl(236, 32%, 26%);
}

.button-fill:hover::before {
  width: 100%;
}`,
  },
  {
    id: 'button-border-dance',
    name: 'Border Dance',
    category: 'button',
    html: '<button>Border Dance</button>',
    css: `.button-border-dance {
  font-size: inherit;
  font-family: inherit;
  color: white;
  padding: 0.5em 1em;
  outline: none;
  border: 2px solid white;
  background-color: transparent;
  position: relative;
  transition: color 0.4s;
}

.button-border-dance::before,
.button-border-dance::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border: 2px solid transparent;
  transition: all 0.4s;
}

.button-border-dance::before {
  top: 0;
  left: 0;
}

.button-border-dance::after {
  bottom: 0;
  right: 0;
}

.button-border-dance:hover::before {
  width: 100%;
  height: 100%;
  border-top-color: white;
  border-left-color: white;
}

.button-border-dance:hover::after {
  width: 100%;
  height: 100%;
  border-bottom-color: white;
  border-right-color: white;
}`,
  },
  {
    id: 'button-ripple',
    name: 'Ripple',
    category: 'button',
    html: '<button>Ripple</button>',
    css: `.button-ripple {
  position: relative;
  overflow: hidden;
  font-size: inherit;
  font-family: inherit;
  color: white;
  padding: 0.5em 1em;
  outline: none;
  border: none;
  background-color: hsl(236, 32%, 26%);
}

.button-ripple::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, #3cefff 10%, transparent 10%);
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10);
  opacity: 0;
  transition: transform 0.5s, opacity 0.5s;
}

.button-ripple:active::after {
  transform: scale(0);
  opacity: 0.3;
  transition: 0s;
}`,
  },

  // ===== INPUT EFFECTS =====
  {
    id: 'input-outline',
    name: 'Outline',
    category: 'input',
    html: '<input type="text" placeholder="Outline" />',
    css: `.input-outline {
  position: relative;
  color: white;
  font-size: inherit;
  font-family: inherit;
  background-color: hsl(236, 32%, 26%);
  padding: 0.35em 0.45em;
  border: 1px solid transparent;
  transition: background-color 0.3s ease-in-out;
}

.input-outline:focus {
  outline: none;
}

.input-outline::placeholder {
  color: hsla(0, 0%, 100%, 0.6);
}

.input-outline-wrap {
  position: relative;
  display: inline-block;
}

.input-outline-wrap span {
  position: absolute;
  background-color: #3cefff;
  transition: transform 0.5s ease;
}

.input-outline-wrap .bottom,
.input-outline-wrap .top {
  height: 1px;
  left: 0;
  right: 0;
  transform: scaleX(0);
}

.input-outline-wrap .left,
.input-outline-wrap .right {
  width: 1px;
  top: 0;
  bottom: 0;
  transform: scaleY(0);
}

.input-outline-wrap .bottom { bottom: 0; transform-origin: bottom right; }
.input-outline-wrap .right { right: 0; transform-origin: top right; }
.input-outline-wrap .top { top: 0; transform-origin: top left; }
.input-outline-wrap .left { left: 0; transform-origin: bottom left; }

.input-outline:focus ~ .bottom { transform-origin: bottom left; transform: scaleX(1); }
.input-outline:focus ~ .right { transform-origin: bottom right; transform: scaleY(1); }
.input-outline:focus ~ .top { transform-origin: top right; transform: scaleX(1); }
.input-outline:focus ~ .left { transform-origin: top left; transform: scaleY(1); }`,
  },
  {
    id: 'input-trace',
    name: 'Trace',
    category: 'input',
    html: '<input type="text" placeholder="Trace" />',
    css: `.input-trace {
  color: white;
  font-size: inherit;
  font-family: inherit;
  background-color: hsl(236, 32%, 26%);
  padding: 0.35em 0.45em;
  border: 2px solid transparent;
  outline: none;
  border-radius: 0;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.input-trace::placeholder {
  color: hsla(0, 0%, 100%, 0.6);
}

.input-trace:focus {
  border-color: #3cefff;
  box-shadow: 0 0 10px rgba(60, 239, 255, 0.3);
}`,
  },
  {
    id: 'input-glow',
    name: 'Glow',
    category: 'input',
    html: '<input type="text" placeholder="Glow" />',
    css: `.input-glow {
  color: white;
  font-size: inherit;
  font-family: inherit;
  background-color: hsl(236, 32%, 26%);
  padding: 0.35em 0.45em;
  border: 1px solid hsla(0, 0%, 100%, 0.2);
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.input-glow::placeholder {
  color: hsla(0, 0%, 100%, 0.6);
}

.input-glow:focus {
  border-color: #3cefff;
  box-shadow: 0 0 20px rgba(60, 239, 255, 0.4), inset 0 0 20px rgba(60, 239, 255, 0.1);
}`,
  },

  // ===== LOADER EFFECTS =====
  {
    id: 'loader-ring',
    name: 'Ring',
    category: 'loader',
    html: '<svg viewBox="25 25 50 50"><circle cx="50" cy="50" r="20"></circle></svg>',
    css: `.loader-ring svg {
  width: 3.75em;
  transform-origin: center;
  animation: ring-rotate 2s linear infinite;
}

.loader-ring circle {
  fill: none;
  stroke: #fc2f70;
  stroke-width: 2;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: ring-dash 1.5s ease-in-out infinite;
}

@keyframes ring-rotate {
  100% { transform: rotate(360deg); }
}

@keyframes ring-dash {
  0% { stroke-dasharray: 1, 200; stroke-dashoffset: 0; }
  50% { stroke-dasharray: 90, 200; stroke-dashoffset: -35px; }
  100% { stroke-dashoffset: -125px; }
}`,
  },
  {
    id: 'loader-pulse',
    name: 'Pulse',
    category: 'loader',
    html: '<div class="loader-pulse"><div></div><div></div><div></div></div>',
    css: `.loader-pulse {
  display: flex;
  gap: 4px;
  align-items: center;
  height: 2em;
}

.loader-pulse div {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #fc2f70;
  animation: loader-pulse 1s ease-in-out infinite;
}

.loader-pulse div:nth-child(2) { animation-delay: 0.2s; }
.loader-pulse div:nth-child(3) { animation-delay: 0.4s; }

@keyframes loader-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.5; }
}`,
  },
  {
    id: 'loader-wave',
    name: 'Wave',
    category: 'loader',
    html: '<div class="loader-wave"><span></span><span></span><span></span><span></span><span></span></div>',
    css: `.loader-wave {
  display: flex;
  gap: 3px;
  align-items: center;
  height: 2em;
}

.loader-wave span {
  width: 4px;
  height: 1.2em;
  background-color: #3cefff;
  animation: loader-wave 1.2s ease-in-out infinite;
}

.loader-wave span:nth-child(2) { animation-delay: 0.1s; }
.loader-wave span:nth-child(3) { animation-delay: 0.2s; }
.loader-wave span:nth-child(4) { animation-delay: 0.3s; }
.loader-wave span:nth-child(5) { animation-delay: 0.4s; }

@keyframes loader-wave {
  0%, 40%, 100% { transform: scaleY(0.4); }
  20% { transform: scaleY(1); }
}`,
  },
  {
    id: 'loader-dots',
    name: 'Dots',
    category: 'loader',
    html: '<div class="loader-dots"><div></div><div></div><div></div></div>',
    css: `.loader-dots {
  display: flex;
  gap: 8px;
}

.loader-dots div {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: hsl(236, 32%, 26%);
  animation: loader-dots 1.4s ease-in-out infinite both;
}

.loader-dots div:nth-child(1) { animation-delay: -0.32s; }
.loader-dots div:nth-child(2) { animation-delay: -0.16s; }

@keyframes loader-dots {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}`,
  },
  {
    id: 'loader-bars',
    name: 'Bars',
    category: 'loader',
    html: '<div class="loader-bars"><span></span><span></span><span></span><span></span><span></span></div>',
    css: `.loader-bars {
  display: flex;
  gap: 3px;
  align-items: center;
  height: 2em;
}

.loader-bars span {
  width: 5px;
  height: 100%;
  background-color: #fc2f70;
  animation: loader-bars 1s ease-in-out infinite;
}

.loader-bars span:nth-child(2) { animation-delay: 0.1s; }
.loader-bars span:nth-child(3) { animation-delay: 0.2s; }
.loader-bars span:nth-child(4) { animation-delay: 0.3s; }
.loader-bars span:nth-child(5) { animation-delay: 0.4s; }

@keyframes loader-bars {
  0%, 40%, 100% { transform: scaleY(0.4); }
  20% { transform: scaleY(1); }
}`,
  },

  // ===== TEXT EFFECTS =====
  {
    id: 'text-underline',
    name: 'Underline',
    category: 'text',
    html: '<span class="text-underline">Underline</span>',
    css: `.text-underline {
  position: relative;
  display: inline-block;
  color: white;
  font-size: 1.5em;
  font-weight: bold;
  text-decoration: none;
}

.text-underline::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #3cefff;
  transition: width 0.3s ease-in-out;
}

.text-underline:hover::after {
  width: 100%;
}`,
  },
  {
    id: 'text-overline',
    name: 'Overline',
    category: 'text',
    html: '<span class="text-overline">Overline</span>',
    css: `.text-overline {
  position: relative;
  display: inline-block;
  color: white;
  font-size: 1.5em;
  font-weight: bold;
  text-decoration: none;
}

.text-overline::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #3cefff;
  transition: width 0.3s ease-in-out;
}

.text-overline:hover::after {
  width: 100%;
}`,
  },
  {
    id: 'text-strikethrough',
    name: 'Strikethrough',
    category: 'text',
    html: '<span class="text-strikethrough">Strikethrough</span>',
    css: `.text-strikethrough {
  position: relative;
  display: inline-block;
  color: white;
  font-size: 1.5em;
  font-weight: bold;
  text-decoration: none;
}

.text-strikethrough::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #fc2f70;
  transition: width 0.3s ease-in-out;
}

.text-strikethrough:hover::after {
  width: 100%;
}`,
  },
  {
    id: 'text-highlight',
    name: 'Highlight',
    category: 'text',
    html: '<span class="text-highlight">Highlight</span>',
    css: `.text-highlight {
  position: relative;
  display: inline-block;
  color: white;
  font-size: 1.5em;
  font-weight: bold;
}

.text-highlight::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0;
  background-color: #3cefff;
  z-index: -1;
  transition: height 0.3s ease-in-out;
}

.text-highlight:hover::after {
  height: 100%;
}`,
  },
  {
    id: 'text-bars',
    name: 'Bars',
    category: 'text',
    html: '<span class="text-bars">Bars</span>',
    css: `.text-bars {
  position: relative;
  display: inline-block;
  color: white;
  font-size: 1.5em;
  font-weight: bold;
}

.text-bars::before,
.text-bars::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  background-color: #3cefff;
  transition: width 0.3s ease-in-out;
}

.text-bars::before {
  top: -4px;
  left: 0;
}

.text-bars::after {
  bottom: -4px;
  right: 0;
}

.text-bars:hover::before,
.text-bars:hover::after {
  width: 100%;
}`,
  },
  {
    id: 'text-pillars',
    name: 'Pillars',
    category: 'text',
    html: '<span class="text-pillars">Pillars</span>',
    css: `.text-pillars {
  position: relative;
  display: inline-block;
  color: white;
  font-size: 1.5em;
  font-weight: bold;
}

.text-pillars::before,
.text-pillars::after {
  content: '';
  position: absolute;
  top: 0;
  width: 2px;
  height: 0;
  background-color: #fc2f70;
  transition: height 0.3s ease-in-out;
}

.text-pillars::before {
  left: -8px;
}

.text-pillars::after {
  right: -8px;
}

.text-pillars:hover::before,
.text-pillars:hover::after {
  height: 100%;
}`,
  },
  {
    id: 'text-breathe',
    name: 'Breathe',
    category: 'text',
    html: '<span class="text-breathe">Breathe</span>',
    css: `.text-breathe {
  display: inline-block;
  color: white;
  font-size: 1.5em;
  font-weight: bold;
  animation: text-breathe 3s ease-in-out infinite;
}

@keyframes text-breathe {
  0%, 100% { color: white; text-shadow: none; }
  50% { color: #3cefff; text-shadow: 0 0 20px rgba(60, 239, 255, 0.5); }
}`,
  },
]
