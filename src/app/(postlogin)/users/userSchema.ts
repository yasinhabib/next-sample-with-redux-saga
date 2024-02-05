import { object, string} from 'yup';

export const userSchema = object({
    name: string().required('Nama Wajib diisi'),
    job: string().required('Pekerjaan Wajib diisi')
})