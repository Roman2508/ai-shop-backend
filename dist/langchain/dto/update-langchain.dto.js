"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLangchainDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_langchain_dto_1 = require("./create-langchain.dto");
class UpdateLangchainDto extends (0, mapped_types_1.PartialType)(create_langchain_dto_1.CreateLangchainDto) {
}
exports.UpdateLangchainDto = UpdateLangchainDto;
//# sourceMappingURL=update-langchain.dto.js.map