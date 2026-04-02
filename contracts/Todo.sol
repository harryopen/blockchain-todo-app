// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Todo {
    struct Task {
        string content;
        bool completed;
    }

    mapping(uint => Task) public tasks;
    uint public taskCount;

    function addTask(string memory _content) public {
        taskCount++;
        tasks[taskCount] = Task(_content, false);
    }

    function toggleTask(uint _id) public {
        tasks[_id].completed = !tasks[_id].completed;
    }
}