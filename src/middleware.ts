import { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
    if(req.nextUrl.pathname === '/'){
        try{
            analytics.track("pageview", {
                page: '/',
                country: req.geo?.country,
            })
        }
        catch(err){

        }
        //track analytics event
        console.log("gottem")

    }
    return NextRequest.next()

}
export const matcher = {
    matcher: ['/'],
}