import React from "react";

interface TitleSectionProps {
  title: string;
  subheading?: string;
  highlighted?: string;
  pill: string;
}

const TitleSection: React.FC<TitleSectionProps> = ({
  title,
  subheading,
  pill,
  highlighted,
}) => {
  return (
    <section className="flex flex-col items-start justify-center gap-2 md:items-center">
      <article className="rounded-full mb-2 p-[1px] text-sm dark:bg-gradient-to-r dark:from-brand-primaryBlue dark:to-brand-primaryPurple">
        <div className="rounded-full px-3 py-3 dark:bg-black">{pill}</div>
      </article>
      {subheading ? (
        <>
          <h2 className="text-left text-3xl font-semibold sm:text-5xl md:text-center">
            {title} <span className="text-shadow-brand-primaryPurple">{highlighted}</span>
          </h2>
          <p className="sm:w-max-[450px] md:text-center dark:text-washed-purple-700">
            {subheading}
          </p>
        </>
      ) : (
        <h1 className="text-left text-4xl font-semibold sm:max-w-[850px] sm:text-6xl md:text-center">
          {title} <span className="text-shadow-brand-primaryPurple">{highlighted}</span>
        </h1>
      )}
    </section>
  );
};

export default TitleSection;
