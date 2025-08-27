import { PrismaClient, JobType, JobCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {


  // 2. Create a sample company
  const company = await prisma.company.upsert({
    where: { name: "TechCorp" },
    update: {},
    create: {
      name: "TechCorp",
      userId: "user_30gNEVvkyWGSJoTba2OFSlNaBZP",
      logoUrl: "https://placehold.co/100x100",
      description: "A leading technology solutions company",
    },
  });

  // 3. Create 20 jobs
  const jobs = [
    {
      title: "Frontend Engineer",
      location: "Bangalore, India",
      pin: "560001",
      type: JobType.full_time,
      salary: "12 LPA",
      skills: "React, TypeScript, Tailwind",
      category: JobCategory.engineering,
  description: "Build and optimize modern web UIs for a fast-growing company.\nCollaborate with designers and backend engineers daily.\nWork on scalable, high-performance applications.\nStay updated with the latest frontend technologies.Manage enterprise client accounts and ensure satisfaction.\nCoordinate with internal teams for client needs.\nTrack account metrics and prepare reports.\nResolve issues and maintain long-term partnerships.",
    },
    {
      title: "Backend Engineer",
      location: "Hyderabad, India",
      pin: "500001",
      type: JobType.full_time,
      salary: "14 LPA",
      skills: "Node.js, Prisma, PostgreSQL",
      category: JobCategory.engineering,
  description: "Develop scalable backend APIs for mission-critical systems.\nIntegrate with databases and third-party services.\nEnsure security and performance best practices.\nParticipate in code reviews and architecture discussions.Manage enterprise client accounts and ensure satisfaction.\nCoordinate with internal teams for client needs.\nTrack account metrics and prepare reports.\nResolve issues and maintain long-term partnerships.",
    },
    {
      title: "Data Analyst",
      location: "Remote",
      pin: "000000",
      type: JobType.contract,
      salary: "8 LPA",
      skills: "SQL, Python, PowerBI",
      category: JobCategory.data,
  description: "Analyze datasets and prepare dashboards for business insights.\nWork closely with stakeholders to define metrics.\nPresent findings in clear, actionable formats.\nAutomate data collection and reporting processes.Manage enterprise client accounts and ensure satisfaction.\nCoordinate with internal teams for client needs.\nTrack account metrics and prepare reports.\nResolve issues and maintain long-term partnerships.",
    },
    {
      title: "Data Scientist",
      location: "Pune, India",
      pin: "411001",
      type: JobType.full_time,
      salary: "18 LPA",
      skills: "Machine Learning, Python, TensorFlow",
      category: JobCategory.data,
  description: "Build predictive models and data pipelines for real-world use.\nExperiment with new algorithms and data sources.\nCollaborate with engineering and product teams.\nDocument and present results to leadership.Manage enterprise client accounts and ensure satisfaction.\nCoordinate with internal teams for client needs.\nTrack account metrics and prepare reports.\nResolve issues and maintain long-term partnerships.",
    },
    {
      title: "Marketing Manager",
      location: "Mumbai, India",
      pin: "400001",
      type: JobType.full_time,
      salary: "10 LPA",
      skills: "SEO, SEM, Social Media",
      category: JobCategory.marketing,
  description: "Plan and execute marketing strategies for product launches.\nAnalyze campaign performance and optimize spend.\nCoordinate with creative and sales teams.\nStay ahead of digital marketing trends.Manage enterprise client accounts and ensure satisfaction.\nCoordinate with internal teams for client needs.\nTrack account metrics and prepare reports.\nResolve issues and maintain long-term partnerships.",
    },
    {
      title: "Content Writer",
      location: "Remote",
      pin: "000000",
      type: JobType.part_time,
      salary: "4 LPA",
      skills: "Blogging, Copywriting, SEO",
      category: JobCategory.marketing,
  description: "Create engaging content for web and social media platforms.\nResearch industry topics and trends for inspiration.\nEdit and proofread articles before publication.\nCollaborate with designers for visual assets.Manage enterprise client accounts and ensure satisfaction.\nCoordinate with internal teams for client needs.\nTrack account metrics and prepare reports.\nResolve issues and maintain long-term partnerships.",
    },
    {
      title: "UI/UX Designer",
      location: "Delhi, India",
      pin: "110001",
      type: JobType.full_time,
      salary: "9 LPA",
      skills: "Figma, Sketch, Prototyping",
      category: JobCategory.design,
  description: "Design intuitive user experiences for web and mobile apps.\nConduct user research and usability testing.\nCreate wireframes, prototypes, and design systems.\nWork closely with developers to implement designs.Manage enterprise client accounts and ensure satisfaction.\nCoordinate with internal teams for client needs.\nTrack account metrics and prepare reports.\nResolve issues and maintain long-term partnerships.",
    },
    {
      title: "Graphic Designer Intern",
      location: "Remote",
      pin: "000000",
      type: JobType.internship,
      salary: "15k/month",
      skills: "Illustrator, Photoshop",
      category: JobCategory.design,
  description: "Assist design team with creative assets for campaigns.\nLearn new design tools and techniques on the job.\nParticipate in brainstorming and feedback sessions.\nSupport branding and marketing initiatives.Manage enterprise client accounts and ensure satisfaction.\nCoordinate with internal teams for client needs.\nTrack account metrics and prepare reports.\nResolve issues and maintain long-term partnerships.",
    },
    {
      title: "Sales Executive",
      location: "Chennai, India",
      pin: "600001",
      type: JobType.full_time,
      salary: "7 LPA + Incentives",
      skills: "CRM, Communication, Negotiation",
      category: JobCategory.sales,
  description: "Drive B2B software sales and build client relationships.\nIdentify new business opportunities and leads.\nPrepare and deliver product presentations.\nAchieve and exceed monthly sales targets.Manage enterprise client accounts and ensure satisfaction.\nCoordinate with internal teams for client needs.\nTrack account metrics and prepare reports.\nResolve issues and maintain long-term partnerships.",
    },
    {
      title: "Account Manager",
      location: "Gurgaon, India",
      pin: "122001",
      type: JobType.full_time,
      salary: "11 LPA",
      skills: "Client Relations, Strategy",
      category: JobCategory.sales,
  description: "Manage enterprise client accounts and ensure satisfaction.\nCoordinate with internal teams for client needs.\nTrack account metrics and prepare reports.\nResolve issues and maintain long-term partnerships.Manage enterprise client accounts and ensure satisfaction.\nCoordinate with internal teams for client needs.\nTrack account metrics and prepare reports.\nResolve issues and maintain long-term partnerships.",
    },
    {
      title: "HR Recruiter",
      location: "Remote",
      pin: "000000",
      type: JobType.full_time,
      salary: "6 LPA",
      skills: "Recruitment, ATS, Interviewing",
      category: JobCategory.hr,
  description: "Handle end-to-end recruitment cycle for various roles.\nSource, screen, and interview potential candidates.\nMaintain candidate database and recruitment reports.\nCollaborate with hiring managers for requirements.Manage enterprise client accounts and ensure satisfaction.\nCoordinate with internal teams for client needs.\nTrack account metrics and prepare reports.\nResolve issues and maintain long-term partnerships.",
    },
    {
      title: "HR Intern",
      location: "Bangalore, India",
      pin: "560001",
      type: JobType.internship,
      salary: "12k/month",
      skills: "Onboarding, Screening",
      category: JobCategory.hr,
  description: "Support HR operations and recruitment for new hires.\nAssist with onboarding and employee engagement.\nHelp organize HR events and training sessions.\nMaintain HR records and documentation.Manage enterprise client accounts and ensure satisfaction.\nCoordinate with internal teams for client needs.\nTrack account metrics and prepare reports.\nResolve issues and maintain long-term partnerships.",
    },
    {
      title: "Finance Analyst",
      location: "Mumbai, India",
      pin: "400001",
      type: JobType.full_time,
      salary: "13 LPA",
      skills: "Excel, Financial Modeling",
      category: JobCategory.finance,
  description: "Analyze financial reports and budgets for management.\nPrepare forecasts and financial models as needed.\nAssist with audits and compliance checks.\nPresent findings to finance leadership team.Manage enterprise client accounts and ensure satisfaction.\nCoordinate with internal teams for client needs.\nTrack account metrics and prepare reports.\nResolve issues and maintain long-term partnerships.",
    },
    {
      title: "Accountant",
      location: "Kolkata, India",
      pin: "700001",
      type: JobType.full_time,
      salary: "5 LPA",
      skills: "Tally, Taxation",
      category: JobCategory.finance,
  description: "Maintain company financial records and ledgers.\nPrepare invoices, payments, and tax documents.\nReconcile accounts and resolve discrepancies.\nSupport month-end and year-end closing. Manage enterprise client accounts and ensure satisfaction.\nCoordinate with internal teams for client needs.\nTrack account metrics and prepare reports.\nResolve issues and maintain long-term partnerships.",
    },
    {
      title: "DevOps Engineer",
      location: "Hyderabad, India",
      pin: "500081",
      type: JobType.full_time,
      salary: "16 LPA",
      skills: "AWS, Docker, Kubernetes",
      category: JobCategory.engineering,
  description: "Automate deployments and CI/CD pipelines for all projects.\nMonitor infrastructure and resolve incidents quickly.\nImplement best practices for cloud security.\nWork with developers to streamline releases. Manage enterprise client accounts and ensure satisfaction.\nCoordinate with internal teams for client needs.\nTrack account metrics and prepare reports.\nResolve issues and maintain long-term partnerships.",
    },
    {
      title: "QA Tester",
      location: "Pune, India",
      pin: "411001",
      type: JobType.contract,
      salary: "6 LPA",
      skills: "Selenium, Cypress, Jest",
      category: JobCategory.engineering,
  description: "Ensure product quality with automated testing tools.\nWrite and maintain test cases and scripts.\nReport bugs and work with developers to fix them.\nParticipate in release and regression testing. Manage enterprise client accounts and ensure satisfaction.\nCoordinate with internal teams for client needs.\nTrack account metrics and prepare reports.\nResolve issues and maintain long-term partnerships.",
    },
    {
      title: "Fullstack Developer",
      location: "Noida, India",
      pin: "201301",
      type: JobType.full_time,
      salary: "15 LPA",
      skills: "React, Node.js, Prisma, GraphQL",
      category: JobCategory.engineering,
  description: "Build full-stack web applications for diverse clients.\nIntegrate frontend and backend systems seamlessly.\nWrite clean, maintainable, and scalable code.\nParticipate in agile development sprints.Manage enterprise client accounts and ensure satisfaction.\nCoordinate with internal teams for client needs.\nTrack account metrics and prepare reports.\nResolve issues and maintain long-term partnerships.",
    },
    {
      title: "Product Manager",
      location: "Gurgaon, India",
      pin: "122001",
      type: JobType.full_time,
      salary: "20 LPA",
      skills: "Agile, Roadmap Planning",
      category: JobCategory.product,
  description: "Drive product vision and execution from ideation to launch.\nGather and prioritize product requirements.\nWork with cross-functional teams to deliver value.\nAnalyze user feedback and iterate on features.Manage enterprise client accounts and ensure satisfaction.\nCoordinate with internal teams for client needs.\nTrack account metrics and prepare reports.\nResolve issues and maintain long-term partnerships.",
    },
    {
      title: "Support Engineer",
      location: "Bangalore, India",
      pin: "560001",
      type: JobType.full_time,
      salary: "6.5 LPA",
      skills: "Customer Support, Troubleshooting",
      category: JobCategory.other,
  description: "Assist customers with product issues and inquiries.\nTroubleshoot technical problems and provide solutions.\nDocument support cases and resolutions.\nWork with engineering to resolve complex issues.\nProvide training and onboarding for new customers.\nGather feedback to improve support processes.\nMaintain knowledge base and help articles.\nParticipate in customer success initiatives.",
    },
    {
      title: "Research Intern",
      location: "Delhi, India",
      pin: "110001",
      type: JobType.internship,
      salary: "10k/month",
      skills: "Research, Documentation",
      category: JobCategory.other,
  description: "Assist with product and market research projects.\nCollect and analyze data from various sources.\nPrepare research reports and presentations.\nSupport team with documentation and findings.\nHelp organize research materials and references.\nParticipate in brainstorming and ideation sessions.\nSummarize key findings for internal newsletters.\nSupport other teams with research as needed."
    },
  ].map((job) => ({
    ...job,
    createdBy: "user_30gNEVvkyWGSJoTba2OFSlNaBZP",
    companyId: company.id,
  }));

  await prisma.job.createMany({ data: jobs });

  console.log("✅ Seeded 20 jobs successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
