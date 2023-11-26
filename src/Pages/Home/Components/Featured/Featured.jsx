import React from 'react';

const Featured = () => {
  return (
    <div className="bg-blue-100 py-10 text-center">
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-orange-500 text-2xl mb-5">🌟 Donor Spotlight</h2>
        <p className="text-base text-gray-700 mb-8">
          Discover the inspiring stories of our incredible blood donors.
        </p>
        <div className="flex justify-around flex-wrap">
          {/* Display featured donor stories here */}
          <div className="w-96 mb-8 bg-white p-6 rounded-lg shadow-md transform transition-transform hover:scale-105">
            <img src="https://i.ibb.co/wscL5RJ/smile1-1.png" alt="Donor 1" className="w-full mb-4 rounded" />
            <p className="text-lg text-gray-600">
              "I donated blood for the first time, and the feeling was indescribable. Knowing that a small act on my part could save a life filled me with a sense of purpose and joy."
            </p>
          </div>
          <div className="w-96 mb-8 bg-white p-6 rounded-lg shadow-md transform transition-transform hover:scale-105">
            <img src="https://i.ibb.co/nL066FQ/smile2-1.png" alt="Donor 2" className="w-full mb-4 rounded" />
            <p className="text-lg text-gray-600">
              "When I heard about the urgent need for blood donations, I didn't hesitate. It's amazing how such a simple act can have a profound impact on someone's life. I encourage everyone to join this noble cause."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
