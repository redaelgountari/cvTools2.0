'use client';

import Joyride, { Step, CallBackProps, STATUS } from 'react-joyride';
import { createContext, useContext, useState } from 'react';

type TourContextType = {
  setSteps: (steps: Step[]) => void;
  autoStart: () => void;
};

const TourContext = createContext<TourContextType | null>(null);

export function TourProvider({ children }) {
  const [steps, setSteps] = useState<Step[]>([]);
  const [run, setRun] = useState(false);

  const autoStart = () => {
    setRun(true);
  };

  return (
    <TourContext.Provider value={{ setSteps, autoStart }}>
      <Joyride
        steps={steps}
        run={run}
        continuous
        showSkipButton
        disableBeacon
        scrollToFirstStep
        spotlightClicks={false}
        disableOverlayClose={false}
        hideCloseButton={false}
        styles={{
          options: {
            zIndex: 10000,
            arrowColor: '#fff',
            backgroundColor: '#fff',
            primaryColor: '#000',
            textColor: '#333',
          },
          tooltip: {
            fontSize: 16,
            padding: 20,
          },
          tooltipContainer: {
            textAlign: 'left',
          },
          tooltipContent: {
            padding: '10px 0',
          },
          buttonNext: {
            backgroundColor: '#000',
            fontSize: 14,
            padding: '8px 16px',
            borderRadius: 4,
          },
          buttonBack: {
            color: '#666',
            marginRight: 10,
          },
          buttonSkip: {
            color: '#999',
          },
        }}
        floaterProps={{
          disableAnimation: false,
          styles: {
            floater: {
              filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
            },
          },
        }}
      />
      {children}
    </TourContext.Provider>
  );
}

export const useTour = () => {
  const ctx = useContext(TourContext);
  if (!ctx) throw new Error('useTour must be used inside TourProvider');
  return ctx;
};