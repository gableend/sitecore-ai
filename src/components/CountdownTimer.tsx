import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  className?: string;
}

export default function CountdownTimer({ className = '' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set the launch date to November 3rd, 2025 at 12:00 PM EDT
  useEffect(() => {
    // Create date for November 3rd, 2025 12:00 PM EDT
    const launchDate = new Date('November 3, 2025 12:00:00 EDT');

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        // If we've reached the launch date
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      }
    };

    // Initial calculation
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Leading zero formatter
  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className={`flex flex-wrap justify-center gap-6 ${className}`}>
      <div className="flex flex-col items-center">
        <div className="bg-white rounded-md shadow-lg p-6 w-24 h-24 md:w-32 md:h-32 flex items-center justify-center transform transition-transform hover:scale-105 border border-gray-100">
          <span className="text-5xl md:text-6xl font-semibold" style={{ color: 'var(--sitecore-red)' }}>
            {formatNumber(timeLeft.days)}
          </span>
        </div>
        <div className="mt-2 text-sm uppercase tracking-wide font-medium text-gray-600">Days</div>
      </div>

      <div className="flex flex-col items-center">
        <div className="bg-white rounded-md shadow-lg p-6 w-24 h-24 md:w-32 md:h-32 flex items-center justify-center transform transition-transform hover:scale-105 border border-gray-100">
          <span className="text-5xl md:text-6xl font-semibold" style={{ color: 'var(--sitecore-red)' }}>
            {formatNumber(timeLeft.hours)}
          </span>
        </div>
        <div className="mt-2 text-sm uppercase tracking-wide font-medium text-gray-600">Hours</div>
      </div>

      <div className="flex flex-col items-center">
        <div className="bg-white rounded-md shadow-lg p-6 w-24 h-24 md:w-32 md:h-32 flex items-center justify-center transform transition-transform hover:scale-105 border border-gray-100">
          <span className="text-5xl md:text-6xl font-semibold" style={{ color: 'var(--sitecore-red)' }}>
            {formatNumber(timeLeft.minutes)}
          </span>
        </div>
        <div className="mt-2 text-sm uppercase tracking-wide font-medium text-gray-600">Minutes</div>
      </div>

      <div className="flex flex-col items-center">
        <div className="bg-white rounded-md shadow-lg p-6 w-24 h-24 md:w-32 md:h-32 flex items-center justify-center transform transition-transform hover:scale-105 border border-gray-100">
          <span className="text-5xl md:text-6xl font-semibold" style={{ color: 'var(--sitecore-red)' }}>
            {formatNumber(timeLeft.seconds)}
          </span>
        </div>
        <div className="mt-2 text-sm uppercase tracking-wide font-medium text-gray-600">Seconds</div>
      </div>
    </div>
  );
}
