export  class Encounter {
    constructor(
        public id: number,
        public date: string,
        public colonist_id: number,
        public atype: string,
        public action: string,

    ) {}
}

export class NewEncounter {
    constructor(
        public date: string,
        public atype: string,
        public action: string,
        public colonist_id: number

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

 export interface Colonist {
    job: Job;
    id: number;
    name: string;
    age: number;
}

export interface Aliens {
  
         type:string,
         submitted_by:string,
         id:number,
         description:string,

}