import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FullStack from "../../src/assets/images/full-stack.jpeg";

const courses = [
  {
    title: "Full Stack",
    image: FullStack,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio cumque ad consectetur omnis consequuntur beatae mollitia illum architecto quos nobis quo voluptatibus neque sapiente maiores debitis ratione, itaque modi quod.",
  },
];

export default function Courses() {
  return (
    <>
      {courses.map((course) => (
        <Card key={course.title} sx={{ maxWidth: 345, m: 2 }}>
          <CardMedia
            component="img"
            height="140"
            image={course.image}
            alt={course.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5">
              {course.title}
            </Typography>
            <Typography gutterBottom variant="h2">
              {course.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
