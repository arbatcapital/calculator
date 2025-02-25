import PersonalInfoForm from "@/components/personal-info-form";
import Steps from "@/components/steps";

const PersonalInfo = () => {
  return (
    <section className="py-large max-w-[550px] mx-auto w-full px-4 md:px-0">
      <Steps progress1={100} progress2={50} progress3={0} />
      <div className="mt-12 flex flex-col gap-8 md:gap-16">
        <h1 className="h-two font-bold text-center">Personal Information</h1>
        <PersonalInfoForm />
      </div>
    </section>
  );
};
export default PersonalInfo;
