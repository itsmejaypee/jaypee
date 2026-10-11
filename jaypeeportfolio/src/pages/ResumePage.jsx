import React, { useEffect, useRef, useState } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { PageHeader } from "../components/SectionHeader";

GlobalWorkerOptions.workerSrc = workerUrl;

function ResumePdfPage({ document, pageNumber }) {
  const canvasRef = useRef(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let disposed = false;
    let renderTask;
    document.getPage(pageNumber).then(page => {
      if (disposed) return;
      const canvas = canvasRef.current;
      const viewport = page.getViewport({ scale: 2 });
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      renderTask = page.render({ canvas, viewport });
      return renderTask.promise;
    }).catch(error => {
      if (!disposed && error.name !== "RenderingCancelledException") setError(true);
    });
    return () => { disposed = true; renderTask?.cancel(); };
  }, [document, pageNumber]);

  if (error) return <p role="alert" className="text-text-muted">Unable to display this page. Please refresh and try again.</p>;
  return <canvas ref={canvasRef} className="resume-page-canvas" role="img" aria-label={`Ron Jaypee V. Matienzo résumé, PDF page ${pageNumber}`} />;
}

export default function ResumePage() {
  const [pdf, setPdf] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let disposed = false;
    const loadingTask = getDocument({ url: "/assets/jaypee-resume.pdf" });
    loadingTask.promise.then(document => {
      if (!disposed) setPdf(document);
    }).catch(() => { if (!disposed) setError(true); });
    return () => { disposed = true; loadingTask.destroy(); };
  }, []);

  return (
    <section className="w-full max-w-3xl mx-auto px-6 py-10 md:py-14">
      <PageHeader title="Résumé" description="Ron Jaypee V. Matienzo · Computer Engineering Student" />
      <div className="resume-document mt-8">
        {error ? <p role="alert" className="text-text-muted">Unable to load the résumé. Please refresh and try again.</p> :
          pdf ? Array.from({ length: pdf.numPages }, (_, index) => <ResumePdfPage key={index} document={pdf} pageNumber={index + 1} />) :
          <p role="status" className="text-text-muted">Loading résumé…</p>}
      </div>
    </section>
  );
}
