"""
Builds the three CVs (Software Engineer, Backend Engineer, PHP Developer).

Everything shared lives in COMMON; each CV only changes its title, profile,
skill order and which experience points lead. Edit the text here, then run:

    python cv-source/build_cvs.py

It writes an HTML file per CV into cv-source/ (open one in Chrome and use
Print > Save as PDF to make a PDF by hand), and, if Playwright for Python is
installed, the PDFs straight into public/documents/cv/.
"""

import subprocess
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PDF_DIR = ROOT.parent / "public" / "documents" / "cv"

CONTACT = [
    ("Greater Manchester, UK", None),
    ("+44 7804 533911", "tel:+447804533911"),
    ("smomnabatool@gmail.com", "mailto:smomnabatool@gmail.com"),
    ("linkedin.com/in/momna-batool", "https://www.linkedin.com/in/momna-batool/"),
    ("github.com/MomnaBukhari", "https://github.com/MomnaBukhari"),
    ("syedamomnabatool.vercel.app", "https://syedamomnabatool.vercel.app"),
]

# Rev9 points, by key, so each CV can lead with different ones.
REV9 = {
    "mmm": "Built the Laravel REST APIs behind the <b>Muslim Match Makers</b> Flutter app, working with the Flutter developers and an AI/ML team: multi-step forms that resume from the last completed step, premium membership logic and profile display rules (batches of 10, no repeats within 24 hours).",
    "security": "Implemented token-based authentication, role-based access control, OTP and ID verification, server-side validation and secure environment configuration.",
    "aws": "Integrated Laravel controllers with AWS Lambda functions and used Amazon S3.",
    "perf": "Improved performance with caching, indexing and query optimisation, and moved background work to jobs, queues, events and scheduled tasks.",
    "scanpass": "Sole engineer on <b>ScanPass</b> (Sorority Pass), a membership, registration and account-management platform for Greek organisations and community groups, covering system design, data modelling, API design and deployment.",
    "innvision": "Delivered <b>Inn&rsquo;vision</b>, a hotel management and booking system, full stack alongside a product designer: role-based dashboards for admins, hotel owners and customers, admin approval workflows, multi-parameter search and sorting, OTP verification, booking logic and a live weather API.",
    "payments": "Contributed to payment integration and webhooks alongside a senior developer.",
    "process": "Worked in Agile and Scrum with requirements gathered directly from clients; used Git and GitLab with senior code review and a CI/CD-based release workflow with regular production releases.",
    "testing": "Tested APIs with Postman scripts alongside functional and manual testing, and handled logging and production troubleshooting.",
}

AH_MEDIA = [
    "Built backends in PHP and Laravel, REST APIs and WordPress sites for client projects.",
    "Grew from Software Engineering Intern to Software Engineer over three years, working full time (hybrid) until February 2024, then part time and remote.",
    "Client work is covered by a confidentiality agreement (MoU), so project specifics are not shared.",
]

PROJECTS = [
    ("Study Sphere", "Laravel, MySQL", "Final-year project, University of Gujrat, 2024",
     "All-in-one education platform with role-based dashboards for teachers, students and guardians: courses, content, assessments, discussion boards and chat."),
    ("Do-Do", "Laravel", "Personal project, 2024",
     "Task management system for creating, prioritising and tracking tasks, with APIs tested in Postman."),
    ("Perfumelle", "React", "Personal project, 2025",
     "A private perfume display website."),
    ("Portfolio", "React, GSAP", "Personal project, 2026",
     "My own site at syedamomnabatool.vercel.app, built with React and GSAP."),
]

RESEARCH = (
    "MRes dissertation: <b>Predicting Fashion Trends using Multilingual Sentiment Analysis of Instagram Data</b>. "
    "Designed architecture-first and built in Python as separate modules across 17 phases: data collection, cleaning "
    "and language detection, a TF-IDF and logistic regression baseline, a fine-tuned XLM-RoBERTa model, and evaluation "
    "with accuracy, precision, recall, macro F1 and confusion matrices."
)

