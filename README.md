# StarterKit

A Ready to Use NextJS dapp using TalentLayer & XMTP protocols.
All essential components to start building an amazing dapp with interoperable work and messaging

## Start building in 60 seconds

- Clone this repository

- Copy .env.example file into a new .env file
  `cp .env.example .env`

- If you are using nvm, run:
  `nvm use`
- Else, use the recommended node version: `18^`

- Install the dependencies
  `npm install`

- Run the setup script to choose the modules which you want to use in your project
  `npm run setup`

- Run local server for development
  `npm run dev`

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

## Contribution Guide (for the setup script templating)

Whenever you need to add more optional modules in the starter kit, you need to do the following steps:
- Add the module's unique name in the .modules.template file
- The module folder should contain a file `.module-${module_name}`
- The files which use this module should have the module markers (no need if the file is present in a folder which has `.module-${module_name}` file):
    - if the file is useless if the module is not selected then on the top of the file add a comment `// MODULE_FILE:${module_name}`
    - else if the file has some sections which are useless if module not selected, then add one comment just above the section `// MODULE_SECTION_START:${module_name}` (in case of jsx or tsx code, `{/* MODULE_SECTION_START:${module_name} */}`), then add one comment just below the section `// MODULE_SECTION_END` (in case of jsx or tsx code, `{/* MODULE_SECTION_END */}`)
