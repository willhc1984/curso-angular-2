import { Permissao } from "../../models/permissions";

export interface RoleResponse{
    id: number,
    nome: string,
    descricao: string,
    permissoes: Permissao[]
}