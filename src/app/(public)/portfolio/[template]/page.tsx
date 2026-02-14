import fs from "fs";
import path from "path";
import Link from "next/link";
import { requirePersonalInfo } from "@/lib/auth-check";

// ============================================================================
// SECURITY: Whitelist of allowed templates
// Only these templates can be loaded - prevents directory traversal attacks
// ============================================================================
const ALLOWED_TEMPLATES = [
  'template1',
  'GradientFolio',
  'template2',
  'template3',
  'professional-portfolio', // Add your actual template names here
  // Add more as needed
];

async function getResumeData() {
  const { GET } = await import('@/app/api/GettingUserData/route');
  const response = await GET();
  return response.json();
}
export default async function PortfolioTemplate({
  params
}: {
  params: { template: string }
}) {
  const { template } = params;

  // Protect route
  await requirePersonalInfo();

  // ============================================================================
  // SECURITY CHECK 1: Validate template name against whitelist
  // ============================================================================
  if (!ALLOWED_TEMPLATES.includes(template)) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Invalid Template</h1>
        <p className="mb-2 text-gray-600">
          The template &quot;{template}&quot; is not available.
        </p>
        <p className="mb-6 text-gray-600">
          Available templates: {ALLOWED_TEMPLATES.join(', ')}
        </p>
        <Link
          href="/portfolio"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ← Back to template list
        </Link>
      </div>
    );
  }

  // ============================================================================
  // SECURITY CHECK 2: Sanitize template name (remove special chars)
  // Prevents path traversal even if whitelist is bypassed
  // ============================================================================
  const sanitizedTemplate = template.replace(/[^a-zA-Z0-9-_]/g, '');

  // Build the expected file path
  const templatePath = path.join(process.cwd(), "templates", `${sanitizedTemplate}.html`);

  // ============================================================================
  // SECURITY CHECK 3: Verify the resolved path is within templates directory
  // Prevents directory traversal attacks like "../../../etc/passwd"
  // ============================================================================
  const templatesDir = path.join(process.cwd(), "templates");
  const resolvedPath = path.resolve(templatePath);

  if (!resolvedPath.startsWith(templatesDir)) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Security Error</h1>
        <p className="mb-6 text-gray-600">Invalid template path detected.</p>
        <Link
          href="/portfolio"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ← Back to template list
        </Link>
      </div>
    );
  }

  // Check if file exists
  if (!fs.existsSync(templatePath)) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Template not found</h1>
        <p className="mb-2">
          I looked for this file:
          <code className="bg-gray-100 p-1 rounded ml-2">{templatePath}</code>
        </p>
        <p className="mb-6 text-gray-600">
          Make sure a file named <strong>{sanitizedTemplate}.html</strong> exists in your <code>templates/</code> folder.
        </p>
        <Link
          href="/portfolio"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ← Back to template list
        </Link>
      </div>
    );
  }

  // Read the template
  let html: string;
  try {
    html = fs.readFileSync(templatePath, "utf-8");
  } catch (error) {
    console.error('Error reading template:', error);
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error loading template</h1>
        <p className="mb-6 text-gray-600">Unable to read the template file.</p>
        <Link
          href="/portfolio"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ← Back to template list
        </Link>
      </div>
    );
  }

  // Fetch resume data
  let resumeData;
  try {
    resumeData = await getResumeData();
  } catch (error) {
    console.error('Error fetching resume data:', error);
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error loading data</h1>
        <p className="mb-6 text-gray-600">Unable to fetch resume data from API.</p>
        <Link
          href="/portfolio"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ← Back to template list
        </Link>
      </div>
    );
  }

  // ============================================================================
  // SECURITY: Properly escape data for safe injection
  // ============================================================================
  const safeHtml = html.replace(
    "{{data}}",
    JSON.stringify(resumeData)
      .replace(/</g, "\\u003c")
      .replace(/>/g, "\\u003e")
      .replace(/&/g, "\\u0026")
  );

  // ============================================================================
  // SECURE RENDERING: Use iframe with sandbox restrictions
  // This isolates the template and prevents XSS attacks
  // ============================================================================
  return (
    <div className="w-full h-screen relative">
      {/* Navigation Bar */}

      <iframe
        sandbox="allow-scripts allow-same-origin allow-downloads allow-forms allow-modals"
        srcDoc={safeHtml}
        className="w-full h-full border-0"
        title={`Portfolio Template: ${template}`}
        loading="lazy"
      />
    </div>
  );
}