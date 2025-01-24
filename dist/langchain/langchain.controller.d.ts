import { LangchainService } from './langchain.service';
import { CreateLangchainDto } from './dto/create-langchain.dto';
import { UpdateLangchainDto } from './dto/update-langchain.dto';
export declare class LangchainController {
    private readonly langchainService;
    constructor(langchainService: LangchainService);
    create(createLangchainDto: CreateLangchainDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateLangchainDto: UpdateLangchainDto): string;
    remove(id: string): string;
}
