import BusinessInfoForm from "@/components/business-info-form";
import Steps from "@/components/steps";

const HomePage = () => {
  return (
    <section className="py-large max-w-[550px] mx-auto w-full px-4 md:px-0">
      <Steps progress1={50} progress2={0} progress3={0} />
      <div className="mt-12 flex flex-col gap-8  md:gap-16">
        <h1 className="h-two font-bold text-center">Bussiness Information</h1>
        <BusinessInfoForm />
      </div>
    </section>
  );
};
export default HomePage;
