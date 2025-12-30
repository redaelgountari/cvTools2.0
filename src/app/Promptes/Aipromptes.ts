export const promptePromptEnhancement = (data: string) => {
    return `You are an AI prompt refiner for a resume generator tool.
    A user has provided a basic or unclear prompt describing
    their desired resume (style, content, tone, format, etc.).
    Your task is to improve this prompt by rewriting it to be more detailed,
    specific, and suitable for generating a high-quality resume.
    Ensure it includes key information such as job title,
    industry, experience level, formatting preferences (e.g., modern, minimalist, infographic),
    tone (e.g., formal, creative), and any specific content to highlight (e.g., achievements, skills, career change).
    Clarify any vague terms and infer reasonable details if missing. Here is the original prompt:${data} 
    Now output the improved prompt only.`
}

export const prompteTemplate = (data : string) =>{
    return `You are an expert UI developer and designer. Create a complete resume PDF component using @react-pdf/renderer in React.
    User's design request:
    "${data}"

    Requirements:
    - Use a two-column or single-column layout as described
    - Use Font.register to load Inter or Poppins fonts
    - Sidebar should include: profile image, contact info, skills, languages
    - Main content should include: summary, experience, education, projects
    - Use consistent spacing and typography
    - Output only a full React functional component named ThemeX

    Do NOT include imports outside what's required. NO explanations. Just the component code.
    `;
}
    // - The component receives props: { userdata: Resume; userImage: string }
    // - Assume props: { userdata: Resume; userImage: string }
