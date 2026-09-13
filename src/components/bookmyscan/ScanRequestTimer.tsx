import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const TIMER_DURATION_MS = 15 * 60 * 1000;
const TIMER_KEY = "savoscan-scan-request-timer-deadline";

export function ScanRequestTimer() {
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);

  useEffect(() => {
    const storedDeadline = Number(window.sessionStorage.getItem(TIMER_KEY));
    const deadline = Number.isFinite(storedDeadline) && storedDeadline > Date.now()
      ? storedDeadline
      : Date.now() + TIMER_DURATION_MS;

    window.sessionStorage.setItem(TIMER_KEY, String(deadline));

    const updateTimer = () => {
      setSecondsLeft(Math.max(0, Math.ceil((deadline - Date.now()) / 1000)));
    };

    updateTimer();
    const interval = window.setInterval(updateTimer, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const expired = secondsLeft === 0;

  return (
    <section className="scan-request-timer" aria-labelledby="scan-request-timer-title">
      <div className="page-wrap scan-request-timer-inner">
        <div className="timer-content">
          <p className="timer-kicker"><Clock3 /> Scan-price request reminder</p>
          <h2 id="scan-request-timer-title">
            {expired ? "Aap Abhi Bhi Scan Assistance Maang Sakte Hain" : "Apni Scan-Price Request Poori Karein"}
          </h2>
          <p>
            Share your prescribed scan and preferred location. This timer is a reminder only—it does not reserve a price, offer, slot or appointment.
          </p>
        </div>
        <div className="timer-action">
          <div className="timer-digits" role="timer" aria-live="off" aria-label={`${minutes} minutes and ${seconds} seconds remaining`}>
            <div><strong>{String(minutes).padStart(2, "0")}</strong><span>Minutes</span></div>
            <i aria-hidden="true">:</i>
            <div><strong>{String(seconds).padStart(2, "0")}</strong><span>Seconds</span></div>
          </div>
          <Button asChild variant="hero" size="lg">
            <Link to="/book-a-scan">Check Scan Price <ArrowRight /></Link>
          </Button>
          <small>Final price is confirmed after centre and protocol review.</small>
        </div>
      </div>
    </section>
  );
}