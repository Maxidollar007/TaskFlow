import * as yup from 'yup'

export const validationTaskScheme=yup.object({
    task:yup.string().required("La tâche est requise").min(3,"Minimum 03 caractères"),
    date:yup.date()
    .required("La date est requise")
    .min(new Date(),"Une tâche ne peut être programmer dans une date antérieure")
    .typeError("Date Invalide")
})