import {PLATFORMS} from "./platforms"

import { Icon } from "@iconify/react/dist/iconify.js"

export const generatePlatformIcon=(platform:string)=>{

    switch(platform){
        case "GitHub":
            return <Icon icon="icon-park-outline:github" />

        case "Frontend Mentor":
            return <Icon icon="simple-icons:frontendmentor" />

        case "Twitter":
            return <Icon icon="formkit:twitter" />

        case "LinkedIn":
            return <Icon icon="basil:linkedin-solid" />

        case "YouTube":
            return <Icon icon="basil:youtube-solid" />

        case "Facebook":
            return <Icon icon="mdi:facebook" />

        case "Twitch":
            return <Icon icon="ant-design:twitch-outlined" />

        case "Dev.to":
            return <Icon icon="ph:dev-to-logo-fill" />

        case "Codewars":
            return <Icon icon="cib:codewars" />

        case "Codepen":
            return <Icon icon="simple-icons:codepen" />

        case "freeCodeCamp":
            return <Icon icon="simple-icons:freecodecamp" />

        case "GitLab":
            return <Icon icon="teenyicons:gitlab-solid" />

        case "Hashnode":
            return <Icon icon="simple-icons:hashnode" />

        case "Stack Overflow":
            return <Icon icon="simple-icons:stackoverflow" />
        default:
        return <Icon icon="mdi:links"/>
    }
}
