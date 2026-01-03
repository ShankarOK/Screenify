import ScoreBadge from "~/components/ScoreBadge";
import ScoreGauge from "~/components/ScoreGauge";

const Category = ({ title, score }: { title: string, score: number }) => {
    const textColor = score > 70 ? 'text-green-600'
            : score > 49
        ? 'text-yellow-600' : 'text-red-600';
    
    const bgColor = score > 70 ? 'bg-green-50/50 border-green-200/60'
            : score > 49
        ? 'bg-yellow-50/50 border-yellow-200/60' : 'bg-red-50/50 border-red-200/60';

    return (
        <div className={`flex flex-row items-center justify-between p-4 rounded-xl border ${bgColor} transition-all duration-300 hover:shadow-md`}>
            <div className="flex flex-row gap-3 items-center">
                <p className="text-lg lg:text-xl font-semibold text-gray-900">{title}</p>
                <ScoreBadge score={score} />
            </div>
            <p className="text-xl lg:text-2xl font-bold">
                <span className={textColor}>{score}</span>
                <span className="text-gray-400">/100</span>
            </p>
        </div>
    )
}

const Summary = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="bg-white rounded-3xl shadow-lg border border-gray-200/60 w-full overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Header Section with Score */}
            <div className="bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/30 p-6 lg:p-8 border-b border-gray-200/60">
                <div className="flex flex-row items-center gap-6 lg:gap-8">
                    <ScoreGauge score={feedback.overallScore} />

                    <div className="flex flex-col gap-2 flex-1">
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Your Resume Score</h2>
                        <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                            This score is calculated based on the variables listed below.
                        </p>
                    </div>
                </div>
            </div>

            {/* Category Scores */}
            <div className="p-6 lg:p-8 space-y-4">
                <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
                <Category title="Content" score={feedback.content.score} />
                <Category title="Structure" score={feedback.structure.score} />
                <Category title="Skills" score={feedback.skills.score} />
            </div>
        </div>
    )
}
export default Summary
