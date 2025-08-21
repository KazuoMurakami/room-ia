import { House, MessageCircleQuestionMark } from 'lucide-react'
import { Card, CardTitle, CardHeader, CardContent } from './ui/card'
import { useStatsRooms } from '@/http/use-stats-rooms'

export function StatsRooms() {
  const { data } = useStatsRooms()

  if (!data) return null

  return (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <House />
          <CardTitle>Salas criadas</CardTitle>
        </CardHeader>
        <CardContent className="font-bold text-neutral-500">
          {data[0].totalRooms} salas criadas
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <MessageCircleQuestionMark />
          <CardTitle>Perguntas criadas</CardTitle>
        </CardHeader>
        <CardContent className="font-bold text-neutral-500">
          {data[0].totalQuestions} perguntas criadas
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <MessageCircleQuestionMark />
          <CardTitle>Respostas criadas</CardTitle>
        </CardHeader>
        <CardContent className="font-bold text-neutral-500">
          {data[0].totalAnswers} respostas criadas
        </CardContent>
      </Card>
    </div>
  )
}
