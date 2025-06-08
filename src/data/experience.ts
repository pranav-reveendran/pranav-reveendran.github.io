
import { WorkExperience } from '@/types/experience';

export const experienceData: WorkExperience[] = [
  {
    company: "Amazon",
    title: "Business Data Engineer Intern",
    type: "Internship",
    duration: "4 months",
    location: "Seattle, Washington",
    startDate: "May 2025",
    endDate: "Aug 2025",
    isRemote: false,
    responsibilities: [
      "Built comprehensive marketing attribution platform processing 200M+ prospect records and 87M+ touchpoint interactions across email, onsite, and telemarketing channels, enabling real-time campaign optimization for Amazon Business marketers",
      "Developed advanced signal aggregation system integrating 72+ dimensional customer signals (P-card usage, commercial addresses, ML scoring) with multi-channel performance data, reducing marketing analysis time from weeks to minutes",
      "Collaborated with cross-functional marketing teams to translate business requirements into scalable data models, designing unified analytics architecture supporting both traditional BI dashboards and emerging LLM-powered query capabilities",
      "Optimized complex multi-table joins across billions of customer touchpoint records using advanced SQL techniques and temp table architecture, achieving 40% performance improvements in marketing intelligence queries",
      "Pioneered dual analytics approach combining pre-aggregated dashboard capabilities with natural language query functionality, positioning Amazon Business for next-generation self-service marketing analytics aligned with company AI strategy"
    ],
    skills: ["AWS Services", "Redshift", "S3", "EMR", "Python", "SQL", "Apache Spark", "Marketing Data Architecture", "Multi-Channel Attribution", "Customer Segmentation", "LLM Integration"],
  },
  {
    company: "San José State University",
    title: "Graduate Student Assistant Analyst",
    type: "Part-time",
    duration: "4 months",
    location: "San Jose, California",
    startDate: "Jan 2025",
    endDate: "Present",
    isRemote: false,
    responsibilities: [
      "Designed, developed, and maintain the official website for the SJSU EdD program, ensuring accessible information and professional online presence",
      "Manage program databases, ensuring data integrity and efficient retrieval for reporting and analysis",
      "Develop and maintain interactive data dashboards to visualize key program metrics",
      "Implemented automation processes for EdD program newsletter distribution"
    ],
    skills: ["Web Development", "Database Management", "Data Visualization", "Process Automation"],
  },
  {
    company: "Spartan Analytics",
    title: "Vice President of Programs",
    type: "Part-time",
    duration: "8 months",
    location: "San Jose, California",
    startDate: "Sep 2024",
    endDate: "Present",
    isRemote: false,
    responsibilities: [
      "Spearheaded initiatives to drive data literacy and analytics skills among students",
      "Developed strategic roadmap to expand impact, focusing on student-industry collaboration",
      "Worked with faculty and industry experts to design high-impact projects",
      "Provided mentorship in Python, SQL, Tableau, and machine learning"
    ],
    skills: ["Leadership", "Program Management", "Data Literacy", "Technical Mentorship"],
  },
  {
    company: "Epsilon",
    title: "Data Engineer 2",
    type: "Full-time",
    duration: "10 months",
    location: "Bengaluru, Karnataka, India",
    startDate: "Feb 2023",
    endDate: "Nov 2023",
    isRemote: false,
    responsibilities: [
      "Architected enterprise data pipelines processing 15+ TB daily marketing data",
      "Built and optimized Snowflake data warehouse reducing query latency by 40%",
      "Implemented real-time processing using Kafka Streams and Apache Flink",
      "Orchestrated ETL/ELT processes with AWS Glue and Great Expectations",
      "Developed transformation frameworks using dbt for marketing attribution",
      "Created ML data preparation pipelines using PyTorch and PySpark",
      "Built analytics dashboards with Tableau connecting to Trino"
    ],
    skills: ["PySpark", "Airflow", "Snowflake", "Kafka", "AWS", "dbt", "PyTorch", "Tableau"],
  },
  {
    company: "Epsilon",
    title: "Data Engineer",
    type: "Full-time",
    duration: "1 year",
    location: "Bengaluru, Karnataka, India",
    startDate: "Mar 2022",
    endDate: "Feb 2023",
    isRemote: true,
    responsibilities: [
      "Engineered data pipelines using Apache Spark and Airflow on AWS",
      "Built real-time data ingestion flows with Kafka feeding into Cassandra",
      "Developed ETL workflows in PySpark for Snowflake and Redshift",
      "Implemented Apache Hive data warehouse with optimized strategies",
      "Created data quality validation frameworks using Python and SQL",
      "Built streaming data processing jobs using Apache Flink"
    ],
    skills: ["Apache Spark", "Airflow", "AWS", "Kafka", "PySpark", "Snowflake", "Hive", "Flink"],
  },
  {
    company: "Epsilon",
    title: "Business Intelligence Developer",
    type: "Full-time",
    duration: "1 year 1 month",
    location: "Bengaluru, Karnataka, India",
    startDate: "Mar 2021",
    endDate: "Mar 2022",
    isRemote: false,
    responsibilities: [
      "Developed BI solutions using SQL and Python for marketing analytics",
      "Built visualization dashboards with Tableau and Power BI",
      "Created complex SQL queries for Snowflake and Oracle",
      "Implemented ETL processes in AWS Glue",
      "Designed dimensional data models in Snowflake",
      "Built automated reporting pipelines using Airflow"
    ],
    skills: ["SQL", "Python", "Tableau", "Power BI", "Snowflake", "AWS Glue", "ETL", "Data Modeling"],
  },
  {
    company: "Codenex Solutions LLP",
    title: "Full Stack Developer",
    type: "Internship",
    duration: "3 months",
    location: "Kozhikode",
    startDate: "Apr 2019",
    endDate: "Jun 2019",
    isRemote: false,
    responsibilities: [
      "Created visually appealing interfaces using HTML, CSS, and Bootstrap",
      "Implemented responsive design principles and best practices",
      "Optimized website performance and maintained code quality",
      "Developed web applications using PHP and modern frameworks"
    ],
    skills: ["HTML", "CSS", "Bootstrap", "PHP", "Responsive Design", "Web Development"],
  },
  {
    company: "EY",
    title: "Data Analyst Intern",
    type: "Internship",
    duration: "3 months",
    location: "Kochi",
    startDate: "Apr 2018",
    endDate: "Jun 2018",
    isRemote: false,
    responsibilities: [
      "Conducted data analysis using Hadoop MapReduce and Spark",
      "Created visually appealing dashboards and reports",
      "Collaborated with teams for data-driven decision making",
      "Enhanced skills in data manipulation and statistical analysis"
    ],
    skills: ["Hadoop", "MapReduce", "Spark", "Data Analysis", "Data Visualization", "Statistical Analysis"],
  }
];

