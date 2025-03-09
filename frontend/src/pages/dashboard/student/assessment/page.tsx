

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Clock, HelpCircle, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock assessment data
const assessmentData = {
  title: "Technical Interview Readiness Assessment",
  description: "This assessment will evaluate your technical interview skills across multiple dimensions",
  totalQuestions: 15,
  timeLimit: 45, // minutes
  sections: [
    {
      id: "s1",
      title: "Technical Knowledge",
      description: "Test your understanding of core computer science concepts",
    },
    {
      id: "s2",
      title: "Problem Solving",
      description: "Evaluate your approach to solving algorithmic problems",
    },
    {
      id: "s3",
      title: "System Design",
      description: "Assess your ability to design scalable systems",
    },
  ],
  questions: [
    {
      id: "q1",
      sectionId: "s1",
      type: "multiple-choice",
      question: "What is the time complexity of binary search?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctAnswer: "O(log n)",
    },
    {
      id: "q2",
      sectionId: "s1",
      type: "multiple-choice",
      question: "Which data structure would be most efficient for implementing a priority queue?",
      options: ["Array", "Linked List", "Heap", "Hash Table"],
      correctAnswer: "Heap",
    },
    {
      id: "q3",
      sectionId: "s2",
      type: "coding",
      question: "Write a function to check if a string is a palindrome.",
      starterCode: "function isPalindrome(str) {\n  // Your code here\n}",
    },
    {
      id: "q4",
      sectionId: "s3",
      type: "open-ended",
      question: "How would you design a URL shortening service like bit.ly?",
    },
    // More questions would be here in a real assessment
  ],
}

