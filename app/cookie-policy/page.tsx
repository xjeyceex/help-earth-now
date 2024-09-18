export default function CookiePolicy() {
    return (
        <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-r from-gray-50 to-gray-100 p-8">
            <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-gray-800 text-white p-6">
                    <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
                    <p className="text-lg mb-4">
                        This Cookie Policy explains what cookies are, how we use cookies, and your options regarding cookies on our website.
                    </p>
                </div>

                <div className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">What Are Cookies?</h2>
                    <p className="text-gray-700 mb-6">
                        Cookies are small text files placed on your device by a website. They are used to remember your preferences and enhance your experience on our site.
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Cookies</h2>
                    <p className="text-gray-700 mb-6">
                        We use cookies to:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-4">
                        <li>Enhance site functionality and user experience.</li>
                        <li>Analyze site traffic and usage to improve our service.</li>
                        <li>Provide certain functionalities like remembering your login details.</li>
                    </ul>
                    <span className="text-gray-600 block">
                        We do not and will never collect or store any personal information through cookies.
                    </span>

                    <br />

                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Managing Cookies</h2>
                    <p className="text-gray-700 mb-6">
                        You can manage or disable cookies through your browser settings. For detailed instructions, refer to your browser’s help section or visit{' '}
                        <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            www.aboutcookies.org
                        </a>.
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Choices</h2>
                    <p className="text-gray-700 mb-6">
                        By using our site, you consent to our use of cookies. You can withdraw your consent or manage cookie preferences at any time through your browser settings.
                    </p>

                </div>
            </div>
        </div>
    );
}
