hljs.initHighlightingOnLoad();
let txParamsJS = {};
let txParamsJS2 = {};
let tnAccounts = [];
let signedTxs;
let signedTxs2;
let tx = {};
let algodClient = {};
let indexerClient = {};

// Helper used with JSON.stringify that replaces Uint8Array data with ascii text for display
function toJsonReplace(key, value) {    
    // Return value immediately if null or undefined
    if(value === undefined || value === null){
        return value;
    }

    // Check for uint8 arrays to get buffer for print
    if(value instanceof Uint8Array || (typeof(value)==='object' && value instanceof Array && value.length > 0 && typeof(value[0]) === 'number')){
        // We have a key that is an address type then use the sdk base 58 method, otherwise use base64
        const addressKeys = ['rcv','snd','to','from','manager','reserve','freeze','clawback','c','f','r','m','asnd','arcv','aclose','fadd'];
        if(key && addressKeys.includes(key)) {
            return algosdk.encodeAddress(value);
        }
        return btoa(value);
    }

    // Check for literal string match on object type to cycle further into the recursive replace
    if(typeof(value) === '[object Object]'){
        return JSON.stringify(value,_toJsonReplace,2);
    } 

    // Return without modification
    return value;
}

function check() {
    let checkCodeElem = document.getElementById('check-code');

    if (typeof AlgoSigner !== 'undefined') {
    checkCodeElem.innerHTML = 'AlgoSigner is installed.';
    } else {
    checkCodeElem.innerHTML = 'AlgoSigner is NOT installed.';
    }
}

function connect() {
    // let connectCodeElem = document.getElementById('connect-code');

    AlgoSigner.connect()
    .then((d) => {
      document.getElementById('connected').innerHTML = 'Your wallet is now connected.';
      sdkSetup();
      accounts();
      document.getElementById('connect').style.display = 'none';
      document.getElementById('bet1').style.display = 'block';
    })
    .catch((e) => {
    console.error(e);
    // connectCodeElem.innerHTML = JSON.stringify(e, null, 2);
    })
    .finally(() => {
    // hljs.highlightBlock(connectCodeElem);
    });

    // sdkSetup();
    // accounts();
}

function sdkSetup() {

    // let sdkSetupCodeElem = document.getElementById('sdk-setup');

    const algodServer = 'https://testnet-algorand.api.purestake.io/ps2';
    const indexerServer = 'https://testnet-algorand.api.purestake.io/idx2';
    const token = { 'X-API-Key': 'X7HxsshAnN626baE6sNP9963GCwayNPXamoGg3fy' }
    const port = '';

    algodClient = new algosdk.Algodv2(token, algodServer, port);
    indexerClient = new algosdk.Indexer(token, indexerServer, port);

    // Health check
    algodClient.healthCheck().do()
    .then(d => { /* sdkSetupCodeElem.innerHTML = JSON.stringify(d, null, 2); */})
    .catch(e => { /* sdkSetupCodeElem.innerHTML = JSON.stringify(e, null, 2); */ })
    .finally(() => {
    // hljs.highlightBlock(sdkSetupCodeElem);
    });      
}

function accounts(){
    let accountsCodeElem = document.getElementById('player');

    AlgoSigner.accounts({
    ledger: 'TestNet'
    })
    .then((d) => {
        accounts = d;
        accountsElem = JSON.stringify(d, null, 2);
        accountsCodeElem.innerHTML = d[0]['address'];
        console.log(accountsCodeElem.innerHTML)
    })
    .catch((e) => {
        console.error(e);
        // accountsCodeElem.innerHTML = JSON.stringify(d, null, 2);
    })
    .finally(() => {
        
    });
}

