import { analytics } from "@/utils/analytics";

const Page = async () => {
    const pageview = await analytics.retrieveDays("pageview", 2)
    return (  
        <div>
            <p className="text-white">hello {JSON.stringify(pageview)}</p>
        </div>
    );
}
 
export default Page;