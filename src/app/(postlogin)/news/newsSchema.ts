import { date, number, object, string} from 'yup';

export const newsSchema = object({
    id: number(),
    date: date().required('Date Wajib diisi'),
    title: string().required('Title Wajib diisi'),
    content: string().required('Content Wajib diisi')
})