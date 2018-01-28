currentAccount=0;

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
//code = fs.readFileSync("Review.sol").toString(); // read contract file.
//solc = require('solc');
//compiledCode = solc.compile( code );
abi = JSON.parse( '[{"constant":false,"inputs":[{"name":"personID","type":"uint256"},{"name":"index","type":"uint256"}],"name":"seeFeedback","outputs":[{"name":"feeds","type":"string"},{"name":"joiningDate","type":"string"},{"name":"resigndate","type":"string"},{"name":"branch","type":"string"},{"name":"designation","type":"string"},{"name":"justification","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getNumEmployee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"ID","type":"uint256"}],"name":"ReviewAge","outputs":[{"name":"age","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"cid","type":"uint256"}],"name":"getCompany","outputs":[{"name":"company_name","type":"string"},{"name":"email","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getNumCompany","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"companyID","type":"uint256"}],"name":"isCompanyVerified","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"ID","type":"uint256"}],"name":"getEmpReviewCount","outputs":[{"name":"EmpReviewCount","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"age","type":"uint256"}],"name":"addPerson","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"companyID","type":"uint256"}],"name":"verifyCompany","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"personID","type":"uint256"},{"name":"_justification","type":"string"}],"name":"jusify","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_companyName","type":"string"},{"name":"_branch","type":"string"},{"name":"_email","type":"string"}],"name":"addCompany","outputs":[{"name":"companyID","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"personID","type":"uint256"},{"name":"_joindate","type":"string"},{"name":"_resigndate","type":"string"},{"name":"_designation","type":"string"},{"name":"_branch","type":"string"},{"name":"_review","type":"string"}],"name":"giveFeedback","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"ID","type":"uint256"}],"name":"ReviewName","outputs":[{"name":"name","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]' ); // interface
ReviewContract = web3.eth.contract(abi);


//Provide below the new deployed address
contractInstance = ReviewContract.at('0x335fa8c574fc409b7d1a67d9962472fc19f813ca');


function switchAccount(){
  newAccount = $("#currentAccount").val();
  console.log("newAccount :"+newAccount);
  currentAccount=newAccount;

}

function getCurrentAccount(){
  console.log(currentAccount);
  $("#currAcc").html(currentAccount);

}



function addCompany(){

  company_name= document.getElementById('company_name').value;
  company_branch= document.getElementById('company_branch').value;
  company_email= document.getElementById('company_email').value;
  var params =[company_name,company_branch,company_email];
  console.log(params);
  contractInstance.addCompany(company_name,company_branch,company_email , { from: web3.eth.accounts[currentAccount] , gas: 3000000 }).toString();
  alert("Registered !");
  updateCompany();
}

function addEmployee(){
  employee_name = $("#employee_name").val();
  employee_age = $("#employee_age").val();
  console.log(employee_age);
  let eid=contractInstance.addPerson(employee_name,employee_age , { from: web3.eth.accounts[currentAccount] , gas: 3000000 });
  alert("Registered "+eid);
  updateEmployee();
}

function check(){
// check for validity


//document.getElementById("giveFeedback").style.display="none";// disable the give feedback button
var x=document.getElementById("form1");
if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function giveFeedback(){

// insert 
personID= $("#employeeid").val();
_joindate= $("#from_date").val();
_resigndate =$("#to_date").val();
designation= $("#designation").val();
branch = $("#branch").val();
feedback = $("#feedback").val();
console.log("personID : "+personID+_joindate+_resigndate+designation+branch+feedback);
contractInstance.giveFeedback(personID,_joindate,_resigndate,designation,branch,feedback,{ from: web3.eth.accounts[currentAccount] , gas: 3000000 });
alert("feedback submitted !");

}
data = "";
function updateCompany(){

  data = "";
  console.log(contractInstance.getNumCompany.call().c[0] );

  for (var i = 0; i < contractInstance.getNumCompany.call().c[0] ; i++ ) {
    console.log(contractInstance.getCompany.call(i));

    data += "<tr> <td> " + contractInstance.getCompany.call(i)[0]+ "</td><td>" + contractInstance.getCompany.call(i)[1] + "</td>";
    if(contractInstance.isCompanyVerified.call(i)){

      data+= "<td>Verified</td></tr>";
    }
    else {
      data+= "<td><button class='btn btn-danger' onclick='verifyCompany("+i+")'>Verify</button></td></tr>";
    }
    
  }
  $("#CompanyTable").html(data);

}

function updateEmployee(){

  data1 = "";
  console.log(contractInstance.getNumCompany.call().c[0] );

  for (var i = 0; i < contractInstance.getNumEmployee.call().c[0] ; i++ ) {
    data1 += "<tr> <td> " + contractInstance.ReviewName.call(i)+ "</td><td>" + contractInstance.ReviewAge.call(i) + "</td></tr>";
  }
  $("#EmployeeTable").html(data1);

}

updateCompany();
updateEmployee();

function getReview(){

employeeid1=$("#employeeid1").val();
data2="";
console.log("employeeid1 is :"+employeeid1);
EmpReviewCount = contractInstance.getEmpReviewCount.call(employeeid1);
console.log("EmpReviewCount :"+EmpReviewCount);
for (var i = 0; i< EmpReviewCount; i++) {
    let EmpReviews =contractInstance.getReview(employeeid1 , i);
    console.log("array of reviews :"+EmpReviews);

}

$("#reviews").html(data2);

}

function verifyCompany( inp ){


  if(currentAccount==0){

    contractInstance.verifyCompany(inp,{ from: web3.eth.accounts[currentAccount] , gas: 3000000 });
    console.log("verified");
    updateCompany();


  }
  else{
    alert("You don't have admin right!");
  }
}


function changePage(path){
 window.location.assign("./reviewforms.html");
}


