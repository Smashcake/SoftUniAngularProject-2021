import { IRegisterUser } from "./register-user";

export interface INewsArticle {
    title: string,
    createdBy: IRegisterUser,
    createdById: string,
    comments: [],
    content: string,
    createdOn: Date,
    id: string
}
