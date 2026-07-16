import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import type { ReactElement } from "react";

import FullStack from "../../src/assets/images/full-stack.jpeg";
import UIUX from "../../src/assets/images/ui-ux.jpeg";
import Business from "../../src/assets/images/business.jpeg";
import Marketing from "../../src/assets/images/marketing.jpeg";

import { Styles } from "../Components/styles/Courses.styles";

interface Course {
  title: string;
  image: string;
  description: string;
}

const courses: Course[] = [
  {
    title: "Full Stack",
    image: FullStack,
    description:
      "Learn frontend, backend, databases, APIs, and modern web development technologies.",
  },
  {
    title: "UI/UX",
    image: UIUX,
    description:
      "Learn user research, wireframes, prototypes, and modern design principles.",
  },
  {
    title: "Business",
    image: Business,
    description:
      "Understand business strategy, management, and growth techniques.",
  },
  {
    title: "Marketing",
    image: Marketing,
    description:
      "Learn digital marketing, branding, SEO, and customer engagement.",
  },
  {
    title: "MERN Stack",
    image: FullStack,
    description:
      "Learn frontend, backend, databases, APIs, and modern web development technologies.",
  },
  {
    title: "UI/UX Design",
    image: UIUX,
    description:
      "Learn user research, wireframes, prototypes, and modern design principles.",
  },
  {
    title: "Business Management",
    image: Business,
    description:
      "Understand business strategy, management, and growth techniques.",
  },
  {
    title: "Marketing Skills",
    image: Marketing,
    description:
      "Learn digital marketing, branding, SEO, and customer engagement.",
  },
];

export default function Courses(): ReactElement {
  return (
    <Box sx={Styles.container}>
      {courses.map((Course) => (
        <Card key={Course.title} sx={Styles.card}>
          <Box>
            <CardMedia
              component="img"
              image={Course.image}
              alt={Course.title}
              sx={Styles.image}
            />
          </Box>

          <CardContent sx={Styles.content}>
            <Typography variant="h5" sx={Styles.title}>
              {Course.title}
            </Typography>

            <Typography variant="body2" sx={Styles.description}>
              {Course.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
