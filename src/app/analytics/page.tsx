import { analytics } from "@/utils/analytics";
import AnalyticsDashboard from "./AnalyticsDashboard";

const Page = async () => {
    const pageview = await analytics.retrieveDays("pageview", 2)
    return (  
        <div>
            <div className="text-white">
                <AnalyticsDashboard />
            </div>
        </div>
    );
}
 
export default Page;