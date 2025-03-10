

import { useState } from "react"
// import { useParams, useNavigate } from "react-router"
import {Link} from "react-router"
import { ArrowLeft, CheckCircle, ChevronRight, Clock, Code, FileText, Play, Video } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Mock training module data
const trainingModule = {
  id: "1",
  title: "Technical Interview Fundamentals",
  description: "Master the basics of technical interviews with focus on algorithms and data structures",
  progress: 65,
  totalLessons: 12,
  completedLessons: 8,
  image: "/placeholder.svg?height=300&width=800",
  sections: [
    {
      id: "s1",
      title: "Introduction to Technical Interviews",
      description: "Learn what to expect in technical interviews and how to prepare",
      lessons: [
        {
          id: "l1",
          title: "What to Expect in a Technical Interview",
          type: "video",
          duration: "12 min",
          completed: true,
        },
        {
          id: "l2",
          title: "Common Interview Formats",
          type: "article",
          duration: "8 min",
          completed: true,
        },
        {
          id: "l3",
          title: "Preparing Your Introduction",
          type: "exercise",
          duration: "15 min",
          completed: true,
        },
      ],
    },
    {
      id: "s2",
      title: "Data Structures Fundamentals",
      description: "Review essential data structures used in coding interviews",
      lessons: [
        {
          id: "l4",
          title: "Arrays and Strings",
          type: "video",
          duration: "18 min",
          completed: true,
        },
        {
          id: "l5",
          title: "Linked Lists",
          type: "video",
          duration: "15 min",
          completed: true,
        },
        {
          id: "l6",
          title: "Hash Tables",
          type: "video",
          duration: "14 min",
          completed: true,
        },
        {
          id: "l7",
          title: "Data Structures Practice Problems",
          type: "exercise",
          duration: "30 min",
          completed: true,
        },
      ],
    },
    {
      id: "s3",
      title: "Algorithm Techniques",
      description: "Learn common algorithmic approaches to solve interview problems",
      lessons: [
        {
          id: "l8",
          title: "Sorting and Searching",
          type: "video",
          duration: "20 min",
          completed: true,
        },
        {
          id: "l9",
          title: "Recursion and Dynamic Programming",
          type: "video",
          duration: "25 min",
          completed: false,
        },
        {
          id: "l10",
          title: "Greedy Algorithms",
          type: "article",
          duration: "12 min",
          completed: false,
        },
        {
          id: "l11",
          title: "Algorithm Practice Problems",
          type: "exercise",
          duration: "45 min",
          completed: false,
        },
      ],
    },
    {
      id: "s4",
      title: "Mock Interviews and Assessment",
      description: "Practice with real interview questions and get feedback",
      lessons: [
        {
          id: "l12",
          title: "Final Assessment",
          type: "quiz",
          duration: "60 min",
          completed: false,
        },
      ],
    },
  ],
  skills: ["Algorithm Analysis", "Problem Solving", "Data Structures", "Time Complexity", "Space Complexity"],
  recommendations: [
    {
      id: "r1",
      title: "System Design Interview Prep",
      description: "Learn how to approach and solve system design questions for senior roles",
      progress: 0,
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: "r2",
      title: "Behavioral Interview Mastery",
      description: "Prepare compelling stories and answers for common behavioral questions",
      progress: 0,
      image: "/placeholder.svg?height=100&width=200",
    },
  ],
}

// Mock performance data
const performanceData = {
  quizScores: [85, 92, 78, 88],
  exerciseCompletions: [
    { name: "Arrays Exercise", score: 90, date: "2025-03-01" },
    { name: "Linked Lists Exercise", score: 85, date: "2025-03-03" },
    { name: "Hash Tables Exercise", score: 95, date: "2025-03-05" },
  ],
  timeSpent: {
    total: 420, // minutes
    bySection: [
      { name: "Introduction", time: 45 },
      { name: "Data Structures", time: 210 },
      { name: "Algorithms", time: 165 },
      { name: "Assessment", time: 0 },
    ],
  },
  strengths: ["Arrays", "Hash Tables", "Sorting Algorithms"],
  weaknesses: ["Dynamic Programming", "Graph Algorithms"],
}

