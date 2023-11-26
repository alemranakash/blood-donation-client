



const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        {/* Logo or Site Name */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-4">A Blood Donation Hub</h1>
          <img className="w-36 rounded-md" src="https://i.ibb.co/gvMvxBN/life-bank.png" alt="" />
        </div>

        {/* Useful Links */}
        <div className="flex flex-wrap">
          <div className="mr-6 mb-4">
            <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
            <ul>
              <li className="mb-2"><a href="/" className="hover:text-orange-500">Home</a></li>
              <li className="mb-2"><a href="/blog" className="hover:text-orange-500">Blog</a></li>
              <li className="mb-2"><a href="/login" className="hover:text-orange-500">Login</a></li>
              <li className="mb-2"><a href="/register" className="hover:text-orange-500">Register</a></li>
            </ul>
          </div>

          <div className="mr-6 mb-4">
            <h2 className="text-lg font-semibold mb-2">Donate Blood</h2>
            <ul>
              <li className="mb-2"><a href="/searchPage" className="hover:text-orange-500">Search Doner</a></li>
              <li className="mb-2"><a href="/donation-request-home" className="hover:text-orange-500">Donation Requests</a></li>
            </ul>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Connect With Us</h2>
            <ul>
              <li className="mb-2"><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500">Facebook</a></li>
              <li className="mb-2"><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500">Twitter</a></li>
              <li className="mb-2"><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500">Instagram</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
