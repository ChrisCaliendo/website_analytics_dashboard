import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react"

const Badge = ({percentage}: {percentage: number}) => {
    const isPositive = percentage > 0
    const isNeutral = percentage === 0
    const isNegative = percentage < 0

    // badge style classes
    const positiveClass = "bg-green-200 text-green-800"
    const negativeClass = "bg-red-200 text-red-800"
    const neutralClass = "bg-zinc-200 text-zinc-800"

    if(isNaN(percentage)) return null
    return (
        <span className={`inline-flex gap-1 items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${isPositive ? positiveClass : isNegative ? negativeClass : neutralClass}`}>
            {isPositive && <ArrowUpRight className="h-3 w-3"/>}
            {isNegative && <ArrowDownRight className="h-3 w-3"/>}
            {isNeutral && <ArrowRight className="h-3 w-3"/>}
            {percentage.toFixed(0)}%

        </span>
    )
}
export default Badge;