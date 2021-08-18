export interface IRegisterUser {
    name: string,
    surname: string,
    email: string,
    password: string,
    confirmPassword: string,
    createdOn: Date,
    role: string,
    comments: [],
    newsArticles: [],
}
