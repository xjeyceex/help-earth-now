import Link from "next/link";

export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-8 px-4 w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* About Non-Profit Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-sm">
              The Blue Planet Group is a non-profit organization dedicated to fighting climate change 
              through education, advocacy, and collaborative action. We work globally to promote 
              sustainability and environmental justice.
            </p>
          </div>
          
          {/* Privacy and Cookie Policies */}
          <div>
            <h3 className="text-xl font-bold mb-4">Policies</h3>
            <ul className="text-sm">
              <li className="mb-2">
                <Link href="/privacy-policy" className="underline text-blue-400">
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/cookie-policy" className="underline text-blue-400">
                  Cookie Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/terms-of-service" className="underline text-blue-400">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Email Registration Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Stay Informed</h3>
            <p className="text-sm mb-4">
              Sign up to receive occasional updates on our efforts, upcoming events, and climate news.
            </p>
            <form className="flex flex-col">
              <input 
                type="email" 
                className="mb-2 p-2 rounded text-gray-800"
                placeholder="Enter your email address"
              />
              <button 
                type="submit" 
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Subscribe
              </button>
            </form>
          </div>
  
        </div>
  
        {/* Bottom Section */}
        <div className="mt-8 text-center text-sm border-t border-gray-700 pt-4">
          <p>&copy; 2024 The Blue Planet Group. All rights reserved.</p>
        </div>
      </footer>
    );
  }
  