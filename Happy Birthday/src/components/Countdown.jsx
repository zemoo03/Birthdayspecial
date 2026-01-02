import { useEffect, useState } from "react";
import "./Countdown.css";

function Countdown({ onNewYearReached, newYearReached }) {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [prevTime, setPrevTime] = useState({
    hours: null,
    minutes: null,
    seconds: null,
  });

  useEffect(() => {
    // If New Year already reached, don't start the countdown
    if (newYearReached) {
      return;
    }

    // ═══════════════════════════════════════════════════════════════
    // 🎆 SET YOUR NEW YEAR DATE & TIME HERE 🎆
    // ═══════════════════════════════════════════════════════════════

    const targetDate = new Date('2026-01-02T00:00:00');

    // 📝 HOW TO USE:
    // Replace the date above with your actual New Year target
    // Format: 'YYYY-MM-DD HH:MM:SS'
    //
    // Example:
    // - January 1, 2026 at midnight: '2026-01-01T00:00:00'
    //
    // ⏰ Time format is 24-hour (00:00 = midnight)
    // ═══════════════════════════════════════════════════════════════

    const updateCountdown = () => {
      const now = new Date();
      const diff = Math.max(0, targetDate - now);

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTime({ hours, minutes, seconds });

      if (diff <= 0 && !newYearReached) {
        onNewYearReached();
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [onNewYearReached, newYearReached]);

  useEffect(() => {
    setPrevTime(time);
  }, [time]);

  const Digit = ({ value, label, prevValue }) => {
    const shouldFlip = prevValue !== null && prevValue !== value;

    return (
      <div className="digit">
        <div className={`card ${shouldFlip ? "flip" : ""}`}>
          <div className="text">{String(value).padStart(2, "0")}</div>
        </div>
        <div className="label">{label}</div>
      </div>
    );
  };

  if (newYearReached) {
    return (
      <section className="countdown">
        <div className="flip-timer">
          <span className="newyear-celebration">
            🎆 Happy Birthday! 🎆
          </span>
        </div>
      </section>
    );
  }

  // Always render countdown timer if not reached
  return (
    <section className="countdown">
      <div className="flip-timer">
        <Digit value={time.hours} label="Hours" prevValue={prevTime.hours} />
        <Digit value={time.minutes} label="Minutes" prevValue={prevTime.minutes} />
        <Digit value={time.seconds} label="Seconds" prevValue={prevTime.seconds} />
      </div>
    </section>
  );
}

export default Countdown;
