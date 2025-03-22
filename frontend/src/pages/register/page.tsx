
import { useState, useEffect, useMemo } from "react"
import { Link, useLocation, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Check, Star, Shield, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import Navbar from "@/components/navbar";

// Update the form schema to include the free plan
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  role: z.enum(["student", "interviewer"], {
    required_error: "Please select a role.",
  }),
  plan: z.enum(["free", "basic", "professional", "enterprise"], {
    required_error: "Please select a subscription plan.",
  }),
})

export function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const defaultRole = queryParams.get("role") || "student";
  const defaultPlan = queryParams.get("plan") || "professional";

  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<"role" | "plan" | "details">("role")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: defaultRole as "student" | "interviewer",
      plan: defaultRole === "student" ? defaultPlan as "free" | "basic" | "professional" | "enterprise" : undefined,
    },
  })

  // Update form when URL params change
  useEffect(() => {
    if (queryParams.get("plan")) {
      form.setValue("plan", queryParams.get("plan") as "free" | "basic" | "professional" | "enterprise")
      setCurrentStep("details")
    }
    if (queryParams.get("role")) {
      form.setValue("role", queryParams.get("role") as "student" | "interviewer")
    }
  }, [queryParams, form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    // In a real app, you would call your API to register the user
    console.log(values)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)

    toast({
      title: "Registration successful!",
      description: `You have successfully registered as a ${values.role} with the ${values.plan} plan.`,
    })
    navigate("/login");
  }

  // Add the free plan to the plans array
  const plans = [
    {
      id: "free",
      name: "Free Plan",
      icon: <Users className="h-5 w-5" />,
      price: "₹0",
      period: "month",
      description: "Basic interview practice",
      features: [
        "1 AI mock interview per month",
        "Basic feedback reports",
        "Limited question bank",
        "Community forum access",
      ],
      color: "text-gray-600 bg-gray-50",
      recommended: false,
    },
    {
      id: "basic",
      name: "Basic Plan",
      icon: <Users className="h-5 w-5" />,
      price: "₹500",
      period: "month",
      description: "For casual interview practice",
      features: [
        "2 mock interviews per month",
        "Basic feedback reports",
        "Interview recording access",
        "Community forum access",
        "Limited trainer assistance",
      ],
      color: "text-blue-600 bg-blue-50",
      recommended: false,
    },
    {
      id: "professional",
      name: "Professional Plan",
      icon: <Star className="h-5 w-5" />,
      price: "₹2,000",
      period: "month",
      description: "Dedicated interview coaching experience",
      features: [
        "5 mock interviews per month",
        "Personal interview trainer assigned",
        "Comprehensive feedback with AI-powered analysis",
        "Performance improvement tracking",
        "Interview recordings with annotations",
        "Priority email support",
        "Post-interview trainer consultations",
      ],
      color: "text-purple-600 bg-purple-50",
      recommended: true,
    },
    {
      id: "enterprise",
      name: "Enterprise Plan",
      icon: <Shield className="h-5 w-5" />,
      price: "₹5,000",
      period: "month",
      description: "Premium company-specific preparation",
      features: [
        "5 company-specific interviews per month",
        "Elite personal trainer with experience at target companies",
        "Company-specific interview preparation",
        "Custom interview question bank based on real company questions",
        "Advanced performance analytics",
        "Priority scheduling with interviewers",
        "Unlimited trainer consultations",
      ],
      color: "text-amber-600 bg-amber-50",
      recommended: false,
    },
  ]

  // Handle next step logic: Skip plan selection for interviewers
  const handleNextStep = () => {
    if (currentStep === "role") {
      if (form.watch("role") === "student") {
        setCurrentStep("plan"); // Show plan step for students
      } else {
        setCurrentStep("details"); // Skip plan step for interviewers
      }
    } else if (currentStep === "plan") {
      setCurrentStep("details");
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === "details") {
      setCurrentStep("plan")
    } else if (currentStep === "plan") {
      setCurrentStep("role")
    }
  }
  return (
    <>
      <Navbar />
      <div className="container mx-auto flex px-4 py-4 flex-col items-center">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>Register to start using MockPrep for interview practice</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {currentStep === "role" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Step 1: Choose your role</h3>
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>I am a</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-3"
                            >
                              <Card className={`border ${field.value === "student" ? "border-primary" : "border-muted"}`}>
                                <CardContent>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="student" />
                                    </FormControl>
                                    <div className="space-y-1">
                                      <FormLabel className="font-medium">Student</FormLabel>
                                      <p className="text-sm text-muted-foreground">
                                        Looking for interview practice and preparation
                                      </p>
                                    </div>
                                  </FormItem>
                                </CardContent>
                              </Card>
                              <Card
                                className={`border ${field.value === "interviewer" ? "border-primary" : "border-muted"}`}
                              >
                                <CardContent>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="interviewer" />
                                    </FormControl>
                                    <div className="space-y-1">
                                      <FormLabel className="font-medium">Interviewer</FormLabel>
                                      <p className="text-sm text-muted-foreground">
                                        Company employee who can conduct interviews
                                      </p>
                                    </div>
                                  </FormItem>
                                </CardContent>
                              </Card>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="pt-4">
                      <Button type="button" onClick={handleNextStep} className="w-full">
                        Continue
                      </Button>
                    </div>
                  </div>
                )}

                {currentStep === "plan" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Step 2: Choose your subscription plan</h3>
                    <FormField
                      control={form.control}
                      name="plan"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-3"
                            >
                              {plans.map((plan) => (
                                <Card
                                  key={plan.id}
                                  className={`border relative overflow-hidden ${field.value === plan.id ? "border-primary" : "border-muted"}`}
                                >
                                  {plan.recommended && (
                                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
                                      RECOMMENDED
                                    </div>
                                  )}
                                  <CardContent className="p-4">
                                    <FormItem className="flex items-start space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value={plan.id} />
                                      </FormControl>
                                      <div className="space-y-2 w-full">
                                        <div className="flex items-center gap-2">
                                          <div className={`p-1.5 rounded-full ${plan.color}`}>{plan.icon}</div>
                                          <div>
                                            <FormLabel className="font-medium text-base">{plan.name}</FormLabel>
                                            <p className="text-sm text-muted-foreground">{plan.description}</p>
                                          </div>
                                          <div className="ml-auto">
                                            <span className="text-lg font-bold">{plan.price}</span>
                                            <span className="text-muted-foreground text-sm">/{plan.period}</span>
                                          </div>
                                        </div>
                                        <ul className="grid gap-2 pt-2">
                                          {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm">
                                              <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                              <span>{feature}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    </FormItem>
                                  </CardContent>
                                </Card>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-between pt-4">
                      <Button type="button" variant="outline" onClick={handlePreviousStep}>
                        Back
                      </Button>
                      <Button type="button" onClick={handleNextStep}>
                        Continue
                      </Button>
                    </div>
                  </div>
                )}

                {currentStep === "details" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Step 3: Your details</h3>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john.doe@example.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input placeholder="********" type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-between pt-4">
                      <Button type="button" variant="outline" onClick={handlePreviousStep}>
                        Back
                      </Button>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Registering..." : "Complete Registration"}
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}

