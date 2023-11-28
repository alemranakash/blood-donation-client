

const ContactUs = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-around items-center mt-16 mb-16">
      {/* Contact Form */}
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-orange-500 mb-6">Contact Us</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
              placeholder="Your Name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
              placeholder="Your Email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="subject" className="block text-gray-600">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
              placeholder="Subject"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-600">Message</label>
            <textarea
              id="message"
              name="message"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
              placeholder="Your Message"
              rows="4"
            ></textarea>
          </div>

          <button
            type="button"
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Contact Information */}
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-orange-500 mb-6">Contact Information</h2>
        <p className="text-gray-700 mb-4">Feel free to reach out to us!</p>
        <p className="text-gray-700">
          Contact Number: <strong>+8801744930016</strong>
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
