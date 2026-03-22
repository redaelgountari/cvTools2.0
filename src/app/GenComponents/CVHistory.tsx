"use client"

import React, { useContext, useState } from 'react'
import { ReadContext } from './ReadContext'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock, CheckCircle2, Eye, Star, Loader2, Trash2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import axios from 'axios'

export default function CVHistory() {
  const { cvHistory, setAnlysedCV, refreshHistory, userinfos } = useContext(ReadContext)
  const { toast } = useToast()
  const [isSettingActive, setIsSettingActive] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  if (!cvHistory || cvHistory.length === 0) {
    return null
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date)
    } catch (e) {
      return dateString
    }
  }

  const handleSetActive = async (version: any) => {
    if (!version._id) return;
    setIsSettingActive(version._id);
    try {
      await axios.post("/api/storeuserdata", {
        userData: { _id: version._id },
        action: 'set-active',
        userId: userinfos
      });

      await refreshHistory();
      setAnlysedCV(version);

      toast({
        title: "Success",
        description: "This version is now your main active CV.",
        variant: "default",
        className: "bg-green-500 text-white border-none"
      });
    } catch (error) {
      console.error("Error setting active version:", error);
      toast({
        title: "Error",
        description: "Failed to set this version as active.",
        variant: "destructive"
      });
    } finally {
      setIsSettingActive(null);
    }
  }

  const handleDelete = async (versionId: string) => {
    setIsDeleting(versionId);
    try {
      await axios.post("/api/storeuserdata", {
        userData: { _id: versionId },
        action: 'delete',
        userId: userinfos
      });

      await refreshHistory();
      setConfirmDelete(null);

      toast({
        title: "Deleted",
        description: "CV version removed from history.",
        variant: "default",
        className: "bg-red-500 text-white border-none"
      });
    } catch (error) {
      console.error("Error deleting version:", error);
      toast({
        title: "Error",
        description: "Failed to delete version.",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(null);
    }
  }

  return (
    <Card className="mt-6 shadow-sm border-primary/10 overflow-hidden">
      <CardHeader className="pb-3 bg-muted/30">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          CV History (Last 5)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {cvHistory.map((version, index) => (
            <div
              key={version._id || index}
              className={`flex items-center justify-between p-4 transition-all group ${version.isActive ? 'bg-primary/5' : 'hover:bg-accent/50'} ${confirmDelete === version._id ? 'bg-red-50' : ''}`}
            >
              <div
                className="flex flex-col gap-1 cursor-pointer flex-1"
                onClick={() => setAnlysedCV(version)}
              >
                <div className="flex items-center gap-2">
                  <span className={`font-semibold text-sm ${version.isActive ? 'text-primary' : ''}`}>
                    {version.personalInfo?.fullName || 'Untitled Version'}
                  </span>
                  {version.isActive && (
                    <Badge variant="default" className="h-5 px-1.5 text-[10px] bg-primary text-primary-foreground">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  )}
                </div>
                <span className="text-[10px] uppercase font-bold text-muted-foreground/60 tracking-wider">
                  {version.updatedAt ? formatDate(version.updatedAt) : `Version ${index + 1}`}
                </span>
              </div>

              <div className="flex items-center gap-2 ml-4">
                {confirmDelete === version._id ? (
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={isDeleting !== null}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(version._id);
                      }}
                      className="h-7 px-2 text-[10px] rounded-full"
                    >
                      {isDeleting === version._id ? <Loader2 className="w-3 h-3 animate-spin" /> : "Confirm"}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmDelete(null);
                      }}
                      className="h-7 px-2 text-[10px] rounded-full"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <>
                    {!version.isActive && (
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={isSettingActive !== null || isDeleting !== null}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSetActive(version);
                        }}
                        className="h-8 px-3 text-xs gap-1.5 rounded-full border-primary/20 hover:border-primary hover:bg-primary/5 transition-all shadow-sm active:scale-95"
                      >
                        {isSettingActive === version._id ? (
                          <Loader2 className="w-3 h-3 animate-spin text-primary" />
                        ) : (
                          <Star className="w-4 h-4 text-primary/70" />
                        )}
                        Activate
                      </Button>
                    )}
                    
                    <Button
                      size="icon"
                      variant="ghost"
                      disabled={isSettingActive !== null || isDeleting !== null}
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmDelete(version._id);
                      }}
                      className="h-8 w-8 rounded-full text-muted-foreground/40 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
