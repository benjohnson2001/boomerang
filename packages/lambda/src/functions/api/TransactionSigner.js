import web3 from "../../services/Web3HttpService";
import boomerangContract from "../../services/BoomerangContractService";
import { boomerangContractAddress, payerAddress } from '../../ContractAddresses';

const privateKeyOfPayer = '0x4725d5a1c46923e72f04831eab9daf1ec657f256f5e4f139d4835b5197fcffc4';

let signTransaction = async (apiMethod, apiMethodParameters) => {

  console.log('apiMethod: ' + apiMethod);
  console.log('apiMethodParameters.length: ' + apiMethodParameters.length);
  console.log('apiMethodParameters: ' + apiMethodParameters.toString());


  const query = boomerangContract.methods[apiMethod](...apiMethodParameters);
  console.log('query: ' + query);

  const encodedABI = query.encodeABI();
  console.log('encodedABI: ' + encodedABI);

  const transaction = {
    from: payerAddress,
    to: boomerangContractAddress,
    gas: 4612388,
    gasPrice: 1,
    data: encodedABI
  };

  console.log('transaction: ' + transaction);

  const signedTransaction = await web3.eth.accounts.signTransaction(transaction, privateKeyOfPayer);
  console.log('signedTransaction: ' + signedTransaction);

  return signedTransaction;
};

export default signTransaction;