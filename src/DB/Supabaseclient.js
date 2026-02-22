import {createClient}from "@supabase/supabase-js"


const supabaseurl=import.meta.env.VITE_SUPABASE_URL
const supabasekey= import.meta.env.VITE_SUPABASE_KEY

 const supabase=createClient(
    supabaseurl,supabasekey
)

export default supabase;