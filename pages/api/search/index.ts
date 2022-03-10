import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(400).json({ message: 'Este endpoint no existe. Debe de especificar un query al momento de realizar la búsqueda' })
}