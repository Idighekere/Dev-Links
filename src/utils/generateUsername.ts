export const generateUsernameFromEmail=(email:string)=>{

    const EmailUsername=email.split('@')[0];
    //TODO - removing text after the @ symbol;

    const username=EmailUsername.replace(/\./g,'-')

    return username
}
