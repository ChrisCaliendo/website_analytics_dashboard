"use client"
import { analytics } from "@/utils/analytics";
import { BarChart, Card } from "@tremor/react";

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
                    
                </Card>
                
            </div>

            <Card className="flex flex-col sm:grid grid-cols-4 gap-6">
                <h2 className="w-full text-dark-tremor-content-strong text-center sm:left-left font-semibold text-xl">

                </h2>
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