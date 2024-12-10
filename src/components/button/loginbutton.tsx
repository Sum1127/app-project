import {Button} from "@chakra-ui/react";
import supabase from "@/libs/supabase";

export function LoginButton(){
    
    async function getgithub()
    {
        try{
            const {}=await supabase.auth.signInWithOAuth({
            provider: 'github',
            })
        }
        catch(err)
        {
            console.error(err);
        }
    }

    async function getdiscord()
    {
        try{
            const {}=await supabase.auth.signInWithOAuth({
            provider: 'discord',
            })
        }
        catch(err)
        {
            console.error(err);
        }
    }

    return(
        <>
            <Button onClick={getgithub}>Github login</Button> 
            <Button onClick={getdiscord}>Discord login</Button>
        </>
    )

}