

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Video, Mic, MicOff, PauseCircle, PlayCircle, BarChart } from "lucide-react"
import { InterviewAnalysisPanel } from "@/components/interview-analysis-panel"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

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
  status: "active",
  questions: [
    "Tell me about your experience with React.",
    "How would you optimize a slow-loading website?",
    "Explain the concept of closures in JavaScript.",
    "How do you handle state management in large applications?",
  ],
  notes: "",
}

export default function InterviewPage() {
  const params = useParams()
  const [interview, setInterview] = useState(interviewData)
  const [notes, setNotes] = useState("")
  const [timeRemaining, setTimeRemaining] = useState(45 * 60) // 45 minutes in seconds
  const [isActive, setIsActive] = useState(false)
  const [showAnalysis, setShowAnalysis] = useState(true)
  const [isRecording, setIsRecording] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  // Format time remaining as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1)
        setCurrentTime((prev) => prev + 1)
      }, 1000)
    } else if (timeRemaining === 0) {
      setIsActive(false)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeRemaining])

  // Handle timer controls
  const startTimer = () => {
    setIsActive(true)
    setIsRecording(true)
  }

  const pauseTimer = () => {
    setIsActive(false)
    setIsRecording(false)
  }

  const resetTimer = () => {
    setIsActive(false)
    setIsRecording(false)
    setTimeRemaining(45 * 60)
    setCurrentTime(0)
  }

  // Save notes
  const saveNotes = () => {
    setInterview((prev) => ({ ...prev, notes }))
    // In a real app, you would call your API to save the notes
  }

  // Add note from AI
  const addNote = (note: string) => {
    setNotes((prev) => prev + (prev ? "\n\n" : "") + note)
  }

  return (
    <div className="container py-6 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
        <div>
          <h1 className="text-3xl font-bold">{interview.role} Interview</h1>
          <p className="text-muted-foreground">
            {new Date(interview.date).toLocaleDateString()} at {interview.time} ({interview.duration})
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <span className="text-xl font-mono">{formatTime(timeRemaining)}</span>
          </div>
          <div className="flex gap-2">
            {!isActive ? (
              <Button onClick={startTimer} size="sm">
                <PlayCircle className="mr-1 h-4 w-4" />
                Start
              </Button>
            ) : (
              <Button onClick={pauseTimer} size="sm" variant="outline">
                <PauseCircle className="mr-1 h-4 w-4" />
                Pause
              </Button>
            )}
            <Button onClick={resetTimer} size="sm" variant="outline">
              Reset
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Video Conference</CardTitle>
                <CardDescription>Connect with your interview partner</CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Switch id="analysis-toggle" checked={showAnalysis} onCheckedChange={setShowAnalysis} />
                  <Label htmlFor="analysis-toggle" className="text-sm">
                    <BarChart className="h-4 w-4 inline mr-1" />
                    Analysis
                  </Label>
                </div>
                <Button variant="outline" size="sm" className={isRecording ? "text-red-500" : ""}>
                  {isRecording ? <MicOff className="h-4 w-4 mr-1" /> : <Mic className="h-4 w-4 mr-1" />}
                  {isRecording ? "Recording" : "Record"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                <div className="text-center">
                  <Video className="h-12 w-12 mx-auto text-muted-foreground" />
                  <Button className="mt-4">Join Video Call</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Interview Notes</CardTitle>
                <CardDescription>Take notes during the interview</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Type your notes here..."
                  className="min-h-[200px]"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </CardContent>
              <CardFooter>
                <Button onClick={saveNotes}>Save Notes</Button>
              </CardFooter>
            </Card>

            {showAnalysis && (
              <div className="md:col-span-1 h-full">
                <InterviewAnalysisPanel
                  isRecording={isRecording}
                  interviewDuration={45 * 60}
                  currentTime={currentTime}
                  onAddNote={addNote}
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Participants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={interview.student.avatar} alt={interview.student.name} />
                    <AvatarFallback>{interview.student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{interview.student.name}</p>
                    <p className="text-sm text-muted-foreground">Student</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={interview.interviewer.avatar} alt={interview.interviewer.name} />
                    <AvatarFallback>{interview.interviewer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{interview.interviewer.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {interview.interviewer.role} at {interview.interviewer.company}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Suggested Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {interview.questions.map((question, index) => (
                  <li key={index} className="p-3 rounded-md border">
                    {question}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

