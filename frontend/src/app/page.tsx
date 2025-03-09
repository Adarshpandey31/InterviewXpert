import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Star, Shield, Users, BarChart, Video, MessageSquare, Building } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <span className="text-primary text-xl">MockPrep</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-2">
                  #1 Interview Preparation Platform
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Master Your Interviews with <span className="text-primary">Real Professionals</span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  MockPrep connects you with industry professionals for company-specific mock interviews. Get
                  personalized feedback, AI-powered analysis, and targeted preparation for your dream job.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="w-full min-[400px]:w-auto">
                      Start Your Journey
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/subscription">
                    <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                      View Pricing Plans
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <Avatar key={i} className="border-2 border-background">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${i}`} />
                        <AvatarFallback>U{i}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">500+</span> students placed at top companies
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="relative bg-gradient-to-br from-muted/50 to-muted border rounded-xl overflow-hidden shadow-xl">
                  <img
                    alt="Mock Interview Platform"
                    className="aspect-video object-cover object-center"
                    height="310"
                    src="/placeholder.svg?height=620&width=1100&text=Interview+in+Progress"
                    width="550"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary text-primary-foreground">LIVE</Badge>
                      <span className="text-white text-sm">Google SWE Interview Practice</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Subscription Plans Section */}
        <section className="w-full py-12 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Choose Your Plan</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Select the perfect subscription that matches your interview preparation needs
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-4">
              {/* Free Plan */}
              <Card className="relative overflow-hidden border-muted-foreground/20">
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-500"></div>
                <CardHeader className="pb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-full text-gray-600 bg-gray-50">
                      <Users className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">Free Plan</CardTitle>
                  </div>
                  <CardDescription>Basic interview practice</CardDescription>
                  <div className="mt-4">
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-bold">₹0</span>
                      <span className="text-muted-foreground mb-1">/ forever</span>
                    </div>
                    <p className="text-sm mt-1">1 AI mock interview per month</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {[
                      "AI-powered mock interviews",
                      "Basic feedback reports",
                      "Limited question bank",
                      "Community forum access",
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/register?plan=free" className="w-full">
                    <Button variant="outline" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Basic Plan */}
              <Card className="relative overflow-hidden border-muted-foreground/20">
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                <CardHeader className="pb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-full text-blue-600 bg-blue-50">
                      <Users className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">Basic Plan</CardTitle>
                  </div>
                  <CardDescription>For casual interview practice</CardDescription>
                  <div className="mt-4">
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-bold">₹500</span>
                      <span className="text-muted-foreground mb-1">/ month</span>
                    </div>
                    <p className="text-sm mt-1">2 mock interviews per month</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {[
                      "Basic feedback reports",
                      "Interview recording access",
                      "Community forum access",
                      "Standard question bank",
                      "Limited trainer assistance",
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/register?plan=basic" className="w-full">
                    <Button variant="outline" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Professional Plan */}
              <Card className="relative overflow-hidden border-primary shadow-lg scale-[1.02] z-10">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
                  RECOMMENDED
                </div>
                <div className="absolute top-0 left-0 w-full h-1 bg-purple-500"></div>
                <CardHeader className="pb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-full text-purple-600 bg-purple-50">
                      <Star className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">Professional Plan</CardTitle>
                  </div>
                  <CardDescription>Dedicated interview coaching experience</CardDescription>
                  <div className="mt-4">
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-bold">₹2,000</span>
                      <span className="text-muted-foreground mb-1">/ month</span>
                    </div>
                    <p className="text-sm mt-1">5 mock interviews per month</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {[
                      "Personal interview trainer assigned",
                      "Comprehensive feedback with AI-powered analysis",
                      "Performance improvement tracking",
                      "Interview recordings with annotations",
                      "Extended question bank with solutions",
                      "Priority email support",
                      "Post-interview trainer consultations",
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/register?plan=professional" className="w-full">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Enterprise Plan */}
              <Card className="relative overflow-hidden border-muted-foreground/20">
                <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
                <CardHeader className="pb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-full text-amber-600 bg-amber-50">
                      <Shield className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">Enterprise Plan</CardTitle>
                  </div>
                  <CardDescription>Premium company-specific preparation</CardDescription>
                  <div className="mt-4">
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-bold">₹5,000</span>
                      <span className="text-muted-foreground mb-1">/ month</span>
                    </div>
                    <p className="text-sm mt-1">5 company-specific interviews per month</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {[
                      "Everything in Professional Plan",
                      "Elite personal trainer with experience at target companies",
                      "Company-specific interview preparation",
                      "Custom interview question bank based on real company questions",
                      "Advanced performance analytics",
                      "Priority scheduling with interviewers",
                      "Unlimited trainer consultations",
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/register?plan=enterprise" className="w-full">
                    <Button variant="outline" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to ace your next interview
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 transition-all hover:shadow-md">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <BarChart className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">AI-Powered Analysis</h3>
                <p className="text-center text-muted-foreground">
                  Real-time feedback on confidence, technical skills, and communication with detailed metrics.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 transition-all hover:shadow-md">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Video className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Live Mock Interviews</h3>
                <p className="text-center text-muted-foreground">
                  Practice with real industry professionals who have experience at top companies.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 transition-all hover:shadow-md">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MessageSquare className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Personal Trainer</h3>
                <p className="text-center text-muted-foreground">
                  Get assigned a dedicated interview coach who will guide your preparation journey.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 transition-all hover:shadow-md">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Building className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Company-Specific Prep</h3>
                <p className="text-center text-muted-foreground">
                  Tailored preparation for your target companies with insider knowledge and custom question banks.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 transition-all hover:shadow-md">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Expert Network</h3>
                <p className="text-center text-muted-foreground">
                  Access to a network of 500+ interviewers from Google, Amazon, Microsoft, and more.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 transition-all hover:shadow-md">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Star className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Proven Results</h3>
                <p className="text-center text-muted-foreground">
                  85% of our students successfully land offers at their target companies after our program.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Success Stories</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Hear from students who landed their dream jobs with MockPrep
                </p>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="h-12 w-12 border-2 border-primary/10">
                      <AvatarImage src="/placeholder.svg?height=48&width=48&text=PS" alt="Priya Sharma" />
                      <AvatarFallback>PS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Priya Sharma</p>
                      <p className="text-sm text-muted-foreground">Software Engineer at Google</p>
                    </div>
                  </div>
                  <p className="text-sm italic">
                    "The Professional Plan was exactly what I needed. My personal trainer helped me identify weaknesses
                    in my system design explanations that I never noticed before. After 8 mock interviews, I felt
                    confident and aced my Google interview!"
                  </p>
                  <div className="flex mt-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="h-12 w-12 border-2 border-primary/10">
                      <AvatarImage src="/placeholder.svg?height=48&width=48&text=RP" alt="Rahul Patel" />
                      <AvatarFallback>RP</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Rahul Patel</p>
                      <p className="text-sm text-muted-foreground">Product Manager at Amazon</p>
                    </div>
                  </div>
                  <p className="text-sm italic">
                    "The Enterprise Plan's company-specific preparation was a game-changer. My trainer had worked at
                    Amazon and knew exactly what they look for. The custom question bank had questions that came up in
                    my actual interview!"
                  </p>
                  <div className="flex mt-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="h-12 w-12 border-2 border-primary/10">
                      <AvatarImage src="/placeholder.svg?height=48&width=48&text=AD" alt="Ananya Desai" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Ananya Desai</p>
                      <p className="text-sm text-muted-foreground">Frontend Developer at Microsoft</p>
                    </div>
                  </div>
                  <p className="text-sm italic">
                    "I started with the Basic Plan for practice, then upgraded to Professional when I got serious about
                    my job search. The AI analysis helped me reduce my filler words and improve my technical
                    communication. Worth every rupee!"
                  </p>
                  <div className="flex mt-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Ace Your Interviews?
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed">
                  Join thousands of successful candidates who landed their dream jobs with MockPrep
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                <Link href="/register">
                  <Button size="lg" variant="secondary" className="w-full min-[400px]:w-auto">
                    Get Started Today
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/subscription">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full min-[400px]:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    View Pricing Plans
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-6 bg-muted/50">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">© 2025 MockPrep. All rights reserved.</p>
          <nav className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

