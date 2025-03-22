import { Link } from 'react-router';
import { Button } from "@/components/ui/button";
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navArray = [{ link: "/about", text: "About" }, { link: "/features", text: "Features" }, { link: "/subscription", text: "Pricing" }];

const Navbar = () => {
    return (
        <header className="px-4 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
            <div className="container flex h-16 items-center justify-between">
                <Link to={"/"} className="flex items-center gap-2 font-bold">
                    <span className="text-primary text-xl">MockPrep</span>
                </Link>
                <nav className="lg:flex hidden items-center gap-6">
                    {navArray.map((data) => <Link to={data.link} className="text-sm font-medium hover:text-primary transition-colors">
                        {data.text}
                    </Link>)}
                    <Link to="/login">
                        <Button variant="outline" size="sm">
                            Login
                        </Button>
                    </Link>
                    <Link to="/register">
                        <Button size="sm">Get Started</Button>
                    </Link>
                </nav>
                <div className="lg:hidden flex items-center gap-4">
                    <Sheet>
                        <SheetTrigger>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu size={25} />
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="p-0 h-full flex flex-col">
                            <div className="flex flex-col gap-y-4 mt-12 px-4">
                                {navArray.map((data) => <Link to={data.link} className="font-medium hover:text-primary transition-colors">
                                    {data.text}
                                </Link>)}
                            </div>
                            <div className="mt-auto flex flex-col gap-y-3 px-4 pb-4 w-full">
                                <Link to="/login" className="w-full">
                                    <Button variant="outline" size="lg" className="w-full">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/register" className="w-full">
                                    <Button size="lg" className="w-full">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}

export default Navbar