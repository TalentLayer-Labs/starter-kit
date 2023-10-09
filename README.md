# StarterKit

A Ready to Use NextJS dapp using [TalentLayer](https://docs.talentlayer.org/).

## Start building in few seconds

- Fork the code
- Clone your new repository
- Copy .env.example file into a new .env file: `cp .env.example .env`
    - Minimum required configuration: 
        - NEXT_PUBLIC_PLATFORM_ID: use 4, the default value, or [create your own platform](https://docs.talentlayer.org/get-a-platform-id) to setup your custom fees and more: 
        - NEXT_PUBLIC_WALLECT_CONNECT_PROJECT_ID: Create a free account on [wallet connect and get your project ID](https://cloud.walletconnect.com/)
        - NEXT_PUBLIC_INFURA_ID & NEXT_PUBLIC_INFURA_SECRET: used to post on IPFS, create a free account on [Infura here](https://www.infura.io/product/ipfs)  
    - For more advanced configuration [check the official doc](https://docs.talentlayer.org/technical-guides/starterkit-setup)
- Use the recommended node version: `18^`, if you are using nvm just run: `nvm use`
- Install the dependencies: `npm install`
- Run local server for development `npm run dev`
- That's it!

## 🛠️ TalentLayer

TalentLayer is an open protocol and dev toolkit for hiring applications. You can use it to build platforms that leverage a unified decentralized backend for job posts, escrow, user profiles, and reputations.

### Developer Resources

**Introduction:** [Read here.](https://docs.talentlayer.org/)

**Documentation:** [Read here.](https://docs.talentlayer.org/technical-guides)

**XMTP & TL:** [Read here.](https://docs.talentlayer.org/technical-guides/messaging/integrating-xmtp)

## 🗨 XMTP

XMTP is an open protocol and dev toolkit for messaging applications. You can use it to build peer-to-peer messaging 

### Developer Resources

**Introduction:** [Read here.](https://xmtp.org/docs/dev-concepts/introduction)

**Documentation:** [Read here.](https://xmtp.org/docs/dev-concepts/start-building)

**Example DAPP Tutorial:** [Read here.](https://xmtp.org/docs/client-sdk/javascript/tutorials/build-an-xmtp-hello-world-app)

## ✉️ IExec - Web3mail

Web3mail is a decentralized email service built by IExec which allows a platform to send emails to a user without knowing the email address of the user. 

### Developer Resources

**Iexec Documentation:** [Read here.](https://tools.docs.iex.ec/tools/dataprotector)

**Technical TalentLayer integration documentation:** [Read here.](https://app.gitbook.com/o/uoAYI2Mv1g6UqAhiHLVU/s/LxwTmt3MOuMIlBTH8NKY/~/changes/155/third-party-modules/iexec-web3-mail-and-notifications#1.-introduction)
