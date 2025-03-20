"use client"

import { AlertCircle, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface ErrorDisplayProps {
  error: string
  onRetry: () => void
  isRetrying?: boolean
}

export default function ErrorDisplay({ error, onRetry, isRetrying = false }: ErrorDisplayProps) {
  return (
    <Alert variant="destructive" className="my-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-2">
        <p>{error}</p>
        <Button variant="outline" size="sm" onClick={onRetry} disabled={isRetrying} className="w-fit mt-2">
          <RefreshCw className={`h-4 w-4 mr-2 ${isRetrying ? "animate-spin" : ""}`} />
          Try Again
        </Button>
      </AlertDescription>
    </Alert>
  )
}

