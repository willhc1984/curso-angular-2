export interface Role {
    id: string;
    nome: string;
    descricao?: string;
    permissoes: string[];
}
