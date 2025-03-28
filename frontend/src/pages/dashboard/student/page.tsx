import { useState } from "react"
import { Link } from "react-router"
import { CalendarIcon, Clock, LogOut, Search, User, MessageSquare, CreditCard, Building, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { upcomingInterviews, pastInterviews, availableInterviewers, skillAssessment, trainingModules, practiceQuestions } from "@/data/studentMockData";
import Footer from "@/components/footer"

export function StudentDashboard() {
  const mockStudentName = 'Adarsh Pandey';
  const [searchQuery, setSearchQuery] = useState("")

  const filteredInterviewers = availableInterviewers.filter(
    (interviewer) =>
      interviewer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interviewer.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interviewer.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interviewer.specialization.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <span className="text-primary">MockPrep</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link to="/dashboard/student/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">{mockStudentName}</h1>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-4 mx-auto gap-x-2">
            <TabsTrigger value="upcoming" className="px-4 text-center">
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="find" className="px-4 text-center">
              Interviewers
            </TabsTrigger>
            <TabsTrigger value="training" className="px-4 text-center">
              Training
            </TabsTrigger>
            <TabsTrigger value="past" className="px-4 text-center">
              Past Interviews
            </TabsTrigger>
          </TabsList>


          <TabsContent value="upcoming" className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Your Upcoming Interviews</h2>
            {upcomingInterviews.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {upcomingInterviews.map((interview) => (
                  <Card key={interview.id}>
                    <CardHeader>
                      <CardTitle>{interview.company}</CardTitle>
                      <CardDescription>{interview.role}</CardDescription>
                      <Badge className="w-fit" variant={interview.status === "confirmed" ? "default" : "outline"}>
                        {interview.status === "confirmed" ? "Confirmed" : "Pending"}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                          <span>{new Date(interview.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{interview.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>{interview.interviewer}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" asChild>
                        <Link to={`/interview/${interview.id}`}>Join Interview</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No upcoming interviews</h3>
                <p className="text-muted-foreground mt-1">Schedule your first interview by finding an interviewer</p>
                <Button className="mt-4" variant="outline" asChild>
                  <Link to="#find">Find Interviewers</Link>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="find" className="mt-6">
            <div className="flex items-center gap-2 mb-6">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by company, role, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
            </div>

            <div className="grid gap-4">
              {filteredInterviewers.map((interviewer) => (
                <Card key={interviewer.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={interviewer.avatar} alt={interviewer.name} />
                        <AvatarFallback>{interviewer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <h3 className="font-medium">{interviewer.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {interviewer.role} at {interviewer.company}
                        </p>
                        <p className="text-sm">Experience: {interviewer.experience}</p>
                        <p className="text-sm">Specialization: {interviewer.specialization}</p>
                        <div className="mt-2">
                          <p className="text-sm font-medium">Available slots:</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {interviewer.availability.map((slot, index) => (
                              <Badge key={index} variant="outline">
                                {slot}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Button className="mt-4 md:mt-0">Book Interview</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredInterviewers.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">No interviewers found</h3>
                  <p className="text-muted-foreground mt-1">Try adjusting your search criteria</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="training" className="mt-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
              <div>
                <h2 className="text-xl font-semibold">Personal Training</h2>
                <p className="text-muted-foreground">Track your progress and improve your interview skills</p>
              </div>
              <Button>Take Skill Assessment</Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Overall Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
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
                          strokeDasharray={`${skillAssessment.overall * 2.51} 251.2`}
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold">{skillAssessment.overall}%</span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">Overall Readiness</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Recent Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-32 flex items-end justify-between gap-1">
                    {skillAssessment.recentProgress.map((score, index) => (
                      <div key={index} className="relative h-full flex-1 flex flex-col justify-end">
                        <div className="bg-primary rounded-t-sm w-full" style={{ height: `${score}%` }}></div>
                        <span className="absolute bottom-0 left-0 right-0 text-center text-xs -mb-5">
                          {index === 0 ? "7d" : index === 6 ? "Today" : ""}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-sm text-center text-muted-foreground">Last 7 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Skill Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">Technical</span>
                      <span className="text-sm font-medium">{skillAssessment.technical}%</span>
                    </div>
                    <Progress value={skillAssessment.technical} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">Communication</span>
                      <span className="text-sm font-medium">{skillAssessment.communication}%</span>
                    </div>
                    <Progress value={skillAssessment.communication} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">Problem Solving</span>
                      <span className="text-sm font-medium">{skillAssessment.problemSolving}%</span>
                    </div>
                    <Progress value={skillAssessment.problemSolving} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">System Design</span>
                      <span className="text-sm font-medium">{skillAssessment.systemDesign}%</span>
                    </div>
                    <Progress value={skillAssessment.systemDesign} />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Areas to Improve</CardTitle>
                  <CardDescription>Focus on these topics to improve your score</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {skillAssessment.weakAreas.map((area, index) => (
                      <li key={index} className="flex items-center gap-2 p-2 rounded-md border">
                        <div className="h-2 w-2 rounded-full bg-destructive"></div>
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Generate Improvement Plan
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Your Strengths</CardTitle>
                  <CardDescription>Topics you're performing well in</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {skillAssessment.strongAreas.map((area, index) => (
                      <li key={index} className="flex items-center gap-2 p-2 rounded-md border">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Advanced Practice
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Personal Trainer</CardTitle>
                  <CardDescription>Get one-on-one guidance for your interview preparation</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Chat with an AI-powered personal trainer who can help you improve your weak areas and prepare for
                    your upcoming interviews.
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button className="w-full" asChild>
                    <Link to="/student/personal-trainer">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Start Chat Session
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/student/personal-trainer/dashboard">
                      <BarChart className="mr-2 h-4 w-4" />
                      Trainer Dashboard
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Premium Subscription</CardTitle>
                  <CardDescription>Unlock advanced features and personalized training</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get access to AI-powered interview analysis, company-specific training, and more with our premium
                    subscription plans.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link to="/subscription">
                      <CreditCard className="mr-2 h-4 w-4" />
                      View Plans
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Company-Specific Training</CardTitle>
                  <CardDescription>Prepare for interviews at your target companies</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Find interviewers with experience at specific companies and get tailored preparation for your dream
                    roles.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link to="/student/company-interviews">
                      <Building className="mr-2 h-4 w-4" />
                      Browse Companies
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <h3 className="text-lg font-semibold mb-4">Training Modules</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              {trainingModules.map((module) => (
                <Card key={module.id} className="overflow-hidden">
                  <div className="aspect-video w-full bg-muted">
                    <img
                      src={module.image || "/placeholder.svg"}
                      alt={module.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{module.description}</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>
                          {module.completedLessons}/{module.totalLessons} lessons
                        </span>
                        <span>{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} />
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full">Continue</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <h3 className="text-lg font-semibold mb-4">Practice Questions</h3>
            <Card>
              <CardHeader>
                <CardTitle>Recent Practice</CardTitle>
                <CardDescription>Continue practicing to improve your skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {practiceQuestions.map((question) => (
                    <div
                      key={question.id}
                      className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-md border"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{question.question}</h4>
                          <Badge
                            variant={
                              question.difficulty === "Easy"
                                ? "outline"
                                : question.difficulty === "Medium"
                                  ? "secondary"
                                  : "default"
                            }
                          >
                            {question.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Category: {question.category} • Last attempted:{" "}
                          {new Date(question.lastAttempted).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{question.score}/100</span>
                          <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${question.score}%` }}></div>
                          </div>
                        </div>
                        <Button size="sm">Practice</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Practice Questions
              </Button>
            </CardFooter>
          </TabsContent>

          <TabsContent value="past" className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Your Past Interviews</h2>
            {pastInterviews.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {pastInterviews.map((interview) => (
                  <Card key={interview.id}>
                    <CardHeader>
                      <CardTitle>{interview.company}</CardTitle>
                      <CardDescription>{interview.role}</CardDescription>
                      <Badge className="w-fit">Completed</Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                          <span>{new Date(interview.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{interview.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>{interview.interviewer}</span>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm font-medium">Overall Score:</p>
                          <div className="flex items-center mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className={`h-4 w-4 ${star <= interview.overallScore ? "fill-primary" : "fill-muted"}`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                            <span className="ml-2 text-sm">{interview.overallScore}/5</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" variant="outline" asChild>
                        <Link to={`/student/feedback/${interview.id}`}>View Feedback</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No past interviews</h3>
                <p className="text-muted-foreground mt-1">Your completed interviews will appear here</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}

