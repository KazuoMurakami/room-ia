import { Upload } from 'lucide-react'
import { Button } from './ui/button'

import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogDescription,
} from './ui/alert-dialog'

type RoomParams = {
  roomId: string
}

export function UploadRoomAudio({ roomId }: RoomParams) {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="outline">
            <Upload className="size-4" />
            Carregar áudio
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Carregar áudio</AlertDialogTitle>
            <AlertDialogDescription className="flex items-center justify-center py-6">
              <Button asChild>
                <input type="file" />
              </Button>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction>Enviar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
