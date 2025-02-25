import DocumentUploadForm from "@/components/document-upload-form";
import Steps from "@/components/steps";

const PersonalInfo = () => {
  return (
    <section className="py-large max-w-[550px] mx-auto w-full px-4 md:px-0">
      <Steps progress1={100} progress2={100} progress3={50} />
      <div className="mt-12 flex flex-col gap-8 md:gap-16">
        <h1 className="h-two font-bold text-center">Document Upload</h1>
        <DocumentUploadForm />
      </div>
    </section>
  );
};
export default PersonalInfo;
