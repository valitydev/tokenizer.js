import 'whatwg-fetch';
import ClientInfo from './clientInfo/ClientInfo';
import CardTokenizer from './tokenizers/CardTokenizer';

(function init() {
    // includes();
    // const host = Utils.getScriptUrl();
    // if (host.includes(this.location.host)) {
    //     new RpcProvider();
    // } else {
    //     const clientInfo = new ClientInfo();
    //     const rpc = new RpcConsumer(host);
    //     let publicKey;
    //     this.Tokenizer = {
    //         setPublicKey: key => (publicKey = key),
    //         card: {
    //             createToken: (cardData, success, error) => {
    //                 if (publicKey) {
    //                     const request = {
    //                         paymentTool: cardData,
    //                         clientInfo: clientInfo.getInfo()
    //                     };
    //                     rpc.createToken(publicKey, request, success, error);
    //                 } else {
    //                     error({
    //                         message: 'Public key required'
    //                     });
    //                 }
    //             }
    //         }
    //     };

    const clientInfo = new ClientInfo();
    let publicKey;
    this.Tokenizer = {
        setPublicKey: key => (publicKey = key),
        card: {
            createToken: (cardData, success, error) => {
                if (publicKey) {
                    const request = {
                        paymentTool: cardData,
                        clientInfo: clientInfo.getInfo()
                    };
                    CardTokenizer.createToken(publicKey, request, success, error);
                } else {
                    error({
                        message: 'Public key required'
                    });
                }
            }
        }
    };
}).call(window || {});
