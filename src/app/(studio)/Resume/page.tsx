import React from 'react'
import Resume from '../../GenComponents/Resume'
import { requirePersonalInfo } from '@/lib/auth-check';

export default async function page() {
  await requirePersonalInfo();
  return (
    <div>
        <Resume/>
    </div>
  )
}
