export enum Role {none, user, manager, admin};

// JSON received from server
export interface RecUser {
  username: string;
  readonly id: number;
  role: string;
}

export class User {
  username: string;
  readonly id: number;
  role: Role;

  constructor(inUser: RecUser){
    this.username = inUser.username;
    this.id = inUser.id;
    this.role = Role[inUser.role];
  }

  roleString(): string {
    return Role[this.role];
  }

  canViewJogs(other: User): boolean {
    return ((this.role == Role.admin) || (this.id == other.id));
  }
}
