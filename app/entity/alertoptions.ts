
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

    constructor() {
        this.type = AlertOptions.TYPE_CARE;
        this.text = null;
        this.severity = AlertOptions.SEVERITY_RED;
        this.condition = null;
    }
}