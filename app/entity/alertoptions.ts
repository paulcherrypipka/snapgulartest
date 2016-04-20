
export class AlertOptions {

    public static TYPE_CARE = 'care';
    public static TYPE_TECHNICAL = 'technical';

    public static SEVERITY_RED = 'red';
    public static SEVERITY_YELLOW = 'yellow';
    public static SEVERITY_INFO = 'info';

    type: string;
    text: string;
    severity: string;
    condition: string;

    constructor(data: any = new Object()) {
        this.type = data.type || AlertOptions.TYPE_TECHNICAL;
        this.text = data.text || null;
        this.severity = data.severity || AlertOptions.SEVERITY_RED;
        this.condition = data.condition || null;
    }

    toJSON() {
        return {
            type: this.type,
            text: this.text,
            severity: this.severity,
            condition: this.condition
        };
    }
}