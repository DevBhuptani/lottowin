// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title SimpleLottery
 * @notice A simple lottery where users can buy tickets for 0.01 ETH and owner can select winners

 
 */

 import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


interface IOracle {
    function read() external view returns (uint256);
    function lastUpdated() external view returns (uint256);
}

contract SimpleLottery {

    IERC20 public usdc;
    address oracle = 0xc8A1F9461115EF3C1E84Da6515A88Ea49CA97660;
    // Ticket price set to 0.01 ETH
    uint256 public constant TICKET_PRICE = 0.001 ether;
    
    // Counter for generating ticket IDs
    uint256 private ticketIdCounter;
    
    // Contract owner
    address public immutable owner;
    
    // Mapping from ticket ID to ticket holder address
    mapping(uint256 => address) public ticketHolders;
    
    // Mapping to track if a ticket has been claimed
    mapping(uint256 => bool) public ticketClaimed;
    
    // Mapping to track user's tickets
    mapping(address => uint256[]) public userTickets;
    
    // Total accumulated prize pool
    uint256 public prizePool;

    // Events
    event TicketPurchased(address indexed buyer, uint256 ticketId);
    event WinnerSelected(uint256 indexed ticketId, address indexed winner);
    event PrizeClaimed(address indexed winner, uint256 amount);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    constructor() {
        owner = msg.sender;
        ticketIdCounter = 1; // Start from 1 for better UX
    }

    /**
     * @notice Purchase a lottery ticket
     * @return ticketId The ID of the purchased ticket
     */
    function buyTicket() external payable returns (uint256 ticketId) {
        require(msg.value >= TICKET_PRICE, "Incorrect ticket price");
        
        ticketId = ticketIdCounter++;
        ticketHolders[ticketId] = msg.sender;
        userTickets[msg.sender].push(ticketId);
        prizePool += msg.value;
        
        emit TicketPurchased(msg.sender, ticketId);
    }

    /**
     * @notice Owner can select a winner for a specific prize amount
     * @param ticketId The winning ticket ID
     * @param prizeAmount Amount to be awarded
     */
    function selectWinner(uint256 ticketId, uint256 prizeAmount) external onlyOwner {
        require(ticketHolders[ticketId] != address(0), "Invalid ticket");
        require(!ticketClaimed[ticketId], "Ticket already claimed");
        require(prizeAmount <= prizePool, "Insufficient prize pool");
        
        ticketClaimed[ticketId] = true;
        emit WinnerSelected(ticketId, ticketHolders[ticketId]);
    }

    /**
     * @notice Claim prize for a winning ticket
     * @param ticketId The winning ticket ID
     */
    function claimPrize(uint256 ticketId) external {
        require(msg.sender == ticketHolders[ticketId], "Not ticket holder");
        require(ticketClaimed[ticketId], "Ticket not selected as winner");
        
        uint256 prize = TICKET_PRICE * 2; // Double the ticket price as prize
        require(prize <= prizePool, "Insufficient prize pool");
        
        prizePool -= prize;
        payable(msg.sender).transfer(prize);
        
        emit PrizeClaimed(msg.sender, prize);
    }

    /**
     * @notice Get all tickets owned by an address
     * @param user Address to check
     * @return Array of ticket IDs owned by the user
     */
    function getTicketsByUser(address user) external view returns (uint256[] memory) {
        return userTickets[user];
    }

    /**
     * @notice Check if a ticket ID is valid and owned by an address
     * @param ticketId Ticket ID to check
     * @param user Address to verify
     * @return bool True if ticket is owned by user
     */
    function isTicketOwner(uint256 ticketId, address user) external view returns (bool) {
        return ticketHolders[ticketId] == user;
    }

    /**
     * @notice Get number of tickets sold
     * @return Total number of tickets sold
     */
    function getTicketsSold() external view returns (uint256) {
        return ticketIdCounter - 1;
    }

    function getPrice() external view returns (uint256) {
        return IOracle(oracle).read();
    }

    /**
     * @notice Emergency function to withdraw funds (only owner)
     */
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = prizePool;
        prizePool = 0;
        payable(owner).transfer(balance);
    }
}