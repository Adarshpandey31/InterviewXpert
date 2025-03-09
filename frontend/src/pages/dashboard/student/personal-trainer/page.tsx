

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Send, User, Bot, AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Function to get user subscription tier
const getUserSubscriptionTier = () => {
  // In a real app, this would come from your auth/user context
  // For demo purposes, we'll return a hardcoded value
  return "basic" // Options: "free", "basic", "professional", "enterprise"
}

// Mock user data (in a real app, this would come from your user authentication system)
const userData = {
  name: "Alex Johnson",
  weakAreas: ["Dynamic Programming", "System Design Scalability", "Concurrency"],
  recentProgress: {
    technicalSkills: 68,
    communicationSkills: 85,
    problemSolving: 75,
  },
  upcomingInterview: {
    company: "Google",
    role: "Software Engineer",
    date: "2025-04-15",
  },
}

type Message = {
  role: "user" | "assistant"
  content: string
}

// Mock AI response function with tier-specific responses
const mockAIResponse = async (input: string, tier: string): Promise<string> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Tier-specific responses
  const tierResponses = {
    free: [
      "I can provide basic guidance on that topic. For more detailed help, consider upgrading your plan.",
      "Here's a simple explanation. Upgrade to get more personalized advice.",
      "That's a common interview question. I can give you general tips, but for company-specific advice, you'll need a higher tier plan.",
    ],
    basic: [
      "That's a great question about dynamic programming. Let's break it down step by step...",
      "When it comes to system design scalability, it's important to consider factors like load balancing and caching...",
      "Concurrency can be tricky. Have you looked into concepts like mutex and semaphores?",
    ],
    professional: [
      "Great question! Based on your recent mock interview performance, I'd recommend focusing on these specific aspects of dynamic programming...",
      "For your upcoming Google interview, their system design questions often focus on scalability. Let me provide some company-specific tips...",
      "I've analyzed your code solutions, and I notice you're having trouble with concurrency patterns. Let's work through some examples together...",
    ],
    enterprise: [
      "Based on your performance and the specific requirements for the Google SWE role you're targeting, here's a customized approach to dynamic programming questions...",
      "I've consulted with our Google interview specialists, and for your upcoming interview, you should prepare for these specific system design scenarios...",
      "Let me provide you with some insider knowledge about how Google evaluates concurrency solutions in their interviews...",
    ],
  }

  const responses = tierResponses[tier] || tierResponses.basic
  return responses[Math.floor(Math.random() * responses.length)]
}

export default function PersonalTrainerPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const subscriptionTier = getUserSubscriptionTier()

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    // Initial greeting from the AI trainer based on subscription tier
    let initialMessage = `Hello ${userData.name}! I'm your personal interview trainer. `

    switch (subscriptionTier) {
      case "free":
        initialMessage +=
          "I can provide basic guidance on interview preparation. For more personalized assistance, consider upgrading your plan."
        break
      case "basic":
        initialMessage += `I've analyzed your profile and noticed that you have some areas to improve, particularly in ${userData.weakAreas.join(", ")}. How can I help you prepare for your upcoming interview?`
        break
      case "professional":
        initialMessage += `I've analyzed your profile and noticed that you have some areas to improve, particularly in ${userData.weakAreas.join(", ")}. How can I help you prepare for your upcoming ${userData.upcomingInterview.role} interview at ${userData.upcomingInterview.company}?`
        break
      case "enterprise":
        initialMessage += `I've created a personalized preparation plan for your upcoming ${userData.upcomingInterview.role} interview at ${userData.upcomingInterview.company}. Based on your recent mock interviews, we should focus on ${userData.weakAreas[0]} first. Would you like to start there?`
        break
      default:
        initialMessage += "How can I help with your interview preparation today?"
    }

    setMessages([{ role: "assistant", content: initialMessage }])
  }, [])

  const sendMessage = async () => {
    if (input.trim() === "") return

    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await mockAIResponse(input, subscriptionTier)
      const aiMessage = { role: "assistant" as const, content: response }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error generating AI response:", error)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I'm sorry, I encountered an error. Please try again." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  // Render subscription tier-specific UI elements
  const renderTierSpecificUI = () => {
    switch (subscriptionTier) {
      case "free":
        return (
          <Alert className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Free Plan Limitations</AlertTitle>
            <AlertDescription>
              You're on the Free plan with basic AI trainer capabilities.
              <Button variant="link" className="p-0 h-auto" asChild>
                <Link href="/subscription">Upgrade your plan</Link>
              </Button>{" "}
              for human trainer assistance and personalized feedback.
            </AlertDescription>
          </Alert>
        )
      case "basic":
        return (
          <div className="mb-4 flex justify-between items-center">
            <Badge variant="outline">Basic Plan</Badge>
            <Button variant="outline" size="sm" asChild>
              <Link href="/subscription">Upgrade for Human Trainer</Link>
            </Button>
          </div>
        )
      case "professional":
        return (
          <div className="mb-4 flex justify-between items-center">
            <Badge variant="secondary">Professional Plan</Badge>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/student/personal-trainer/dashboard">Trainer Dashboard</Link>
            </Button>
          </div>
        )
      case "enterprise":
        return (
          <div className="mb-4 flex justify-between items-center">
            <Badge variant="default">Enterprise Plan</Badge>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Request Human Trainer
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/student/personal-trainer/dashboard">Trainer Dashboard</Link>
              </Button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container py-6 max-w-4xl">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard/student")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Personal Trainer Chat</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle>Chat with Your Personal Trainer</CardTitle>
              <CardDescription>Get personalized guidance for your interview preparation</CardDescription>
              {renderTierSpecificUI()}
            </CardHeader>
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`flex items-start gap-2 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <Avatar>
                        {message.role === "user" ? <User className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
                      </Avatar>
                      <div
                        className={`rounded-lg p-3 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-2 max-w-[80%]">
                      <Avatar>
                        <Bot className="h-6 w-6" />
                      </Avatar>
                      <div className="rounded-lg p-3 bg-muted">
                        <p className="text-sm">Thinking...</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <CardFooter className="border-t p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  sendMessage()
                }}
                className="flex w-full items-center space-x-2"
              >
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <Button type="submit" size="icon" disabled={isLoading}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Weak Areas</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {userData.weakAreas.map((area, index) => (
                    <Badge key={index} variant="secondary">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Recent Progress</p>
                <div className="space-y-2 mt-1">
                  <div className="flex justify-between text-sm">
                    <span>Technical Skills</span>
                    <span>{userData.recentProgress.technicalSkills}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Communication Skills</span>
                    <span>{userData.recentProgress.communicationSkills}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Problem Solving</span>
                    <span>{userData.recentProgress.problemSolving}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Interview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Company</span>
                <span className="text-sm">{userData.upcomingInterview.company}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Role</span>
                <span className="text-sm">{userData.upcomingInterview.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Date</span>
                <span className="text-sm">{userData.upcomingInterview.date}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Suggested Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-4 space-y-1">
                <li className="text-sm">System design best practices</li>
                <li className="text-sm">Concurrency patterns in Java</li>
                <li className="text-sm">Dynamic programming techniques</li>
                <li className="text-sm">Google's leadership principles</li>
              </ul>
            </CardContent>
            {subscriptionTier === "free" && (
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/subscription">Upgrade for Personalized Topics</Link>
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

