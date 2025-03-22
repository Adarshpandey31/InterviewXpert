// Mock data for upcoming interviews
export const upcomingInterviews = [
    {
        id: 1,
        company: "Google",
        role: "Frontend Developer",
        interviewer: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        date: "2025-03-10",
        time: "10:00 AM",
        duration: "45 minutes",
        status: "confirmed",
        questions: [
            "Tell me about your experience with React.",
            "How would you optimize a slow-loading website?",
            "Explain the concept of closures in JavaScript.",
            "How do you handle state management in large applications?",
        ],
        notes: ''
    },
    {
        id: 2,
        company: "Microsoft",
        role: "Software Engineer",
        interviewer: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        date: "2025-03-15",
        time: "2:00 PM",
        duration: "1 hour",
        status: "pending",
        questions: [
            "Tell me about your experience with React.",
            "How would you optimize a slow-loading website?",
            "Explain the concept of closures in JavaScript.",
            "How do you handle state management in large applications?",
        ],
        notes: ''
    },
]

// Mock data for available interviewers
export const availableInterviewers = [
    {
        id: 1,
        name: "David Wilson",
        company: "Amazon",
        role: "Senior Software Engineer",
        experience: "5 years",
        specialization: "System Design, Algorithms",
        availability: ["Mon 2-4 PM", "Wed 10-12 AM", "Fri 3-5 PM"],
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: 2,
        name: "Emily Rodriguez",
        company: "Facebook",
        role: "Frontend Engineer",
        experience: "4 years",
        specialization: "React, JavaScript, CSS",
        availability: ["Tue 1-3 PM", "Thu 11-1 PM", "Sat 10-12 AM"],
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: 3,
        name: "James Lee",
        company: "Netflix",
        role: "Backend Engineer",
        experience: "6 years",
        specialization: "Node.js, Databases, API Design",
        availability: ["Mon 5-7 PM", "Wed 2-4 PM", "Fri 10-12 AM"],
        avatar: "/placeholder.svg?height=40&width=40",
    },
]

// Mock data for past interviews with feedback
export const pastInterviews = [
    {
        id: 101,
        company: "Amazon",
        role: "Frontend Developer",
        interviewer: "David Wilson",
        date: "2025-02-20",
        time: "11:00 AM",
        status: "completed",
        feedbackId: "123",
        overallScore: 4,
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: 102,
        company: "Netflix",
        role: "UI Engineer",
        interviewer: "James Lee",
        date: "2025-02-15",
        time: "3:00 PM",
        status: "completed",
        feedbackId: "124",
        overallScore: 4.8,
        avatar: "/placeholder.svg?height=40&width=40",
    },
]

export const interviewFeedbacks = [
    {
        id: 123,
        interviewId: 101,
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
    },
    {
        id: 125,
        interviewId: 102,
        interview: {
            id: "456",
            role: "UI Engineer",
            company: "Netflix",
            date: "2025-02-15",
        },
        interviewer: {
            name: "James Lee",
            role: "Senior Software Engineer",
            company: "Netflix",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        scores: {
            technicalSkills: 5,
            communicationSkills: 4,
            problemSolving: 4.5,
            cultureFit: 4,
            overall: 4.8,
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
]

// Mock data for training modules
export const trainingModules = [
    {
        id: 1,
        title: "Technical Interview Fundamentals",
        description: "Master the basics of technical interviews with focus on algorithms and data structures",
        progress: 65,
        totalLessons: 12,
        completedLessons: 8,
        image: "/placeholder.svg?height=100&width=200",
    },
    {
        id: 2,
        title: "System Design Interview Prep",
        description: "Learn how to approach and solve system design questions for senior roles",
        progress: 30,
        totalLessons: 10,
        completedLessons: 3,
        image: "/placeholder.svg?height=100&width=200",
    },
    {
        id: 3,
        title: "Behavioral Interview Mastery",
        description: "Prepare compelling stories and answers for common behavioral questions",
        progress: 90,
        totalLessons: 8,
        completedLessons: 7,
        image: "/placeholder.svg?height=100&width=200",
    },
    {
        id: 4,
        title: "Amazon Leadership Principles",
        description: "Specialized training for Amazon interviews focusing on their leadership principles",
        progress: 10,
        totalLessons: 14,
        completedLessons: 1,
        image: "/placeholder.svg?height=100&width=200",
    },
]

// Mock data for skill assessment
export const skillAssessment = {
    overall: 72,
    technical: 68,
    communication: 85,
    problemSolving: 75,
    systemDesign: 60,
    codingSpeed: 65,
    algorithmKnowledge: 70,
    recentProgress: [65, 67, 68, 70, 72, 72, 75],
    weakAreas: ["Dynamic Programming", "System Design Scalability", "Concurrency"],
    strongAreas: ["Array Manipulation", "Communication", "Object-Oriented Design"],
}

// Mock data for practice questions
export const practiceQuestions = [
    {
        id: 1,
        question: "Implement a function to check if a binary tree is balanced",
        difficulty: "Medium",
        category: "Trees",
        lastAttempted: "2025-03-01",
        score: 85,
    },
    {
        id: 2,
        question: "Design a URL shortening service like bit.ly",
        difficulty: "Hard",
        category: "System Design",
        lastAttempted: "2025-02-28",
        score: 60,
    },
    {
        id: 3,
        question: "Find the kth largest element in an unsorted array",
        difficulty: "Medium",
        category: "Arrays",
        lastAttempted: "2025-03-05",
        score: 90,
    },
]