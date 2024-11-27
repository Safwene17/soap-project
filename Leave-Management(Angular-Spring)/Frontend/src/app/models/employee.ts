export class employee {
    email: string = ''
    password: string = ''
    name: string = ''
    lastname: string = ''
    gender: 'Male' | 'Female' | null = null;
    role: 'admin' | 'employee' = 'employee';
    phone:string=''
    job: string = ''
    leave_type:string=''
    leave_start!:Date
    leave_end!:Date
    leaveDecision: 'approved' | 'declined' | null = null;
}