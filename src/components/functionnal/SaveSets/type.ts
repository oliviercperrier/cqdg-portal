export interface ISaveSet {
    id: string;
    content: {
        ids: string[];
        name: string;
    };
    updated_at: string;
}
