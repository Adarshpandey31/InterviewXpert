import { Link } from 'react-router';

const Footer = () => {
    return (
        <footer className="w-full border-t px-4 py-6">
            <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
                <p className="text-sm text-muted-foreground">© 2025 MockPrep. All rights reserved.</p>
                <nav className="flex gap-4">
                    <Link to="/terms" className="text-sm text-muted-foreground hover:underline">
                        Terms
                    </Link>
                    <Link to="/privacy" className="text-sm text-muted-foreground hover:underline">
                        Privacy
                    </Link>
                    <Link to="/contact" className="text-sm text-muted-foreground hover:underline">
                        Contact
                    </Link>
                </nav>
            </div>
        </footer>
    )
}

export default Footer;