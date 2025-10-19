var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
let CourseProject = class CourseProject {
    id;
    title;
    created_at = new Date();
    updated_at = new Date;
    user;
};
__decorate([
    PrimaryKey()
], CourseProject.prototype, "id", void 0);
__decorate([
    Property()
], CourseProject.prototype, "title", void 0);
__decorate([
    Property()
], CourseProject.prototype, "created_at", void 0);
__decorate([
    Property({ onUpdate: () => new Date() })
], CourseProject.prototype, "updated_at", void 0);
__decorate([
    ManyToOne({ deleteRule: "cascade", updateRule: "no action" })
], CourseProject.prototype, "user", void 0);
CourseProject = __decorate([
    Entity()
], CourseProject);
export { CourseProject };
