"use client"
import { analytics } from "@/utils/analytics";
import { BarChart, Card } from "@tremor/react";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import Badge from "./Badge";

interface AnalyticsDashboardProps {
    topCountries: [string, number][]
    avgVisitorsPerDay: string
    visitorsToday: number
    timeseriesPageviews: Awaited<ReturnType<typeof analytics.retrieveDays>>
}

const AnalyticsDashboard = ({ avgVisitorsPerDay, visitorsToday, timeseriesPageviews, topCountries}: 
AnalyticsDashboardProps) => {
    return (  
        <div className="flex gap-6">
            <div className="grid w-full mx-auto grid-rows-3 grid-cols-2">
                <Card className="w-full mx-auto max-w-xs rounded-lg col-span-1">
                    <p className="text-tremor-default text-dark-tremor-content">Avg. Visitors/Day</p>
                    <p>{avgVisitorsPerDay}</p>
                    
                </Card>
                <Card className="w-full mx-auto max-w-xs rounded-lg col-span-1">
                    <p className="text-tremor-default text-dark-tremor-content">Visitors Today</p>
                    <p>{visitorsToday}</p>
                    <Badge percentage={(visitorsToday/Number(avgVisitorsPerDay)-1)*100}/>
                </Card>
                
            </div>

            <Card className="flex flex-col sm:grid grid-cols-4 gap-6">
                <h2 className="w-full text-dark-tremor-content-strong text-center sm:left-left font-semibold text-xl">
                    This weeks top visitors:
                </h2>
                <div className="col-span-3 flexitems-center justify-between flex-wrap gap-8">
                    {topCountries?.map(([countryCode, num]) => {
                        return <div className="flex items-center gap-3 text-dark-tremor-content-strong">
                            <p className="hidden sm:block text-tremor-content">
                                {countryCode}
                            </p>
                            <ReactCountryFlag 
                                countryCode={countryCode} 
                                svg 
                                className="text-5xl sm:text-3xl"
                            />
                            <p className="text-tremor-content sm:text-dark-tremor-content-strong">{num}</p>
                        </div>
                    })}
                </div>
            </Card>

            <Card className="w-full mx-auto max-w-xs rounded-lg col-span-2 row-span-12">
                {timeseriesPageviews ? (
                    <BarChart 
                        allowDecimals={false}
                        showAnimation
                        categories={['Visitors']}     
                        index="name"
                        data={timeseriesPageviews.map((day) => ({
                            name: day.date,
                            Visitors: day.events.reduce((acc, curr) => {
                                return acc + Object.values(curr)[0]!
                            }, 0),
                        }))}   
                    /> 
                ) : null}
            </Card>
        </div>
    );
}
 
export default AnalyticsDashboard;