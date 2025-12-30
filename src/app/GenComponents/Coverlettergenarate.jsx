import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { getFromStorage } from '@/Cookiesmv';
import React, { useContext, useEffect, useState } from 'react';
import { ReadContext } from './ReadContext';
import axios from 'axios';
import { Card } from '@/components/ui/card';

export default function CoverLetterGenerate() {
    const { AnlysedCV } = useContext(ReadContext);
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [coverLetter, setCoverLetter] = useState('');
    const [jobAnnouncement, setJobAnnouncement] = useState('');
    const [lineLimit, setLineLimit] = useState(15);
    const [showLineLimit, setShowLineLimit] = useState(false);

    useEffect(() => {
        if (!AnlysedCV) {
            const storedData = getFromStorage('userData','userData');
            if (storedData) {
                console.log("storedData :", storedData);
                setResponse(JSON.stringify(storedData));
            }
        } else {
            console.log("AnlysedCV :", AnlysedCV);
            setResponse(AnlysedCV);
        }
    }, [AnlysedCV]);

    // Function to generate the cover letter
    const generateCoverLetter = async () => {
        if (!response || !jobAnnouncement) {
            setError('Please provide both the analyzed CV and the job announcement.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const prompt = `
                You are a professional career advisor. Generate a concise and tailored cover letter based on the following CV data and job announcement. The cover letter must:
                1. Be no longer than ${lineLimit} lines.
                2. Highlight the most relevant skills and experiences from the CV that match the job requirements.
                3. Address the job announcement directly, showing enthusiasm for the role and company.
                4. Use a professional and formal tone.
                5. Include a strong opening and closing statement.
                6. Match the language and style of the job announcement.

                CV Data:
                ${JSON.stringify(response)}

                Job Announcement:
                ${jobAnnouncement}

                Important: The cover letter must not exceed ${lineLimit} lines. Ensure it is concise and well-structured.
            `;

            const { data } = await axios.post("/api/gemini", { userData: prompt });
            const cleanedData = data.text.replace(/```json|```/g, '').trim();

            setCoverLetter(cleanedData);
        } catch (error) {
            console.error('Error:', error);
            setError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Card className="p-6 shadow-md">
                <h1 className="text-2xl font-bold mb-4">Cover Letter Generator</h1>

                {/* Job Announcement Input */}
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Job Announcement</label>
                    <Textarea
                        placeholder="Paste the job announcement here..."
                        value={jobAnnouncement}
                        onChange={(e) => setJobAnnouncement(e.target.value)}
                        className="w-full p-3 border rounded-lg"
                        rows={5}
                    />
                </div>

                {/* Toggle Line Limit Input */}
                <div className="mb-4">
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={showLineLimit}
                            onChange={() => setShowLineLimit(!showLineLimit)}
                            className="form-checkbox h-4 w-4 text-blue-600"
                        />
                        <span className="text-sm">Set a line limit</span>
                    </label>
                </div>

                {/* Line Limit Range Slider */}
                {showLineLimit && (
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">
                            Maximum Lines: <span className="font-semibold">{lineLimit}</span>
                        </label>
                        <input
                            type="range"
                            min={5}
                            max={30}
                            value={lineLimit}
                            onChange={(e) => setLineLimit(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>
                )}

                <Button
                    onClick={generateCoverLetter}
                    disabled={loading || !jobAnnouncement}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {loading ? 'Generating...' : 'Generate Cover Letter'}
                </Button>

                {/* Error Message */}
                {error && (
                    <p className="mt-4 text-red-600 text-sm">{error}</p>
                )}

                {coverLetter && (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-4">Generated Cover Letter</h2>
                        <Textarea
                            value={coverLetter}
                            readOnly
                            className="w-full p-3 border rounded-lg"
                            rows={10}
                        />
                    </div>
                )}
            </Card>
        </div>
    );
}