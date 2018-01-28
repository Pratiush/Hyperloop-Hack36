fs = require('fs');
Web3 = require('web3');
web3 = new Web3( new Web3.providers.HttpProvider("http://localhost:8545") );
console.log("Connected to Blockchain !!");
code = fs.readFileSync("Review.sol").toString(); // read contract file.
solc = require('solc');
console.log("Compiling Review.sol ...");
compiledCode = solc.compile( code );
console.log("Compiled successfully!!");
abi = JSON.parse( compiledCode.contracts[":People"].interface ); // here is the name of contract
byteCode = compiledCode.contracts[':People'].bytecode ;
ReviewContract =  web3.eth.contract(abi) ;
console.log("Deploying ...")

deployedContract = ReviewContract.new({data: byteCode , from: web3.eth.accounts[0] , gas: 3000000 },
( e , contract )=>{
      if( contract.address )
        {
          console.log("Deployed successfully...\n\n\nDeployed Address : " + contract.address );
          console.log("Use the above deployed address in Review.js ...\n\n");
        }
});
