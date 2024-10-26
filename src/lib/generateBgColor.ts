import { PLATFORMS } from "./platforms"

export const generateBackgroundColor = (platform: string) => {
    switch (platform) {

        case "GitHub":
            return '#181717'

        case "Frontend Mentor":
            return '#3f54a3'

        case "Twitter":
            return '#1da1f2'

        case "LinkedIn":
            return '#0a66c2'

        case "YouTube":
            return '#EE3939'

        case "Facebook":
            return '#1877f2'

        case "Twitch":
            return '#9146ff'

        case "Dev.to":
            return '#0a0a0a'

        case "Codewars":
            return '#ad2c27'

        case "Codepen":
            return '#333333'

        case "freeCodeCamp":
            return '#006400'

        case "GitLab":
            return '#fc6d26'

        case "Hashnode":
            return '#2962ff'

        case "Stack Overflow":
            return '#f58025'

        default:
            return 'var(--clr-purple-pri)'

    }
}
