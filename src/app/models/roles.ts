export interface Role {
    id?: number;
    nome?: string;
    descricao?: string;
    permissoesIds: number[];
}
