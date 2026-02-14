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

  const hasSkills = userData?.skills && (Array.isArray(userData.skills) ? userData.skills.length > 0 : Object.keys(userData.skills).length > 0);
  const hasExperience = userData?.experience && userData.experience.length > 0;
  const hasEducation = userData?.education && userData.education.length > 0;

  const isAnalyzed = hasSkills || hasExperience || hasEducation;

  if (!isAnalyzed) {
    redirect('/ReadCV');
  }

  return { session, userData };
}