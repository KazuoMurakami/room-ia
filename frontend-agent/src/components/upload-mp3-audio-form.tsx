import { Upload } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { useUploadMp3Audio } from '@/http/use-upload-mp3-audio'

type UploadMp3AudioFormProps = {
  roomId: string
  onSuccess: () => void
}

export function UploadMp3AudioForm({
  roomId,
  onSuccess,
}: UploadMp3AudioFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { mutateAsync: uploadMp3Audio } = useUploadMp3Audio()

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  async function handleUploadMp3Audio(event: React.FormEvent) {
    event.preventDefault()

    if (!selectedFile) {
      alert('Por favor, selecione um arquivo de áudio.')
      return
    }

    setIsSubmitting(true)

    try {
      await uploadMp3Audio({
        roomId,
        file: selectedFile,
      })

      setIsOpen(false)
      setSelectedFile(null)
      onSuccess()
    } catch (error) {
      console.error('Erro ao fazer upload:', error)
      alert('Erro ao fazer upload do arquivo. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="mr-2 size-4" />
          Carregar áudio
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Carregar áudio MP3</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleUploadMp3Audio} className="space-y-4">
          <Input
            type="file"
            accept="audio/mp3,audio/mpeg,audio/wav,audio/m4a"
            onChange={handleFileSelect}
          />

          {selectedFile && (
            <p className="text-sm text-muted-foreground">
              Arquivo selecionado: {selectedFile.name}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !selectedFile}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
