import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const Timer = ({ duration, isPlaying, onComplete, label = 'Time remaining' }) => {
  return (
    <div className="flex flex-col items-center">
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={duration}
        colors={[
          ['#10B981', 0.5], // Green
          ['#F59E0B', 0.25], // Yellow
          ['#EF4444', 0.25], // Red
        ]}
        size={80}
        strokeWidth={6}
        aria-label={`${label}: ${duration}s`}
      >
        {({ remainingTime }) => (
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{remainingTime}</div>
            <div className="text-xs text-gray-500">{label}</div>
          </div>
        )}
      </CountdownCircleTimer>
      {onComplete && (
        <button onClick={onComplete} className="mt-2 text-sm text-primary underline">
          Pause
        </button>
      )}
    </div>
  );
};

export default Timer;