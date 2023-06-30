import { headers } from "next/dist/client/components/headers";

export const sendContactForm = async (data) => fetch('/api/contact',{
    
    method: 'POST',
    body: JSON.stringify(data),
    // email: JSON.stringify(mainEmail),
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    
}).then((res)=>{
    if (!res.ok) throw new Error("Failed to send Message");
    return res.json()
})