import { IRegisterUser } from "./register-user";

export interface IReviewNews {
    title: string,
    createdBy: IRegisterUser,
    createdById: string,
    content: string,
    createdOn: Date,
    id: string,
    category: string,
    approved: boolean
}
