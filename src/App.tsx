import React, { useState } from "react";
import {
  Heading,
  Container,
  Center,
  Flex,
  IconButton,
  ChakraProvider,
  Input,
  List,
  ListItem,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
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
  priority: string;
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
      color: "gray.800",
    },
    IconButton: {
      color: "gray.800",
      background: "gray.200",
    },
  },
  critical: {
    ListItem: {
      borderBottomWidth: "1px",
      borderBottomColor: "red.200",
    },
    Tag: {
      color: "red.800",
      background: "red.200",
    },
    Text: {
      "aria-label": "critical",
      color: "red.800",
    },
    IconButton: {
      color: "red.800",
      background: "red.200",
    },
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
    setTasks([...tasks, { name: task, points: pointsValue, priority: '' }]);
  }

  const removeTask = (i: number) => {
    const newTasks = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
  };

  const updatePoints = (e: string) => setTasks([...tasks, { name: task, points: parseInt(e), priority: '' }]);

  let sortedTasks = tasks.sort((a, b) => Number(b.points) - Number(a.points));

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
                  <NumberInput 
                    step={1} 
                    key={i}
                    value={task.points}
                    defaultValue={0}
                    min={0} 
                    max={100} 
                    allowMouseWheel 
                    focusInputOnChange 
                    aria-label="UpdatePoints" 
                    onChange={updatePoints} 
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>

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
