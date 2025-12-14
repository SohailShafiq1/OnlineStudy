import React, { useState } from 'react';
import Button from './Button';

/**
 * PDFViewer Component - Display and download PDFs
 * @param {string} pdfUrl - URL to the PDF file
 * @param {string} title - Document title
 */
const PDFViewer = ({ pdfUrl, title }) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const handleDownload = () => {
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 my-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">📄 {title}</h3>
      
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Button 
          text="📥 Download PDF" 
          onClick={handleDownload}
          variant="primary"
        />
        <Button 
          text={isViewerOpen ? "Hide PDF" : "👁️ View PDF"}
          onClick={() => setIsViewerOpen(!isViewerOpen)}
          variant="secondary"
        />
      </div>

      {/* PDF Viewer */}
      {isViewerOpen && (
        <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
          <iframe
            src={pdfUrl}
            className="w-full h-[600px]"
            title={title}
          >
            <p>Your browser does not support PDFs. 
              <a href={pdfUrl} className="text-primary underline">Download the PDF</a>
            </p>
          </iframe>
        </div>
      )}

      {/* Fallback message */}
      {!pdfUrl && (
        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 text-center">
          <p className="text-yellow-800">📁 PDF will be available soon!</p>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
