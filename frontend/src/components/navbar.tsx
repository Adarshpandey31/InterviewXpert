import { Link } from 'react-router';
import { Button } from "@/components/ui/button";
const Navbar = () => {
    return (
        <header className="px-4 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
            <div className="container flex h-16 items-center justify-between">
                <Link to={"/"} className="flex items-center gap-2 font-bold">
                    <span className="text-primary text-xl">MockPrep</span>
                </Link>
                <nav className="lg:flex hidden items-center gap-6">
                    <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
                        About
                    </Link>
                    <Link to="/features" className="text-sm font-medium hover:text-primary transition-colors">
                        Features
                    </Link>
                    <Link to="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
                        Pricing
                    </Link>
                    <Link to="/login">
                        <Button variant="outline" size="sm">
                            Login
                        </Button>
                    </Link>
                    <Link to="/register">
                        <Button size="sm">Get Started</Button>
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default Navbar