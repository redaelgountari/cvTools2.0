"use client"

import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Alert, AlertDescription } from '@/components/ui/alert';

import Link from 'next/link';
import { ReadContext } from './ReadContext';

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" })
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const registered = searchParams.get('registered');
  const errorParam = searchParams.get('error');
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const { setUserinfos } = useContext(ReadContext);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl
      });

      if (result?.error) {
        let errorMessage = "Login failed";
        if (result.error === "CredentialsSignin") {
          errorMessage = "Invalid email or password";
        } else if (result.error.includes("Authorization error")) {
          errorMessage = "Authentication service error";
        }
        throw new Error(errorMessage);
      }

      if (result?.url) {
        router.push(result.url);
      } else {
        router.push(callbackUrl);
      }
      setUserinfos(result)

    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  }

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await signIn(provider, { 
        callbackUrl,
        redirect: false 
      });

      setUserinfos(result)
      console.log("result",result)

      if (result?.error) {
        throw new Error(`Failed to sign in with ${provider}`);
      }

      if (result?.url) {
        router.push(result.url);
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Social login failed');
      setIsLoading(false);
    }
  };

  // Show error from URL if present (e.g., when redirected from NextAuth)
  React.useEffect(() => {
    if (errorParam) {
      setError(
        errorParam === "OAuthAccountNotLinked" 
          ? "This email is already associated with another provider" 
          : "Authentication error occurred"
      );
    }
  }, [errorParam]);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>
          Sign in to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {(error || errorParam) && (
          <Alert className="mb-4" variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {registered && (
          <Alert className="mb-4">
            <AlertDescription>
              Registration successful! You can now log in.
            </AlertDescription>
          </Alert>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="your.email@example.com" 
                      {...field} 
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      {...field} 
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end text-sm">
              <Link 
                href="/forgot-password" 
                className="text-primary underline hover:text-primary/80"
              >
                Forgot password?
              </Link>
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </Form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              type="button" 
              onClick={() => handleSocialLogin('google')}
              className="flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.8 10.5H12v3h5.5c-.5 2.5-2.8 4.5-5.5 4.5-3 0-5.5-2.5-5.5-5.5s2.5-5.5 5.5-5.5c1.5 0 2.8.6 3.8 1.5l2.7-2.7C17.4 3.2 14.8 2 12 2 6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10c0-.7-.1-1.4-.2-2z"/>
              </svg>
              Google
            </Button>
            
            <Button 
              variant="outline" 
              type="button" 
              onClick={() => handleSocialLogin('github')}
              className="flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              GitHub
            </Button>
          </div>
        </div>
      </CardContent>
      <div className="flex justify-center pb-6">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/register" className="text-primary underline hover:text-primary/80">
            Sign up
          </Link>
        </p>
      </div>
    </Card>
  );
}

export default Login;