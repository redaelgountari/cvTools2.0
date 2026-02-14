import { useContext, useMemo } from 'react';
import { ReadContext } from '@/app/GenComponents/ReadContext';

export function useIsCVAnalyzed() {
    const { AnlysedCV, isLoading } = useContext(ReadContext);

    const isCVAnalyzed = useMemo(() => {
        if (!AnlysedCV) return false;

        // Check if the object has more than just the basic fields
        // Exclude personalInfo because it might be pre-filled from auth (Name/Email)
        const essentialFields = ['skills', 'experience', 'education'];
        const hasEssentialData = essentialFields.some(field => {
            const data = AnlysedCV[field];
            if (!data) return false;

            if (Array.isArray(data)) return data.length > 0;

            // If object, check if any value is populated (non-empty array or non-empty string)
            return Object.values(data).some(val =>
                (Array.isArray(val) && val.length > 0) ||
                (typeof val === 'string' && val.trim().length > 0)
            );
        });

        return hasEssentialData;
    }, [AnlysedCV]);

    return { isCVAnalyzed, isLoading };
}
