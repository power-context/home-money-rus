export class User {
    constructor(
        private email : string,
        private password : string,
        public name : string,
        private id? : number
    ){}
}