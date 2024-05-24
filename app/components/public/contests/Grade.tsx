import { cn } from "~/lib/utils"

export default function Grade({ grade }: { grade: string }) {
    const cleanedGrade = grade ? grade.toUpperCase() : "F"
    return (
        <div className="grid grid-cols-6 rounded-md overflow-hidden text-white text-xs font-black">
            <div className={cn("bg-grade-F h-full px-2 py-1 text-center")}>
                {cleanedGrade === "F" ? cleanedGrade : null}
            </div>
            <div className={cn("h-full px-2 py-1 text-center", { "bg-grade-E": cleanedGrade <= "E", "bg-grade-Ea": cleanedGrade > "E" })}>
                {cleanedGrade === "E" ? cleanedGrade : null}
            </div>
            <div className={cn("h-full px-2 py-1 text-center", { "bg-grade-D": cleanedGrade <= "D", "bg-grade-Da": cleanedGrade > "D" })}>
                {cleanedGrade === "D" ? cleanedGrade : null}
            </div>
            <div className={cn("h-full px-2 py-1 text-center", { "bg-grade-C": cleanedGrade <= "C", "bg-grade-Ca": cleanedGrade > "C" })}>
                {cleanedGrade === "C" ? cleanedGrade : null}
            </div>
            <div className={cn("h-full px-2 py-1 text-center", { "bg-grade-B": cleanedGrade <= "B", "bg-grade-Ba": cleanedGrade > "B" })}>
                {cleanedGrade === "B" ? cleanedGrade : null}
            </div>
            <div className={cn("h-full px-2 py-1 text-center", { "bg-grade-A": cleanedGrade <= "A", "bg-grade-Aa": cleanedGrade > "A" })}>
                {cleanedGrade === "A" ? cleanedGrade : null}
            </div>
        </div>
    )
}
