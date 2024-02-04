import { ChamadoSituacao } from "../enums/chamadoSituacao";

export class ChamadoDTOComponent {
    idEmpresa!: string;
    tpChamado!: string;
    dsChamado!: string;
    noArquivo!: string;
    stProtocolo!: string;
    dsProtocolo!: string;
    nuProtocolo!: string;
    files!: string[];
    file!: FileList;
    pageNumber!:number;
    pageSize!:number;
    hrExecucao!:string;
    dtAbertura!: string;
    dtExecucao!: string;
    dtSolucao!: string;
    totalProtocolos!: number;
    cnpj!:string;
    scChamado!: string;
    idChamado!: string;
    finalizado!: number;
    idProtocolo!: string;
    idEmprad!: string;
    contato!: string;
    dataAbertura!: string;
    duracaoChamado!: string;
}
