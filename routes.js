const algosdk = require('algosdk');

module.exports = function(app){

    app.get('/', function(req, res){
        
        res.render('index.html');
        // res.redirect('/spades');
        
    });

    app.get('/spades', function(req, res){
        
        res.render('spades.html');
        
    });

    app.get('/hearts', function(req, res){
        
        res.render('hearts.html');
        
    });

    //   const algodServer = "https://testnet-algorand.api.purestake.io/ps2";
    //   const algodPort = "";
    //   const algodToken = {
    //       'X-API-Key': "X7HxsshAnN626baE6sNP9963GCwayNPXamoGg3fy"
    //   };

    //   const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);  


    //   // UOSB5XIKB6LSIXUKSOJCPFVUYHAWJFTXCUETQ72VPRSI7RDAEFHXYGSBZY
    //   // voice void impose resist scan clog scrap brick amateur company hundred unfair latin clever until minor bird fame else duck daring blame apart about galaxy
    //   // Q6TFA4OOEHYOQFFHQU3O26WEB5C5R4UUPH3KXIJ3FMGBMLQW3RDAOF3K7U
    //   // wedding cash year brass wash usual gift toy afford neither august usual lazy federal patient room select gather example trick desert bid scout absorb approve


    //   const waitForConfirmation = async function (algodClient, txId, timeout) {
    //     if (algodClient == null || txId == null || timeout < 0) {
    //         throw new Error("Bad arguments");
    //     }

    //     const status = (await algodClient.status().do());
    //     if (status === undefined) {
    //         throw new Error("Unable to get node status");
    //     }

    //     const startround = status["last-round"] + 1;
    //     let currentround = startround;

    //     while (currentround < (startround + timeout)) {
    //         const pendingInfo = await algodClient.pendingTransactionInformation(txId).do();
    //         if (pendingInfo !== undefined) {
    //             if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
    //                 //Got the completed Transaction
    //                 return pendingInfo;
    //             } else {
    //                 if (pendingInfo["pool-error"] != null && pendingInfo["pool-error"].length > 0) {
    //                     // If there was a pool error, then the transaction has been rejected!
    //                     throw new Error("Transaction " + txId + " rejected - pool error: " + pendingInfo["pool-error"]);
    //                 }
    //             }
    //         }
    //         await algodClient.statusAfterBlock(currentround).do();
    //         currentround++;
    //     }

    //     throw new Error("Transaction " + txId + " not confirmed after " + timeout + " rounds!");

    //   };


    //   /* app.get('/wallet', function(req, res){

    //     res.render('index2.html');

    //   }); */


    //   app.get('/user', function(req, res){

    //       (async() => {

    //         const passphrase = "wedding cash year brass wash usual gift toy afford neither august usual lazy federal patient room select gather example trick desert bid scout absorb approve";

    //         let myAccount = algosdk.mnemonicToSecretKey(passphrase)
    //         console.log("My address: %s", myAccount.addr)

    //         let accountInfo = await algodClient.accountInformation(myAccount.addr).do();
    //         console.log("Account balance: %d microAlgos", accountInfo.amount);

    //         obj = {"pub2": myAccount.addr, "pub1": myAccount, "balance": accountInfo.amount};

    //         res.send(obj);

    //       })().catch(e => {

    //           console.log(e);

    //       });

    //   });


    //   app.get('/win', function(req, res){

    //     (async() => {

    //         const passphrase = "voice void impose resist scan clog scrap brick amateur company hundred unfair latin clever until minor bird fame else duck daring blame apart about galaxy";

    //         let myAccount = algosdk.mnemonicToSecretKey(passphrase)
    //         // console.log("My address: %s", myAccount.addr)

    //         let accountInfo = await algodClient.accountInformation(myAccount.addr).do();
    //         // console.log("Account balance: %d microAlgos", accountInfo.amount);

    //         let params = await algodClient.getTransactionParams().do();
    //         // comment out the next two lines to use suggested fee
    //         // params.fee = 1000;
    //         // params.flatFee = true;
    //         const receiver = "Q6TFA4OOEHYOQFFHQU3O26WEB5C5R4UUPH3KXIJ3FMGBMLQW3RDAOF3K7U";
    //         const enc = new TextEncoder();
    //         let note = enc.encode("Hello World");
    //         let txn = algosdk.makePaymentTxnWithSuggestedParams(myAccount.addr, receiver, 500000, undefined, note, params);
        
    //         let signedTxn = txn.signTxn(myAccount.sk);
    //         let txId = txn.txID().toString();
    //         console.log("Signed transaction with txID: %s", txId);

    //         await algodClient.sendRawTransaction(signedTxn).do();

    //         // Wait for confirmation
    //         let confirmedTxn = await waitForConfirmation(algodClient, txId, 4);
    //         //Get the completed Transaction
    //         console.log("Transaction " + txId + " confirmed in round " + confirmedTxn["confirmed-round"]);
    //         let mytxinfo = JSON.stringify(confirmedTxn.txn.txn, undefined, 2);
    //         console.log("Transaction information: %o", mytxinfo);
    //         var string = new TextDecoder().decode(confirmedTxn.txn.txn.note);
    //         console.log("Note field: ", string);

    //     })().catch(e => {

    //         console.log(e);

    //     });

    //   });


    //   app.get('/lose', function(req, res){

    //     (async() => {

    //         const passphrase = "wedding cash year brass wash usual gift toy afford neither august usual lazy federal patient room select gather example trick desert bid scout absorb approve";

    //         let myAccount = algosdk.mnemonicToSecretKey(passphrase)
    //         // console.log("My address: %s", myAccount.addr)

    //         let accountInfo = await algodClient.accountInformation(myAccount.addr).do();
    //         // console.log("Account balance: %d microAlgos", accountInfo.amount);

    //         let params = await algodClient.getTransactionParams().do();
    //         // comment out the next two lines to use suggested fee
    //         // params.fee = 1000;
    //         // params.flatFee = true;
    //         const receiver = "UOSB5XIKB6LSIXUKSOJCPFVUYHAWJFTXCUETQ72VPRSI7RDAEFHXYGSBZY";
    //         const enc = new TextEncoder();
    //         let note = enc.encode("Hello World");
    //         let txn = algosdk.makePaymentTxnWithSuggestedParams(myAccount.addr, receiver, 500000, undefined, note, params);
        
    //         let signedTxn = txn.signTxn(myAccount.sk);
    //         let txId = txn.txID().toString();
    //         console.log("Signed transaction with txID: %s", txId);

    //         await algodClient.sendRawTransaction(signedTxn).do();

    //         // Wait for confirmation
    //         let confirmedTxn = await waitForConfirmation(algodClient, txId, 4);
    //         //Get the completed Transaction
    //         console.log("Transaction " + txId + " confirmed in round " + confirmedTxn["confirmed-round"]);
    //         let mytxinfo = JSON.stringify(confirmedTxn.txn.txn, undefined, 2);
    //         console.log("Transaction information: %o", mytxinfo);
    //         var string = new TextDecoder().decode(confirmedTxn.txn.txn.note);
    //         console.log("Note field: ", string);

    //     })().catch(e => {

    //         console.log(e);

    //     });

    //   });
  
};