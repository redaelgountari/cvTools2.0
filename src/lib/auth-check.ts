import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { mdb } from '@/lib/mongodb';

export async function requirePersonalInfo() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    redirect('/Signup');
  }

  const db = await mdb();
  const userData = await db.collection("Resumetl").findOne({ userId: session.user.id });
  
  const personalInfo = userData?.personalInfo;
  const hasPersonalInfo = personalInfo && Object.values(personalInfo).some(v => v && v !== "N/A");
  
  if (!hasPersonalInfo) {
    redirect('/ReadCV');
  }

  return { session, userData };
}