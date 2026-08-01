//code for search i/p (only frontend)
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

function SearchBar({ value, onChange }: Props) {
  return (
    <>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "35ch" } }}
        noValidate
        autoComplete="off">
        <TextField
          label="Search Tasks"
          variant="outlined"
          fullWidth
          placeholder="Search with task category or name"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </Box>
    </>
  );
}

export default SearchBar;
