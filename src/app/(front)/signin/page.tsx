import { Metadata } from "next";
import Form from "./From";

export const metadata: Metadata = {
    title: 'Sign in'
}

export default async function Singin() {
    return <Form />
}