// This file defines the database schema for the application
// In a real app, you would use Prisma or another ORM

export type User = {
  id: string
  name: string
  email: string
  password: string // In a real app, this would be hashed
  role: "student" | "interviewer"
  createdAt: Date
  updatedAt: Date
}

export type StudentProfile = {
  id: string
  userId: string
  education: string
  skills: string[]
  experience: string
  resumeUrl?: string
  createdAt: Date
  updatedAt: Date
}

export type InterviewerProfile = {
  id: string
  userId: string
  company: string
  role: string
  experience: string
  specialization: string[]
  createdAt: Date
  updatedAt: Date
}

export type AvailabilitySlot = {
  id: string
  interviewerId: string
  day: string
  startTime: string
  endTime: string
  isBooked: boolean
  createdAt: Date
  updatedAt: Date
}

export type Interview = {
  id: string
  studentId: string
  interviewerId: string
  availabilitySlotId: string
  role: string
  date: string
  time: string
  duration: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  feedback?: string
  rating?: number
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export type Company = {
  id: string
  name: string
  logo?: string
  description?: string
  createdAt: Date
  updatedAt: Date
}

export type Role = {
  id: string
  name: string
  companyId?: string
  description?: string
  createdAt: Date
  updatedAt: Date
}

