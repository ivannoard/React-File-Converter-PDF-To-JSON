import React from "react";
import Dropzone from "./components/Dropzone";
import Modal from "./components/Modal";

function App() {
  const [isModalActive, setIsModalActive] = React.useState(false);
  return (
    <>
      {isModalActive && <Modal setIsModalActive={setIsModalActive} />}
      <main className="w-full min-h-screen flex justify-center pt-20">
        <div className="content">
          <div className="description mb-5 text-center">
            <h1 className="text-xl text-gray-600 font-semibold">
              Welcome To React PDF Converter To JSON
            </h1>
            <p className="text-lg text-gray-500">
              See the rules before you try it.
            </p>
            <button
              onClick={() => setIsModalActive(true)}
              className="mt-3 bg-blue-500 hover:bg-blue-300 transition text-white font-semibold rounded-md px-5 py-2"
            >
              Rules
            </button>
          </div>
          <Dropzone />
        </div>
      </main>
    </>
  );
}

export default App;
