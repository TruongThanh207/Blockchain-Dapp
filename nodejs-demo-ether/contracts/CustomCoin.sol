pragma solidity ^0.5.16;

import "./ConvertLib.sol";

contract CustomCoin {
    string public name = "CustomCoin";
    string public symbol = "CSCoin";
    string public standard = "Coin v1.0";

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() public {
        balanceOf[msg.sender] = 10000;
    }

    event Transfer(address indexed _from, address indexed _to, uint256 _amount);
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _amount
    );

    function transfer (address _to, uint256 _amount)public returns(bool){
        require(balanceOf[msg.sender] >= _amount);
        balanceOf[msg.sender] -= _amount;
        balanceOf[_to] += _amount;
        emit Transfer(msg.sender, _to, _amount);
        return true;
    }

    function approve(
        address _owner,
        address _spender,
        uint256 _amount
    )public returns(bool) {
        allowance[msg.sender][_spender] = _amount;
        emit Approval(_owner, _spender, _amount);
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _amount
    )public returns(bool){
        require(_amount <= balanceOf[_from]);
        require(_amount <= allowance[_from][msg.sender]);

        balanceOf[_from] -= _amount;
        balanceOf[_to] += _amount;

        emit Transfer(_from, _to, _amount);
        return true;
    }

    function getBalanceInEth(address addr) public view returns(uint256){
        return ConvertLib.convert(getBalance(addr), 2);
    }

    function getBalance(address addr) public view returns(uint256){
        return balanceOf[addr];
    }
}
