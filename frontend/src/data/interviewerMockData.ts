// Mock data for scheduled interviews
export const scheduledInterviews = [
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
export const availabilitySlots = [
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

// Mock data for interviewers
export const interviewersData = [
    {
        id: 1,
        name: "Rahul Sharma",
        role: "Senior Software Engineer",
        company: "Google",
        experience: "7 years",
        specialization: "Algorithms, System Design",
        rating: 4.9,
        reviews: 45,
        availability: ["Mon 2-4 PM", "Wed 10-12 AM", "Fri 3-5 PM"],
        avatar: "/placeholder.svg?height=80&width=80",
    },
    {
        id: 2,
        name: "Priya Patel",
        role: "Technical Program Manager",
        company: "Amazon",
        experience: "6 years",
        specialization: "Leadership Principles, System Design",
        rating: 4.8,
        reviews: 38,
        availability: ["Tue 1-3 PM", "Thu 11-1 PM", "Sat 10-12 AM"],
        avatar: "/placeholder.svg?height=80&width=80",
    },
    {
        id: 3,
        name: "Vikram Singh",
        role: "Principal Engineer",
        company: "Microsoft",
        experience: "10 years",
        specialization: "Distributed Systems, Cloud Architecture",
        rating: 4.7,
        reviews: 52,
        availability: ["Mon 5-7 PM", "Wed 2-4 PM", "Fri 10-12 AM"],
        avatar: "/placeholder.svg?height=80&width=80",
    },
    {
        id: 4,
        name: "Ananya Desai",
        role: "Engineering Manager",
        company: "Google",
        experience: "8 years",
        specialization: "Leadership, Coding Interviews",
        rating: 4.9,
        reviews: 41,
        availability: ["Tue 9-11 AM", "Thu 3-5 PM", "Sat 1-3 PM"],
        avatar: "/placeholder.svg?height=80&width=80",
    },
    {
        id: 5,
        name: "Arjun Mehta",
        role: "Senior Product Manager",
        company: "Amazon",
        experience: "5 years",
        specialization: "Product Case Studies, Behavioral Interviews",
        rating: 4.6,
        reviews: 29,
        availability: ["Mon 1-3 PM", "Wed 4-6 PM", "Fri 9-11 AM"],
        avatar: "/placeholder.svg?height=80&width=80",
    },
]