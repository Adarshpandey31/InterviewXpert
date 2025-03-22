import { useState } from "react"
import { Link } from "react-router";
import { ArrowLeft, Search, Filter, Building, Users, Briefcase, Calendar, Star, ChevronRight } from "lucide-react"
//components
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
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
} from "@/components/ui/dialog";
//mock data
import { companiesData } from "@/data/companiesMockData";
import { interviewersData } from "@/data/interviewerMockData";
import Footer from "@/components/footer";

export function CompanyInterviewsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCompany, setSelectedCompany] = useState<string>(companiesData[0].name)
  const [selectedRole, setSelectedRole] = useState<string>(companiesData[0].roles[0])
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
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 py-6 px-4">
        <div className="flex items-center gap-2 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/student/dashboard">
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
            <Select value={selectedCompany} onValueChange={(value) => setSelectedCompany(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Companies" />
              </SelectTrigger>
              <SelectContent>
                {companiesData.map((company) => (
                  <SelectItem key={company.id} value={company.name}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
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
          <TabsList className="grid w-full max-w-md grid-cols-2 mx-auto">
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
                              <Link to={`/student/company-interviews/${company.id}`}>
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
                      setSelectedCompany(companiesData[0].name)
                      setSelectedRole(companiesData[0].roles[0])
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
      <Footer />
    </div>
  )
}

