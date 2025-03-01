"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionModel = exports.SessionMetadataModel = exports.DeviceModel = exports.LocationModel = void 0;
const graphql_1 = require("@nestjs/graphql");
let LocationModel = class LocationModel {
};
exports.LocationModel = LocationModel;
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], LocationModel.prototype, "country", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], LocationModel.prototype, "city", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], LocationModel.prototype, "latitude", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], LocationModel.prototype, "longitude", void 0);
exports.LocationModel = LocationModel = __decorate([
    (0, graphql_1.ObjectType)()
], LocationModel);
let DeviceModel = class DeviceModel {
};
exports.DeviceModel = DeviceModel;
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], DeviceModel.prototype, "browser", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], DeviceModel.prototype, "os", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], DeviceModel.prototype, "type", void 0);
exports.DeviceModel = DeviceModel = __decorate([
    (0, graphql_1.ObjectType)()
], DeviceModel);
let SessionMetadataModel = class SessionMetadataModel {
};
exports.SessionMetadataModel = SessionMetadataModel;
__decorate([
    (0, graphql_1.Field)(() => LocationModel),
    __metadata("design:type", LocationModel)
], SessionMetadataModel.prototype, "location", void 0);
__decorate([
    (0, graphql_1.Field)(() => DeviceModel),
    __metadata("design:type", DeviceModel)
], SessionMetadataModel.prototype, "device", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SessionMetadataModel.prototype, "ip", void 0);
exports.SessionMetadataModel = SessionMetadataModel = __decorate([
    (0, graphql_1.ObjectType)()
], SessionMetadataModel);
let SessionModel = class SessionModel {
};
exports.SessionModel = SessionModel;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], SessionModel.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SessionModel.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SessionModel.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => SessionMetadataModel),
    __metadata("design:type", SessionMetadataModel)
], SessionModel.prototype, "metadata", void 0);
exports.SessionModel = SessionModel = __decorate([
    (0, graphql_1.ObjectType)()
], SessionModel);
//# sourceMappingURL=session.model.js.map