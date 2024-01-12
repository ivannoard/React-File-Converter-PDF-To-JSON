import React from "react";
import { Document, pdfjs, Page } from "react-pdf";
import Dropzone from "./components/Dropzone";
import Modal from "./components/Modal";
import axios from "axios";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function App() {
  const [isModalActive, setIsModalActive] = React.useState(false);
  const [PDFToBeConvert, setPDFToBeConvert] = React.useState(null);
  const [convertedPDF, setConvertedPDF] = React.useState(null);
  const [numPages, setNumPages] = React.useState();
  const [pageNumber, setPageNumber] = React.useState(1);
  const [responseStatus, setResponseStatus] = React.useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    console.log("successfully converted");
  }

  async function convertToJSOn(file) {
    const formData = new FormData();
    formData.append("pdf", file);
    try {
      const response = await axios.post(
        "http://localhost:8080/convert-to-json",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        setConvertedPDF(JSON.stringify(response.data, null, 2));
        setResponseStatus(response.status);
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  React.useEffect(() => {
    if (PDFToBeConvert) {
      convertToJSOn(PDFToBeConvert);
    }
  }, [PDFToBeConvert]);

  return (
    <>
      {isModalActive && <Modal setIsModalActive={setIsModalActive} />}
      <main className="pt-16">
        <div className="content  flex flex-col items-center justify-center">
          <div className="description mb-5 text-center">
            <h1 className="text-xl text-gray-600 font-semibold">
              Welcome To React PDF Converter To JSON
            </h1>
            <p className="text-lg text-gray-500">
              See the example file before you try it.
            </p>
            <div className="flex gap-4 items-center justify-center">
              {/* <button
                onClick={() => setIsModalActive(true)}
                className="mt-3 bg-blue-500 hover:bg-blue-300 transition text-white font-semibold rounded-md px-5 py-2"
              >
                Rules
              </button> */}
              <button className="mt-3 bg-blue-500 hover:bg-blue-300 transition text-white font-semibold rounded-md px-5 py-2">
                <a href="/assets/example-file-convert-to-json.pdf" download>
                  See Example File
                </a>
              </button>
            </div>
          </div>
          <Dropzone setFileToBeConvert={setPDFToBeConvert} />
        </div>
        {responseStatus === 200 && (
          <div className="grid grid-cols-12 justify-center px-10 mt-10 gap-3">
            <div className="col-span-6">
              <h4 className="text-lg text-gray-600 font-semibold">
                Preview PDF
              </h4>
              <p className="text-sm mb-2 text-gray-500">
                Page {pageNumber} of {numPages}
              </p>
              <Document
                file={PDFToBeConvert}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page
                  className="border-2"
                  pageNumber={pageNumber}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  registerPage={false}
                />
              </Document>
            </div>
            <div className="col-span-6">
              <h4 className="text-lg text-gray-600 font-semibold">JSON</h4>
              <p className="text-sm mb-2 text-gray-500">Converted File</p>
              <pre id="json-data" className="bg-gray-200 overflow-x-scroll p-2">
                {convertedPDF}
              </pre>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
