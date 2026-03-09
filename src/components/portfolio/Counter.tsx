import React, { useEffect, useState, useRef } from "react";
import { useInView } from "motion/react";

export function Counter({ value, duration = 1.5 }: { value: number; duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            const totalTicks = 80;
            const step = end / totalTicks;
            const interval = duration * 1000 / totalTicks;

            const timer = setInterval(() => {
                start += step;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, interval);
            return () => clearInterval(timer);
        }
    }, [isInView, value, duration]);

    return <span ref={ref}>{count}</span>;
}
