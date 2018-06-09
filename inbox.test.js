const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());// here we are telling web3 to connect to ganache local provider (ganche network)
//mocha is a javascript testing framework
const {interface , bytecode } = require('../compile');

// ABI <=> interface

// infura api key => gktsmW0m7SSN8W8gRXF7


// beforeEach( () => {
// 	// Get a list of all accounts
// 	web3.eth.getAccounts()
// 		.then( fetchedAccounts => {
// 			console.log(fetchedAccounts);
// 		});

// 	// Use one of those accounts to deploy
// 	// the contract
// });


let accounts;
let inbox;

beforeEach(async () => {
	// Get a list of all accounts
	accounts = await web3.eth.getAccounts();

	// Use one of those accounts to deploy
	// the contract
	inbox = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({
			data: bytecode,
			arguments : ['Hi there!']
		})
		.send({
			from: accounts[0],
			gas: '1000000'
		});
});


describe('inbox', () => {
	it('deploys a contract', () => {
		assert.ok(inbox.options.address);//assert.ok check value is defined or not
	});

	it('has a default message', async () => {
		const message = await inbox.methods.message().call();//call is used for reading data
		assert.equal(message, 'Hi there!');
		//console.log(message);
	});

	it('can change the message', async () => {
		await inbox.methods.setMessage('Hello World').send({from: accounts[0]});//send is used for modifying data
		const message = await inbox.methods.message().call();
		assert.equal(message, 'Hello World');
	});

});

