import { useState } from "react";
import {
  Check,
  CreditCard,
  Star,
  Shield,
  Zap,
  Users,
  Calendar,
  Video,
  FileText,
  BarChart,
  Award,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Testimonials from "@/components/testimonials";

export function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly">("monthly")
  const [selectedPlan, setSelectedPlan] = useState<"free" | "basic" | "professional" | "enterprise">("professional")

  // Add a Free tier to the plans array
  const plans = {
    free: {
      name: "Free Plan",
      icon: <Users className="h-5 w-5" />,
      description: "Basic interview practice",
      monthly: {
        price: "₹0",
        duration: "Unlimited",
        interviews: "1 AI mock interview per month",
        savings: 'Always Free'
      },
      quarterly: {
        price: "₹0",
        duration: "Unlimited",
        interviews: "1 AI mock interview per month",
        savings: "Always Free",
      },
      features: [
        "AI-powered mock interviews",
        "Basic feedback reports",
        "Limited question bank",
        "Community forum access",
      ],
      notIncluded: ["Human interview feedback", "Personal interview trainer", "Company-specific preparation"],
      color: "bg-gray-50 border-gray-200",
      textColor: "text-gray-600",
      buttonVariant: "outline" as const,
      recommended: false,
    },
    basic: {
      name: "Basic Plan",
      icon: <Users className="h-5 w-5" />,
      description: "For casual interview practice",
      monthly: {
        price: "₹500",
        duration: "1 Month",
        interviews: "2 mock interviews",
        savings: 'No savings'
      },
      quarterly: {
        price: "₹1,350",
        duration: "3 Months",
        interviews: "6 mock interviews",
        savings: "Save ₹150",
      },
      features: [
        "Basic feedback reports",
        "Interview recording access",
        "Community forum access",
        "Standard question bank",
        "Limited trainer assistance",
      ],
      notIncluded: ["Dedicated personal interview trainer", "AI-powered analysis", "Company-specific preparation"],
      color: "bg-blue-50 border-blue-200",
      textColor: "text-blue-600",
      buttonVariant: "outline" as const,
      recommended: false,
    },
    professional: {
      name: "Professional Plan",
      icon: <Star className="h-5 w-5" />,
      description: "Dedicated interview coaching experience",
      monthly: {
        price: "₹2,000",
        duration: "1 Month",
        interviews: "5 mock interviews",
        savings: 'No savings'
      },
      quarterly: {
        price: "₹5,000",
        duration: "3 Months",
        interviews: "15 mock interviews",
        savings: "Save ₹1,000",
      },
      features: [
        "Personal interview trainer assigned",
        "Comprehensive feedback with AI-powered analysis",
        "Performance improvement tracking",
        "Interview recordings with annotations",
        "Extended question bank with solutions",
        "Priority email support",
        "Post-interview trainer consultations",
      ],
      notIncluded: ["Company-specific preparation", "Custom interview question bank"],
      color: "bg-purple-50 border-purple-200",
      textColor: "text-purple-600",
      buttonVariant: "default" as const,
      recommended: true,
    },
    enterprise: {
      name: "Enterprise Plan",
      icon: <Shield className="h-5 w-5" />,
      description: "Premium company-specific preparation",
      monthly: {
        price: "₹5,000",
        duration: "1 Month",
        interviews: "5 company-specific interviews",
        savings: 'No savings'
      },
      quarterly: {
        price: "₹12,000",
        duration: "3 Months",
        interviews: "15 company-specific interviews",
        savings: "Save ₹3,000",
      },
      features: [
        "Everything in Professional Plan",
        "Elite personal trainer with experience at target companies",
        "Company-specific interview preparation",
        "Custom interview question bank based on real company questions",
        "Advanced performance analytics",
        "Priority scheduling with interviewers",
        "Dedicated account manager",
        "Unlimited trainer consultations",
      ],
      notIncluded: [],
      color: "bg-amber-50 border-amber-200",
      textColor: "text-amber-600",
      buttonVariant: "outline" as const,
      recommended: false,
    },
  }

  // const selectedPlanDetails = plans[selectedPlan][billingCycle]

  return (
    <div className="flex-1">
      <Navbar />
      <div className="px-4">
        <div className="text-center my-12">
          <h2 className="text-3xl font-bold mb-3">Elevate Your Interview Readiness</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Choose the plan that matches your career goals and interview preparation needs
          </p>
        </div>
        <div className="flex justify-center mb-8">
          <div className="bg-muted rounded-lg p-1.5">
            <Tabs
              defaultValue="monthly"
              className="w-[400px]"
              onValueChange={(value) => setBillingCycle(value as "monthly" | "quarterly")}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="quarterly">
                  Quarterly
                  <Badge variant="outline" className="ml-2 bg-green-50 text-green-600 border-green-200">
                    Save up to 20%
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        {/* Update the grid to include the free tier in the rendering section */}
        <div className="grid gap-8 lg:grid-cols-4 mb-12">
          {(Object.keys(plans) as Array<keyof typeof plans>).map((planKey) => {
            const plan = plans[planKey]
            const planDetails = plan[billingCycle]

            return (
              <Card
                key={planKey}
                className={`relative overflow-hidden transition-all duration-200 ${selectedPlan === planKey
                    ? "border-primary shadow-lg scale-[1.02] z-10"
                    : "hover:border-muted-foreground/20"
                  } ${plan.recommended ? "border-primary/50" : ""}`}
              >
                {plan.recommended && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
                    Recommended
                  </div>
                )}
                <CardHeader className={`pb-8 ${plan.color} rounded-b-[2rem] -mx-6 -mt-6 px-8 pt-8`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1.5 rounded-full ${plan.textColor} bg-white`}>{plan.icon}</div>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                  </div>
                  <CardDescription className="text-sm">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-bold">{planDetails.price}</span>
                      <span className="text-muted-foreground mb-1">/ {planDetails.duration}</span>
                    </div>
                    <p className="text-sm mt-1">{planDetails.interviews}</p>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {billingCycle === "quarterly" && planDetails.savings && (
                    <div className="bg-green-50 text-green-700 px-3 py-1.5 rounded-md text-sm font-medium mb-4 inline-block">
                      {planDetails.savings}
                    </div>
                  )}
                  <h4 className="font-medium text-sm mb-3">What's included:</h4>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.notIncluded.length > 0 && (
                    <>
                      <h4 className="font-medium text-sm mb-3 text-muted-foreground">Not included:</h4>
                      <ul className="space-y-2 mb-4">
                        {plan.notIncluded.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="h-4 w-4 border-2 rounded-full border-muted-foreground/30 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={selectedPlan === planKey ? "default" : plan.buttonVariant}
                    onClick={() => setSelectedPlan(planKey)}
                  >
                    {selectedPlan === planKey ? "Selected" : "Select Plan"}
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Complete Your Subscription</CardTitle>
            <CardDescription>
              You've selected the {plans[selectedPlan].name} ({billingCycle}) for{" "}
              {plans[selectedPlan][billingCycle].price}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="payment-method">Payment Method</Label>
                <RadioGroup defaultValue="card" id="payment-method">
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Credit/Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi">UPI</Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="netbanking" id="netbanking" />
                    <Label htmlFor="netbanking">Net Banking</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Subscribe Now</Button>
          </CardFooter>
        </Card>
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">Why Choose MockPrep Premium?</h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
              <h4 className="text-lg font-medium mb-2">AI-Powered Analysis</h4>
              <p className="text-muted-foreground">
                Our advanced AI analyzes your speech patterns, confidence levels, and technical accuracy in real-time
                during mock interviews.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h4 className="text-lg font-medium mb-2">Industry Professionals</h4>
              <p className="text-muted-foreground">
                Practice with interviewers who have actual experience at top companies like Google, Amazon, Microsoft, and
                more.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h4 className="text-lg font-medium mb-2">Proven Results</h4>
              <p className="text-muted-foreground">
                Our students have secured positions at top tech companies with an 85% success rate after completing our
                premium programs.
              </p>
            </div>
          </div>
        </div>
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">What Our Students Say</h3>
          <Testimonials/>
        </div>
        <div className="bg-muted p-8 rounded-lg mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
              <p className="text-muted-foreground mb-6">
                Our team is here to help you choose the right plan for your career goals. Schedule a free consultation
                call with our interview experts.
              </p>
              <Button>Schedule Consultation</Button>
            </div>
            <div className="md:w-1/3 grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center p-4 bg-background rounded-lg border">
                <Calendar className="h-8 w-8 text-primary mb-2" />
                <p className="text-sm font-medium">Flexible Scheduling</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-background rounded-lg border">
                <Video className="h-8 w-8 text-primary mb-2" />
                <p className="text-sm font-medium">HD Video Calls</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-background rounded-lg border">
                <FileText className="h-8 w-8 text-primary mb-2" />
                <p className="text-sm font-medium">Detailed Reports</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-background rounded-lg border">
                <Zap className="h-8 w-8 text-primary mb-2" />
                <p className="text-sm font-medium">Fast Results</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

