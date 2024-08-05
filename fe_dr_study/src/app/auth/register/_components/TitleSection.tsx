interface TitleSectionProps {
    title: string;
    guide: string;
    totalStep: number;
    currentStep: number;
}
const TitleSection = (props: TitleSectionProps): React.ReactNode => {
    const { title, guide, totalStep, currentStep } = props;

    return (
        <section className="TITLE-SECTION w-1/2 h-1/4 flex flex-col justify-center">
            <div className="TITLE-AND-PAHSE items-center flex flex-col justify-center w-full h-max">
                <div className="TITLE-TEXT text-dr-header-2 font-bold w-full text-center">
                    {title}
                </div>
                <div className="SUBTITLE-TEXT text-dr-body-4 font-semibold text-dr-coral-100 w-full text-center">
                    {guide}
                </div>
                <div className="BAR-PHASE mt-8 w-4/6 h-max pb-6">
                    <div className="relative w-full h-max">
                        <div className="absolute top-[0.375rem] left-0 w-full border-[1px] border-dr-indigo-100 z-0"></div>
                        <div className="absolute top-0 left-0 w-full flex flex-row justify-around z-10">
                            {Array.from({ length: totalStep - 1 }).map(
                                (_, i) => {
                                    return (
                                        <div
                                            key={i}
                                            className={`w-3 h-3 bg-dr-coral-300 rounded-full shadow-md border-[1px] transition-colors duration-300 ${i === currentStep ? 'border-dr-white' : 'border-dr-coral-300'}`}
                                        ></div>
                                    );
                                },
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TitleSection;
