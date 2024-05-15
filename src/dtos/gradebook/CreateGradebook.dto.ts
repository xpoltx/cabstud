export interface CreateGradebookDto{
    studentId: string,
    disciplineId: string,
    grade?: number,
    debt?: boolean
}