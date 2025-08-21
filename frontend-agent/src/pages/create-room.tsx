import { CreateRoomForm } from '@/components/create-room-form'
import { RoomList } from '@/components/room-list'
import { StatsRooms } from '@/components/stats-rooms'

export function CreateRoom() {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl flex flex-col gap-8">
        <div className="flex flex-col gap-2 justify-center items-center">
          <h1 className="text-5xl font-bold">Gerenciar Salas</h1>
          <p className="text-xl text-muted-foreground">
            Crie novas salas ou acesse suas salas existentes
          </p>
        </div>
        <div className="grid grid-cols-2 items-start gap-8">
          <CreateRoomForm />
          <RoomList />
        </div>
        <StatsRooms />
      </div>
    </div>
  )
}