function params() {
    // let paramsCodeElem = document.getElementById('params-code');

    algodClient.getTransactionParams().do()
    .then((d) => {
      txParamsJS = d;
      // console.log(txParamsJS);
      // paramsCodeElem.innerHTML = JSON.stringify(txParamsJS, null, 2);
    })      
    .catch((e) => {
      console.error(e);
      // paramsCodeElem.innerHTML = JSON.stringify(e, null, 2);
    })
    .finally(() => {
      // hljs.highlightBlock(paramsCodeElem);
      sign();
    });
  }

  function winner_params() {
    // let paramsCodeElem = document.getElementById('params-code');

    algodClient.getTransactionParams().do()
    .then((d) => {
      txParamsJS2 = d;
      // console.log(txParamsJS);
      // paramsCodeElem.innerHTML = JSON.stringify(txParamsJS, null, 2);
    })      
    .catch((e) => {
      console.error(e);
      // paramsCodeElem.innerHTML = JSON.stringify(e, null, 2);
    })
    .finally(() => {
      // hljs.highlightBlock(paramsCodeElem);
      winner_sign();
    });
  }

  function sign() {

    // params();

    // let signCodeElem = document.getElementById('sign-code');
    // let accountCodeElem = document.getElementById('accounts-code');

    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: document.getElementById('player').innerHTML,
      to: 'UOSB5XIKB6LSIXUKSOJCPFVUYHAWJFTXCUETQ72VPRSI7RDAEFHXYGSBZY',
      amount: 250000,
      note: AlgoSigner.encoding.stringToByteArray('1dtable'),
      // assetIndex: '22055740',
      suggestedParams: {...txParamsJS} 
    });// genesisHash: txParamsJS.genesisHash,

    // Use the AlgoSigner encoding library to make the transactions base64
    let txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());

    AlgoSigner.signTxn([{txn: txn_b64}])
    .then((d) => {
      signedTxs = d;
      // signCodeElem.innerHTML = JSON.stringify(d, null, 2);
    })
    .catch((e) => {
      console.error(e);
      // signCodeElem.innerHTML = JSON.stringify(e, null, 2);
    })
    .finally(() => {
      // hljs.highlightBlock(signCodeElem);
      send();
    });

  }

  function winner_sign() {

    // params();

    // let signCodeElem = document.getElementById('sign-code');
    // let accountCodeElem = document.getElementById('accounts-code');

    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: 'UOSB5XIKB6LSIXUKSOJCPFVUYHAWJFTXCUETQ72VPRSI7RDAEFHXYGSBZY',
      to: document.getElementById('player').innerHTML,
      amount: 250000,
      note: AlgoSigner.encoding.stringToByteArray('1dtable'),
      // assetIndex: '22055740',
      suggestedParams: {...txParamsJS2} 
    });// genesisHash: txParamsJS.genesisHash,

    // Use the AlgoSigner encoding library to make the transactions base64
    let txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());

    AlgoSigner.signTxn([{txn: txn_b64}])
    .then((d) => {
      signedTxs2 = d;
      // signCodeElem.innerHTML = JSON.stringify(d, null, 2);
    })
    .catch((e) => {
      console.error(e);
      // signCodeElem.innerHTML = JSON.stringify(e, null, 2);
    })
    .finally(() => {
      // hljs.highlightBlock(signCodeElem);
      winner_send();
    });

  }

  function send() {

    // let sendCodeElem = document.getElementById('send-code');

    // Sending first transaction only for demo purposes
    AlgoSigner.send({
      ledger: 'TestNet',
      tx: signedTxs[0].blob 
    })
    .then((d) => {
      // sendCodeElem.innerHTML = JSON.stringify(d, null, 2);
      tx = d;
      document.getElementById('sendMsg').innerHTML = 'Transaction- ' + tx.txId;
    })
    .catch((e) => {
      console.error(e);
      // sendCodeElem.innerHTML = JSON.stringify(e, null, 2);
    })
    .finally(() => {
      // hljs.highlightBlock(sendCodeElem);
      menu_start_game_click('Pro');
    });
  }

  function winner_send() {

    // let sendCodeElem = document.getElementById('send-code');

    // Sending first transaction only for demo purposes
    AlgoSigner.send({
      ledger: 'TestNet',
      tx: signedTxs2[0].blob 
    })
    .then((d) => {
      // sendCodeElem.innerHTML = JSON.stringify(d, null, 2);
      tx = d;
      document.getElementById('sendMsg').innerHTML = 'Transaction- ' + tx.txId;
    })
    .catch((e) => {
      console.error(e);
      // sendCodeElem.innerHTML = JSON.stringify(e, null, 2);
    })
    .finally(() => {
      // hljs.highlightBlock(sendCodeElem);
      // menu_start_game_click('Pro');

      window.location('localhost:5000')
    });
  }

  function pending() {
    let pendingCodeElem = document.getElementById('pending-code');
    
    algodClient.pendingTransactionInformation(tx.txId).do()
    .then((d) => {
      pendingCodeElem.innerHTML = JSON.stringify(d, toJsonReplace, 2);
    })
    .catch((e) => {
      console.error(e);
      pendingCodeElem.innerHTML = JSON.stringify(e, null, 2);
    })
    .finally(() => {
      hljs.highlightBlock(pendingCodeElem);
    });
  }

function status(){
    let statusCodeElem = document.getElementById('status-code');

    algodClient.status().do()
    .then((d) => {
    statusCodeElem.innerHTML = JSON.stringify(d, null, 2);
    })
    .catch((e) => {
    console.error(e);
    statusCodeElem.innerHTML = JSON.stringify(e, null, 2);
    })
    .finally(() => {
    hljs.highlightBlock(statusCodeElem);
    });
}

function assets(){
    let assetsCodeElem = document.getElementById('assets-code');

    const name = document.getElementById('name').value;
    const limit = document.getElementById('limit').value;

    indexerClient.searchForAssets()
    .limit(limit)
    .name(name)
    .do()
    .then((d) => {
    assetsCodeElem.innerHTML = JSON.stringify(d, null, 2);
    })
    .catch((e) => {
    console.error(e);
    assetsCodeElem.innerHTML = JSON.stringify(e, null, 2);
    })
    .finally(() => {
    hljs.highlightBlock(assetsCodeElem);
    });
}


// document.getElementById('check').addEventListener('click', check);
document.getElementById('connect').addEventListener('click', connect);
// document.getElementById('sdksetup').addEventListener('click', sdkSetup);
// document.getElementById('accounts').addEventListener('click', accounts);
// document.getElementById('accounts').addEventListener('click', accounts);
document.getElementById('bet1').addEventListener('click', params);
document.getElementById('winner').addEventListener('change', winner_params);
// document.getElementById('params').addEventListener('click', params);
// document.getElementById('sign').addEventListener('click', sign);
// document.getElementById('send').addEventListener('click', send);
// document.getElementById('pending').addEventListener('click', pending);
// document.getElementById('status').addEventListener('click', status);
// document.getElementById('assets').addEventListener('click', assets);