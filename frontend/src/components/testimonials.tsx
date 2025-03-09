import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react"

// Testimonials data
const testimonials = [
    {
        name: "Priya Sharma",
        role: "Software Engineer at Google",
        avatar: "/placeholder.svg?height=60&width=60",
        content:
            "The Professional Plan was exactly what I needed. My personal trainer helped me identify weaknesses in my system design explanations that I never noticed before. After 8 mock interviews, I felt confident and aced my Google interview!",
    },
    {
        name: "Rahul Patel",
        role: "Product Manager at Amazon",
        avatar: "/placeholder.svg?height=60&width=60",
        content:
            "The Enterprise Plan's company-specific preparation was a game-changer. My trainer had worked at Amazon and knew exactly what they look for. The custom question bank had questions that came up in my actual interview!",
    },
    {
        name: "Ananya Desai",
        role: "Frontend Developer at Microsoft",
        avatar: "/placeholder.svg?height=60&width=60",
        content:
            "I started with the Basic Plan for practice, then upgraded to Professional when I got serious about my job search. The AI analysis helped me reduce my filler words and improve my technical communication. Worth every rupee!",
    },
]

const Testimonials = () => {
    return (
        <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
                <Card key={index} className="overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                            <Avatar className="h-12 w-12 border-2 border-primary/10">
                                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium">{testimonial.name}</p>
                                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                            </div>
                        </div>
                        <p className="text-sm italic">"{testimonial.content}"</p>
                        <div className="flex mt-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default Testimonials;