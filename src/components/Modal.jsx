import React from "react";

const Modal = ({ setIsModalActive }) => {
  return (
    <>
      <div className="fixed flex justify-center items-center w-full min-h-screen bg-black bg-opacity-30">
        <div className="card bg-white rounded-md p-5 w-1/3">
          <h1 className="font-semibold text-gray-900 text-center">
            Please Read Carefully
          </h1>
          <button
            onClick={() => setIsModalActive(false)}
            className="w-full mt-5 bg-white border py-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition font-semibold rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
