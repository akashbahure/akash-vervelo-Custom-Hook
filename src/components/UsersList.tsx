import React from "react";
import { useFetchUsers } from "../hooks/useFetchUsers";
import {
  Loader,
  Alert,
  Center,
  Card,
  ScrollArea,
  Title,
  Text,
  Box,
} from "@mantine/core";

const UsersList: React.FC = () => {
  const { users, loading, error } = useFetchUsers();

  if (loading)
    return (
      <Center style={{ height: "100vh" }}>
        <Loader color="blue" size="xl" variant="dots" />
      </Center>
    );

  if (error)
    return (
      <Center style={{ height: "100vh" }}>
        <Alert color="red" title="Error">
          {error}
        </Alert>
      </Center>
    );

  return (
    <Center style={{ padding: "40px 0" }}>
      <Card
        shadow="md"
        padding="xl"
        radius="md"
        withBorder
        style={{ width: "100%", maxWidth: 800 }}
      >
        <Title order={2} align="center" mb="md">
          User List
        </Title>

        <ScrollArea>
          <Box
            component="table"
            style={{
              borderCollapse: "collapse",
              width: "100%",
              border: "1px solid #dee2e6",
            }}
          >
            <thead
              style={{
                backgroundColor: "#f5f5f5",
              }}
            >
              <tr>
                <th style={{ border: "1px solid #dee2e6", padding: "12px" }}>ID</th>
                <th style={{ border: "1px solid #dee2e6", padding: "12px" }}>Name</th>
                <th style={{ border: "1px solid #dee2e6", padding: "12px" }}>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#fafafa" : "white",
                    cursor: "pointer",
                  }}
                >
                  <td style={{ border: "1px solid #dee2e6", padding: "12px" }}>
                    <Text>{user.id}</Text>
                  </td>
                  <td style={{ border: "1px solid #dee2e6", padding: "12px" }}>
                    <Text>{user.name}</Text>
                  </td>
                  <td style={{ border: "1px solid #dee2e6", padding: "12px" }}>
                    <Text>{user.email}</Text>
                  </td>
                </tr>
              ))}
            </tbody>
          </Box>
        </ScrollArea>
      </Card>
    </Center>
  );
};

export default UsersList;
