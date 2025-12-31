import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Mail, User, Shield } from 'lucide-react';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Shield className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              Please sign in to view your profile
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const initials = session.user?.name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase() || '?';

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
              <AvatarImage src={session.user?.image || undefined} alt={session.user?.name || 'User'} />
              <AvatarFallback className="text-2xl font-semibold bg-primary text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-3xl font-bold">{session.user?.name || 'Anonymous User'}</CardTitle>
          <CardDescription className="mt-2">
            <Badge variant="secondary" className="mt-2">
              Authenticated
            </Badge>
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <div className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
              <div className="mt-1">
                <User className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                <p className="text-base font-semibold">{session.user?.name || 'Not provided'}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
              <div className="mt-1">
                <Mail className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                <p className="text-base font-semibold break-all">{session.user?.email || 'Not provided'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}