EDUCATION = [
    ("MRes Artificial Intelligence", "University of Greater Manchester, Bolton, UK", "2025 – 2026",
     "Completed with Distinction."),
    ("BS Information Technology", "University of Gujrat, Pakistan", "2020 – 2024",
     "Gold Medal, 1st position. GPA 3.79 / 4.00."),
    ("FSc Pre-Engineering", "Govt. Associate College for Women, Civil Lines, Jhelum", "2018 – 2020", ""),
]

CERTIFICATIONS = [
    "AWS Academy Graduate: Machine Learning for Natural Language Processing (2026)",
    "AWS Academy Graduate: Cloud Foundations (2026)",
    "Programming for Everybody (Getting Started with Python), University of Michigan (2023)",
    "Introduction to HTML5, University of Michigan",
    "Getting Started with Front-End and Web Development, IBM",
]

AWARDS = [
    "Appreciation Award, Rev9 Solutions (2025)",
    "Gold Medal, 1st position, BS Information Technology (2024)",
    "Roll of Honour (2024), Excellent Academic Performance (2023), Student of the Year (2022)",
]

ACTIVITIES = [
    "AI Ambassador (volunteer), InnovateHer: helping close the gender gap in tech by delivering AI assemblies and role model talks in schools, starting at North Chadderton School (2026).",
    "Supporting the University of Greater Manchester organising team with planning and coordination of the &ldquo;November to Remember&rdquo; series, alongside IEEE (2026).",
    "IEEE Student Member: Computer Society, Women in Engineering, Young Professionals (since 2025).",
    "One-to-one tutoring in programming, databases, OOP and project management for secondary, college and university students during my degree (2020 – 2024).",
]

CVS = {
    "software-engineer": {
        "title": "Software Engineer",
        "profile": (
            "Software engineer with almost five years of experience building web and mobile products, mainly on the backend "
            "in PHP and Laravel. I've worked across the whole lifecycle: gathering requirements with clients, designing data "
            "models and APIs, building, testing, releasing and fixing things in production. At Rev9 Solutions I built the APIs "
            "behind the Muslim Match Makers app and was the only engineer on ScanPass. I'm comfortable on the frontend with "
            "React and JavaScript when a feature needs it, graduated with a Gold Medal in BS Information Technology, and my "
            "MRes in Artificial Intelligence, completed with Distinction, added Python and applied NLP."
        ),
        "rev9": ["mmm", "scanpass", "innvision", "security", "aws", "perf", "payments", "process", "testing"],
        "skills": [
            ("Backend", "PHP, Laravel, REST API design, MySQL, Laravel Blade, WordPress"),
            ("Frontend", "JavaScript, React, HTML, CSS, Bootstrap, GSAP"),
            ("Security and data", "Token-based auth, role-based access control, OTP and ID verification, data modelling, schema design, indexing, query optimisation, caching"),
            ("Cloud and background work", "AWS Lambda integration, Amazon S3, jobs and queues, events, scheduled tasks"),
            ("Delivery", "Git, GitHub, GitLab, code review, CI/CD-based release workflow, Postman test scripts, functional and manual testing"),
            ("Python and NLP", "Python, pandas, NumPy, scikit-learn, PyTorch, Hugging Face Transformers"),
            ("Ways of working", "Agile and Scrum, SDLC, requirements gathering, client communication, OOP, data structures"),
        ],
        "research_first": False,
    },
    "backend-engineer": {
        "title": "Backend Engineer",
        "profile": (
            "Backend engineer with almost five years of experience designing and building the APIs, data models and logic "
            "behind web and mobile products in PHP, Laravel and MySQL. I've owned work end to end: I was the only engineer on "
            "ScanPass, from system design to deployment, and built the Laravel APIs behind the Muslim Match Makers Flutter app, "
            "including authentication, role-based access, OTP and ID verification, AWS Lambda and S3 integration, caching and "
            "background jobs. I care about clean data models, sensible APIs and systems that stay reliable in production. "
            "Gold medallist in BS Information Technology, with an MRes in Artificial Intelligence (Distinction)."
        ),
        "rev9": ["mmm", "security", "perf", "aws", "scanpass", "innvision", "payments", "testing", "process"],
        "skills": [
            ("Languages and frameworks", "PHP, Laravel, REST API design, MySQL, Python"),
            ("Security and access", "Token-based authentication, role-based access control, OTP verification, ID verification, server-side validation, secure environment configuration"),
            ("Data and performance", "Data modelling, schema design, indexing, query optimisation, caching"),
            ("Background work and cloud", "Jobs and queues, events, scheduled tasks, AWS Lambda integration, Amazon S3"),
            ("Delivery and quality", "Git, GitHub, GitLab, code review, CI/CD-based release workflow, Postman test scripts, functional and manual testing, logging and production troubleshooting"),
            ("Also", "JavaScript, React, Laravel Blade, Agile and Scrum, SDLC, OOP, data structures"),
        ],
        "research_first": False,
    },
    "php-developer": {
        "title": "PHP Developer",
        "profile": (
            "PHP developer with almost five years of experience building production applications in PHP and Laravel, from REST "
            "APIs and admin dashboards to WordPress sites. At Rev9 Solutions I built the Laravel APIs behind the Muslim Match "
            "Makers app, delivered Inn&rsquo;vision full stack and was the only engineer on ScanPass; before that I spent over "
            "three years at AH Media &amp; Marketing on client projects, growing from intern to Software Engineer. I work "
            "comfortably with MySQL, Laravel Blade and React, and graduated with a Gold Medal in BS Information Technology."
        ),
        "rev9": ["mmm", "innvision", "scanpass", "security", "perf", "aws", "payments", "process", "testing"],
        "skills": [
            ("PHP", "PHP, Laravel, Laravel Blade, REST API design, WordPress, object-oriented programming"),
            ("Database", "MySQL, data modelling, schema design, indexing, query optimisation, caching"),
            ("Laravel features", "Authentication, role-based access control, validation, jobs and queues, events, scheduled tasks"),
            ("Integrations", "AWS Lambda, Amazon S3, third-party APIs"),
            ("Frontend", "JavaScript, React, HTML, CSS, Bootstrap"),
            ("Delivery", "Git, GitHub, GitLab, code review, CI/CD-based release workflow, Postman test scripts, functional and manual testing, Agile and Scrum"),
        ],
        "research_first": False,
    },
}

