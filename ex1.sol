pragma solidity ^0.4.0;

contract People {
    
    struct person{
        string name;
        uint age;
        string[] feedback;  // dynamic list of feedbacks.
    }
    uint personID;
    uint numPerson;
    mapping (uint => person) peopleList;
    
    function People() public {
        numPerson =0;
    }
    function addPerson(string _name,uint _age) public returns (uint personID){
        personID = numPerson++;
        peopleList[personID].name=_name;
        peopleList[personID].age=_age;
    }
    function giveFeedback(uint personID,string feed) public {
        peopleList[personID].feedback.push(feed);
    }
    
    // here i can see review for a person at a perticular index.
    
    function seeFeedback(uint personID,uint index) public returns (string feeds){
        return peopleList[personID].feedback[index];
    }
    
    function ReviewName(uint ID) public returns (string name){
        return (peopleList[ID].name);
    }
    function ReviewAge(uint ID) public returns (uint age){
        return (peopleList[ID].age);
    }
    
}
