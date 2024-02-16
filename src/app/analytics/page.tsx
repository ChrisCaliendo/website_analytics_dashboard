import { analytics } from "@/utils/analytics";
import AnalyticsDashboard from "./AnalyticsDashboard";
import { getDate } from "@/utils";


const Page = async () => {
    const TRACKING_DAYS = 7
    const topCountriesMap = new Map<string, number>()

    const pageviews = await analytics.retrieveDays("pageview", TRACKING_DAYS)

    const totalPageviews = pageviews.reduce((acc, curr) => {
        return (
            //adds the values of all the days
            acc + curr.events.reduce((acc, curr) => {
                return acc + Object.values(curr)[0]!
            }, 0)
        )
    }, 0)
    const avgVisitorsPerDay = (totalPageviews/ TRACKING_DAYS).toFixed(1)
    
    const visitorsToday = pageviews.filter((event) => event.date === getDate()).reduce
    ((acc, curr) => {
        return(
            acc + curr.events.reduce((acc, curr) => acc + Object.values(curr)[0]!, 0)
        )
    }, 0) // default value

    for (let i = 0; i < pageviews.length; i++) {
        const day = pageviews[i];
        if(!day) continue
        for (let j = 0; j < day.events.length; j++) {
            const event = day.events[j];
            if(!event) continue
            const key = Object.keys(event)[0]!
            const value = Object.values(event)[0]!
            const parsedKey = JSON.parse(key)
            const country = parsedKey?.country
            if(country){
                if(topCountriesMap.has(country)){
                    const prevValue = topCountriesMap.get(country)!
                    topCountriesMap.set(country, prevValue + value)
                }
            }
        }
    }

    return (  
        <div className="min-h-screen w-full py-12 flex justify-normal items-center">
            <div className="relative w-full max-w-6xl mx-auto text-white">
                <AnalyticsDashboard 
                    avgVisitorsPerDay={avgVisitorsPerDay}
                    visitorsToday={visitorsToday}
                    timeseriesPageviews={pageviews}
                />
            </div>
        </div>
    );
}
 
export default Page;