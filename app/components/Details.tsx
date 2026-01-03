import { cn } from "~/lib/utils";
import {
    Accordion,
    AccordionContent,
    AccordionHeader,
    AccordionItem,
} from "./Accordion";

const ScoreBadge = ({ score }: { score: number }) => {
  return (
      <div
          className={cn(
              "flex flex-row gap-1 items-center px-2 py-0.5 rounded-[96px]",
              score > 69
                  ? "bg-badge-green"
                  : score > 39
                      ? "bg-badge-yellow"
                      : "bg-badge-red"
          )}
      >
        <img
            src={score > 69 ? "/icons/check.svg" : "/icons/warning.svg"}
            alt="score"
            className="size-4"
        />
        <p
            className={cn(
                "text-sm font-medium",
                score > 69
                    ? "text-badge-green-text"
                    : score > 39
                        ? "text-badge-yellow-text"
                        : "text-badge-red-text"
            )}
        >
          {score}/100
        </p>
      </div>
  );
};

const CategoryHeader = ({
                          title,
                          categoryScore,
                        }: {
  title: string;
  categoryScore: number;
}) => {
  return (
      <div className="flex flex-row gap-4 items-center">
        <p className="text-xl lg:text-2xl font-bold text-gray-900">{title}</p>
        <ScoreBadge score={categoryScore} />
      </div>
  );
};

const CategoryContent = ({
                           tips,
                         }: {
  tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
  return (
      <div className="flex flex-col gap-6 w-full">
        {/* Quick Overview Grid */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 w-full rounded-xl px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-3 border border-gray-200/60">
          {tips.map((tip, index) => (
              <div 
                className={`flex flex-row gap-2.5 items-center p-2.5 rounded-lg transition-all duration-200 ${
                  tip.type === "good" 
                    ? "bg-green-50/50 border border-green-200/40" 
                    : "bg-amber-50/50 border border-amber-200/40"
                } hover:shadow-sm`} 
                key={index}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  tip.type === "good" ? "bg-green-100" : "bg-amber-100"
                }`}>
                  <img
                      src={
                        tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"
                      }
                      alt="score"
                      className="w-4 h-4"
                  />
                </div>
                <p className="text-sm lg:text-base font-medium text-gray-700">{tip.tip}</p>
              </div>
          ))}
        </div>
        
        {/* Detailed Explanations */}
        <div className="flex flex-col gap-4 w-full">
          {tips.map((tip, index) => (
              <div
                  key={index + tip.tip}
                  className={cn(
                      "flex flex-col gap-3 rounded-xl p-5 border transition-all duration-300 hover:shadow-md",
                      tip.type === "good"
                          ? "bg-gradient-to-br from-green-50/80 to-green-50/40 border-green-200/60 text-green-800"
                          : "bg-gradient-to-br from-amber-50/80 to-amber-50/40 border-amber-200/60 text-amber-800"
                  )}
              >
                <div className="flex flex-row gap-3 items-center">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    tip.type === "good" ? "bg-green-100" : "bg-amber-100"
                  }`}>
                    <img
                        src={
                          tip.type === "good"
                              ? "/icons/check.svg"
                              : "/icons/warning.svg"
                        }
                        alt="score"
                        className="w-5 h-5"
                    />
                  </div>
                  <p className="text-lg lg:text-xl font-bold">{tip.tip}</p>
                </div>
                <p className="text-sm lg:text-base leading-relaxed pl-11">{tip.explanation}</p>
              </div>
          ))}
        </div>
      </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  return (
      <div className="flex flex-col gap-3 w-full">
        <Accordion>
          <AccordionItem id="tone-style">
            <AccordionHeader itemId="tone-style" className="bg-white hover:bg-gray-50/50 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-200">
              <CategoryHeader
                  title="Tone & Style"
                  categoryScore={feedback.toneAndStyle.score}
              />
            </AccordionHeader>
            <AccordionContent itemId="tone-style" className="bg-white rounded-b-xl">
              <CategoryContent tips={feedback.toneAndStyle.tips} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem id="content">
            <AccordionHeader itemId="content" className="bg-white hover:bg-gray-50/50 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-200">
              <CategoryHeader
                  title="Content"
                  categoryScore={feedback.content.score}
              />
            </AccordionHeader>
            <AccordionContent itemId="content" className="bg-white rounded-b-xl">
              <CategoryContent tips={feedback.content.tips} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem id="structure">
            <AccordionHeader itemId="structure" className="bg-white hover:bg-gray-50/50 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-200">
              <CategoryHeader
                  title="Structure"
                  categoryScore={feedback.structure.score}
              />
            </AccordionHeader>
            <AccordionContent itemId="structure" className="bg-white rounded-b-xl">
              <CategoryContent tips={feedback.structure.tips} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem id="skills">
            <AccordionHeader itemId="skills" className="bg-white hover:bg-gray-50/50 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-200">
              <CategoryHeader
                  title="Skills"
                  categoryScore={feedback.skills.score}
              />
            </AccordionHeader>
            <AccordionContent itemId="skills" className="bg-white rounded-b-xl">
              <CategoryContent tips={feedback.skills.tips} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
  );
};

export default Details;