STYLE = """
@font-face { font-family: "Inter"; src: url("../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2") format("woff2"); font-weight: 100 900; }
@page { size: A4; margin: 13mm 15mm 12mm; }
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; font-family: "Inter", Arial, sans-serif; font-size: 9.3pt; line-height: 1.42; color: #1d1d1f; }
a { color: inherit; text-decoration: none; }
header { padding-bottom: 10pt; border-bottom: 1.5pt solid #a3245a; }
h1 { margin: 0; font-size: 22pt; font-weight: 750; letter-spacing: -0.03em; line-height: 1.05; }
.title { margin: 3pt 0 7pt; font-size: 12pt; font-weight: 600; color: #a3245a; }
.contact { display: flex; flex-wrap: wrap; gap: 2pt 14pt; font-size: 8.6pt; }
h2 { margin: 11pt 0 4pt; font-size: 10.5pt; font-weight: 750; color: #a3245a; letter-spacing: 0.01em; break-after: avoid; }
p { margin: 0; }
.role { margin-top: 6pt; }
li { break-inside: avoid; }
.role-head { display: flex; justify-content: space-between; gap: 10pt; align-items: baseline; }
.role-head strong { font-size: 10.2pt; }
.when { font-size: 8.8pt; font-weight: 600; white-space: nowrap; }
.sub { font-size: 8.8pt; color: #45454a; }
ul { margin: 4pt 0 0; padding-left: 13pt; }
li { margin: 1.6pt 0; }
li::marker { color: #a3245a; }
.skills { display: grid; grid-template-columns: 34mm 1fr; gap: 2.5pt 10pt; }
.skills dt { font-weight: 650; }
.skills dd { margin: 0; }
.project { margin-top: 4pt; break-inside: avoid; }
.edu { margin-top: 5pt; break-inside: avoid; }
.cols { display: grid; grid-template-columns: 1fr 1fr; gap: 0 16pt; }
"""


