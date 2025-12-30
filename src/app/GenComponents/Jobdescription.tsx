import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Switch } from "@radix-ui/react-switch";
import React, { useState } from "react";

export default function Jobdescription() {
  const [showJobDescription, setShowJobDescription] = useState(false);

  return (
    <div>
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-lg">Target Job Description</CardTitle>
            <CardDescription>
              Add job details to tailor your resume for specific positions
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="job-desc-toggle"
              checked={showJobDescription}
              onCheckedChange={setShowJobDescription}
            />
            <Label htmlFor="job-desc-toggle">Enable</Label>
          </div>
        </CardHeader>
        <CardContent>
          {showJobDescription ? (
            <div className="space-y-4">
              <Textarea
                placeholder="Paste the job description here to tailor your resume..."
                className="min-h-[200px]"
                value={jobAnnouncement}
                onChange={(e) => setJobAnnouncement(e.target.value)}
              />
              <div className="text-sm text-muted-foreground">
                Adding a job description helps optimize your resume for ATS
                systems and highlights relevant skills.
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[200px] border-2 border-dashed rounded-md p-4">
              <p className="text-center text-muted-foreground mb-2">
                Enable job description targeting to create a tailored resume
              </p>
              <Button
                variant="outline"
                onClick={() => setShowJobDescription(true)}
              >
                Add Job Description
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
