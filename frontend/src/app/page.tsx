"use client"
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Brain, MessageSquare, Zap } from 'lucide-react'
import { AnimatedGrid } from '@/components/animated-grid'

export default function LandingPage() {
  return (
    <div className="relative bg-black text-white">
      <AnimatedGrid />
      <section className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Emotion Detection AI
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Uncover the emotions hidden in your text with advanced AI technology
            </p>
            <Link href="/predict">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Try Now <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
          <div className="lg:w-1/2">
            <Image
              src="/emotion-detection.png"
              alt="Emotion Detection Illustration"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Brain, title: "Input Text", description: "Enter your text for emotion analysis" },
              { icon: Zap, title: "AI Processing", description: "Our advanced AI models analyze the emotional content" },
              { icon: MessageSquare, title: "Results", description: "Receive detailed emotional analysis and insights" }
            ].map((item, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex flex-col items-center">
                    <item.icon className="w-12 h-12 mb-4 text-blue-400" />
                    {item.title}
                  </CardTitle >
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-300">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mb-16 mt-32">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-3xl font-bold mb-4">API Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl text-gray-300 mb-8">
                Integrate our powerful emotion detection capabilities into your own applications
              </p>
              <div className="bg-gray-900 p-6 rounded-lg inline-block mb-6">
                <code className="text-green-400">
                  POST http://127.0.0.1:5000/predict
                </code>
              </div>
              <p className="text-gray-300 mb-8">
                Send POST requests with your text data to receive emotion analysis results
              </p>
              <Link href="/docs">
                <Button variant="outline" size="lg">
                  View API Documentation
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-32">
          <h2 className="text-3xl font-bold mb-6">Ready to uncover emotions?</h2>
          <Link href="/predict">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Start Analyzing Now <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

