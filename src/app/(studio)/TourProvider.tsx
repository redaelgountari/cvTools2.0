'use client';

import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import type { Step, CallBackProps } from 'react-joyride';
import { useSession } from 'next-auth/react';
import axios from 'axios';

// Define STATUS constants locally to avoid importing from react-joyride which triggers build errors
const JOYRIDE_STATUS = {
  FINISHED: 'finished',
  SKIPPED: 'skipped',
};

// Dynamically import Joyride with SSR disabled to avoid React legacy export issues during build
// Use any as a temporary fix for props distribution in dynamic components
const Joyride = dynamic<any>(() => Promise.resolve(require('react-joyride')), { ssr: false });

type TourContextType = {
  setSteps: (steps: Step[]) => void;
  autoStart: () => void;
};

const TourContext = createContext<TourContextType | null>(null);

export function TourProvider({ children }: { children: React.ReactNode }) {
  const [steps, setSteps] = useState<Step[]>([]);
  const [run, setRun] = useState(false);
  const { data: session, status, update } = useSession();
  const [hasStartedThisMount, setHasStartedThisMount] = useState(false);
  const hasRefreshedSession = useRef(false);

  // Force session sync on mount to ensure hasSeenTutorial is up to date
  useEffect(() => {
    if (
      status === 'authenticated' &&
      session?.user &&
      !hasRefreshedSession.current
    ) {
      const hasSeenTutorial = (session.user as any).hasSeenTutorial;
      // If hasSeenTutorial is undefined, the JWT token doesn't have it yet — force a refresh
      if (hasSeenTutorial === undefined) {
        hasRefreshedSession.current = true;
        update();
      }
    }
  }, [session, status, update]);

  const markAsSeen = useCallback(async () => {
    try {
      await axios.post('/api/user/tutorial-seen');
      await update({ hasSeenTutorial: true });
    } catch (err) {
      console.error('Failed to update tutorial status:', err);
    }
  }, [update]);

  // Reactive auto-start: watch session + steps, and start the tour when ready
  useEffect(() => {
    if (hasStartedThisMount || run) return;
    if (status !== 'authenticated' || !session?.user) return;
    if (steps.length === 0) return;

    const hasSeenTutorial = (session.user as any).hasSeenTutorial;

    console.log('[TourProvider] Reactive AutoStart Check:', { hasSeenTutorial, stepsCount: steps.length, run, hasStartedThisMount });

    if (hasSeenTutorial === false) {
      setRun(true);
      setHasStartedThisMount(true);
    }
  }, [session, status, steps, run, hasStartedThisMount]);

  // Keep autoStart for backward compatibility (manual trigger from components)
  const autoStart = useCallback(() => {
    if (run || hasStartedThisMount) return;
    if (!session) return;

    const hasSeenTutorial = (session?.user as any)?.hasSeenTutorial;

    console.log('[TourProvider] Manual AutoStart Check:', { hasSeenTutorial, run, hasStartedThisMount });

    if (hasSeenTutorial === false) {
      setRun(true);
      setHasStartedThisMount(true);
    }
  }, [session, run, hasStartedThisMount]);

  const handleJoyrideCallback = useCallback((data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [JOYRIDE_STATUS.FINISHED, JOYRIDE_STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRun(false);
      markAsSeen();
    }
  }, [markAsSeen]);

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
        callback={handleJoyrideCallback}
        locale={{
          last: "Finish",
          skip: "Skip Tour"
        }}
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