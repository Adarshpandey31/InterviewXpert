"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { BarChart, CheckCircle, Clock, AlertTriangle, Mic, Volume2, Brain, Lightbulb, Lock } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Function to get user subscription tier
const getUserSubscriptionTier = () => {
  // In a real app, this would come from your auth/user context
  // For demo purposes, we'll return a hardcoded value
  return "basic" // Options: "free", "basic", "professional", "enterprise"
}

type AnalysisMetric = {
  name: string
  value: number
  previousValue: number
  icon: React.ReactNode
}

type KeyMoment = {
  timestamp: string
  type: "positive" | "negative" | "neutral"
  description: string
}

type AnalysisPanelProps = {
  isRecording: boolean
  interviewDuration: number
  currentTime: number
  onAddNote: (note: string) => void
}

export function InterviewAnalysisPanel({ isRecording, interviewDuration, currentTime, onAddNote }: AnalysisPanelProps) {
  const [metrics, setMetrics] = useState<AnalysisMetric[]>([
    { name: "Confidence", value: 75, previousValue: 70, icon: <Volume2 className="h-4 w-4" /> },
    { name: "Technical Knowledge", value: 82, previousValue: 80, icon: <Brain className="h-4 w-4" /> },
    { name: "Communication", value: 68, previousValue: 65, icon: <Mic className="h-4 w-4" /> },
    { name: "Problem Solving", value: 79, previousValue: 75, icon: <Lightbulb className="h-4 w-4" /> },
  ])

  const [keyMoments, setKeyMoments] = useState<KeyMoment[]>([
    {
      timestamp: "02:15",
      type: "positive",
      description: "Excellent explanation of system design principles",
    },
    {
      timestamp: "05:30",
      type: "negative",
      description: "Struggled with concurrency concepts",
    },
    {
      timestamp: "08:45",
      type: "positive",
      description: "Strong problem decomposition approach",
    },
    {
      timestamp: "12:20",
      type: "neutral",
      description: "Could improve code optimization explanation",
    },
  ])

  const [fillerWords, setFillerWords] = useState({
    um: 5,
    like: 8,
    actually: 3,
    basically: 4,
  })

  const [emotionalTone, setEmotionalTone] = useState({
    confident: 65,
    nervous: 15,
    enthusiastic: 45,
    uncertain: 20,
  })

  const subscriptionTier = getUserSubscriptionTier()

  // Simulate real-time updates based on subscription tier
  useEffect(() => {
    if (!isRecording) return

    // Free tier has limited or no real-time updates
    if (subscriptionTier === "free") return

    const interval = setInterval(() => {
      // Update metrics with small random changes
      setMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          previousValue: metric.value,
          value: Math.max(0, Math.min(100, metric.value + (Math.random() * 6 - 3))),
        })),
      )

      // Occasionally add a new key moment (not for basic tier)
      if (subscriptionTier !== "basic" && Math.random() > 0.9) {
        const types = ["positive", "negative", "neutral"] as const
        const type = types[Math.floor(Math.random() * types.length)]

        const descriptions = {
          positive: [
            "Good articulation of concepts",
            "Demonstrated strong problem-solving approach",
            "Excellent technical explanation",
            "Clear and concise communication",
          ],
          negative: [
            "Hesitation when discussing algorithms",
            "Unclear explanation of time complexity",
            "Missed edge case in solution",
            "Too many filler words used",
          ],
          neutral: [
            "Average response to system design question",
            "Could elaborate more on the solution",
            "Acceptable but not exceptional explanation",
            "Moderate understanding demonstrated",
          ],
        }

        const description = descriptions[type][Math.floor(Math.random() * descriptions[type].length)]

        const minutes = Math.floor(currentTime / 60)
        const seconds = Math.floor(currentTime % 60)
        const timestamp = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`

        setKeyMoments((prev) => [
          {
            timestamp,
            type,
            description,
          },
          ...prev,
        ])
      }

      // Update filler words count (professional and enterprise only)
      if ((subscriptionTier === "professional" || subscriptionTier === "enterprise") && Math.random() > 0.8) {
        const words = ["um", "like", "actually", "basically"] as const
        const word = words[Math.floor(Math.random() * words.length)]

        setFillerWords((prev) => ({
          ...prev,
          [word]: prev[word] + 1,
        }))
      }

      // Update emotional tone (enterprise only)
      if (subscriptionTier === "enterprise") {
        setEmotionalTone((prev) => ({
          confident: Math.max(0, Math.min(100, prev.confident + (Math.random() * 6 - 3))),
          nervous: Math.max(0, Math.min(100, prev.nervous + (Math.random() * 6 - 3))),
          enthusiastic: Math.max(0, Math.min(100, prev.enthusiastic + (Math.random() * 6 - 3))),
          uncertain: Math.max(0, Math.min(100, prev.uncertain + (Math.random() * 6 - 3))),
        }))
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [isRecording, currentTime, subscriptionTier])

  const handleRatingChange = (index: number, newValue: number[]) => {
    setMetrics((prev) =>
      prev.map((metric, i) => (i === index ? { ...metric, previousValue: metric.value, value: newValue[0] } : metric)),
    )
  }

  // Render subscription-specific content
  const renderSubscriptionContent = () => {
    switch (subscriptionTier) {
      case "free":
        return (
          <div className="p-6 flex flex-col items-center justify-center h-full">
            <Lock className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Premium Feature</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Real-time interview analysis is available on Basic plan and above.
            </p>
            <Button asChild>
              <Link href="/subscription">Upgrade Your Plan</Link>
            </Button>
          </div>
        )
      case "basic":
        return (
          <>
            <Alert className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Basic Plan Limitations</AlertTitle>
              <AlertDescription>
                You have access to basic metrics only. Upgrade to Professional for advanced analysis.
              </AlertDescription>
            </Alert>
            <Tabs defaultValue="metrics">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
                <TabsTrigger value="moments">Key Moments</TabsTrigger>
              </TabsList>

              <TabsContent value="metrics" className="space-y-4 pt-4">
                <div className="space-y-4">
                  {metrics.map((metric, index) => (
                    <div key={metric.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1.5">
                          {metric.icon}
                          <span className="text-sm font-medium">{metric.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{Math.round(metric.value)}/100</span>
                          {metric.value > metric.previousValue ? (
                            <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                              +{Math.round((metric.value - metric.previousValue) * 10) / 10}
                            </Badge>
                          ) : metric.value < metric.previousValue ? (
                            <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
                              {Math.round((metric.value - metric.previousValue) * 10) / 10}
                            </Badge>
                          ) : null}
                        </div>
                      </div>
                      <Slider
                        value={[metric.value]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) => handleRatingChange(index, value)}
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="moments" className="pt-4">
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-2">
                    {keyMoments.slice(0, 2).map((moment, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-md border flex items-start gap-2 ${
                          moment.type === "positive"
                            ? "bg-green-50 border-green-200"
                            : moment.type === "negative"
                              ? "bg-red-50 border-red-200"
                              : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        {moment.type === "positive" ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        ) : moment.type === "negative" ? (
                          <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                        ) : (
                          <Clock className="h-4 w-4 text-gray-500 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <span
                              className={`text-xs font-medium ${
                                moment.type === "positive"
                                  ? "text-green-600"
                                  : moment.type === "negative"
                                    ? "text-red-600"
                                    : "text-gray-600"
                              }`}
                            >
                              {moment.type === "positive"
                                ? "Strength"
                                : moment.type === "negative"
                                  ? "Improvement Area"
                                  : "Observation"}
                            </span>
                            <span className="text-xs text-muted-foreground">{moment.timestamp}</span>
                          </div>
                          <p className="text-sm mt-1">{moment.description}</p>
                        </div>
                      </div>
                    ))}
                    <div className="p-3 rounded-md border border-dashed flex items-center justify-center">
                      <Button variant="link" asChild>
                        <Link href="/subscription">Upgrade to see more key moments</Link>
                      </Button>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </>
        )
      case "professional":
      case "enterprise":
        return (
          <Tabs defaultValue="metrics">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="metrics">Metrics</TabsTrigger>
              <TabsTrigger value="moments">Key Moments</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="metrics" className="space-y-4 pt-4">
              <div className="space-y-4">
                {metrics.map((metric, index) => (
                  <div key={metric.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1.5">
                        {metric.icon}
                        <span className="text-sm font-medium">{metric.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{Math.round(metric.value)}/100</span>
                        {metric.value > metric.previousValue ? (
                          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                            +{Math.round((metric.value - metric.previousValue) * 10) / 10}
                          </Badge>
                        ) : metric.value < metric.previousValue ? (
                          <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
                            {Math.round((metric.value - metric.previousValue) * 10) / 10}
                          </Badge>
                        ) : null}
                      </div>
                    </div>
                    <Slider
                      value={[metric.value]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => handleRatingChange(index, value)}
                    />
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t">
                <h4 className="text-sm font-medium mb-2">Emotional Tone</h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(emotionalTone).map(([tone, value]) => (
                    <div key={tone} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="capitalize">{tone}</span>
                        <span>{value}%</span>
                      </div>
                      <Progress value={value} className="h-1.5" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t">
                <h4 className="text-sm font-medium mb-2">Filler Words</h4>
                <div className="grid grid-cols-4 gap-2">
                  {Object.entries(fillerWords).map(([word, count]) => (
                    <div key={word} className="flex flex-col items-center">
                      <span className="text-xs text-muted-foreground capitalize">{word}</span>
                      <span className="text-lg font-bold">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="moments" className="pt-4">
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-2">
                  {keyMoments.map((moment, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-md border flex items-start gap-2 ${
                        moment.type === "positive"
                          ? "bg-green-50 border-green-200"
                          : moment.type === "negative"
                            ? "bg-red-50 border-red-200"
                            : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      {moment.type === "positive" ? (
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      ) : moment.type === "negative" ? (
                        <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                      ) : (
                        <Clock className="h-4 w-4 text-gray-500 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span
                            className={`text-xs font-medium ${
                              moment.type === "positive"
                                ? "text-green-600"
                                : moment.type === "negative"
                                  ? "text-red-600"
                                  : "text-gray-600"
                            }`}
                          >
                            {moment.type === "positive"
                              ? "Strength"
                              : moment.type === "negative"
                                ? "Improvement Area"
                                : "Observation"}
                          </span>
                          <span className="text-xs text-muted-foreground">{moment.timestamp}</span>
                        </div>
                        <p className="text-sm mt-1">{moment.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="insights" className="pt-4">
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-4">
                  <div className="p-3 rounded-md border bg-blue-50 border-blue-200">
                    <h4 className="font-medium text-blue-700 mb-1">Communication Pattern</h4>
                    <p className="text-sm">
                      The candidate speaks at a good pace but tends to use filler words frequently. Recommend practicing
                      more concise responses.
                    </p>
                  </div>

                  <div className="p-3 rounded-md border bg-green-50 border-green-200">
                    <h4 className="font-medium text-green-700 mb-1">Technical Strengths</h4>
                    <p className="text-sm">
                      Strong understanding of system design principles and data structures. Explanations are clear and
                      technically sound.
                    </p>
                  </div>

                  <div className="p-3 rounded-md border bg-amber-50 border-amber-200">
                    <h4 className="font-medium text-amber-700 mb-1">Areas for Improvement</h4>
                    <p className="text-sm">
                      Could improve on concurrency concepts and algorithm complexity analysis. Consider asking more
                      clarifying questions before diving into solutions.
                    </p>
                  </div>

                  <div className="p-3 rounded-md border bg-purple-50 border-purple-200">
                    <h4 className="font-medium text-purple-700 mb-1">Confidence Trend</h4>
                    <p className="text-sm">
                      Confidence increases when discussing familiar topics but drops noticeably when challenged on edge
                      cases. Work on maintaining consistent confidence.
                    </p>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        )
      default:
        return null
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <BarChart className="h-5 w-5" />
          Real-time Analysis
          {subscriptionTier !== "free" && (
            <Badge
              variant={
                subscriptionTier === "enterprise"
                  ? "default"
                  : subscriptionTier === "professional"
                    ? "secondary"
                    : "outline"
              }
            >
              {subscriptionTier.charAt(0).toUpperCase() + subscriptionTier.slice(1)}
            </Badge>
          )}
        </CardTitle>
        <CardDescription>AI-powered interview performance metrics</CardDescription>
      </CardHeader>
      <CardContent className="p-4 space-y-4">{renderSubscriptionContent()}</CardContent>
      <CardFooter className="border-t p-4">
        {subscriptionTier === "free" ? (
          <Button className="w-full" asChild>
            <Link href="/subscription">Upgrade to Add AI Insights to Notes</Link>
          </Button>
        ) : (
          <Button
            className="w-full"
            onClick={() => onAddNote("AI suggests focusing on concurrency concepts and reducing filler words.")}
          >
            Add AI Insights to Notes
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

