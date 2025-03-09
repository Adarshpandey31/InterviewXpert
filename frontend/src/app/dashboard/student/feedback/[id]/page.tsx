"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Download, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Mock feedback data
const feedbackData = {
  id: "123",
  interview: {
    id: "456",
    role: "Frontend Developer",
    company: "Amazon",
    date: "2025-03-10",
  },
  interviewer: {
    name: "David Wilson",
    role: "Senior Software Engineer",
    company: "Amazon",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  scores: {
    technicalSkills: 4,
    communicationSkills: 3,
    problemSolving: 4,
    cultureFit: 5,
    overall: 4,
  },
  feedback: {
    strengths: [
      "Strong understanding of React fundamentals and hooks",
      "Clear communication of technical concepts",
      "Good approach to problem decomposition",
      "Excellent knowledge of frontend optimization techniques",
    ],
    areasForImprovement: [
      "Could improve depth of knowledge in state management libraries",
      "Consider providing more concrete examples when explaining concepts",
      "Work on time management during problem-solving exercises",
    ],
    additionalComments:
      "Alex showed great potential and would likely be a good fit for a mid-level frontend role. With some additional practice on system design and state management, they could quickly progress to a senior position.",
  },
  sentimentAnalysis: {
    confidence: 75,
    clarity: 82,
    technicalAccuracy: 88,
    interviewPace: 70,
  },
  recommendedResources: [
    {
      title: "Advanced React Patterns",
      type: "Course",
      link: "https://example.com/course",
    },
    {
      title: "System Design for Frontend Engineers",
      type: "Book",
      link: "https://example.com/book",
    },
    {
      title: "State Management Deep Dive",
      type: "Article",
      link: "https://example.com/article",
    },
  ],
  practiceQuestions: [
    "Explain the virtual DOM and its benefits in React",
    "Design a scalable state management solution for a large e-commerce application",
    "How would you optimize the performance of a React application?",
    "Explain the concept of code splitting and when you would use it",
  ],
}

export default function FeedbackReportPage() {
  const params = useParams()

  // Calculate overall score (average of all scores)
  const overallScore =
    Object.values(feedbackData.scores).reduce((sum, score) => sum + score, 0) /
    Object.values(feedbackData.scores).length

  return (
    <div className="container py-6 max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Interview Feedback Report</h1>
          <p className="text-muted-foreground">
            {feedbackData.interview.role} at {feedbackData.interview.company} •{" "}
            {new Date(feedbackData.interview.date).toLocaleDateString()}
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button size="sm">Book Follow-up</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="detailed">Detailed Feedback</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Summary</CardTitle>
                  <CardDescription>Your overall interview performance and key metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex flex-col items-center justify-center">
                      <div className="relative h-32 w-32">
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
                            strokeDasharray={`${overallScore * 25} 251.2`}
                            transform="rotate(-90 50 50)"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-bold">{overallScore.toFixed(1)}</span>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">Overall Score</p>
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm">Technical Skills</span>
                          <span className="text-sm font-medium">{feedbackData.scores.technicalSkills}/5</span>
                        </div>
                        <Progress value={feedbackData.scores.technicalSkills * 20} />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm">Communication Skills</span>
                          <span className="text-sm font-medium">{feedbackData.scores.communicationSkills}/5</span>
                        </div>
                        <Progress value={feedbackData.scores.communicationSkills * 20} />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm">Problem Solving</span>
                          <span className="text-sm font-medium">{feedbackData.scores.problemSolving}/5</span>
                        </div>
                        <Progress value={feedbackData.scores.problemSolving * 20} />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm">Culture Fit</span>
                          <span className="text-sm font-medium">{feedbackData.scores.cultureFit}/5</span>
                        </div>
                        <Progress value={feedbackData.scores.cultureFit * 20} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Strengths</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 list-disc pl-5">
                      {feedbackData.feedback.strengths.map((strength, index) => (
                        <li key={index}>{strength}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Areas for Improvement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 list-disc pl-5">
                      {feedbackData.feedback.areasForImprovement.map((area, index) => (
                        <li key={index}>{area}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>AI-Powered Sentiment Analysis</CardTitle>
                  <CardDescription>Analysis of your communication style and delivery</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm">Confidence</span>
                        <span className="text-sm font-medium">{feedbackData.sentimentAnalysis.confidence}%</span>
                      </div>
                      <Progress value={feedbackData.sentimentAnalysis.confidence} />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm">Clarity</span>
                        <span className="text-sm font-medium">{feedbackData.sentimentAnalysis.clarity}%</span>
                      </div>
                      <Progress value={feedbackData.sentimentAnalysis.clarity} />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm">Technical Accuracy</span>
                        <span className="text-sm font-medium">{feedbackData.sentimentAnalysis.technicalAccuracy}%</span>
                      </div>
                      <Progress value={feedbackData.sentimentAnalysis.technicalAccuracy} />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm">Interview Pace</span>
                        <span className="text-sm font-medium">{feedbackData.sentimentAnalysis.interviewPace}%</span>
                      </div>
                      <Progress value={feedbackData.sentimentAnalysis.interviewPace} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="detailed" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Interviewer Comments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar>
                      <AvatarImage src={feedbackData.interviewer.avatar} alt={feedbackData.interviewer.name} />
                      <AvatarFallback>{feedbackData.interviewer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{feedbackData.interviewer.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {feedbackData.interviewer.role} at {feedbackData.interviewer.company}
                      </p>
                    </div>
                  </div>

                  <p className="whitespace-pre-line">{feedbackData.feedback.additionalComments}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Question-by-Question Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="q1">
                      <AccordionTrigger>Tell me about your experience with React</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge>Strong</Badge>
                            <span className="text-sm text-muted-foreground">4.5/5</span>
                          </div>
                          <p>
                            You demonstrated strong knowledge of React fundamentals, hooks, and component lifecycle.
                            Your explanation of useEffect dependencies was particularly clear. Consider providing more
                            concrete examples from your projects next time.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="q2">
                      <AccordionTrigger>How would you optimize a slow-loading website?</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge>Very Good</Badge>
                            <span className="text-sm text-muted-foreground">4/5</span>
                          </div>
                          <p>
                            Your approach to optimization was methodical and comprehensive. You covered important
                            aspects like code splitting, lazy loading, and image optimization. To improve, consider
                            discussing server-side optimizations and CDN usage in more detail.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="q3">
                      <AccordionTrigger>Explain the concept of closures in JavaScript</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge>Excellent</Badge>
                            <span className="text-sm text-muted-foreground">5/5</span>
                          </div>
                          <p>
                            Your explanation of closures was excellent. You clearly articulated the concept, provided
                            relevant examples, and discussed practical applications. Your understanding of lexical scope
                            and memory implications was impressive.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="q4">
                      <AccordionTrigger>How do you handle state management in large applications?</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">Needs Improvement</Badge>
                            <span className="text-sm text-muted-foreground">2.5/5</span>
                          </div>
                          <p>
                            This was an area for improvement. While you mentioned Redux and Context API, your
                            explanation lacked depth on when to use different state management solutions. Consider
                            studying more about state management patterns, trade-offs between different libraries, and
                            how to structure state for scalability.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Resources</CardTitle>
                  <CardDescription>Materials to help you improve in your areas of development</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {feedbackData.recommendedResources.map((resource, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-md border">
                        <div className="flex-1">
                          <h4 className="font-medium">{resource.title}</h4>
                          <p className="text-sm text-muted-foreground">{resource.type}</p>
                        </div>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={resource.link} target="_blank">
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Practice Questions</CardTitle>
                  <CardDescription>Questions to help you prepare for your next interview</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feedbackData.practiceQuestions.map((question, index) => (
                      <li key={index} className="p-3 rounded-md border">
                        {question}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Schedule Practice Session</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Interview Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Role</p>
                  <p className="font-medium">{feedbackData.interview.role}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Company</p>
                  <p className="font-medium">{feedbackData.interview.company}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{new Date(feedbackData.interview.date).toLocaleDateString()}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Interviewer</p>
                  <p className="font-medium">{feedbackData.interviewer.name}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Overall Rating</p>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`h-5 w-5 ${star <= feedbackData.scores.overall ? "fill-primary" : "fill-muted"}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-sm font-medium">{feedbackData.scores.overall}/5</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-2">
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/interview/${feedbackData.interview.id}/recording`}>View Recording</Link>
              </Button>
              <Button className="w-full">Book Similar Interview</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

