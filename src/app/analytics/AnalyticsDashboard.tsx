"use client"
import { analytics } from "@/utils/analytics";
import { BarChart, Card } from "@tremor/react";

interface AnalyticsDashboardProps {
    avgVisitorsPerDay: string
    visitorsToday: number
    timeseriesPageviews: Awaited<ReturnType<typeof analytics.retrieveDays>>
}

const AnalyticsDashboard = ({ avgVisitorsPerDay, visitorsToday, timeseriesPageviews}: 
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