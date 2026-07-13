import { useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface Address {
  street: string;
  suite: string;
  city: string;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
}

function UserData() {
  const [users, setUsers] = useState<User[]>([]);
  const [showTable, setShowTable] = useState<boolean>(false);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);

  const showData = async (): Promise<void> => {
    setShowTable(true);

    if (dataLoaded) return;

    try {
      const response = await axios.get<User[]>(
        "https://jsonplaceholder.typicode.com/users",
      );

      setUsers(response.data);
      setDataLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  const removeData = (): void => {
    setShowTable(false);
  };

  return (
    <Container sx={{ mt: 2, textAlign: "center" }}>
      {!showTable && (
        <Button variant="contained" color="primary" onClick={showData}>
          View Data
        </Button>
      )}

      {showTable && (
        <Button
          variant="contained"
          color="secondary"
          onClick={removeData}
          sx={{ mb: 2 }}>
          Remove Data
        </Button>
      )}

      {showTable && (
        <Card>
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#212121" }}>
                    {[
                      "ID",
                      "Name",
                      "Username",
                      "Email",
                      "Phone",
                      "Website",
                      "Address",
                      "Company",
                    ].map((heading) => (
                      <TableCell
                        key={heading}
                        align="center"
                        sx={{
                          color: "#fff",
                          fontWeight: "bold",
                        }}>
                        {heading}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {users.map((user: User) => (
                    <TableRow key={user.id}>
                      <TableCell align="center">{user.id}</TableCell>

                      <TableCell align="center">{user.name}</TableCell>

                      <TableCell align="center">{user.username}</TableCell>

                      <TableCell align="center">
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                      </TableCell>

                      <TableCell align="center">{user.phone}</TableCell>

                      <TableCell align="center">{user.website}</TableCell>

                      <TableCell align="center">
                        {user.address.street}, {user.address.suite},
                        {user.address.city}
                      </TableCell>

                      <TableCell align="center">
                        {user.company.name}, {user.company.catchPhrase},
                        {user.company.bs}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

export default UserData;
