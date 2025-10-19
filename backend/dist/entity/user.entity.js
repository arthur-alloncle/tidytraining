var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, Property, PrimaryKey, Unique } from "@mikro-orm/core";
let User = class User {
    id;
    first_name;
    last_name;
    email;
    password;
    created_at = new Date();
    updated_at = new Date();
};
__decorate([
    PrimaryKey()
], User.prototype, "id", void 0);
__decorate([
    Property()
], User.prototype, "first_name", void 0);
__decorate([
    Property()
], User.prototype, "last_name", void 0);
__decorate([
    Property(),
    Unique()
], User.prototype, "email", void 0);
__decorate([
    Property()
], User.prototype, "password", void 0);
__decorate([
    Property()
], User.prototype, "created_at", void 0);
__decorate([
    Property({ onUpdate: () => new Date() })
], User.prototype, "updated_at", void 0);
User = __decorate([
    Entity()
], User);
export { User };
