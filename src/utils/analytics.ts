type AnalyticsArgs = {
    retention?: number
}
export class Analytics {
    private retention: number = 60 * 60 * 24 * 7

    constructor(opts?: AnalyticsArgs){
        if(opts?.retention) this.retention = opts.retention
    }

    async track(namespace: string, event: object = {}) {
        
    }
}
const analytics = new Analytics({retention: 3600})