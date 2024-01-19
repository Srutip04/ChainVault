// SimpleStorage.sol
pragma solidity ^0.8.0;

contract SimpleStorage {
    string public storedData;

    function set(string memory _data) public {
        storedData = _data;
    }

    function get() public view returns (string memory) {
        return storedData;
    }
}
