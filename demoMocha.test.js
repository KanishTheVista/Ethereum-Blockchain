const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());// here we are telling web3 to connect to ganache local provider (ganche network)
//mocha is a javascript testing framework


class Car {
	park() {
		return 'stopped';
	}

	drive() {
		return 'vroom';
	}
}

//beforeEach exectue before "describe" Test RUNS or We can also say that 
//beforeEach run before ever "it" described under "describe" method 

// beforeEach( () => {
// 	console.log('a');
// });

// describe('Car', () => {

// 	it('can park', () =>{
// 		const car = new Car();
// 		assert.equal(car.park(), 'stopped');
// 	});

// 	it('can drive', () => {
// 		const car = new Car();
// 		assert.equal(car.drive(), 'vroom');
// 	});

// });



let car;

beforeEach( () => {
	 car = new Car();
});

describe('Car', () => {

	it('can park', () =>{
		assert.equal(car.park(), 'stopped');
	});

	it('can drive', () => {
		assert.equal(car.drive(), 'vroom');
	});

});
