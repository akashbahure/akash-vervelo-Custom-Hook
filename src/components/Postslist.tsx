import React from "react";
import {
  Loader,
  Alert,
  Card,
  Title,
  Table,
  ScrollArea,
  Button,
  Group,
  Center,
  Text,
} from "@mantine/core";
import { usePostsQuery } from "../hooks/usePostsQuery";
import { usePagination } from "../hooks/usePagination";

const PostsList: React.FC = () => {
  const { data: posts, isLoading, error } = usePostsQuery();
  const {
    currentPage,
    setCurrentPage,
    paginate,
    totalPagesCount,
    getPageNumbers,
  } = usePagination(1, 5);

  if (isLoading)
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="xl" />
      </Center>
    );
  if (error)
    return (
      <Center style={{ height: "100vh" }}>
        <Alert color="red">{(error as Error).message}</Alert>
      </Center>
    );

  const paginatedPosts = paginate(posts || []);
  const totalPages = totalPagesCount(posts?.length || 0);
  const pageNumbers = getPageNumbers(posts?.length || 0);

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
          Posts List
        </Title>

        <ScrollArea>
          <Table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead style={{ backgroundColor: "#f5f5f5" }}>
              <tr>
                <th style={{ border: "1px solid #dee2e6", padding: "12px" }}>
                  ID
                </th>
                <th style={{ border: "1px solid #dee2e6", padding: "12px" }}>
                  Title
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedPosts.map((post) => (
                <tr
                  key={post.id}
                  style={{
                    backgroundColor:
                      paginatedPosts.indexOf(post) % 2 === 0
                        ? "#fafafa"
                        : "white",
                  }}
                >
                  <td style={{ border: "1px solid #dee2e6", padding: "12px" }}>
                    <Text>{post.id}</Text>
                  </td>
                  <td style={{ border: "1px solid #dee2e6", padding: "12px" }}>
                    <Text>{post.title}</Text>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollArea>

        <Center mt="md">
          <Group spacing="xs" style={{ overflowX: "auto" }}>
            <Button
              size="sm"
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </Button>

            {pageNumbers.map((num) => (
              <Button
                key={num}
                size="sm"
                variant={currentPage === num ? "filled" : "outline"}
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </Button>
            ))}

            <Button
              size="sm"
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </Group>
        </Center>
      </Card>
    </Center>
  );
};

export default PostsList;
