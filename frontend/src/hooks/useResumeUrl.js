import { useEffect, useState } from "react"

// resume PDF from the API, falling back to the copy bundled in public/docs
export const useResumeUrl = () => {
    const [resumeUrl, setResumeUrl] = useState("/docs/Benjamin_Sinek_Resume.pdf")
    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL
        fetch(`${apiUrl}/api/resume/`)
            .then(res => res.json())
            .then(data => { if (data.file) setResumeUrl(`${apiUrl}${data.file}`) })
            .catch(() => console.warn("Failed to fetch resume from API, using static fallback"))
    }, [])
    return resumeUrl
}
