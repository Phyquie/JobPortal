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
      salary: 10000,
      skills: "React, TypeScript, Tailwind",
      category: JobCategory.engineering,
  description: "Build and optimize modern web UIs for a fast-growing company.\nCollaborate with designers and backend engineers daily.\nWork on scalable, high-performance applications.\nStay updated with the latest frontend technologies.Manage enterprise client accounts and ensure satisfaction.\nCoordinate with internal teams for client needs.\nTrack account metrics and prepare reports.\nResolve issues and maintain long-term partnerships.",
    },
    {
      title: "Backend Engineer",
      location: "Hyderabad, India",
      pin: "500001",
      type: JobType.full_time,
      salary: 20000,
      skills: "Node.js, Prisma, PostgreSQL",
      category: JobCategory.engineering,
  description: "Develop scalable backend APIs for mission-critical systems.\nIntegrate with databases and third-party services.\nEnsure security and performance best practices.\nParticipate in code reviews and architecture discussions.Manage enterprise client accounts and ensure satisfaction.\nCoordinate with internal teams for client needs.\nTrack account metrics and prepare reports.\nResolve issues and maintain long-term partnerships.",
    },
    {
      title: "Data Analyst",
      location: "Remote",
      pin: "000000",
      type: JobType.contract,
      salary: 30000,
      skills: "SQL, Python, PowerBI",
      category: JobCategory.data,
  description: "Analyze datasets and prepare dashboards for business insights.\nWork closely with stakeholders to define metrics.\nPresent findings in clear, actionable formats.\nAutomate data collection and reporting processes.Manage enterprise client accounts and ensure satisfaction.\nCoordinate with internal teams for client needs.\nTrack account metrics and prepare reports.\nResolve issues and maintain long-term partnerships.",
    },
    {
      title: "Data Scientist",
      location: "Pune, India",
      pin: "411001",
      type: JobType.full_time,
      salary: 40000,
      skills: "Machine Learning, Python, TensorFlow",
      category: JobCategory.data,
  description: "Build predictive models and data pipelines for real-world use.\nExperiment with new algorithms and data sources.\nCollaborate with engineering and product teams.\nDocument and present results to leadership.Manage enterprise client accounts and ensure satisfaction.\nCoordinate with internal teams for client needs.\nTrack account metrics and prepare reports.\nResolve issues and maintain long-term partnerships.",
    },
    {
      title: "Marketing Manager",
      location: "Mumbai, India",
      pin: "400001",
      type: JobType.full_time,
      salary: 1000000,
      skills: "SEO, SEM, Social Media",
      category: JobCategory.marketing,
  description: "Plan and execute marketing strategies for product launches.\nAnalyze campaign performance and optimize spend.\nCoordinate with creative and sales teams.\nStay ahead of digital marketing trends.Manage enterprise client accounts and ensure satisfaction.\nCoordinate with internal teams for client needs.\nTrack account metrics and prepare reports.\nResolve issues and maintain long-term partnerships.",
    },
    {
      title: "Content Writer",
      location: "Remote",
      pin: "000000",
      type: JobType.part_time,
      salary: 500000,
      skills: "Blogging, Copywriting, SEO",
      category: JobCategory.marketing,
  description: "Create engaging content for web and social media platforms.\nResearch industry topics and trends for inspiration.\nEdit and proofread articles before publication.\nCollaborate with designers for visual assets.Manage enterprise client accounts and ensure satisfaction.\nCoordinate with internal teams for client needs.\nTrack account metrics and prepare reports.\nResolve issues and maintain long-term partnerships.",
    },
    {
      title: "UI/UX Designer",
      location: "Delhi, India",
      pin: "110001",
      type: JobType.full_time,
      salary: 600000,
      skills: "Figma, Sketch, Prototyping",
      category: JobCategory.design,
  description: "Design intuitive user experiences for web and mobile apps.\nConduct user research and usability testing.\nCreate wireframes, prototypes, and design systems.\nWork closely with developers to implement designs.Manage enterprise client accounts and ensure satisfaction.\nCoordinate with internal teams for client needs.\nTrack account metrics and prepare reports.\nResolve issues and maintain long-term partnerships.",
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
