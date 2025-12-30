"use client"

// src/app/portfolio/[template]/page.tsx
import fs from "fs";
import path from "path";
import Link from "next/link";

async function getResumeData() {
  const res = await fetch("http://localhost:3000/api/GettingUserData", {
    cache: "no-store", // Ensure fresh data on each request
  });


  return res.json();
}

export default async function PortfolioTemplate({ params }: { params: { template: string } }) {
  const { template } = params;

  // Build the expected file path
  const templatePath = path.join(process.cwd(), "templates", `${template}.html`);

  // If the file doesn't exist, show a helpful message
  if (!fs.existsSync(templatePath)) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Template not found</h1>
        <p className="mb-2">
          I looked for this file:
          <code className="bg-gray-100 p-1 rounded ml-2">{templatePath}</code>
        </p>
        <p className="mb-6 text-gray-600">
          Make sure a file named <strong>{template}.html</strong> exists in your <code>templates/</code> folder.
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

  // Otherwise, read and render the template
  const html = fs.readFileSync(templatePath, "utf-8");
  const resumeData = await getResumeData();

  const safeHtml = html.replace(
    "{{data}}",
    JSON.stringify(resumeData).replace(/</g, "\\u003c")
  );

  return (
    <div dangerouslySetInnerHTML={{ __html: safeHtml }} />
  );
}
