'use client'

import { SetStateAction, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Check, Copy } from 'lucide-react'

const CodeBlock = ({ code, language }: { code: string; language: string }) => {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="relative ">
      <pre className={`language-${language} p-4 rounded-lg bg-gray-800 text-gray-100 overflow-x-auto`}>
        <code>{code}</code>
      </pre>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-2 right-2 bg-slate-600"
        onClick={copyToClipboard}
      >
        {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  )
}

const DocsPage = () => {
  const [inputSentence, setInputSentence] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('https://d172-103-87-92-94.ngrok-free.app/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sentence: inputSentence }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Error:', error)
      setError('Failed to connect to the API. Please ensure the server is running and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container  mt-10 mx-auto px-4 py-8 max-w-4xl text-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Emotion Detection API Documentation</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <p className="text-gray-300">
          This API allows users to detect human emotions from a given text input. It is built using Flask, PyTorch, and the DistilBERT model.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Base URL</h2>
        <CodeBlock code="http://localhost:5000" language="plaintext" />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Prediction Endpoint</h2>
        <Card className="bg-gray-800 text-gray-100 border-gray-700">
          <CardHeader>
            <CardTitle>POST /predict</CardTitle>
            <CardDescription className="text-gray-400">Analyzes a given sentence and predicts the associated emotions with their probabilities.</CardDescription>
          </CardHeader>
          <CardContent>
            <h4 className="font-semibold mt-4 mb-2">Request Headers:</h4>
            <CodeBlock code="Content-Type: application/json" language="plaintext" />
            
            <h4 className="font-semibold mt-4 mb-2">Request Body:</h4>
            <CodeBlock 
              code={JSON.stringify({ sentence: "Your text here" }, null, 2)}
              language="json"
            />
            
            <h4 className="font-semibold mt-4 mb-2">Response:</h4>
            <CodeBlock 
              code={JSON.stringify({
                input_sentence: "Example sentence",
                probabilities: { joy: 0.9, sadness: 0.1 },
                filtered_emotions: { joy: 0.9 }
              }, null, 2)}
              language="json"
            />
          </CardContent>
        </Card>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Try it out</h2>
        <Card className="bg-gray-800 text-gray-100 border-gray-700">
          <CardHeader>
            <CardTitle>Emotion Detection</CardTitle>
            <CardDescription className="text-gray-400">Enter a sentence to detect emotions</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                value={inputSentence}
                onChange={(e: { target: { value: SetStateAction<string> } }) => setInputSentence(e.target.value)}
                placeholder="Enter a sentence"
                required
                className="bg-gray-700 text-gray-100 border-gray-600"
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Detecting...' : 'Detect Emotions'}
              </Button>
            </form>
            {isLoading && <p className="mt-4 text-yellow-400">Loading...</p>}
            {error && <p className="mt-4 text-red-400">{error}</p>}
            {result && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Results:</h4>
                <CodeBlock 
                  code={JSON.stringify(result, null, 2)}
                  language="json"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      <style jsx global>{`
        body {
          background-color: #111827;
          color: #f3f4f6;
        }
      `}</style>
    </div>
  )
}

export default DocsPage