export default function TrainingModulePage() {
  // const params = useParams()
  // const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("content")

  // Calculate completion percentage
  const completedLessons = trainingModule.sections.reduce(
    (count, section) => count + section.lessons.filter((lesson) => lesson.completed).length,
    0,
  )
  const totalLessons = trainingModule.sections.reduce((count, section) => count + section.lessons.length, 0)
  const completionPercentage = Math.round((completedLessons / totalLessons) * 100)

  // Find the next lesson to continue
  const findNextLesson = () => {
    for (const section of trainingModule.sections) {
      for (const lesson of section.lessons) {
        if (!lesson.completed) {
          return { sectionId: section.id, lessonId: lesson.id, title: lesson.title }
        }
      }
    }
    return null
  }

  const nextLesson = findNextLesson()

  return (
    <div className="container py-6 max-w-5xl">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/dashboard/student">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">{trainingModule.title}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden mb-6">
            <img
              src={trainingModule.image || "/placeholder.svg"}
              alt={trainingModule.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-semibold">{trainingModule.title}</h2>
              <p className="text-muted-foreground">{trainingModule.description}</p>
            </div>
            {nextLesson && (
              <Button>
                Continue Learning
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span>
                {completedLessons}/{totalLessons} lessons completed
              </span>
              <span>{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="content">Course Content</TabsTrigger>
              <TabsTrigger value="performance">Your Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="mt-6 space-y-6">
              {trainingModule.sections.map((section, index) => (
                <Card key={section.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="flex items-center justify-center h-6 w-6 rounded-full bg-muted text-sm font-medium">
                        {index + 1}
                      </span>
                      {section.title}
                    </CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {section.lessons.map((lesson) => (
                        <li key={lesson.id} className="flex items-center justify-between p-3 rounded-md border">
                          <div className="flex items-center gap-3">
                            {lesson.type === "video" && <Video className="h-4 w-4 text-muted-foreground" />}
                            {lesson.type === "article" && <FileText className="h-4 w-4 text-muted-foreground" />}
                            {lesson.type === "exercise" && <Code className="h-4 w-4 text-muted-foreground" />}
                            {lesson.type === "quiz" && <FileText className="h-4 w-4 text-muted-foreground" />}
                            <div>
                              <p className="font-medium">{lesson.title}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span className="capitalize">{lesson.type}</span>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{lesson.duration}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {lesson.completed ? (
                              <CheckCircle className="h-5 w-5 text-primary" />
                            ) : (
                              <Button size="sm">
                                <Play className="mr-1 h-3 w-3" />
                                Start
                              </Button>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="performance" className="mt-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Quiz Scores</CardTitle>
                    <CardDescription>Your performance on module quizzes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-40 flex items-end justify-between gap-4">
                      {performanceData.quizScores.map((score, index) => (
                        <div key={index} className="relative h-full flex-1 flex flex-col justify-end">
                          <div className="bg-primary rounded-t-sm w-full" style={{ height: `${score}%` }}></div>
                          <span className="absolute bottom-0 left-0 right-0 text-center text-xs -mb-5">
                            Quiz {index + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 text-center">
                      <p className="text-sm text-muted-foreground">Average Score</p>
                      <p className="text-2xl font-bold">
                        {Math.round(
                          performanceData.quizScores.reduce((a, b) => a + b, 0) / performanceData.quizScores.length,
                        )}
                        %
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Time Spent</CardTitle>
                    <CardDescription>Hours spent on each section</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {performanceData.timeSpent.bySection.map((section, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm">{section.name}</span>
                            <span className="text-sm font-medium">{Math.round((section.time / 60) * 10) / 10} hrs</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{ width: `${(section.time / performanceData.timeSpent.total) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-sm text-muted-foreground">Total Time</p>
                      <p className="text-2xl font-bold">
                        {Math.round((performanceData.timeSpent.total / 60) * 10) / 10} hrs
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Exercise Completions</CardTitle>
                  <CardDescription>Your scores on practical exercises</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {performanceData.exerciseCompletions.map((exercise, index) => (
                      <div key={index} className="flex justify-between items-center p-3 rounded-md border">
                        <div>
                          <p className="font-medium">{exercise.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Completed on {new Date(exercise.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{exercise.score}%</span>
                          <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${exercise.score}%` }}></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Strengths</CardTitle>
                    <CardDescription>Topics you're performing well in</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {performanceData.strengths.map((strength, index) => (
                        <li key={index} className="flex items-center gap-2 p-2 rounded-md border">
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Areas to Improve</CardTitle>
                    <CardDescription>Focus on these topics to improve your score</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {performanceData.weaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-center gap-2 p-2 rounded-md border">
                          <div className="h-2 w-2 rounded-full bg-destructive"></div>
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completion</span>
                    <span>{completionPercentage}%</span>
                  </div>
                  <Progress value={completionPercentage} />
                </div>

                <div className="pt-2 border-t">
                  <p className="font-medium mb-2">Next Lesson</p>
                  {nextLesson ? (
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm line-clamp-1">{nextLesson.title}</p>
                      <Button size="sm" variant="outline">
                        Resume
                      </Button>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">All lessons completed!</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills You'll Learn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {trainingModule.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended Next</CardTitle>
              <CardDescription>After completing this module</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {trainingModule.recommendations.map((recommendation) => (
                <div key={recommendation.id} className="flex gap-3">
                  <div className="h-16 w-16 rounded bg-muted flex-shrink-0 overflow-hidden">
                    <img
                      src={recommendation.image || "/placeholder.svg"}
                      alt={recommendation.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium line-clamp-1">{recommendation.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">{recommendation.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Courses
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

