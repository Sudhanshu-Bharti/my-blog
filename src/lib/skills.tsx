import { Code2, Layers, Cpu, Terminal, PenTool } from "lucide-react"
import {
  type SkillCategory,
} from "../components/git-commit-skills"

export const skillCategories: SkillCategory[] = [
    {
      name: "Frontend",
      icon: <Layers className="w-5 h-5" />,
      color: "from-blue-500/10 to-cyan-500/10",
      skills: [
        "React",
        "Nextjs",
        "TailwindCSS",
        "FramerMotion",
        "Redux",
        "Zustand",
        "Shadcn UI",
      ].filter(Boolean), 
    },
    {
      name: "Backend",
      icon: <Cpu className="w-5 h-5" />,
      color: "from-green-500/10 to-emerald-500/10",
      skills: [
        "Nodejs",
        "Express",
        "TypeScript",
        "mysql",
        "PostgreSQL",
        "MongoDB",
        "Prisma",
        "Drizzle ORM",
        "Redis",
      ].filter(Boolean),
    },
    {
      name: "Database",
      icon: <Terminal className="w-5 h-5" />,
      color: "from-purple-500/10 to-violet-500/10",
      skills: [
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "Prisma",
        "Drizzle ORM",
        "Redis",
      ].filter(Boolean),
    },
    {
      name: "Design",
      icon: <PenTool className="w-5 h-5" />,
      color: "from-pink-500/10 to-rose-500/10",
      skills: ["Figma", "UI/UX"].filter(Boolean),
    },
    {
      name: "Languages",
      icon: <Code2 className="w-5 h-5" />,
      color: "from-orange-500/10 to-yellow-500/10",
      skills: [
        "JavaScript",
        "TypeScript",
        "Python",
        "C",
        "Cplusplus",
        "mysql",
        "Java",
      ].filter(Boolean),
    },
  ]