def contact_html():
    parts = []
    for text, href in CONTACT:
        parts.append(f'<a href="{href}">{escape(text)}</a>' if href else f"<span>{escape(text)}</span>")
    return "".join(parts)


def build(slug, cv):
    rev9 = "".join(f"<li>{REV9[key]}</li>" for key in cv["rev9"])
    rev9 += "<li>Received the Rev9 Solutions Appreciation Award (2025).</li>"
    ah = "".join(f"<li>{point}</li>" for point in AH_MEDIA)
    skills = "".join(f"<dt>{escape(group)}</dt><dd>{escape(items)}</dd>" for group, items in cv["skills"])
    projects = "".join(
        f'<div class="project"><strong>{name}</strong> <span class="sub">| {tech} | {where}</span><p>{text}</p></div>'
        for name, tech, where, text in PROJECTS
    )
    education = "".join(
        f'<div class="edu"><div class="role-head"><strong>{q}</strong><span class="when">{when}</span></div>'
        f'<p class="sub">{inst}</p>{f"<p>{detail}</p>" if detail else ""}</div>'
        for q, inst, when, detail in EDUCATION
    )
    lists = lambda items: "<ul>" + "".join(f"<li>{i}</li>" for i in items) + "</ul>"

    return f"""<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<title>Syeda Momna Batool, {cv['title']} CV</title>
<style>{STYLE}</style>
</head>
<body>
<header>
  <h1>Syeda Momna Batool</h1>
  <p class="title">{cv['title']}</p>
  <div class="contact">{contact_html()}</div>
</header>

<h2>Profile</h2>
<p>{cv['profile']}</p>

<h2>Skills</h2>
<dl class="skills">{skills}</dl>

<h2>Experience</h2>
<div class="role">
  <div class="role-head"><strong>Backend Developer, Rev9 Solutions</strong><span class="when">Jun 2024 – Aug 2025</span></div>
  <p class="sub">Jhelum, Pakistan. Full time, on site. Joined as a Backend Developer Intern (Mar – May 2024).</p>
  <ul>{rev9}</ul>
</div>
<div class="role">
  <div class="role-head"><strong>Software Engineer, AH Media &amp; Marketing</strong><span class="when">Jan 2021 – Jun 2024</span></div>
  <p class="sub">Jhelum, Pakistan. Progressed from Software Engineering Intern.</p>
  <ul>{ah}</ul>
</div>

<h2>Research</h2>
<p>{RESEARCH}</p>

<h2>Selected projects</h2>
{projects}

<h2>Education</h2>
{education}

<div class="cols">
  <div><h2>Certifications</h2>{lists(CERTIFICATIONS)}</div>
  <div><h2>Awards</h2>{lists(AWARDS)}</div>
</div>

<h2>Activities and memberships</h2>
{lists(ACTIVITIES)}
</body>
</html>
"""


def main():
    PDF_DIR.mkdir(parents=True, exist_ok=True)
    pages = {}
    for slug, cv in CVS.items():
        path = ROOT / f"{slug}.html"
        path.write_text(build(slug, cv), encoding="utf-8")
        pages[slug] = path

    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("HTML written. Install Playwright for Python to build the PDFs automatically.")
        return

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        for slug, path in pages.items():
            page.goto(path.as_uri(), wait_until="networkidle")
            page.pdf(path=str(PDF_DIR / f"syeda-momna-batool-{slug}-cv.pdf"), format="A4", prefer_css_page_size=True, print_background=True)
        browser.close()

    # A picture of each CV's first page for the CV page on the site (needs poppler's pdftoppm).
    for slug in pages:
        pdf = PDF_DIR / f"syeda-momna-batool-{slug}-cv.pdf"
        try:
            subprocess.run(["pdftoppm", "-png", "-r", "90", "-f", "1", "-l", "1", "-singlefile", str(pdf), str(pdf.with_suffix(""))], check=True)
        except (OSError, subprocess.CalledProcessError):
            print("Skipped the preview image for", slug)
    print("Built", ", ".join(pages))


if __name__ == "__main__":
    main()
