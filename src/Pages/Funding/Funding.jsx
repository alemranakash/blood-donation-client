import { useState } from "react";
import usePayment from "../../Hooks/usePayment";
import Navbar from "../../Components/Navbar";

const Funding = () => {
  const [payments, loading] = usePayment();
  const [formData, setFormData] = useState({
    amount: "",
  });

  if (loading) {
    console.log("Data is still loading. Please wait...");
    return <div>Loading...</div>;
  }

  console.log(payments);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDonate = () => {
    // For simplicity, let's assume the fields are filled correctly
    window.location.href = `/payment?amount=${formData.amount}`;
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="bg-gray-100 mt-10 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-500">
            Support the Cause
          </h1>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Donation Amount:
            </label>
            <div className="flex items-center border border-gray-300 p-2 rounded-md">
              <span className="text-gray-500">$</span>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full ml-2 focus:outline-none"
                placeholder="Enter amount"
              />
            </div>
          </div>
          <button
            className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            onClick={handleDonate}
          >
            Donate Now
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-3xl my-2 font-bold text-center mb-4">All Fundings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md">
            {/* head */}
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 text-center px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Amount</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Time</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment._id}>
                  <td className="py-2 text-center px-4 border-b">{index + 1}</td>
                  <td className="py-2 text-center px-4 border-b">{payment.name}</td>
                  <td className="py-2 text-center px-4 border-b">{payment.email}</td>
                  <td className="py-2 text-center px-4 border-b">{payment.totalAmount} $</td>
                  <td className="py-2 text-center px-4 border-b">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 text-center px-4 border-b">
                    {new Date(payment.date).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Funding;
