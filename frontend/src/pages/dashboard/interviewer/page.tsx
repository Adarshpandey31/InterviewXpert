

import { useState } from "react"
import Link from "next/link"
import { CalendarIcon, Clock, LogOut, Plus, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "@/components/ui/use-toast"

// Mock data for scheduled interviews
const scheduledInterviews = [
  {
    id: 1,
    student: "Alex Johnson",
    role: "Frontend Developer",
    date: "2025-03-10",
    time: "10:00 AM",
    status: "confirmed",
  },
  {
    id: 2,
    student: "Jamie Smith",
    role: "Software Engineer",
    date: "2025-03-15",
    time: "2:00 PM",
    status: "pending",
  },
]

// Mock data for availability slots
const availabilitySlots = [
  {
    id: 1,
    day: "Monday",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    isBooked: false,
  },
  {
    id: 2,
    day: "Wednesday",
    startTime: "2:00 PM",
    endTime: "4:00 PM",
    isBooked: true,
  },
  {
    id: 3,
    day: "Friday",
    startTime: "1:00 PM",
    endTime: "3:00 PM",
    isBooked: false,
  },
]

const availabilityFormSchema = z.object({
  day: z.string({
    required_error: "Please select a day.",
  }),
  startTime: z.string({
    required_error: "Please select a start time.",
  }),
  endTime: z.string({
    required_error: "Please select an end time.",
  }),
})

export default function InterviewerDashboard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const form = useForm<z.infer<typeof availabilityFormSchema>>({
    resolver: zodResolver(availabilityFormSchema),
    defaultValues: {
      day: "",
      startTime: "",
      endTime: "",
    },
  })

  function onSubmit(values: z.infer<typeof availabilityFormSchema>) {
    console.log(values)

    // In a real app, you would call your API to add the availability slot

    toast({
      title: "Availability added",
      description: `Added availability for ${values.day} from ${values.startTime} to ${values.endTime}`,
    })

    setIsDialogOpen(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <span className="text-primary">MockPrep</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/dashboard/interviewer/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/logout">
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <h1 className="text-3xl font-bold mb-6">Interviewer Dashboard</h1>

        <Tabs defaultValue="scheduled" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="past">Past Interviews</TabsTrigger>
          </TabsList>

          <TabsContent value="scheduled" className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Your Scheduled Interviews</h2>
            {scheduledInterviews.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {scheduledInterviews.map((interview) => (
                  <Card key={interview.id}>
                    <CardHeader>
                      <CardTitle>{interview.role}</CardTitle>
                      <CardDescription>Interview with {interview.student}</CardDescription>
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
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Start Interview</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No scheduled interviews</h3>
                <p className="text-muted-foreground mt-1">Add your availability to get interview requests</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="availability" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Your Availability</h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Availability
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Availability</DialogTitle>
                    <DialogDescription>Set your available time slots for conducting interviews.</DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="day"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Day</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a day" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="monday">Monday</SelectItem>
                                <SelectItem value="tuesday">Tuesday</SelectItem>
                                <SelectItem value="wednesday">Wednesday</SelectItem>
                                <SelectItem value="thursday">Thursday</SelectItem>
                                <SelectItem value="friday">Friday</SelectItem>
                                <SelectItem value="saturday">Saturday</SelectItem>
                                <SelectItem value="sunday">Sunday</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="startTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Time</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select start time" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                                <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                                <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                                <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                                <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                                <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                                <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                                <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                                <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="endTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Time</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select end time" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                                <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                                <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                                <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                                <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                                <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                                <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                                <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                                <SelectItem value="6:00 PM">6:00 PM</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button type="submit">Add Slot</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            {availabilitySlots.length > 0 ? (
              <div className="grid gap-4">
                {availabilitySlots.map((slot) => (
                  <Card key={slot.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{slot.day}</h3>
                          <p className="text-sm text-muted-foreground">
                            {slot.startTime} - {slot.endTime}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {slot.isBooked ? <Badge>Booked</Badge> : <Badge variant="outline">Available</Badge>}
                          {!slot.isBooked && (
                            <Button variant="outline" size="sm">
                              Remove
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No availability slots</h3>
                <p className="text-muted-foreground mt-1">
                  Add your first availability slot to start receiving interview requests
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-6">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No past interviews</h3>
              <p className="text-muted-foreground mt-1">Your completed interviews will appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <footer className="w-full border-t py-4">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">© 2025 MockPrep. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

