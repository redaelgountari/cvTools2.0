import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ReadTXT from '../../GenComponents/ReadTXT'
import Analyse from '../../GenComponents/Analyse'
import SearchResults from '../../GenComponents/SearchResults'
import { Textarea } from '@/components/ui/textarea'
import { getFromStorage } from '@/Cookiesmv'
import AnalyseResults from '../../GenComponents/AnalyseResults'
import Coverlettergenarate from '../../GenComponents/Coverlettergenarate'
import { requirePersonalInfo } from '@/lib/auth-check'

export default async function page() {
  await requirePersonalInfo();

  return (
    <div>
              <Coverlettergenarate/>

    </div>
  )
}