import { object, string} from 'yup';

export const loginSchema = object({
    email: string().required('Email wajib diisi').email('Format email tidak valid'),
    password: string().required('Password wajib diisi')
})