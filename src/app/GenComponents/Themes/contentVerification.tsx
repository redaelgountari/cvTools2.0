import { Resume } from "@/app/types/resume";

export const hasContent = (val?: string | null) => {
    if (!val) return false;
    const pruned = val.trim();
    return pruned !== '' && pruned !== 'N/A';
};

export const checkOnlinePresence = (userdata: Resume) => {
    return (
        hasContent(userdata.personalInfo.linkedin) ||
        hasContent(userdata.personalInfo.github) ||
        hasContent(userdata.personalInfo.portfolio) ||
        hasContent(userdata.personalInfo.website) ||
        hasContent(userdata.onlinePresence.twitter) ||
        hasContent(userdata.onlinePresence.stackOverflow) ||
        hasContent(userdata.onlinePresence.medium)
    );
};