import { CreateLangchainDto } from './dto/create-langchain.dto';
import { UpdateLangchainDto } from './dto/update-langchain.dto';
export declare class LangchainService {
    create(createLangchainDto: CreateLangchainDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateLangchainDto: UpdateLangchainDto): string;
    remove(id: number): string;
}
