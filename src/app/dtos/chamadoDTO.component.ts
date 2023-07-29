import { Observable } from "rxjs";

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

}