

import { Label } from "@/components/ui/label"

import { useState } from "react"
import {Link} from "react-router";
import { ArrowLeft, Search, Filter, Building, Users, Briefcase, Calendar, Star, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

// Mock data for companies
const companiesData = [
  {
    id: 1,
    name: "Google",
    logo: "/placeholder.svg?height=60&width=60",
    description: "Leading technology company specializing in internet-related services and products.",
    roles: ["Software Engineer", "Product Manager", "UX Designer", "Data Scientist"],
    interviewers: 12,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Amazon",
    logo: "/placeholder.svg?height=60&width=60",
    description: "Multinational technology company focusing on e-commerce, cloud computing, and digital streaming.",
    roles: ["Software Development Engineer", "Technical Program Manager", "Solutions Architect", "Product Manager"],
    interviewers: 15,
    rating: 4.7,
  },
  {
    id: 3,
    name: "Microsoft",
    logo: "/placeholder.svg?height=60&width=60",
    description:
      "Technology corporation that develops, manufactures, licenses, and sells computer software and consumer electronics.",
    roles: ["Software Engineer", "Program Manager", "Data Engineer", "Cloud Solutions Architect"],
    interviewers: 10,
    rating: 4.6,
  },
  {
    id: 4,
    name: "Facebook",
    logo: "/placeholder.svg?height=60&width=60",
    description: "Social media and technology company that builds products to connect people.",
    roles: ["Software Engineer", "Product Designer", "Data Scientist", "Research Scientist"],
    interviewers: 8,
    rating: 4.5,
  },
  {
    id: 5,
    name: "Apple",
    logo: "/placeholder.svg?height=60&width=60",
    description:
      "Technology company that designs, develops, and sells consumer electronics, computer software, and online services.",
    roles: ["Software Engineer", "Hardware Engineer", "Machine Learning Engineer", "Product Manager"],
    interviewers: 7,
    rating: 4.9,
  },
]

// Mock data for interviewers
const interviewersData = [
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

export default function CompanyInterviewsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null)
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("companies")

  // Filter companies based on search
  const filteredCompanies = companiesData.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Filter interviewers based on search, company, and role
  const filteredInterviewers = interviewersData.filter((interviewer) => {
    const matchesSearch =
      interviewer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interviewer.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interviewer.specialization.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCompany = !selectedCompany || interviewer.company === selectedCompany
    const matchesRole = !selectedRole || interviewer.role.includes(selectedRole)

    return matchesSearch && matchesCompany && matchesRole
  })

  // Get all available roles from companies
  const allRoles = Array.from(new Set(companiesData.flatMap((company) => company.roles))).sort()

  return (
    <div className="container py-6 max-w-6xl">
      <div className="flex items-center gap-2 mb-8">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/student">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Company-Specific Interviews</h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div className="w-full md:w-auto flex-1 flex items-center gap-2">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            placeholder={activeTab === "companies" ? "Search companies..." : "Search interviewers..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>

        <div className="w-full md:w-auto flex flex-wrap gap-2">
          <Select value={selectedCompany || ""} onValueChange={(value) => setSelectedCompany(value || null)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Companies" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Companies</SelectItem>
              {companiesData.map((company) => (
                <SelectItem key={company.id} value={company.name}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedRole || ""} onValueChange={(value) => setSelectedRole(value || null)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Roles</SelectItem>
              {allRoles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter Options</DialogTitle>
                <DialogDescription>Refine your search for companies and interviewers</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Experience Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any_experience_1">Any Experience</SelectItem>
                      <SelectItem value="junior">Junior (0-3 years)</SelectItem>
                      <SelectItem value="mid">Mid-Level (3-7 years)</SelectItem>
                      <SelectItem value="senior">Senior (7+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Specialization</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any_specialization_1">Any Specialization</SelectItem>
                      <SelectItem value="algorithms">Algorithms</SelectItem>
                      <SelectItem value="system-design">System Design</SelectItem>
                      <SelectItem value="behavioral">Behavioral</SelectItem>
                      <SelectItem value="product">Product</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Availability</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any_time_1">Any Time</SelectItem>
                      <SelectItem value="weekday">Weekdays</SelectItem>
                      <SelectItem value="weekend">Weekends</SelectItem>
                      <SelectItem value="morning">Mornings</SelectItem>
                      <SelectItem value="evening">Evenings</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Apply Filters</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="companies" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="interviewers">Interviewers</TabsTrigger>
        </TabsList>

        <TabsContent value="companies" className="mt-6">
          <div className="grid gap-6">
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((company) => (
                <Card key={company.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex items-center justify-center bg-muted rounded-lg p-4 h-24 w-24">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={company.logo} alt={company.name} />
                          <AvatarFallback>{company.name[0]}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-xl font-bold">{company.name}</h3>
                            <p className="text-muted-foreground">{company.description}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{company.rating}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {company.roles.map((role, index) => (
                            <Badge key={index} variant="outline">
                              {role}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{company.interviewers} interviewers available</span>
                          </div>
                          <Button asChild>
                            <Link href={`/dashboard/student/company-interviews/${company.id}`}>
                              View Interviewers
                              <ChevronRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 border rounded-lg">
                <h3 className="text-lg font-medium">No companies found</h3>
                <p className="text-muted-foreground mt-1">Try adjusting your search criteria</p>
                <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="interviewers" className="mt-6">
          <div className="grid gap-6">
            {filteredInterviewers.length > 0 ? (
              filteredInterviewers.map((interviewer) => (
                <Card key={interviewer.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={interviewer.avatar} alt={interviewer.name} />
                        <AvatarFallback>{interviewer.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                          <div>
                            <h3 className="text-xl font-bold">{interviewer.name}</h3>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Building className="h-4 w-4" />
                              <span>{interviewer.company}</span>
                              <span>•</span>
                              <Briefcase className="h-4 w-4" />
                              <span>{interviewer.role}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{interviewer.rating}</span>
                            <span className="text-sm text-muted-foreground">({interviewer.reviews} reviews)</span>
                          </div>
                        </div>
                        <div className="mb-4">
                          <p className="text-sm">
                            <span className="font-medium">Experience:</span> {interviewer.experience}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Specialization:</span> {interviewer.specialization}
                          </p>
                        </div>
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-2">Available slots:</p>
                          <div className="flex flex-wrap gap-2">
                            {interviewer.availability.map((slot, index) => (
                              <Badge key={index} variant="outline" className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {slot}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button>Book Interview</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 border rounded-lg">
                <h3 className="text-lg font-medium">No interviewers found</h3>
                <p className="text-muted-foreground mt-1">Try adjusting your search criteria</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCompany(null)
                    setSelectedRole(null)
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

