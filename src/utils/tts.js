/**
 * @file tts.js
 * @description Text-to-Speech utility using the browser's SpeechSynthesis API.
 */

/**
 * Speaks the given text using the browser's speech synthesis engine.
 * @param {string} text - The text to be spoken.
 */
export const speak = (text) => {
  if (!window.speechSynthesis) {
    console.error("Speech Synthesis not supported in this browser.");
    return;
  }

  // Cancel any ongoing speech before starting a new one
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Optional: Configure voice, rate, pitch, etc.
  // utterance.voice = speechSynthesis.getVoices().find(voice => voice.name === 'Google US English');
  // utterance.rate = 1;
  // utterance.pitch = 1;

  window.speechSynthesis.speak(utterance);
};

/**
 * Cancels any ongoing speech.
 */
export const cancel = () => {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
};
