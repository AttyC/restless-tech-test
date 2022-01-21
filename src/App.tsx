import React, { useState } from "react";
import {
  Heading,
  Container,
  Center,
  Flex,
  Button,
  IconButton,
  ChakraProvider,
  Input,
  List,
  ListItem,
  Text,
  theme,
  Tag,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

type PointsValue = any;

type TTask = string;

type TTasks = {
  name: string;
  points: number;
}[];

type TAppProps = {
  newTask?: TTask;
  tasks?: TTasks;
};

const taskStyles = {
  normal: {
    ListItem: {
      borderBottomWidth: "1px",
      borderBottomColor: "gray.200",
    },
    Tag: {
      color: "gray.800",
      background: "gray.200",
    },
    Text: {
      "aria-label": "normal",
      background: "gray.200",
      color: "gray.800",
      fontWeight: "bold"
    },
    IconButton: {
      color: "gray.800",
      background: "gray.200",
    },
    PointsButton: {
      background: "gray.100",
      fontSize: "0.7rem"
    }
  },
  critical: {
    ListItem: {
      borderBottomWidth: "1px",
      borderBottomColor: "red.200",
    },
    Tag: {
      color: "red.900",
      background: "red.200",
    },
    Text: {
      "aria-label": "critical",
      background: "red.100:",
      color: "red.800",
      fontWeight: "bold"
    },
    IconButton: {
      background: "red.200",
      color: "red.800"
    },
    PointsButton: {
      background: "gray.100",
      fontSize: "0.7rem"
    }
  },
};

export const App = ({ newTask = "", tasks: initialTasks = [] }: TAppProps, pointsValue: PointsValue) => {
  const [task, setTask] = useState(newTask);
  const [tasks, setTasks] = useState(initialTasks);

  const addTask = () => {
    // check for points in the name input
    const regex = /\d+/;
    let inputContainsNumbers = task.match(regex)
    inputContainsNumbers !== null ? pointsValue = inputContainsNumbers[0] : pointsValue = Math.floor(Math.random() * 100)
    setTasks([...tasks, { name: task, points: pointsValue }]);
  }

  const removeTask = (i: number) => {
    const newTasks = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
  };


  const incrementPoints = (i: number) => {
    const newTasks = [...tasks];
    newTasks.splice(i, 1);
    setTasks([...newTasks, { name: task, points: tasks[i].points + 1 }]);
  }

  const decrementPoints = (i: number) => {
    const newTasks = [...tasks];
    newTasks.splice(i, 1);
    setTasks([...newTasks, { name: task, points: tasks[i].points - 1 }]);
  }

  let sortedTasks = tasks?.sort((a, b) => Number(b.points) - Number(a.points));

  return (
    <ChakraProvider theme={theme}>
      <Center py={10} bg="gray.200" mb={10}>
        <Heading>TODO</Heading>
      </Center>
      <Container>
        <Flex gap={2} mb={5}>
          <Input placeholder="Name" onChange={(e) => setTask(e.target.value)} />
          <IconButton aria-label="Add" icon={<AddIcon />} onClick={addTask} />
        </Flex>
        <List borderTopWidth="1px" borderTopColor="gray.200">
          {sortedTasks.map((task, i) => {   
            let taskPriority = task.points >= 10 ? taskStyles.critical : taskStyles.normal
             return (
            <ListItem
              key={i}
              aria-label="task"
              py={3}
              {...taskPriority.ListItem}
            >
              <Flex justify="space-between" align="center">
                <Tag aria-label="points" {...taskPriority.Tag}>
                  {task.points}
                </Tag>{" "}
                <Text {...taskPriority.Text}>{task.name}</Text>
                <IconButton
                  aria-label="Remove"
                  icon={<DeleteIcon />}
                  onClick={() => removeTask(i)}
                />
              </Flex>
              <>
                <Flex gap={2} mb={5}>
                  <Button size='xs' onClick={() => incrementPoints(i)} {...taskPriority.PointsButton}>+ points</Button>
                  <Button size='xs' onClick={() => decrementPoints(i)} {...taskPriority.PointsButton}>- points</Button>
                </Flex>

              </>
            </ListItem>
            )}
          )}
        </List>
      </Container>
    </ChakraProvider>
  );
};
