export  class Encounter {
    constructor(
        public id: number,
        public date: string,
        public colonist_id: number,
        public atype: string,
        public action: string,

    ) {}
}

export class Job {
    constructor(
        public name:string,
        public id:number,
        public description: string,

    ) {}
}

export class NewColonists {
    constructor(
        public name: string,
        public age: number,
        public job_id: string,
        
    ) {}
}

 interface Colonist {
    job: Job;
    id: number;
    name: string;
    age: number;
}

export class Aliens {
    constructor(
        public type:string,
        public submitted_by:string,
        public id:number,
        public description:string,

    ) {}
}