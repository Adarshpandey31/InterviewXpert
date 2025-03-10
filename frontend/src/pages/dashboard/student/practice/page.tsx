import { useState } from "react"
import {Link} from "react-router"
import { ArrowLeft, BookOpen, CheckCircle, Code, Search, SlidersHorizontal, Tag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

// Mock practice questions data
const practiceQuestions = [
  {
    id: 1,
    question: "Implement a function to check if a binary tree is balanced",
    description:
      "A balanced tree is defined as a tree such that the heights of the two subtrees of any node never differ by more than one.",
    difficulty: "Medium",
    category: "Trees",
    tags: ["Binary Tree", "Recursion", "DFS"],
    company: "Amazon",
    attempts: 2,
    lastAttempted: "2025-03-01",
    score: 85,
    solved: true,
  },
  {
    id: 2,
    question: "Design a URL shortening service like bit.ly",
    description: "Explain the system architecture, database schema, and how you would handle redirects efficiently.",
    difficulty: "Hard",
    category: "System Design",
    tags: ["Database", "Scalability", "Hashing"],
    company: "Google",
    attempts: 1,
    lastAttempted: "2025-02-28",
    score: 60,
    solved: false,
  },
  {
    id: 3,
    question: "Find the kth largest element in an unsorted array",
    description:
      "Implement a function that finds the kth largest element in an unsorted array without sorting the entire array.",
    difficulty: "Medium",
    category: "Arrays",
    tags: ["Sorting", "Heap", "QuickSelect"],
    company: "Facebook",
    attempts: 3,
    lastAttempted: "2025-03-05",
    score: 90,
    solved: true,
  },
  {
    id: 4,
    question: "Implement LRU Cache",
    description: "Design and implement a data structure for Least Recently Used (LRU) cache.",
    difficulty: "Medium",
    category: "Data Structures",
    tags: ["Hash Table", "Linked List", "Design"],
    company: "Microsoft",
    attempts: 0,
    lastAttempted: null,
    score: 0,
    solved: false,
  },
  {
    id: 5,
    question: "Merge k Sorted Lists",
    description: "Merge k sorted linked lists and return it as one sorted list.",
    difficulty: "Hard",
    category: "Linked Lists",
    tags: ["Heap", "Divide and Conquer", "Linked List"],
    company: "Amazon",
    attempts: 1,
    lastAttempted: "2025-03-02",
    score: 75,
    solved: true,
  },
  {
    id: 6,
    question: "Design a distributed key-value store",
    description:
      "Design a scalable, highly available key-value store that can handle millions of operations per second.",
    difficulty: "Hard",
    category: "System Design",
    tags: ["Distributed Systems", "Consistency", "Scalability"],
    company: "Google",
    attempts: 2,
    lastAttempted: "2025-02-25",
    score: 65,
    solved: false,
  },
]

// Categories and tags for filtering
const categories = [
  "Arrays",
  "Strings",
  "Linked Lists",
  "Trees",
  "Graphs",
  "Dynamic Programming",
  "System Design",
  "Data Structures",
]
const difficulties = ["Easy", "Medium", "Hard"]
const companies = ["Amazon", "Google", "Facebook", "Microsoft", "Apple", "Netflix"]
const tags = [
  "Recursion",
  "DFS",
  "BFS",
  "Binary Search",
  "Two Pointers",
  "Heap",
  "Hash Table",
  "Sorting",
  "Greedy",
  "Backtracking",
]

export default function PracticePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Filter questions based on search and filters
  const filteredQuestions = practiceQuestions.filter((question) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.category.toLowerCase().includes(searchQuery.toLowerCase())

    // Category filter
    const matchesCategory = selectedCategory === null || question.category === selectedCategory

    // Difficulty filter
    const matchesDifficulty = selectedDifficulty === null || question.difficulty === selectedDifficulty

    // Company filter
    const matchesCompany = selectedCompany === null || question.company === selectedCompany

    // Tags filter
    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => question.tags.includes(tag))

    return matchesSearch && matchesCategory && matchesDifficulty && matchesCompany && matchesTags
  })

  // Calculate progress stats
  const totalQuestions = practiceQuestions.length
  const solvedQuestions = practiceQuestions.filter((q) => q.solved).length
  const progressPercentage = Math.round((solvedQuestions / totalQuestions) * 100)

  // Calculate difficulty breakdown
  const easyQuestions = practiceQuestions.filter((q) => q.difficulty === "Easy").length
  const mediumQuestions = practiceQuestions.filter((q) => q.difficulty === "Medium").length
  const hardQuestions = practiceQuestions.filter((q) => q.difficulty === "Hard").length

  // Calculate category breakdown
  const categoryBreakdown = categories
    .map((category) => {
      const questionsInCategory = practiceQuestions.filter((q) => q.category === category).length
      const solvedInCategory = practiceQuestions.filter((q) => q.category === category && q.solved).length
      return {
        category,
        total: questionsInCategory,
        solved: solvedInCategory,
        percentage: questionsInCategory > 0 ? Math.round((solvedInCategory / questionsInCategory) * 100) : 0,
      }
    })
    .filter((item) => item.total > 0)

  return (
    <div className="container py-6 max-w-5xl">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/dashboard/student">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Practice Questions</h1>
      </div>

      <Tabs defaultValue="questions" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="progress">Your Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="questions" className="mt-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
            <div className="w-full md:w-auto flex-1 flex items-center gap-2">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
            </div>
            <div className="w-full md:w-auto flex flex-wrap gap-2">
              <Select value={selectedDifficulty || ""} onValueChange={(value) => setSelectedDifficulty(value || null)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCategory || ""} onValueChange={(value) => setSelectedCategory(value || null)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCompany || ""} onValueChange={(value) => setSelectedCompany(value || null)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  {companies.map((company) => (
                    <SelectItem key={company} value={company}>
                      {company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Dialog open={showFilters} onOpenChange={setShowFilters}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Advanced Filters</DialogTitle>
                    <DialogDescription>Filter questions by specific tags and attributes</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Tags</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {tags.map((tag) => (
                          <div key={tag} className="flex items-center space-x-2">
                            <Checkbox
                              id={`tag-${tag}`}
                              checked={selectedTags.includes(tag)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedTags([...selectedTags, tag])
                                } else {
                                  setSelectedTags(selectedTags.filter((t) => t !== tag))
                                }
                              }}
                            />
                            <Label htmlFor={`tag-${tag}`}>{tag}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={() => setSelectedTags([])}>Reset</Button>
                    <Button onClick={() => setShowFilters(false)}>Apply Filters</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="space-y-4">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((question) => (
                <Card key={question.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{question.question}</h3>
                            {question.solved && <CheckCircle className="h-4 w-4 text-primary" />}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">{question.description}</p>
                        </div>
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

                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          {question.category}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          {question.company}
                        </Badge>
                        {question.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                        {question.tags.length > 2 && <Badge variant="outline">+{question.tags.length - 2} more</Badge>}
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2 border-t">
                        <div className="text-sm">
                          {question.attempts > 0 ? (
                            <div className="flex items-center gap-2">
                              <span>Score: {question.score}/100</span>
                              <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: `${question.score}%` }}></div>
                              </div>
                              <span className="text-muted-foreground">
                                {question.attempts} {question.attempts === 1 ? "attempt" : "attempts"}
                              </span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">Not attempted yet</span>
                          )}
                        </div>
                        <Button>
                          <Code className="mr-2 h-4 w-4" />
                          Practice Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 border rounded-lg">
                <h3 className="text-lg font-medium">No questions found</h3>
                <p className="text-muted-foreground mt-1">Try adjusting your filters</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory(null)
                    setSelectedDifficulty(null)
                    setSelectedCompany(null)
                    setSelectedTags([])
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="mt-6">
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
                        strokeDasharray={`${progressPercentage * 2.51} 251.2`}
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold">{progressPercentage}%</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {solvedQuestions}/{totalQuestions} questions solved
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Difficulty Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">Easy</span>
                      <span className="text-sm font-medium">{easyQuestions}</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: `${(easyQuestions / totalQuestions) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">Medium</span>
                      <span className="text-sm font-medium">{mediumQuestions}</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-500"
                        style={{ width: `${(mediumQuestions / totalQuestions) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">Hard</span>
                      <span className="text-sm font-medium">{hardQuestions}</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-500"
                        style={{ width: `${(hardQuestions / totalQuestions) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {practiceQuestions
                    .filter((q) => q.lastAttempted)
                    .sort((a, b) => new Date(b.lastAttempted!).getTime() - new Date(a.lastAttempted!).getTime())
                    .slice(0, 3)
                    .map((question) => (
                      <div key={question.id} className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${question.solved ? "bg-primary" : "bg-muted"}`}></div>
                        <div className="text-sm truncate">{question.question}</div>
                      </div>
                    ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Activity Log
                </Button>
              </CardFooter>
            </Card>
          </div>

          <h3 className="text-lg font-semibold mb-4">Progress by Category</h3>
          <div className="space-y-4">
            {categoryBreakdown.map((item) => (
              <Card key={item.category}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{item.category}</h4>
                    <span className="text-sm">
                      {item.solved}/{item.total} solved
                    </span>
                  </div>
                  <div className="space-y-1">
                    <Progress value={item.percentage} />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{item.percentage}% complete</span>
                      <span>{item.total - item.solved} remaining</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

