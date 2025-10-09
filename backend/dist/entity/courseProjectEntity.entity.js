var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
let CourseProjectEntity = class CourseProjectEntity {
    id;
    title;
    created_at = Date;
    updated_at = Date;
};
__decorate([
    PrimaryKey()
], CourseProjectEntity.prototype, "id", void 0);
__decorate([
    Property()
], CourseProjectEntity.prototype, "title", void 0);
__decorate([
    Property({ type: 'datetime' })
], CourseProjectEntity.prototype, "created_at", void 0);
__decorate([
    Property({ type: 'datetime' })
], CourseProjectEntity.prototype, "updated_at", void 0);
CourseProjectEntity = __decorate([
    Entity()
], CourseProjectEntity);
export { CourseProjectEntity };