export default function AssessmentPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [timeRemaining, setTimeRemaining] = useState(assessmentData.timeLimit * 60) // in seconds
  const [assessmentState, setAssessmentState] = useState<"not-started" | "in-progress" | "completed">("not-started")
  const [activeTab, setActiveTab] = useState("overview")

  const currentQuestion = assessmentData.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / assessmentData.questions.length) * 100

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStartAssessment = () => {
    setAssessmentState("in-progress")
    // In a real app, you would start a timer here
  }

  const handleAnswerChange = (value: any) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value,
    })
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < assessmentData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // Submit assessment
      setAssessmentState("completed")
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case "multiple-choice":
        return (
          <RadioGroup
            value={answers[currentQuestion.id] || ""}
            onValueChange={handleAnswerChange}
            className="space-y-3"
          >
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 rounded-md border p-3">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )
      case "coding":
        return (
          <div className="space-y-4">
            <div className="rounded-md bg-muted p-4">
              <pre className="text-sm">{currentQuestion.starterCode}</pre>
            </div>
            <Textarea
              value={answers[currentQuestion.id] || currentQuestion.starterCode}
              onChange={(e) => handleAnswerChange(e.target.value)}
              className="font-mono min-h-[200px]"
              placeholder="Write your code here..."
            />
          </div>
        )
      case "open-ended":
        return (
          <Textarea
            value={answers[currentQuestion.id] || ""}
            onChange={(e) => handleAnswerChange(e.target.value)}
            className="min-h-[200px]"
            placeholder="Write your answer here..."
          />
        )
      default:
        return null
    }
  }

  // Mock results data (would be calculated based on actual answers in a real app)
  const mockResults = {
    overallScore: 78,
    sectionScores: {
      s1: 85,
      s2: 70,
      s3: 80,
    },
    strengths: ["Data Structures", "System Design Fundamentals"],
    weaknesses: ["Algorithm Complexity Analysis", "Dynamic Programming"],
    recommendations: [
      {
        id: "r1",
        title: "Algorithm Techniques",
        description: "Focus on improving your understanding of algorithm complexity and techniques",
        link: "/dashboard/student/training/3",
      },
      {
        id: "r2",
        title: "Dynamic Programming Deep Dive",
        description: "Master dynamic programming with step-by-step exercises",
        link: "/dashboard/student/training/5",
      },
    ],
  }

  return (
    <div className="container py-6 max-w-4xl">
      {assessmentState === "not-started" && (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard/student">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">{assessmentData.title}</h1>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Assessment Overview</CardTitle>
              <CardDescription>{assessmentData.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex flex-col items-center justify-center p-4 rounded-lg border">
                  <p className="text-sm text-muted-foreground">Questions</p>
                  <p className="text-3xl font-bold">{assessmentData.totalQuestions}</p>
                </div>
                <div className="flex flex-col items-center justify-center p-4 rounded-lg border">
                  <p className="text-sm text-muted-foreground">Time Limit</p>
                  <p className="text-3xl font-bold">{assessmentData.timeLimit} min</p>
                </div>
                <div className="flex flex-col items-center justify-center p-4 rounded-lg border">
                  <p className="text-sm text-muted-foreground">Sections</p>
                  <p className="text-3xl font-bold">{assessmentData.sections.length}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Assessment Sections</h3>
                <div className="space-y-3">
                  {assessmentData.sections.map((section) => (
                    <div key={section.id} className="p-3 rounded-md border">
                      <h4 className="font-medium">{section.title}</h4>
                      <p className="text-sm text-muted-foreground">{section.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleStartAssessment}>
                Start Assessment
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tips for Success</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="font-medium">Manage Your Time</p>
                  <p className="text-sm text-muted-foreground">
                    Don't spend too long on any single question. If you're stuck, move on and come back later.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="font-medium">Read Carefully</p>
                  <p className="text-sm text-muted-foreground">
                    Make sure you understand what each question is asking before answering.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <HelpCircle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="font-medium">Show Your Work</p>
                  <p className="text-sm text-muted-foreground">
                    For coding and open-ended questions, explain your thought process and approach.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {assessmentState === "in-progress" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => setAssessmentState("not-started")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-bold">
                Question {currentQuestionIndex + 1} of {assessmentData.questions.length}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span className="font-mono">{formatTime(timeRemaining)}</span>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} />
          </div>

          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{currentQuestion.question}</CardTitle>
                  <CardDescription>
                    {assessmentData.sections.find((s) => s.id === currentQuestion.sectionId)?.title} •{" "}
                    {currentQuestion.type === "multiple-choice"
                      ? "Select one answer"
                      : currentQuestion.type === "coding"
                        ? "Write code"
                        : "Open-ended response"}
                  </CardDescription>
                </div>
                <div className="text-sm text-muted-foreground">
                  Question {currentQuestionIndex + 1}/{assessmentData.questions.length}
                </div>
              </div>
            </CardHeader>
            <CardContent>{renderQuestion()}</CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                Previous
              </Button>
              <Button onClick={handleNextQuestion}>
                {currentQuestionIndex === assessmentData.questions.length - 1 ? "Submit" : "Next"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {assessmentState === "completed" && (
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard/student">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Assessment Results</h1>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="detailed">Detailed Results</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Score</CardTitle>
                  <CardDescription>Overall performance on the assessment</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="relative h-40 w-40">
                    <svg className="h-full w-full" viewBox="0 0 100 100">
                      <circle className="stroke-muted" strokeWidth="10" fill="transparent" r="40" cx="50" cy="50" />
                      <circle
                        className="stroke-primary"
                        strokeWidth="10"
                        strokeLinecap="round"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                        strokeDasharray={`${mockResults.overallScore * 2.51} 251.2`}
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold">{mockResults.overallScore}%</span>
                    </div>
                  </div>
                  <p className="mt-4 text-center text-muted-foreground">
                    Great job! You've demonstrated solid technical interview skills.
                  </p>
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Strengths</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {mockResults.strengths.map((strength, index) => (
                        <li key={index} className="flex items-center gap-2 p-2 rounded-md border">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Areas for Improvement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {mockResults.weaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-center gap-2 p-2 rounded-md border">
                          <XCircle className="h-4 w-4 text-destructive" />
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recommended Training</CardTitle>
                  <CardDescription>Based on your assessment results</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockResults.recommendations.map((recommendation) => (
                    <div key={recommendation.id} className="flex justify-between items-center p-3 rounded-md border">
                      <div>
                        <p className="font-medium">{recommendation.title}</p>
                        <p className="text-sm text-muted-foreground">{recommendation.description}</p>
                      </div>
                      <Button size="sm" asChild>
                        <Link href={recommendation.link}>Start</Link>
                      </Button>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/dashboard/student">Return to Dashboard</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="detailed" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Section Scores</CardTitle>
                  <CardDescription>Your performance in each assessment section</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {assessmentData.sections.map((section) => (
                    <div key={section.id} className="space-y-1">
                      <div className="flex justify-between">
                        <span>{section.title}</span>
                        <span className="font-medium">
                          {mockResults.sectionScores[section.id as keyof typeof mockResults.sectionScores]}%
                        </span>
                      </div>
                      <Progress
                        value={mockResults.sectionScores[section.id as keyof typeof mockResults.sectionScores]}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Question Analysis</CardTitle>
                  <CardDescription>Detailed breakdown of your answers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* This would show detailed feedback for each question in a real app */}
                  <p className="text-center text-muted-foreground py-4">
                    Detailed question analysis is available in the full report.
                  </p>
                  <Button className="w-full">Download Full Report</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}

