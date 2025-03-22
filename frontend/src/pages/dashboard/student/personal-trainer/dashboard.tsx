

import { useState } from "react"
import { Link } from "react-router"
import { ArrowLeft, Calendar, MessageSquare, Video, FileText, ChevronRight, Clock, Award, BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import Footer from "@/components/footer"

// Mock data for the personal trainer
const trainerData = {
  name: "Priya Mehta",
  role: "Senior Interview Coach",
  experience: "8+ years",
  specialization: "Technical & System Design Interviews",
  companies: ["Google", "Microsoft", "Amazon"],
  avatar: "/placeholder.svg?height=120&width=120",
  bio: "Priya is a former Google interviewer with extensive experience in technical hiring. She has conducted over 500 interviews and helped more than 200 students secure positions at top tech companies. Her coaching focuses on system design, algorithms, and effective communication.",
  availability: [
    { day: "Monday", slots: ["10:00 AM - 11:00 AM", "2:00 PM - 3:00 PM"] },
    { day: "Wednesday", slots: ["11:00 AM - 12:00 PM", "4:00 PM - 5:00 PM"] },
    { day: "Friday", slots: ["9:00 AM - 10:00 AM", "3:00 PM - 4:00 PM"] },
  ],
  nextSession: {
    date: "2025-03-15",
    time: "10:00 AM",
    topic: "System Design Interview Preparation",
  },
}

// Mock data for student progress
const progressData = {
  overallScore: 72,
  skillScores: [
    { name: "Technical Knowledge", score: 68, previousScore: 62 },
    { name: "Communication", score: 85, previousScore: 80 },
    { name: "Problem Solving", score: 75, previousScore: 70 },
    { name: "System Design", score: 60, previousScore: 55 },
    { name: "Behavioral", score: 80, previousScore: 78 },
  ],
  recentInterviews: [
    {
      id: 1,
      date: "2025-03-01",
      company: "Mock Google Interview",
      score: 70,
      feedback: "Good technical knowledge, needs improvement in system design explanations.",
    },
    {
      id: 2,
      date: "2025-02-15",
      company: "Mock Amazon Interview",
      score: 65,
      feedback: "Strong problem-solving approach, work on communication clarity.",
    },
  ],
  actionItems: [
    {
      id: 1,
      title: "Review System Design Fundamentals",
      description: "Focus on scalability concepts and database sharding techniques",
      dueDate: "2025-03-10",
      completed: false,
    },
    {
      id: 2,
      title: "Practice Dynamic Programming Problems",
      description: "Complete the assigned problem set on dynamic programming",
      dueDate: "2025-03-12",
      completed: false,
    },
    {
      id: 3,
      title: "Record Practice Answers",
      description: "Record yourself answering the behavioral questions we discussed",
      dueDate: "2025-03-08",
      completed: true,
    },
  ],
  resources: [
    {
      id: 1,
      title: "System Design Interview Guide",
      type: "PDF",
      link: "#",
    },
    {
      id: 2,
      title: "Dynamic Programming Patterns",
      type: "Video Course",
      link: "#",
    },
    {
      id: 3,
      title: "Behavioral Interview Question Bank",
      type: "Document",
      link: "#",
    },
  ],
}

export function PersonalTrainerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Calculate improvement percentages
  const calculateImprovement = (current: number, previous: number) => {
    const improvement = current - previous
    return improvement > 0 ? `+${improvement}%` : `${improvement}%`
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 py-6 px-4">
        <div className="flex items-center gap-2 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/student/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Personal Trainer Dashboard</h1>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-8">
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-4">
                  <Avatar className="h-24 w-24 border-4 border-primary/10">
                    <AvatarImage src={trainerData.avatar} alt={trainerData.name} />
                    <AvatarFallback className="text-2xl">{trainerData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle>{trainerData.name}</CardTitle>
                <CardDescription>{trainerData.role}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex justify-center gap-2 mb-4">
                  {trainerData.companies.map((company) => (
                    <Badge key={company} variant="outline">
                      {company}
                    </Badge>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground mb-4">
                  <p>
                    <span className="font-medium">Experience:</span> {trainerData.experience}
                  </p>
                  <p>
                    <span className="font-medium">Specialization:</span> {trainerData.specialization}
                  </p>
                </div>
                <p className="text-sm text-left mb-4">{trainerData.bio}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/student/personal-trainer">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Link>
                </Button>
                <Button size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Session
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Next Training Session</CardTitle>
                <CardDescription>Your upcoming session with {trainerData.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 rounded-lg border bg-muted/50">
                  <div>
                    <h3 className="font-medium">{trainerData.nextSession.topic}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(trainerData.nextSession.date).toLocaleDateString()} at {trainerData.nextSession.time}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Add to Calendar
                    </Button>
                    <Button size="sm">
                      <Video className="h-4 w-4 mr-2" />
                      Join Session
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 space-y-6">
                <div className="grid gap-6 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Overall Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center">
                        <div className="relative h-24 w-24">
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
                              strokeDasharray={`${progressData.overallScore * 2.51} 251.2`}
                              transform="rotate(-90 50 50)"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold">{progressData.overallScore}%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Sessions Completed</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center h-24">
                        <div className="text-center">
                          <div className="text-3xl font-bold">5</div>
                          <div className="text-xs text-muted-foreground">of 10 sessions</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Time Until Next Session</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center h-24">
                        <div className="text-center">
                          <div className="text-3xl font-bold">3</div>
                          <div className="text-xs text-muted-foreground">days remaining</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Action Items</CardTitle>
                    <CardDescription>Tasks assigned by your trainer</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {progressData.actionItems.map((item) => (
                        <div
                          key={item.id}
                          className={`p-4 rounded-lg border ${item.completed ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"
                            }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{item.title}</h4>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                            <Badge variant={item.completed ? "outline" : "secondary"}>
                              {item.completed ? "Completed" : `Due: ${new Date(item.dueDate).toLocaleDateString()}`}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Action Items
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Interviews</CardTitle>
                    <CardDescription>Your performance in recent mock interviews</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {progressData.recentInterviews.map((interview) => (
                        <div key={interview.id} className="p-4 rounded-lg border">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{interview.company}</h4>
                              <p className="text-sm text-muted-foreground">
                                {new Date(interview.date).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge variant="outline" className="bg-primary/10">
                              Score: {interview.score}/100
                            </Badge>
                          </div>
                          <p className="text-sm mt-2">{interview.feedback}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/dashboard/student/feedback">View All Feedback</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="progress" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Skill Progress</CardTitle>
                    <CardDescription>Your improvement across different interview skills</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {progressData.skillScores.map((skill) => (
                        <div key={skill.name} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{skill.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span>{skill.score}%</span>
                              <Badge
                                variant="outline"
                                className={
                                  skill.score > skill.previousScore
                                    ? "bg-green-50 text-green-600"
                                    : "bg-red-50 text-red-600"
                                }
                              >
                                {calculateImprovement(skill.score, skill.previousScore)}
                              </Badge>
                            </div>
                          </div>
                          <Progress value={skill.score} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Strengths</CardTitle>
                      <CardDescription>Areas where you're performing well</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 p-2 rounded-md border bg-green-50 border-green-200">
                          <Award className="h-4 w-4 text-green-500" />
                          <span>Strong communication skills</span>
                        </li>
                        <li className="flex items-center gap-2 p-2 rounded-md border bg-green-50 border-green-200">
                          <Award className="h-4 w-4 text-green-500" />
                          <span>Clear problem-solving approach</span>
                        </li>
                        <li className="flex items-center gap-2 p-2 rounded-md border bg-green-50 border-green-200">
                          <Award className="h-4 w-4 text-green-500" />
                          <span>Good behavioral interview responses</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Areas for Improvement</CardTitle>
                      <CardDescription>Focus on these areas to improve your score</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 p-2 rounded-md border bg-amber-50 border-amber-200">
                          <BookOpen className="h-4 w-4 text-amber-500" />
                          <span>System design fundamentals</span>
                        </li>
                        <li className="flex items-center gap-2 p-2 rounded-md border bg-amber-50 border-amber-200">
                          <BookOpen className="h-4 w-4 text-amber-500" />
                          <span>Dynamic programming techniques</span>
                        </li>
                        <li className="flex items-center gap-2 p-2 rounded-md border bg-amber-50 border-amber-200">
                          <BookOpen className="h-4 w-4 text-amber-500" />
                          <span>Technical communication clarity</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Progress Timeline</CardTitle>
                    <CardDescription>Your improvement over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-end justify-between gap-4">
                      {[62, 65, 68, 70, 72, 75].map((score, index) => (
                        <div key={index} className="relative h-full flex-1 flex flex-col justify-end">
                          <div className="bg-primary rounded-t-sm w-full" style={{ height: `${score}%` }}></div>
                          <span className="absolute bottom-0 left-0 right-0 text-center text-xs -mb-5">
                            Week {index + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resources" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Resources</CardTitle>
                    <CardDescription>Materials shared by your trainer</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {progressData.resources.map((resource) => (
                        <div key={resource.id} className="flex justify-between items-center p-4 rounded-lg border">
                          <div className="flex items-center gap-3">
                            {resource.type === "PDF" && <FileText className="h-8 w-8 text-red-500" />}
                            {resource.type === "Video Course" && <Video className="h-8 w-8 text-blue-500" />}
                            {resource.type === "Document" && <FileText className="h-8 w-8 text-green-500" />}
                            <div>
                              <h4 className="font-medium">{resource.title}</h4>
                              <p className="text-sm text-muted-foreground">{resource.type}</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" asChild>
                            <Link to={resource.link}>
                              View
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Trainer Availability</CardTitle>
                    <CardDescription>Schedule a session with {trainerData.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-64 pr-4">
                      <div className="space-y-4">
                        {trainerData.availability.map((day, index) => (
                          <div key={index} className="space-y-2">
                            <h4 className="font-medium">{day.day}</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {day.slots.map((slot, slotIndex) => (
                                <Button key={slotIndex} variant="outline" className="justify-start">
                                  <Clock className="mr-2 h-4 w-4" />
                                  {slot}
                                </Button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Schedule Session</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Practice Questions</CardTitle>
                    <CardDescription>Questions assigned by your trainer</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="p-3 rounded-md border">
                        <h4 className="font-medium">Design a distributed cache system</h4>
                        <p className="text-sm text-muted-foreground">System Design • Hard</p>
                      </div>
                      <div className="p-3 rounded-md border">
                        <h4 className="font-medium">Implement an LRU cache</h4>
                        <p className="text-sm text-muted-foreground">Data Structures • Medium</p>
                      </div>
                      <div className="p-3 rounded-md border">
                        <h4 className="font-medium">Find the longest increasing subsequence</h4>
                        <p className="text-sm text-muted-foreground">Dynamic Programming • Medium</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/student/practice">View All Practice Questions</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

