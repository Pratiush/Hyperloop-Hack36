pragma solidity ^0.4.19;

contract People {
    
    struct person{
        string name;
        uint age;
        bool ableToCounter;
        string feed; // not used
        uint counter;
        mapping (uint =>feedback) reviewList;
        
    //    feed[] feedback;  // dynamic list of feedbacks.replace by delimiter
    }
    struct feedback{
        string designation;
        string joiningDate;
        string resignDate;
        string branch;
        string review;
        string justification;
    }
    
    //mapping (uint =>mapping(uint=>feedback))public reviewList;
    
    struct company{
        string company_name;
        string branch;
        string email;
        bool isVerified;
    }
    
    mapping (uint =>company) companyList;
    uint companyID;
    uint numCompany;
    uint personID;
    uint numPerson;
    mapping (uint => person) peopleList;
    
    function People() public {
        numPerson =0;
    }
    // college will add person for the first time.
    function addPerson(string name,uint age) public returns (uint ){
        personID = numPerson++;
        peopleList[personID].name=name;
        peopleList[personID].age=age;
        return personID;
    }
    // 
    function addCompany(string _companyName,string _branch ,string _email)public returns(uint companyID){
        companyID = numCompany++;
        companyList[companyID].company_name=_companyName;
        companyList[companyID].branch=_branch;
        companyList[companyID].email=_email;
        companyList[companyID].isVerified=false;
        return companyID; // this is unique id for the company (to be kept secret)
    }
    
    // verification of company by ADMIN (done manually)
    function verifyCompany(uint companyID) public returns(bool){
        companyList[companyID].isVerified=true;
        return true;
    }
    
    
    function isCompanyVerified(uint companyID)public returns(bool){ // to check if company is already verified.
        return companyList[companyID].isVerified;
    }
    
    function getNumCompany() public returns(uint ){
        return numCompany;
    }
    
    
    function getNumEmployee() public returns (uint){
        return numPerson;
    }
    
    function getCompany(uint cid) public returns (string company_name,string email){
        return (companyList[cid].company_name ,companyList[cid].email);
    }
    
    /*function getEmployee(uint eid ) public returns(person){
        return peopleList[eid];
        
    }*/
    
    // feedback by each company
    function giveFeedback(uint personID,string _joindate,string _resigndate,string _designation,string _branch,string _review) public returns (uint){
        
        feedback temp;
        temp.review=_review;
        temp.joiningDate=_joindate;
        temp.resignDate=_resigndate;
        temp.designation=_designation;
        temp.branch=_branch;
        peopleList[personID].reviewList[peopleList[personID].counter]=temp;
        peopleList[personID].counter+=1;
        peopleList[personID].ableToCounter=true;
        return peopleList[personID].counter;
        //string parsedfeed="";
        //string pid=personID;
        //string del;
        //peopleList[personID].feed+=_joindate+"%"+_resigndate+"%"+_designation+"%"+_branch+"%"+_review+"##";
       // return parsedfeed;
    /*  peopleList[personID].feedback[0].review=_review;
        peopleList[personID].feedback[0].joiningDate=_joindate;
        peopleList[personID].feedback[0].resignDate=_resigndate;
        peopleList[personID].feedback[0].designation=_designation;
        peopleList[personID].feedback[0].branch=_branch;*/
    }
    // called by person to justify against any bad review.
    function jusify(uint personID,string _justification) public {
        peopleList[personID].counter-=1;
        peopleList[personID].reviewList[peopleList[personID].counter].justification=_justification;
        peopleList[personID].ableToCounter=false;
        peopleList[personID].counter+=1;
        
    }   
    
    //  remove index by counter of review for each person
    
    // here i can see review for a person at a perticular index.
    
    function seeFeedback(uint personID,uint index) public returns (string feeds,string joiningDate,string resigndate,string branch , string designation,string justification){
        return (peopleList[personID].reviewList[index].review,peopleList[personID].reviewList[index].joiningDate ,peopleList[personID].reviewList[index].resignDate,peopleList[personID].reviewList[index].branch,peopleList[personID].reviewList[index].designation,peopleList[personID].reviewList[index].justification);
    }
    
    // count of reviews for an employee
    
    function getEmpReviewCount(uint ID) public returns (uint EmpReviewCount){
        return (peopleList[ID].counter);
        
    }
    //  searching of person (by company)
    function ReviewName(uint ID) public returns (string name){
        return (peopleList[ID].name);
    }
    function ReviewAge(uint ID) public returns (uint age){
        return (peopleList[ID].age);
    }
    
}

