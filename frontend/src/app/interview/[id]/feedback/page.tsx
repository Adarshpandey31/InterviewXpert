"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertTriangle, BookOpen, MessageSquare } from "lucide-react"
import Link from "next/link"

// Add a function to determine the subscription tier
const getUserSubscriptionTier = () => {
  // In a real app, this would come from your auth/user context
  // For demo purposes, we'll return a hardcoded value
  return "professional" // Options: "free", "basic", "professional", "enterprise"
}

// Add a component for trainer connection
const TrainerConnection = ({ lowRatedAreas, onRequestTrainer }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const subscriptionTier = getUserSubscriptionTier()

  const getTrainerAvailability = () => {
    switch (subscriptionTier) {
      case "free":
        return {
          available: false,
          message: "Upgrade to Basic or higher plan to connect with trainers",
        }
      case "basic":
        return {
          available: true,
          message: "Limited trainer assistance available (1 session)",
          options: ["AI Trainer Chat"],
        }
      case "professional":
        return {
          available: true,
          message: "Personal trainer assistance available",
          options: ["AI Trainer Chat", "Schedule 30-min Session", "Email Consultation"],
        }
      case "enterprise":
        return {
          available: true,
          message: "Premium trainer assistance available",
          options: [
            "AI Trainer Chat",
            "Schedule 60-min Session",
            "Email Consultation",
            "Phone Call",
            "Immediate Assistance",
          ],
        }
      default:
        return {
          available: false,
          message: "Unknown subscription tier",
        }
    }
  }

  const trainerAvailability = getTrainerAvailability()

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          Areas Needing Improvement
        </CardTitle>
        <CardDescription>Connect with a trainer to improve these specific areas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 border rounded-md bg-amber-50">
            <h4 className="font-medium mb-2">Low-rated skills identified:</h4>
            <ul className="space-y-2">
              {lowRatedAreas.map((area, index) => (
                <li key={index} className="flex items-start gap-2">
                  <BookOpen className="h-4 w-4 text-amber-500 mt-1" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>

          {trainerAvailability.available ? (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{trainerAvailability.message}</p>
              <div className="flex flex-wrap gap-2">
                {trainerAvailability.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={index === 0 ? "default" : "outline"}
                    onClick={() => {
                      setIsDialogOpen(true)
                      onRequestTrainer(option, lowRatedAreas)
                    }}
                  >
                    {option === "AI Trainer Chat" && <MessageSquare className="mr-2 h-4 w-4" />}
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{trainerAvailability.message}</p>
              <Button asChild>
                <Link href="/subscription">Upgrade Plan</Link>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Mock interview data
const interviewData = {
  id: "123",
  student: {
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  interviewer: {
    name: "David Wilson",
    company: "Amazon",
    role: "Senior Software Engineer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  role: "Frontend Developer",
  date: "2025-03-10",
  time: "10:00 AM",
  duration: "45 minutes",
  status: "completed",
  transcript: "...", // This would be the actual interview transcript
}

const feedbackFormSchema = z.object({
  technicalSkills: z.number().min(1).max(5),
  communicationSkills: z.number().min(1).max(5),
  problemSolving: z.number().min(1).max(5),
  cultureFit: z.number().min(1).max(5),
  overallRating: z.enum(["1", "2", "3", "4", "5"], {
    required_error: "Please select an overall rating.",
  }),
  strengths: z.string().min(10, {
    message: "Strengths must be at least 10 characters.",
  }),
  areasForImprovement: z.string().min(10, {
    message: "Areas for improvement must be at least 10 characters.",
  }),
  additionalComments: z.string().optional(),
})

// Add the trainer connection dialog to the main component
export default function InterviewFeedbackPage() {
  const params = useParams()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [sentimentAnalysis, setSentimentAnalysis] = useState<any>(null)

  const [lowRatedAreas, setLowRatedAreas] = useState([])
  const [isTrainerDialogOpen, setIsTrainerDialogOpen] = useState(false)
  const [selectedTrainerOption, setSelectedTrainerOption] = useState("")

  const form = useForm<z.infer<typeof feedbackFormSchema>>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      technicalSkills: 3,
      communicationSkills: 3,
      problemSolving: 3,
      cultureFit: 3,
      overallRating: "3",
      strengths: "",
      areasForImprovement: "",
      additionalComments: "",
    },
  })

  async function onSubmit(values: z.infer<typeof feedbackFormSchema>) {
    setIsSubmitting(true)

    // In a real app, you would call your API to save the feedback
    console.log(values)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)

    toast({
      title: "Feedback submitted",
      description: "Your feedback has been submitted successfully.",
    })

    // Redirect to the interview completion page
    router.push(`/interview/${params.id}/complete`)
  }

  async function analyzeSentiment() {
    setIsAnalyzing(true)

    try {
      // In a real app, you would use the actual interview transcript
      const transcript =
        "The candidate demonstrated good knowledge of React hooks and component lifecycle. They struggled a bit with explaining complex state management solutions but showed strong problem-solving skills when discussing optimization techniques. Their communication was clear but sometimes too technical for a non-technical audience. Overall, they showed potential but need more practice with system design questions."

      // Use AI SDK to analyze the transcript
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: `
          Analyze this interview transcript for a Frontend Developer position and provide feedback on:
          1. Technical competence (score 1-5)
          2. Communication clarity (score 1-5)
          3. Problem-solving approach (score 1-5)
          4. Cultural fit indicators (score 1-5)
          5. Confidence level (score 1-5)
          6. Key strengths (bullet points)
          7. Areas for improvement (bullet points)
          8. Overall impression (score 1-5)
          
          Format the response as JSON with these exact keys: technicalScore, communicationScore, problemSolvingScore, cultureFitScore, confidenceScore, strengths, areasForImprovement, overallScore.
          
          Transcript: ${transcript}
        `,
      })

      // Parse the AI response
      const analysisResult = JSON.parse(text)
      setSentimentAnalysis(analysisResult)

      // Update form values based on AI analysis
      form.setValue("technicalSkills", analysisResult.technicalScore)
      form.setValue("communicationSkills", analysisResult.communicationScore)
      form.setValue("problemSolving", analysisResult.problemSolvingScore)
      form.setValue("cultureFit", analysisResult.cultureFitScore)
      form.setValue("overallRating", analysisResult.overallScore.toString())
      form.setValue("strengths", analysisResult.strengths.join("\n"))
      form.setValue("areasForImprovement", analysisResult.areasForImprovement.join("\n"))
    } catch (error) {
      console.error("Error analyzing sentiment:", error)
      toast({
        title: "Analysis failed",
        description: "Failed to analyze the interview. Please try again or proceed with manual feedback.",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Identify low-rated areas when sentiment analysis is complete
  useEffect(() => {
    if (sentimentAnalysis) {
      const lowAreas = []
      if (sentimentAnalysis.technicalScore < 3) lowAreas.push("Technical Knowledge")
      if (sentimentAnalysis.communicationScore < 3) lowAreas.push("Communication Skills")
      if (sentimentAnalysis.problemSolvingScore < 3) lowAreas.push("Problem Solving Approach")
      if (sentimentAnalysis.cultureFitScore < 3) lowAreas.push("Cultural Fit")
      if (sentimentAnalysis.confidenceScore < 3) lowAreas.push("Confidence Level")

      setLowRatedAreas(lowAreas.length > 0 ? lowAreas : ["Overall Interview Performance"])
    }
  }, [sentimentAnalysis])

  const handleRequestTrainer = (option, areas) => {
    setSelectedTrainerOption(option)
    setIsTrainerDialogOpen(true)

    // In a real app, you would make an API call to request trainer assistance
    console.log(`Requesting ${option} for areas:`, areas)
  }

  return (
    <div className="container py-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">Interview Feedback</h1>
      <p className="text-muted-foreground mb-6">
        Provide feedback for {interviewData.student.name}'s {interviewData.role} interview
      </p>

      <Tabs defaultValue="manual">
        <TabsList className="mb-6">
          <TabsTrigger value="manual">Manual Feedback</TabsTrigger>
          <TabsTrigger value="ai-assisted">AI-Assisted Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="manual">
          <Card>
            <CardHeader>
              <CardTitle>Feedback Form</CardTitle>
              <CardDescription>Rate the candidate's performance and provide constructive feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Skills Assessment</h3>

                    <FormField
                      control={form.control}
                      name="technicalSkills"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Technical Skills</FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              <Slider
                                min={1}
                                max={5}
                                step={1}
                                defaultValue={[field.value]}
                                onValueChange={(value) => field.onChange(value[0])}
                              />
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Needs Improvement</span>
                                <span>Excellent</span>
                              </div>
                            </div>
                          </FormControl>
                          <FormDescription>Current rating: {field.value}/5</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="communicationSkills"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Communication Skills</FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              <Slider
                                min={1}
                                max={5}
                                step={1}
                                defaultValue={[field.value]}
                                onValueChange={(value) => field.onChange(value[0])}
                              />
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Needs Improvement</span>
                                <span>Excellent</span>
                              </div>
                            </div>
                          </FormControl>
                          <FormDescription>Current rating: {field.value}/5</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="problemSolving"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Problem Solving</FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              <Slider
                                min={1}
                                max={5}
                                step={1}
                                defaultValue={[field.value]}
                                onValueChange={(value) => field.onChange(value[0])}
                              />
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Needs Improvement</span>
                                <span>Excellent</span>
                              </div>
                            </div>
                          </FormControl>
                          <FormDescription>Current rating: {field.value}/5</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cultureFit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Culture Fit</FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              <Slider
                                min={1}
                                max={5}
                                step={1}
                                defaultValue={[field.value]}
                                onValueChange={(value) => field.onChange(value[0])}
                              />
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Needs Improvement</span>
                                <span>Excellent</span>
                              </div>
                            </div>
                          </FormControl>
                          <FormDescription>Current rating: {field.value}/5</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="overallRating"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Overall Rating</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-1"
                          >
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <FormItem key={rating} className="flex flex-col items-center space-y-1">
                                <FormControl>
                                  <RadioGroupItem value={rating.toString()} className="sr-only" />
                                </FormControl>
                                <div
                                  className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold ${
                                    field.value === rating.toString()
                                      ? "bg-primary text-primary-foreground"
                                      : "border border-primary/20 hover:border-primary/50 cursor-pointer"
                                  }`}
                                  onClick={() => field.onChange(rating.toString())}
                                >
                                  {rating}
                                </div>
                                <FormLabel className="text-xs font-normal">
                                  {rating === 1
                                    ? "Poor"
                                    : rating === 2
                                      ? "Fair"
                                      : rating === 3
                                        ? "Good"
                                        : rating === 4
                                          ? "Very Good"
                                          : "Excellent"}
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Detailed Feedback</h3>

                    <FormField
                      control={form.control}
                      name="strengths"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Strengths</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="What did the candidate do well?"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="areasForImprovement"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Areas for Improvement</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="What could the candidate improve on?"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="additionalComments"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Comments</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any other feedback or suggestions?"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Feedback"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-assisted">
          <Card>
            <CardHeader>
              <CardTitle>AI-Assisted Feedback</CardTitle>
              <CardDescription>
                Use AI to analyze the interview transcript and generate feedback suggestions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Our AI will analyze the interview transcript to identify strengths, areas for improvement, and
                    provide an overall assessment of the candidate's performance.
                  </p>
                  <Button onClick={analyzeSentiment} disabled={isAnalyzing} className="w-full">
                    {isAnalyzing ? "Analyzing..." : "Analyze Interview"}
                  </Button>
                </div>

                {sentimentAnalysis && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">AI Analysis Results</h3>

                      <div className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm">Technical Competence</span>
                            <span className="text-sm font-medium">{sentimentAnalysis.technicalScore}/5</span>
                          </div>
                          <Progress value={sentimentAnalysis.technicalScore * 20} />
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm">Communication Clarity</span>
                            <span className="text-sm font-medium">{sentimentAnalysis.communicationScore}/5</span>
                          </div>
                          <Progress value={sentimentAnalysis.communicationScore * 20} />
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm">Problem-Solving Approach</span>
                            <span className="text-sm font-medium">{sentimentAnalysis.problemSolvingScore}/5</span>
                          </div>
                          <Progress value={sentimentAnalysis.problemSolvingScore * 20} />
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm">Cultural Fit</span>
                            <span className="text-sm font-medium">{sentimentAnalysis.cultureFitScore}/5</span>
                          </div>
                          <Progress value={sentimentAnalysis.cultureFitScore * 20} />
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm">Confidence Level</span>
                            <span className="text-sm font-medium">{sentimentAnalysis.confidenceScore}/5</span>
                          </div>
                          <Progress value={sentimentAnalysis.confidenceScore * 20} />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <h4 className="font-medium">Key Strengths</h4>
                        <ul className="space-y-1 list-disc pl-5">
                          {sentimentAnalysis.strengths.map((strength: string, index: number) => (
                            <li key={index} className="text-sm">
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Areas for Improvement</h4>
                        <ul className="space-y-1 list-disc pl-5">
                          {sentimentAnalysis.areasForImprovement.map((area: string, index: number) => (
                            <li key={index} className="text-sm">
                              {area}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-sm">
                        You can use these AI-generated insights to complete the feedback form. Click the button below to
                        populate the form with these suggestions.
                      </p>
                      <Button
                        onClick={() => form.handleSubmit(onSubmit)()}
                        className="w-full mt-4"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit AI-Generated Feedback"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add this after the Tabs component */}
      {lowRatedAreas.length > 0 && (
        <TrainerConnection lowRatedAreas={lowRatedAreas} onRequestTrainer={handleRequestTrainer} />
      )}

      {/* Add the trainer request dialog */}
      <Dialog open={isTrainerDialogOpen} onOpenChange={setIsTrainerDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Trainer Assistance Request</DialogTitle>
            <DialogDescription>
              {selectedTrainerOption === "AI Trainer Chat"
                ? "You'll be connected to an AI trainer immediately"
                : "Your request has been submitted"}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <h4 className="font-medium mb-2">Focus Areas:</h4>
            <ul className="space-y-1">
              {lowRatedAreas.map((area, index) => (
                <li key={index} className="text-sm">
                  • {area}
                </li>
              ))}
            </ul>

            {selectedTrainerOption === "AI Trainer Chat" ? (
              <Button
                className="w-full mt-4"
                onClick={() => {
                  setIsTrainerDialogOpen(false)
                  router.push("/dashboard/student/personal-trainer")
                }}
              >
                Start AI Trainer Chat
              </Button>
            ) : (
              <div className="space-y-4 mt-4">
                <p className="text-sm">
                  A trainer will review your interview performance and contact you shortly with personalized guidance on
                  improving these areas.
                </p>
                <Button
                  className="w-full"
                  onClick={() => {
                    setIsTrainerDialogOpen(false)
                    toast({
                      title: "Request submitted",
                      description: "A trainer will contact you shortly",
                    })
                  }}
                >
                  Confirm Request
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

